import os
import glob
import numpy as np
import argparse
from scipy.spatial.transform import Rotation

def transform_splat(input_path, output_path, translate, rotate_euler, scale):
    # splat format is 32 bytes per vertex:
    # 3x float32 pos (12 bytes)
    # 3x float32 scale (12 bytes)
    # 4x uint8 color (4 bytes)
    # 4x uint8 rot (4 bytes)

    dt = np.dtype([
        ('pos', np.float32, (3,)),
        ('scale', np.float32, (3,)),
        ('color', np.uint8, (4,)),
        ('rot', np.uint8, (4,))
    ])

    print(f"Reading {input_path}...")
    with open(input_path, 'rb') as f:
        data = f.read()

    arr = np.frombuffer(data, dtype=dt).copy()
    print(f"Loaded {len(arr)} vertices.")

    # Apply scaling
    if scale != 1.0:
        arr['pos'] *= scale
        arr['scale'] *= scale

    # Apply rotation
    # 'rotate_euler' is expected in degrees
    R = Rotation.from_euler('xyz', rotate_euler, degrees=True)
    
    # Update positions (rotate them around origin)
    arr['pos'] = R.apply(arr['pos'])

    # Update rotations of individual splats
    # Original quats are packed as [w, x, y, z] (w is rot[0])
    # rot is encoded as uint8 from 0-255 mapped to -1 to 1 range
    quats_xyzw = np.empty((len(arr), 4), dtype=np.float32)
    orig_rot_float = (arr['rot'].astype(np.float32) - 128) / 128.0
    
    # scipy Rotation expects [x, y, z, w]
    quats_xyzw[:, 0] = orig_rot_float[:, 1]
    quats_xyzw[:, 1] = orig_rot_float[:, 2]
    quats_xyzw[:, 2] = orig_rot_float[:, 3]
    quats_xyzw[:, 3] = orig_rot_float[:, 0]

    orig_R = Rotation.from_quat(quats_xyzw)
    # Apply global rotation: new_R = global_R * orig_R
    new_R = R * orig_R
    new_quats_xyzw = new_R.as_quat()

    # Convert back to [w, x, y, z]
    new_rot_float = np.empty((len(arr), 4), dtype=np.float32)
    new_rot_float[:, 0] = new_quats_xyzw[:, 3]
    new_rot_float[:, 1] = new_quats_xyzw[:, 0]
    new_rot_float[:, 2] = new_quats_xyzw[:, 1]
    new_rot_float[:, 3] = new_quats_xyzw[:, 2]

    # Back to uint8 range 0-255
    new_rot_uint8 = np.clip(new_rot_float * 128 + 128, 0, 255).astype(np.uint8)
    arr['rot'] = new_rot_uint8

    # Apply translation
    arr['pos'] += np.array(translate, dtype=np.float32)

    with open(output_path, 'wb') as f:
        f.write(arr.tobytes())

    print(f"Transformed splat saved to {output_path}")

def process_target(target_path, translate, rotate_euler, scale):
    if os.path.isdir(target_path):
        splat_files = glob.glob(os.path.join(target_path, "*.splat"))
        if not splat_files:
            print(f"No .splat files found in directory {target_path}")
            return
        for f in splat_files:
            transform_splat(f, f, translate, rotate_euler, scale)
    elif os.path.isfile(target_path):
        if target_path.endswith('.splat'):
            transform_splat(target_path, target_path, translate, rotate_euler, scale)
        else:
            print("Target is not a .splat file")
    else:
        print("Target path does not exist")

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description="Transform (Translate, Rotate, Scale) .splat files in-place.")
    parser.add_argument('target', help='Input .splat file or directory containing .splat files')
    parser.add_argument('--translate', nargs=3, type=float, default=[0,0,0], help='Translate X Y Z (e.g. --translate 1.5 0 -2.0)')
    parser.add_argument('--rotate', nargs=3, type=float, default=[0,0,0], help='Rotate X Y Z in degrees (e.g. --rotate 90 0 0)')
    parser.add_argument('--scale', type=float, default=1.0, help='Scale multiplier')
    args = parser.parse_args()

    process_target(args.target, args.translate, args.rotate, args.scale)
