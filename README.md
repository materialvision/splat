# WebGL Gaussian Splat Viewer (Enhanced Edition)

This is an advanced, feature-rich WebGL implementation of a real-time renderer for [3D Gaussian Splatting for Real-Time Radiance Field Rendering](https://repo-sam.inria.fr/fungraph/3d-gaussian-splatting/). It extends the original viewer with a modern UI, physics-based sequence crossfading, batch processing scripts, video recording, and much more.

## New Features

* **Physics-Based Crossfading System:** Seamlessly transition between models in a sequence using advanced fading effects like "Random Points" and "Center Outwards". Features play/pause, bidirectional movement, adjustable speed controls, and smooth easing-based acceleration/deceleration.
* **Splat Sequences & Folder Loading:** Automatically load a folder of sequentially numbered `.splat` files and cycle through them with simple hotkeys or an interactive folder menu.
* **Collapsible Overlay Menus:** A modernized UI featuring collapsible overlays for "Controls," "Splat Folders," and "Crossfade Sequence" settings.
* **Batch Conversion Utility:** Includes a robust Python script (`batch_convert.py`) that automates the conversion of your `.ply` training iteration folders into sequentially numbered `.splat` files ready for sequenced loading.
* **In-Viewer Video Recording:** Effortlessly record your 3D view and animations directly from the browser (using the `r` key).
* **Splat Scaling:** Dynamically adjust the scale/size of splats on the fly (using `n`/`m`).

## How to Prepare Splats

If you have trained a Gaussian Splat model and have a collection of PLY files (usually nested in `iteration_X` folders), you can use the included `batch_convert.py` script or the browser based converter (`browser_converter.html`) to automatically organize and convert them.

### Prerequisites

Ensure you have the required python dependencies:
```bash
pip install plyfile numpy
```

### Batch Converting

Run the batch conversion script, pointing it to your base training directory (which contains the iteration folders) and specifying an output directory.

```bash
python batch_convert.py /path/to/training/output /path/to/splats_out
```

The script will:
1. Recursively search for `.ply` files inside `iteration_X` folders.
2. Sort them chronologically by iteration number.
3. Convert them to the optimized `.splat` format.
4. Export them as sequentially numbered files (e.g., `model_00000.splat`, `model_00001.splat`) inside the `/path/to/splats_out` directory.

Once converted, you can drop this folder into the viewer to utilize the new crossfading and sequencing features!

### Web Browser Converter
Alternatively, you can also convert `.ply` files manually by starting the local server and navigating to:
`http://localhost:8000/browser_converter.html`

## Running the Viewer

Open the HTML file locally using a Python server:
```bash
python -m http.server 8000
```
Then navigate your browser to:
`http://localhost:8000/index.html`

## Controls

### General & UI
- **`c`** - Show/Hide Controls overlay
- **`r`** - Record Video
- **`v`** - Save current view coordinates to the URL
- **`p`** - Resume default animation

### Splat Management
- **`f`** - Select and load a folder of processed SPLAT/PLY files
- **`g`** / **`h`** - Load the previous / next splat in the sequence
- **`Tab`** - Transform Model
- **`Opt` + `Number`** - Switch Directory
- **`n`** / **`m`** - Decrease / Increase splat size

### Movement
- **`←` / `→`** - Strafe side to side
- **`↑` / `↓`** - Move forward/back
- **`Space`** - Jump

### Camera (WASD)
- **`A` / `D`** - Turn camera left/right
- **`W` / `S`** - Tilt camera up/down
- **`Q` / `E`** - Roll camera counterclockwise/clockwise
- **`I` / `K`** and **`J` / `L`** - Orbit

### Mouse / Trackpad / Touch
- **Click and drag** - Orbit
- **Right-click / Ctrl+Click and drag** - Pan and zoom
- **Scroll** - Orbit and move forward/back
- **Touch gestures** - One finger orbit, two finger pinch-to-zoom, rotate, and pan.

## Acknowledgements

This is a fork of the excellent original WebGL implementation by antimatter15. Thanks to the original creator and contributors!
