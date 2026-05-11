import os
import glob
import re
import argparse
from plyfile import PlyData
import numpy as np
from io import BytesIO

def process_ply_to_splat(ply_file_path):
    plydata = PlyData.read(ply_file_path)
    vert = plydata["vertex"]
    N = len(vert)

    # Vectorized sorting
    sort_key = np.exp(vert["scale_0"] + vert["scale_1"] + vert["scale_2"]) / (1 + np.exp(-vert["opacity"]))
    sorted_indices = np.argsort(-sort_key)

    # Create the structured array to interleave data tightly in memory
    dt = np.dtype([
        ('pos', np.float32, (3,)),
        ('scale', np.float32, (3,)),
        ('color', np.uint8, (4,)),
        ('rot', np.uint8, (4,))
    ])
    out_arr = np.zeros(N, dtype=dt)

    # Fill positions
    out_arr['pos'][:, 0] = vert["x"]
    out_arr['pos'][:, 1] = vert["y"]
    out_arr['pos'][:, 2] = vert["z"]

    # Fill scales
    out_arr['scale'][:, 0] = np.exp(vert["scale_0"])
    out_arr['scale'][:, 1] = np.exp(vert["scale_1"])
    out_arr['scale'][:, 2] = np.exp(vert["scale_2"])

    # Fill colors
    SH_C0 = 0.28209479177387814
    color_r = (0.5 + SH_C0 * vert["f_dc_0"]) * 255
    color_g = (0.5 + SH_C0 * vert["f_dc_1"]) * 255
    color_b = (0.5 + SH_C0 * vert["f_dc_2"]) * 255
    color_a = (1 / (1 + np.exp(-vert["opacity"]))) * 255

    out_arr['color'][:, 0] = color_r.clip(0, 255)
    out_arr['color'][:, 1] = color_g.clip(0, 255)
    out_arr['color'][:, 2] = color_b.clip(0, 255)
    out_arr['color'][:, 3] = color_a.clip(0, 255)

    # Fill rotations (quaternions)
    rots = np.vstack((vert["rot_0"], vert["rot_1"], vert["rot_2"], vert["rot_3"])).T
    norms = np.linalg.norm(rots, axis=1, keepdims=True)
    rots_normalized = ((rots / norms) * 128 + 128).clip(0, 255)
    out_arr['rot'] = rots_normalized

    # Apply sorting and convert to bytes
    out_arr = out_arr[sorted_indices]
    
    return out_arr.tobytes()

def save_splat_file(splat_data, output_path):
    with open(output_path, "wb") as f:
        f.write(splat_data)

def extract_iteration(path):
    # Search for pattern like "iteration_1000" in the path
    match = re.search(r'iteration_(\d+)', path)
    if match:
        return int(match.group(1))
    return -1

def main():
    parser = argparse.ArgumentParser(description="Batch convert iteration-based PLY files to sequentially numbered SPLAT format.")
    parser.add_argument("input_dir", help="Directory containing the iteration_X folders")
    parser.add_argument("output_dir", help="Directory to save the resulting .splat files")
    parser.add_argument("--start_index", type=int, default=0, help="Starting index for the output model_XXXXX.splat files (default to 0).")
    args = parser.parse_args()

    # Find all .ply files within the input directory recursively
    ply_files = glob.glob(os.path.join(args.input_dir, "**", "*.ply"), recursive=True)
    
    # Filter files that are inside iteration_X folders
    filtered_files = []
    for f in ply_files:
        val = extract_iteration(f)
        if val != -1:
            filtered_files.append((val, f))
    
    if not filtered_files:
        print("No .ply files found in 'iteration_X' folders.")
        return

    # Sort by the iteration number
    filtered_files.sort(key=lambda x: x[0])

    if not os.path.exists(args.output_dir):
        os.makedirs(args.output_dir)

    for i, (iteration, ply_path) in enumerate(filtered_files, start=args.start_index):
        print(f"Processing {ply_path} (Iteration {iteration})...")
        splat_data = process_ply_to_splat(ply_path)
        
        # Output named model_00001.splat, model_00002.splat, etc.
        out_name = f"model_{str(i).zfill(5)}.splat"
        out_path = os.path.join(args.output_dir, out_name)
        
        save_splat_file(splat_data, out_path)
        print(f"Saved {out_path}")

if __name__ == "__main__":
    main()
