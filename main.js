let needUpdate = false; // Flag to check if an immediate update is needed
let globalScaleFactor = 1.0; // The scale factor you want to send
let vertexLimit = 13000000; //prev limit 130000
let downsampleLimit = 1000000; //prev limit 500000
// Define the folder paths
const splatFolders = [
	'./splats/tue/',
	'./splats/an_ethereal_projection_of_eggshell_barriers_transcendent_clarity_divine_ink_black_backdrop_butter_smooth/',
	'./splats/xilitla/',
	'./splats/casa_lysekrone2/',
	'./splats/jungleruinwalk2/',
	'./splats/city3/',
	'./splats/palm/',
	'./splats/circ2/',
	'./splats/1/',
];
let cameras = [
	{
		id: 0,
		img_name: "00001",
		width: 1959,
		height: 1090,
		position: [
			-3.0089893469241797, -0.11086489695181866, -3.7527640949141428,
		],
		rotation: [
			[0.876134201218856, 0.06925962026449776, 0.47706599800804744],
			[-0.04747421839895102, 0.9972110940209488, -0.057586739349882114],
			[-0.4797239414934443, 0.027805376500959853, 0.8769787916452908],
		],
		fy: 1164.6601287484507,
		fx: 1159.5880733038064,
	},
	{
		id: 1,
		img_name: "00009",
		width: 1959,
		height: 1090,
		position: [
			-2.5199776022057296, -0.09704735754873686, -3.6247725540304545,
		],
		rotation: [
			[0.9982731285632193, -0.011928707708098955, -0.05751927260507243],
			[0.0065061360949636325, 0.9955928229282383, -0.09355533724430458],
			[0.058381769258182864, 0.09301955098900708, 0.9939511719154457],
		],
		fy: 1164.6601287484507,
		fx: 1159.5880733038064,
	},
	{
		id: 2,
		img_name: "00017",
		width: 1959,
		height: 1090,
		position: [
			-0.7737533667465242, -0.3364271945329695, -2.9358969417573753,
		],
		rotation: [
			[0.9998813418672372, 0.013742375651625236, -0.0069605529394208224],
			[-0.014268370388586709, 0.996512943252834, -0.08220929105659476],
			[0.00580653013657589, 0.08229885200307129, 0.9965907801935302],
		],
		fy: 1164.6601287484507,
		fx: 1159.5880733038064,
	},
	{
		id: 3,
		img_name: "00025",
		width: 1959,
		height: 1090,
		position: [
			1.2198221749590001, -0.2196687861401182, -2.3183162007028453,
		],
		rotation: [
			[0.9208648867765482, 0.0012010625395201253, 0.389880004297208],
			[-0.06298204172269357, 0.987319521752825, 0.14571693239364383],
			[-0.3847611242348369, -0.1587410451475895, 0.9092635249821667],
		],
		fy: 1164.6601287484507,
		fx: 1159.5880733038064,
	},
	{
		id: 4,
		img_name: "00033",
		width: 1959,
		height: 1090,
		position: [
			1.742387858893817, -0.13848225198886954, -2.0566370113193146,
		],
		rotation: [
			[0.24669889292141334, -0.08370189346592856, -0.9654706879349405],
			[0.11343747891376445, 0.9919082664242816, -0.05700815184573074],
			[0.9624300466054861, -0.09545671285663988, 0.2541976029815521],
		],
		fy: 1164.6601287484507,
		fx: 1159.5880733038064,
	},
	{
		id: 5,
		img_name: "00041",
		width: 1959,
		height: 1090,
		position: [
			3.6567309419223935, -0.16470990600750707, -1.3458085590422042,
		],
		rotation: [
			[0.2341293058324528, -0.02968330457755884, -0.9717522161434825],
			[0.10270823606832301, 0.99469554638321, -0.005638106875665722],
			[0.9667649592295676, -0.09848690996657204, 0.2359360976431732],
		],
		fy: 1164.6601287484507,
		fx: 1159.5880733038064,
	},
	{
		id: 6,
		img_name: "00049",
		width: 1959,
		height: 1090,
		position: [
			3.9013554243203497, -0.2597500978038105, -0.8106154188297828,
		],
		rotation: [
			[0.6717235545638952, -0.015718162115524837, -0.7406351366386528],
			[0.055627354673906296, 0.9980224478387622, 0.029270992841185218],
			[0.7387104058127439, -0.060861588786650656, 0.6712695459756353],
		],
		fy: 1164.6601287484507,
		fx: 1159.5880733038064,
	},
	{
		id: 7,
		img_name: "00057",
		width: 1959,
		height: 1090,
		position: [4.742994605467533, -0.05591660945412069, 0.9500365976084458],
		rotation: [
			[-0.17042655709210375, 0.01207080756938, -0.9852964448542146],
			[0.1165090336695526, 0.9931575292530063, -0.00798543433078162],
			[0.9784581921120181, -0.1161568667478904, -0.1706667764862097],
		],
		fy: 1164.6601287484507,
		fx: 1159.5880733038064,
	},
	{
		id: 8,
		img_name: "00065",
		width: 1959,
		height: 1090,
		position: [4.34676307626522, 0.08168160516967145, 1.0876221470355405],
		rotation: [
			[-0.003575447631888379, -0.044792503246552894, -0.9989899137764799],
			[0.10770152645126597, 0.9931680875192705, -0.04491693593046672],
			[0.9941768441149182, -0.10775333677534978, 0.0012732004866391048],
		],
		fy: 1164.6601287484507,
		fx: 1159.5880733038064,
	},
	{
		id: 9,
		img_name: "00073",
		width: 1959,
		height: 1090,
		position: [3.264984351114202, 0.078974937336732, 1.0117200284114904],
		rotation: [
			[-0.026919994628162257, -0.1565891128261527, -0.9872968974090509],
			[0.08444552208239385, 0.983768234577625, -0.1583319754069128],
			[0.9960643893290491, -0.0876350978794554, -0.013259786205163005],
		],
		fy: 1164.6601287484507,
		fx: 1159.5880733038064,
	},
];

const camera = cameras[0];

function getProjectionMatrix(fx, fy, width, height) {
	const znear = 0.2;
	const zfar = 200;
	return [
		[(2 * fx) / width, 0, 0, 0],
		[0, -(2 * fy) / height, 0, 0],
		[0, 0, zfar / (zfar - znear), 1],
		[0, 0, -(zfar * znear) / (zfar - znear), 0],
	].flat();
}

function getViewMatrix(camera) {
	const R = camera.rotation.flat();
	const t = camera.position;
	const camToWorld = [
		[R[0], R[1], R[2], 0],
		[R[3], R[4], R[5], 0],
		[R[6], R[7], R[8], 0],
		[
			-t[0] * R[0] - t[1] * R[3] - t[2] * R[6],
			-t[0] * R[1] - t[1] * R[4] - t[2] * R[7],
			-t[0] * R[2] - t[1] * R[5] - t[2] * R[8],
			1,
		],
	].flat();
	return camToWorld;
}

function multiply4(a, b) {
	return [
		b[0] * a[0] + b[1] * a[4] + b[2] * a[8] + b[3] * a[12],
		b[0] * a[1] + b[1] * a[5] + b[2] * a[9] + b[3] * a[13],
		b[0] * a[2] + b[1] * a[6] + b[2] * a[10] + b[3] * a[14],
		b[0] * a[3] + b[1] * a[7] + b[2] * a[11] + b[3] * a[15],
		b[4] * a[0] + b[5] * a[4] + b[6] * a[8] + b[7] * a[12],
		b[4] * a[1] + b[5] * a[5] + b[6] * a[9] + b[7] * a[13],
		b[4] * a[2] + b[5] * a[6] + b[6] * a[10] + b[7] * a[14],
		b[4] * a[3] + b[5] * a[7] + b[6] * a[11] + b[7] * a[15],
		b[8] * a[0] + b[9] * a[4] + b[10] * a[8] + b[11] * a[12],
		b[8] * a[1] + b[9] * a[5] + b[10] * a[9] + b[11] * a[13],
		b[8] * a[2] + b[9] * a[6] + b[10] * a[10] + b[11] * a[14],
		b[8] * a[3] + b[9] * a[7] + b[10] * a[11] + b[11] * a[15],
		b[12] * a[0] + b[13] * a[4] + b[14] * a[8] + b[15] * a[12],
		b[12] * a[1] + b[13] * a[5] + b[14] * a[9] + b[15] * a[13],
		b[12] * a[2] + b[13] * a[6] + b[14] * a[10] + b[15] * a[14],
		b[12] * a[3] + b[13] * a[7] + b[14] * a[11] + b[15] * a[15],
	];
}

function invert4(a) {
	let b00 = a[0] * a[5] - a[1] * a[4];
	let b01 = a[0] * a[6] - a[2] * a[4];
	let b02 = a[0] * a[7] - a[3] * a[4];
	let b03 = a[1] * a[6] - a[2] * a[5];
	let b04 = a[1] * a[7] - a[3] * a[5];
	let b05 = a[2] * a[7] - a[3] * a[6];
	let b06 = a[8] * a[13] - a[9] * a[12];
	let b07 = a[8] * a[14] - a[10] * a[12];
	let b08 = a[8] * a[15] - a[11] * a[12];
	let b09 = a[9] * a[14] - a[10] * a[13];
	let b10 = a[9] * a[15] - a[11] * a[13];
	let b11 = a[10] * a[15] - a[11] * a[14];
	let det =
		b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
	if (!det) return null;
	return [
		(a[5] * b11 - a[6] * b10 + a[7] * b09) / det,
		(a[2] * b10 - a[1] * b11 - a[3] * b09) / det,
		(a[13] * b05 - a[14] * b04 + a[15] * b03) / det,
		(a[10] * b04 - a[9] * b05 - a[11] * b03) / det,
		(a[6] * b08 - a[4] * b11 - a[7] * b07) / det,
		(a[0] * b11 - a[2] * b08 + a[3] * b07) / det,
		(a[14] * b02 - a[12] * b05 - a[15] * b01) / det,
		(a[8] * b05 - a[10] * b02 + a[11] * b01) / det,
		(a[4] * b10 - a[5] * b08 + a[7] * b06) / det,
		(a[1] * b08 - a[0] * b10 - a[3] * b06) / det,
		(a[12] * b04 - a[13] * b02 + a[15] * b00) / det,
		(a[9] * b02 - a[8] * b04 - a[11] * b00) / det,
		(a[5] * b07 - a[4] * b09 - a[6] * b06) / det,
		(a[0] * b09 - a[1] * b07 + a[2] * b06) / det,
		(a[13] * b01 - a[12] * b03 - a[14] * b00) / det,
		(a[8] * b03 - a[9] * b01 + a[10] * b00) / det,
	];
}

function rotate4(a, rad, x, y, z) {
	let len = Math.hypot(x, y, z);
	x /= len;
	y /= len;
	z /= len;
	let s = Math.sin(rad);
	let c = Math.cos(rad);
	let t = 1 - c;
	let b00 = x * x * t + c;
	let b01 = y * x * t + z * s;
	let b02 = z * x * t - y * s;
	let b10 = x * y * t - z * s;
	let b11 = y * y * t + c;
	let b12 = z * y * t + x * s;
	let b20 = x * z * t + y * s;
	let b21 = y * z * t - x * s;
	let b22 = z * z * t + c;
	return [
		a[0] * b00 + a[4] * b01 + a[8] * b02,
		a[1] * b00 + a[5] * b01 + a[9] * b02,
		a[2] * b00 + a[6] * b01 + a[10] * b02,
		a[3] * b00 + a[7] * b01 + a[11] * b02,
		a[0] * b10 + a[4] * b11 + a[8] * b12,
		a[1] * b10 + a[5] * b11 + a[9] * b12,
		a[2] * b10 + a[6] * b11 + a[10] * b12,
		a[3] * b10 + a[7] * b11 + a[11] * b12,
		a[0] * b20 + a[4] * b21 + a[8] * b22,
		a[1] * b20 + a[5] * b21 + a[9] * b22,
		a[2] * b20 + a[6] * b21 + a[10] * b22,
		a[3] * b20 + a[7] * b21 + a[11] * b22,
		...a.slice(12, 16),
	];
}

function translate4(a, x, y, z) {
	return [
		...a.slice(0, 12),
		a[0] * x + a[4] * y + a[8] * z + a[12],
		a[1] * x + a[5] * y + a[9] * z + a[13],
		a[2] * x + a[6] * y + a[10] * z + a[14],
		a[3] * x + a[7] * y + a[11] * z + a[15],
	];
}

function createWorker(self) {
	let buffer;
	let vertexCount = 0;
	let vertexCountA = 0;
	let fadeAmount = 0;
	let fadeMode = 0;
	let viewProj;
	let globalScaleFactor = 1;
	let randomOffsetX = 0;
	let randomOffsetY = 0;
	let randomOffsetZ = 0;
	const randomScale = 0.01; // Adjust this scale as needed
	// 6*4 + 4 + 4 = 8*4
	// XYZ - Position (Float32)
	// XYZ - Scale (Float32)
	// RGBA - colors (uint8)
	// IJKL - quaternion/rot (uint8)
	const rowLength = 3 * 4 + 3 * 4 + 4 + 4;
	let lastProj = [];
	let depthIndex = new Uint32Array();

	const runSort = (viewProj) => {
		if (!buffer) return;
		const f_buffer = new Float32Array(buffer);
		const u_buffer = new Uint8Array(buffer);

		const covA = new Float32Array(3 * vertexCount);
		const covB = new Float32Array(3 * vertexCount);

		const center = new Float32Array(3 * vertexCount);
		const color = new Float32Array(4 * vertexCount);

		//test to see if needs update or just leave it. 
		/*
		if (depthIndex.length == vertexCount) {
			let dot =
				lastProj[2] * viewProj[2] +
				lastProj[6] * viewProj[6] +
				lastProj[10] * viewProj[10];	
			if (Math.abs(dot - 1) < 0.01) {
				return; //removed this to trigger update on load
			}
		}
		*/

		let maxDepth = -Infinity;
		let minDepth = Infinity;
		let sizeList = new Int32Array(vertexCount);
		for (let i = 0; i < vertexCount; i++) {
			let depth =
				((viewProj[2] * f_buffer[8 * i + 0] +
					viewProj[6] * f_buffer[8 * i + 1] +
					viewProj[10] * f_buffer[8 * i + 2]) *
					4096) |
				0;
			sizeList[i] = depth;
			if (depth > maxDepth) maxDepth = depth;
			if (depth < minDepth) minDepth = depth;
		}
		// console.time("sort");

		// This is a 16 bit single-pass counting sort
		let depthInv = (256 * 256) / (maxDepth - minDepth);
		let counts0 = new Uint32Array(256 * 256);
		for (let i = 0; i < vertexCount; i++) {
			sizeList[i] = ((sizeList[i] - minDepth) * depthInv) | 0;
			counts0[sizeList[i]]++;
		}
		let starts0 = new Uint32Array(256 * 256);
		for (let i = 1; i < 256 * 256; i++) starts0[i] = starts0[i - 1] + counts0[i - 1];
		depthIndex = new Uint32Array(vertexCount);
		for (let i = 0; i < vertexCount; i++) depthIndex[starts0[sizeList[i]]++] = i;


		lastProj = viewProj;
		// console.timeEnd("sort");
		let moduloValue;

		if (vertexCount > 800000) {
			moduloValue = 4; // Use modulo 4 when vertexCount is over 800,000
		} else if (vertexCount > 600000) {
			moduloValue = 3; // Use modulo 3 when vertexCount is over 600,000
		} else if (vertexCount > 400000) {
			moduloValue = 2; // Use modulo 2 when vertexCount is over 400,000
		} else {
			moduloValue = 1; // No skipping when vertexCount is 400,000 or below
		}

		for (let j = 0; j < vertexCount; j++) {
			if (j % moduloValue === 0) {
				const i = depthIndex[j];

				// Apply noise for variable center shake
				//noiseOffsetX += 0.1;
				//noiseOffsetY += 0.1;
				//noiseOffsetZ += 0.1;

				// Generate a random offset for each dimension

				//randomOffsetX = getNoise(noiseOffsetX)*0.006;
				//randomOffsetY = getNoise(noiseOffsetY)*0.006;
				//randomOffsetZ = getNoise(noiseOffsetZ)*0.006;
				if (vertexCount < 400000) {
					randomOffsetX = (Math.random() - 0.5) * randomScale;
					randomOffsetY = (Math.random() - 0.5) * randomScale;
					randomOffsetZ = (Math.random() - 0.5) * randomScale;
				}

				center[3 * j + 0] = f_buffer[8 * i + 0] + randomOffsetX;
				center[3 * j + 1] = f_buffer[8 * i + 1] + randomOffsetY;
				center[3 * j + 2] = f_buffer[8 * i + 2] + randomOffsetZ;

				color[4 * j + 0] = u_buffer[32 * i + 24 + 0] / 255;
				color[4 * j + 1] = u_buffer[32 * i + 24 + 1] / 255;
				color[4 * j + 2] = u_buffer[32 * i + 24 + 2] / 255;

				let alpha = u_buffer[32 * i + 24 + 3] / 255;
				if (fadeMode > 0) {
					let isA = (i < vertexCountA);
					if (fadeMode == 1) {
						// Random fade
						let hash = Math.abs(Math.sin(i * 12.9898 + 78.233) * 43758.5453) % 1.0;
						if (isA && hash < fadeAmount) alpha = 0;
						if (!isA && hash >= fadeAmount) alpha = 0;
					} else if (fadeMode == 2) {
						// Center outwards
						let dist = Math.hypot(f_buffer[8 * i + 0], f_buffer[8 * i + 1], f_buffer[8 * i + 2]);
						let radius = fadeAmount * 8.0; 
						if (isA && dist < radius) alpha = 0;
						if (!isA && dist >= radius) alpha = 0;
					}
				}
				color[4 * j + 3] = alpha;

				let scale = [
					f_buffer[8 * i + 3 + 0] * globalScaleFactor,
					f_buffer[8 * i + 3 + 1] * globalScaleFactor,
					f_buffer[8 * i + 3 + 2] * globalScaleFactor,
				];
				let rot = [
					(u_buffer[32 * i + 28 + 0] - 128) / 128,
					(u_buffer[32 * i + 28 + 1] - 128) / 128,
					(u_buffer[32 * i + 28 + 2] - 128) / 128,
					(u_buffer[32 * i + 28 + 3] - 128) / 128,
				];

				const R = [
					1.0 - 2.0 * (rot[2] * rot[2] + rot[3] * rot[3]),
					2.0 * (rot[1] * rot[2] + rot[0] * rot[3]),
					2.0 * (rot[1] * rot[3] - rot[0] * rot[2]),

					2.0 * (rot[1] * rot[2] - rot[0] * rot[3]),
					1.0 - 2.0 * (rot[1] * rot[1] + rot[3] * rot[3]),
					2.0 * (rot[2] * rot[3] + rot[0] * rot[1]),

					2.0 * (rot[1] * rot[3] + rot[0] * rot[2]),
					2.0 * (rot[2] * rot[3] - rot[0] * rot[1]),
					1.0 - 2.0 * (rot[1] * rot[1] + rot[2] * rot[2]),
				];

				// Compute the matrix product of S and R (M = S * R)
				const M = [
					scale[0] * R[0],
					scale[0] * R[1],
					scale[0] * R[2],
					scale[1] * R[3],
					scale[1] * R[4],
					scale[1] * R[5],
					scale[2] * R[6],
					scale[2] * R[7],
					scale[2] * R[8],
				];

				covA[3 * j + 0] = M[0] * M[0] + M[3] * M[3] + M[6] * M[6];
				covA[3 * j + 1] = M[0] * M[1] + M[3] * M[4] + M[6] * M[7];
				covA[3 * j + 2] = M[0] * M[2] + M[3] * M[5] + M[6] * M[8];
				covB[3 * j + 0] = M[1] * M[1] + M[4] * M[4] + M[7] * M[7];
				covB[3 * j + 1] = M[1] * M[2] + M[4] * M[5] + M[7] * M[8];
				covB[3 * j + 2] = M[2] * M[2] + M[5] * M[5] + M[8] * M[8];
			}
		}
		self.postMessage({ covA, center, color, covB, viewProj }, [
			covA.buffer,
			center.buffer,
			color.buffer,
			covB.buffer,
		]);
		//console.log("selfpostmessage");

		self.addEventListener("message", function (event) {
			if (event.data.type === "setGlobalScaleFactor") {
				globalScaleFactor = event.data.value;
				// Now globalScaleFactor in the worker is set to the value received from the main thread
			}
		});
		// console.timeEnd("sort");
	};

	// processPlyBuffer extracted entirely to separate standalone script

	const throttledSort = () => {
		if (!sortRunning) {
			sortRunning = true;
			let lastView = viewProj;
			runSort(lastView);
			setTimeout(() => {
				sortRunning = false;
				if (lastView !== viewProj) {
					throttledSort();
				}
			}, 0);
		}
	};

	let sortRunning;
	self.onmessage = (e) => {
		if (e.data.buffer) {
			buffer = e.data.buffer;
			vertexCount = e.data.vertexCount;
			vertexCountA = e.data.vertexCountA || vertexCount;
			fadeAmount = e.data.fadeAmount || 0;
			fadeMode = e.data.fadeMode || 0;
		} else if (e.data.fadeAmount !== undefined) {
			fadeAmount = e.data.fadeAmount;
			fadeMode = e.data.fadeMode !== undefined ? e.data.fadeMode : fadeMode;
			if (viewProj) throttledSort();
		} else if (e.data.vertexCount) {
			vertexCount = e.data.vertexCount;
		} else if (e.data.view) {
			viewProj = e.data.view;
			throttledSort();
		}
	};
}

const vertexShaderSource = `
  precision mediump float;
  attribute vec2 position;

  attribute vec4 color;
  attribute vec3 center;
  attribute vec3 covA;
  attribute vec3 covB;

  uniform mat4 projection, view, model;
  uniform vec2 focal;
  uniform vec2 viewport;

  varying vec4 vColor;
  varying vec2 vPosition;

  mat3 transpose(mat3 m) {
    return mat3(
        m[0][0], m[1][0], m[2][0],
        m[0][1], m[1][1], m[2][1],
        m[0][2], m[1][2], m[2][2]
    );
  }

  void main () {
    vec4 worldspace = model * vec4(center, 1.0);
    vec4 camspace = view * worldspace;
    vec4 pos2d = projection * camspace;

    float bounds = 1.2 * pos2d.w;
    if (pos2d.z < -pos2d.w || pos2d.x < -bounds || pos2d.x > bounds
		 || pos2d.y < -bounds || pos2d.y > bounds) {
        gl_Position = vec4(0.0, 0.0, 2.0, 1.0);
        return;
    }

    mat3 Vrk = mat3(
        covA.x, covA.y, covA.z, 
        covA.y, covB.x, covB.y,
        covA.z, covB.y, covB.z
    );
	
    mat3 J = mat3(
        focal.x / camspace.z, 0., -(focal.x * camspace.x) / (camspace.z * camspace.z), 
        0., -focal.y / camspace.z, (focal.y * camspace.y) / (camspace.z * camspace.z), 
        0., 0., 0.
    );

    mat3 W = transpose(mat3(view * model));
    mat3 T = W * J;
    mat3 cov = transpose(T) * Vrk * T;
    
    vec2 vCenter = vec2(pos2d) / pos2d.w;

    float diagonal1 = cov[0][0] + 0.3;
    float offDiagonal = cov[0][1];
    float diagonal2 = cov[1][1] + 0.3;

	float mid = 0.5 * (diagonal1 + diagonal2);
	float radius = length(vec2((diagonal1 - diagonal2) / 2.0, offDiagonal));
	float lambda1 = mid + radius;
	float lambda2 = max(mid - radius, 0.1);
	vec2 diagonalVector = normalize(vec2(offDiagonal, lambda1 - diagonal1));
	vec2 v1 = min(sqrt(2.0 * lambda1), 1024.0) * diagonalVector;
	vec2 v2 = min(sqrt(2.0 * lambda2), 1024.0) * vec2(diagonalVector.y, -diagonalVector.x);


    vColor = color;
    vPosition = position;

    gl_Position = vec4(
        vCenter 
            + position.x * v1 / viewport * 2.0 
            + position.y * v2 / viewport * 2.0, 0.0, 1.0);

  }
`;

const fragmentShaderSource = `
precision mediump float;

  varying vec4 vColor;
  varying vec2 vPosition;

  void main () {    
	  float A = -dot(vPosition, vPosition);
    if (A < -4.0) discard;
    float B = exp(A) * vColor.a;
    gl_FragColor = vec4(B * vColor.rgb, B);
  }
`;

/*let defaultViewMatrix = [
	0.47, 0.04, 0.88, 0, -0.11, 0.99, 0.02, 0, -0.88, -0.11, 0.47, 0, 0.07,
	0.03, 6.55, 1,
];*/
let defaultViewMatrix = [
	1, 0, 0, 0,
	0, 1, 0, 0,
	0, 0, 1, 0,
	0, 0, 0, 1
];

let viewMatrix = defaultViewMatrix;
let activeModelMatrix = [
	1, 0, 0, 0,
	0, 1, 0, 0,
	0, 0, 1, 0,
	0, 0, 0, 1
];

let activeDownsample = null
async function main() {
	let carousel = false;

	const params = new URLSearchParams(location.search);
	try {
		viewMatrix = JSON.parse(decodeURIComponent(location.hash.slice(1)));
		carousel = false;
	} catch (err) { }
	/*const url = new URL(
		// "nike.splat",
		// location.href,
		params.get("url") || "train.splat",
		"https://huggingface.co/cakewalk/splat-data/resolve/main/",
	);*/
	// Assuming 'train.splat' is the file you want to fetch from your local server
	const localFilePath = 'http://localhost:8000/splats/1/model_00000.splat'; // URL to local file


	// Use the local file path or a URL parameter (if provided)
	const url = new URL(params.get("url") || localFilePath);

	const req = await fetch(url, {
		mode: "cors", // no-cors, *cors, same-origin
		credentials: "omit", // include, *same-origin, omit
	});
	console.log(req);
	if (req.status != 200)
		throw new Error(req.status + " Unable to load " + req.url);


	const rowLength = 3 * 4 + 3 * 4 + 4 + 4;
	const reader = req.body.getReader();
	let splatData = new Uint8Array(req.headers.get("content-length"));

	const downsample =
		splatData.length / rowLength > downsampleLimit ? 1 : 1 / devicePixelRatio;
	// const downsample = 1 / devicePixelRatio;
	// const downsample = 1;
	console.log(splatData.length / rowLength, downsample);

	const worker = new Worker(
		URL.createObjectURL(
			new Blob(["(", createWorker.toString(), ")(self)"], {
				type: "application/javascript",
			}),
		),
	);

	const canvas = document.getElementById("canvas");
	canvas.width = innerWidth / downsample;
	canvas.height = innerHeight / downsample;

	const fps = document.getElementById("fps");

	let projectionMatrix = getProjectionMatrix(
		camera.fx / downsample,
		camera.fy / downsample,
		canvas.width,
		canvas.height,
	);

	const gl = canvas.getContext("webgl");
	const ext = gl.getExtension("ANGLE_instanced_arrays");

	const vertexShader = gl.createShader(gl.VERTEX_SHADER);
	gl.shaderSource(vertexShader, vertexShaderSource);
	gl.compileShader(vertexShader);
	if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS))
		console.error(gl.getShaderInfoLog(vertexShader));

	const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
	gl.shaderSource(fragmentShader, fragmentShaderSource);
	gl.compileShader(fragmentShader);
	if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS))
		console.error(gl.getShaderInfoLog(fragmentShader));

	const program = gl.createProgram();
	gl.attachShader(program, vertexShader);
	gl.attachShader(program, fragmentShader);
	gl.linkProgram(program);
	gl.useProgram(program);

	if (!gl.getProgramParameter(program, gl.LINK_STATUS))
		console.error(gl.getProgramInfoLog(program));

	gl.disable(gl.DEPTH_TEST); // Disable depth testing

	// Enable blending
	gl.enable(gl.BLEND);

	// Set blending function
	gl.blendFuncSeparate(
		gl.ONE_MINUS_DST_ALPHA,
		gl.ONE,
		gl.ONE_MINUS_DST_ALPHA,
		gl.ONE,
	);

	// Set blending equation
	gl.blendEquationSeparate(gl.FUNC_ADD, gl.FUNC_ADD);

	// projection
	const u_projection = gl.getUniformLocation(program, "projection");
	gl.uniformMatrix4fv(u_projection, false, projectionMatrix);

	// viewport
	const u_viewport = gl.getUniformLocation(program, "viewport");
	gl.uniform2fv(u_viewport, new Float32Array([canvas.width, canvas.height]));

	// focal
	const u_focal = gl.getUniformLocation(program, "focal");
	gl.uniform2fv(
		u_focal,
		new Float32Array([camera.fx / downsample, camera.fy / downsample]),
	);

	// view
	const u_view = gl.getUniformLocation(program, "view");
	gl.uniformMatrix4fv(u_view, false, viewMatrix);

	// model
	const u_model = gl.getUniformLocation(program, "model");
	gl.uniformMatrix4fv(u_model, false, activeModelMatrix);

	// positions
	const triangleVertices = new Float32Array([-2, -2, 2, -2, 2, 2, -2, 2]);
	const vertexBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, triangleVertices, gl.STATIC_DRAW);
	const a_position = gl.getAttribLocation(program, "position");
	gl.enableVertexAttribArray(a_position);
	gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
	gl.vertexAttribPointer(a_position, 2, gl.FLOAT, false, 0, 0);

	// center
	const centerBuffer = gl.createBuffer();
	// gl.bindBuffer(gl.ARRAY_BUFFER, centerBuffer);
	// gl.bufferData(gl.ARRAY_BUFFER, center, gl.STATIC_DRAW);
	const a_center = gl.getAttribLocation(program, "center");
	gl.enableVertexAttribArray(a_center);
	gl.bindBuffer(gl.ARRAY_BUFFER, centerBuffer);
	gl.vertexAttribPointer(a_center, 3, gl.FLOAT, false, 0, 0);
	ext.vertexAttribDivisorANGLE(a_center, 1); // Use the extension here

	// color
	const colorBuffer = gl.createBuffer();
	// gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
	// gl.bufferData(gl.ARRAY_BUFFER, color, gl.STATIC_DRAW);
	const a_color = gl.getAttribLocation(program, "color");
	gl.enableVertexAttribArray(a_color);
	gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
	gl.vertexAttribPointer(a_color, 4, gl.FLOAT, false, 0, 0);
	ext.vertexAttribDivisorANGLE(a_color, 1); // Use the extension here

	// cov
	const covABuffer = gl.createBuffer();
	const a_covA = gl.getAttribLocation(program, "covA");
	gl.enableVertexAttribArray(a_covA);
	gl.bindBuffer(gl.ARRAY_BUFFER, covABuffer);
	gl.vertexAttribPointer(a_covA, 3, gl.FLOAT, false, 0, 0);
	ext.vertexAttribDivisorANGLE(a_covA, 1); // Use the extension here

	const covBBuffer = gl.createBuffer();
	const a_covB = gl.getAttribLocation(program, "covB");
	gl.enableVertexAttribArray(a_covB);
	gl.bindBuffer(gl.ARRAY_BUFFER, covBBuffer);
	gl.vertexAttribPointer(a_covB, 3, gl.FLOAT, false, 0, 0);
	ext.vertexAttribDivisorANGLE(a_covB, 1); // Use the extension here

	let lastProj = [];
	let lastData;

	worker.onmessage = (e) => {
		let { covA, covB, center, color, viewProj } = e.data;
		lastData = e.data;

		activeDownsample = downsample

		lastProj = viewProj;
		vertexCount = center.length / 3;

		gl.bindBuffer(gl.ARRAY_BUFFER, centerBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, center, gl.DYNAMIC_DRAW);

		gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, color, gl.DYNAMIC_DRAW);

		gl.bindBuffer(gl.ARRAY_BUFFER, covABuffer);
		gl.bufferData(gl.ARRAY_BUFFER, covA, gl.DYNAMIC_DRAW);

		gl.bindBuffer(gl.ARRAY_BUFFER, covBBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, covB, gl.DYNAMIC_DRAW);
		//console.log("update");
	};

	let activeKeys = [];

	window.addEventListener("keydown", (e) => {
		// if (document.activeElement != document.body) return;
		//carousel = false;
		if (!activeKeys.includes(e.key)) activeKeys.push(e.key);
		if (/\d/.test(e.key) && !(e.ctrlKey)) {
			if (e.key == "0") {
				defaultViewMatrix = [
					1, 0, 0, 0,
					0, 1, 0, 0,
					0, 0, 1, 0,
					0, 0, 0, 1
				];
				viewMatrix = defaultViewMatrix;
			} else if (e.key == "9") {
				defaultViewMatrix = [-0.97, 0, -0.22, 0, 0, 1, 0, 0, 0.22, 0, -0.97, 0, -0.43, -0.01, 15.28, 1];
				viewMatrix = defaultViewMatrix;
			}

			else {
				//carousel = false;
				viewMatrix = getViewMatrix(cameras[parseInt(e.key)]);
				defaultViewMatrix = viewMatrix;
			}
		}
		if (e.key == "v") {
			location.hash =
				"#" +
				JSON.stringify(
					viewMatrix.map((k) => Math.round(k * 100) / 100),
				);
		} else if (e.key === "p") {
			carousel = true;
		}
	});
	window.addEventListener("keyup", (e) => {
		activeKeys = activeKeys.filter((k) => k !== e.key);
	});
	window.addEventListener("blur", () => {
		activeKeys = [];
	});

	// Transform UI
	const uiContainer = document.createElement('div');
	uiContainer.style.position = 'fixed';
	uiContainer.style.top = '10px';
	uiContainer.style.right = '10px';
	uiContainer.style.background = 'rgba(0,0,0,0.8)';
	uiContainer.style.color = 'white';
	uiContainer.style.padding = '15px';
	uiContainer.style.borderRadius = '8px';
	uiContainer.style.zIndex = '1000';
	uiContainer.style.fontFamily = 'monospace';
	uiContainer.style.display = 'none';
	uiContainer.id = 'transform-ui';

	uiContainer.innerHTML = `
		<h3 style="margin-top:0">Model Transform</h3>
		<p style="font-size: 0.8em; margin-bottom: 10px; color: #ccc;">Press Tab to show/hide</p>
		<div><label style="display:inline-block; width: 30px;">Tx:</label> <input type="range" id="m-tx" min="-10" max="10" step="0.01" value="0"> <span id="val-tx" style="display:inline-block; width: 40px; text-align:right;">0</span></div>
		<div><label style="display:inline-block; width: 30px;">Ty:</label> <input type="range" id="m-ty" min="-10" max="10" step="0.01" value="0"> <span id="val-ty" style="display:inline-block; width: 40px; text-align:right;">0</span></div>
		<div><label style="display:inline-block; width: 30px;">Tz:</label> <input type="range" id="m-tz" min="-10" max="10" step="0.01" value="0"> <span id="val-tz" style="display:inline-block; width: 40px; text-align:right;">0</span></div>
		<div><label style="display:inline-block; width: 30px;">Rx:</label> <input type="range" id="m-rx" min="-180" max="180" step="1" value="0"> <span id="val-rx" style="display:inline-block; width: 40px; text-align:right;">0</span></div>
		<div><label style="display:inline-block; width: 30px;">Ry:</label> <input type="range" id="m-ry" min="-180" max="180" step="1" value="0"> <span id="val-ry" style="display:inline-block; width: 40px; text-align:right;">0</span></div>
		<div><label style="display:inline-block; width: 30px;">Rz:</label> <input type="range" id="m-rz" min="-180" max="180" step="1" value="0"> <span id="val-rz" style="display:inline-block; width: 40px; text-align:right;">0</span></div>
		<div style="margin-top: 15px;">
			<button id="reset-transform" style="background: #444; color: white; padding: 5px 10px; border: none; border-radius: 4px; cursor: pointer; width: 100%; margin-bottom: 10px;">Reset to Default</button>
			<strong>Export command:</strong><br/>
			<textarea id="export-cmd" readonly style="width: 100%; height: 60px; background: #222; color: #0f0; border: 1px solid #555; margin-top: 5px; resize: none;"></textarea>
		</div>
	`;
	document.body.appendChild(uiContainer);

	let modelTx = 0, modelTy = 0, modelTz = 0;
	let modelRx = 0, modelRy = 0, modelRz = 0;
	let directoryPath = './splats/1/';

	const updateModelMatrix = () => {
		let m = [1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1];
		m = translate4(m, modelTx, modelTy, modelTz);
		m = rotate4(m, modelRz * Math.PI / 180, 0, 0, 1);
		m = rotate4(m, modelRy * Math.PI / 180, 0, 1, 0);
		m = rotate4(m, modelRx * Math.PI / 180, 1, 0, 0);
		activeModelMatrix = m;
		
		const cmd = `python transform_splat.py "${directoryPath}" --translate ${modelTx} ${modelTy} ${modelTz} --rotate ${modelRx} ${modelRy} ${modelRz}`;
		document.getElementById('export-cmd').value = cmd;
		
		needUpdate = true;
	};
	updateModelMatrix();

	document.getElementById('reset-transform').addEventListener('click', () => {
		modelTx = 0; modelTy = 0; modelTz = 0;
		modelRx = 0; modelRy = 0; modelRz = 0;
		['m-tx', 'm-ty', 'm-tz', 'm-rx', 'm-ry', 'm-rz'].forEach(id => {
			document.getElementById(id).value = 0;
			document.getElementById(id.replace('m-', 'val-')).innerText = '0';
		});
		updateModelMatrix();
		
		// Reset camera
		viewMatrix = defaultViewMatrix;
		smTx = 0; smTy = 0; smTz = 0;
		smRy = 0; smRz = 0; smRx = 0;
		smOx = 0; smOy = 0;
	});

	const attachSlider = (id, varName) => {
		const el = document.getElementById(id);
		const valEl = document.getElementById(id.replace('m-', 'val-'));
		el.addEventListener('input', (e) => {
			const v = parseFloat(e.target.value);
			valEl.innerText = v;
			if (varName === 'tx') modelTx = v;
			if (varName === 'ty') modelTy = v;
			if (varName === 'tz') modelTz = v;
			if (varName === 'rx') modelRx = v;
			if (varName === 'ry') modelRy = v;
			if (varName === 'rz') modelRz = v;
			updateModelMatrix();
		});
	};
	attachSlider('m-tx', 'tx');
	attachSlider('m-ty', 'ty');
	attachSlider('m-tz', 'tz');
	attachSlider('m-rx', 'rx');
	attachSlider('m-ry', 'ry');
	attachSlider('m-rz', 'rz');

	window.addEventListener('keydown', (e) => {
		if (e.key === 'Tab') {
			e.preventDefault();
			uiContainer.style.display = uiContainer.style.display === 'none' ? 'block' : 'none';
		}
	});

	window.addEventListener(
		"wheel",
		(e) => {
			carousel = false;
			e.preventDefault();
			const lineHeight = 10;
			const scale =
				e.deltaMode == 1
					? lineHeight
					: e.deltaMode == 2
						? innerHeight
						: 1;
			let inv = invert4(viewMatrix);
			let speed = globalMovementSpeed;
			if (e.shiftKey) {
				inv = translate4(
					inv,
					(e.deltaX * scale * speed) / innerWidth,
					(e.deltaY * scale * speed) / innerHeight,
					0,
				);
			} else if (e.ctrlKey || e.metaKey) {
				// inv = rotate4(inv,  (e.deltaX * scale) / innerWidth,  0, 0, 1);
				// inv = translate4(inv,  0, (e.deltaY * scale) / innerHeight, 0);
				let preY = inv[13];
				inv = translate4(
					inv,
					0,
					0,
					(-10 * (e.deltaY * scale * speed)) / innerHeight,
				);
				inv[13] = preY;
			} else {
				let d = 4;
				inv = translate4(inv, 0, 0, d);
				inv = rotate4(inv, -(e.deltaX * scale * speed) / innerWidth, 0, 1, 0);
				inv = rotate4(inv, (e.deltaY * scale * speed) / innerHeight, 1, 0, 0);
				inv = translate4(inv, 0, 0, -d);
			}

			viewMatrix = invert4(inv);
		},
		{ passive: false },
	);

	let startX, startY, down;
	canvas.addEventListener("mousedown", (e) => {
		carousel = false;
		e.preventDefault();
		startX = e.clientX;
		startY = e.clientY;
		down = e.ctrlKey || e.metaKey ? 2 : 1;
	});
	canvas.addEventListener("contextmenu", (e) => {
		carousel = false;
		e.preventDefault();
		startX = e.clientX;
		startY = e.clientY;
		down = 2;
	});

	canvas.addEventListener("mousemove", (e) => {
		e.preventDefault();
		let speed = globalMovementSpeed;
		if (down == 1) {
			let inv = invert4(viewMatrix);
			let dx = (5 * (e.clientX - startX) * speed) / innerWidth;
			let dy = (5 * (e.clientY - startY) * speed) / innerHeight;
			let d = 4;

			inv = translate4(inv, 0, 0, d);
			inv = rotate4(inv, dx, 0, 1, 0);
			inv = rotate4(inv, -dy, 1, 0, 0);
			inv = translate4(inv, 0, 0, -d);
			// let postAngle = Math.atan2(inv[0], inv[10])
			// inv = rotate4(inv, postAngle - preAngle, 0, 0, 1)
			// console.log(postAngle)
			viewMatrix = invert4(inv);

			startX = e.clientX;
			startY = e.clientY;
		} else if (down == 2) {
			let inv = invert4(viewMatrix);
			// inv = rotateY(inv, );
			let preY = inv[13];
			inv = translate4(
				inv,
				(-10 * (e.clientX - startX) * speed) / innerWidth,
				0,
				(10 * (e.clientY - startY) * speed) / innerHeight,
			);
			inv[13] = preY;
			viewMatrix = invert4(inv);

			startX = e.clientX;
			startY = e.clientY;
		}
	});
	canvas.addEventListener("mouseup", (e) => {
		e.preventDefault();
		down = false;
		startX = 0;
		startY = 0;
	});

	let altX = 0,
		altY = 0;
	canvas.addEventListener(
		"touchstart",
		(e) => {
			e.preventDefault();
			if (e.touches.length === 1) {
				carousel = false;
				startX = e.touches[0].clientX;
				startY = e.touches[0].clientY;
				down = 1;
			} else if (e.touches.length === 2) {
				//console.log('beep')
				carousel = false;
				startX = e.touches[0].clientX;
				altX = e.touches[1].clientX;
				startY = e.touches[0].clientY;
				altY = e.touches[1].clientY;
				down = 1;
			}
		},
		{ passive: false },
	);
	canvas.addEventListener(
		"touchmove",
		(e) => {
			e.preventDefault();
			let speed = globalMovementSpeed;
			if (e.touches.length === 1 && down) {
				let inv = invert4(viewMatrix);
				let dx = (4 * (e.touches[0].clientX - startX) * speed) / innerWidth;
				let dy = (4 * (e.touches[0].clientY - startY) * speed) / innerHeight;

				let d = 4;
				inv = translate4(inv, 0, 0, d);
				// inv = translate4(inv,  -x, -y, -z);
				// inv = translate4(inv,  x, y, z);
				inv = rotate4(inv, dx, 0, 1, 0);
				inv = rotate4(inv, -dy, 1, 0, 0);
				inv = translate4(inv, 0, 0, -d);

				viewMatrix = invert4(inv);

				startX = e.touches[0].clientX;
				startY = e.touches[0].clientY;
			} else if (e.touches.length === 2) {
				//alert('beep')
				const dtheta =
					Math.atan2(startY - altY, startX - altX) -
					Math.atan2(
						e.touches[0].clientY - e.touches[1].clientY,
						e.touches[0].clientX - e.touches[1].clientX,
					);
				const dscale =
					Math.hypot(startX - altX, startY - altY) /
					Math.hypot(
						e.touches[0].clientX - e.touches[1].clientX,
						e.touches[0].clientY - e.touches[1].clientY,
					);
				const dx =
					(e.touches[0].clientX +
						e.touches[1].clientX -
						(startX + altX)) /
					2;
				const dy =
					(e.touches[0].clientY +
						e.touches[1].clientY -
						(startY + altY)) /
					2;
				let inv = invert4(viewMatrix);
				// inv = translate4(inv,  0, 0, d);
				inv = rotate4(inv, dtheta * speed, 0, 0, 1);

				inv = translate4(inv, (-dx * speed) / innerWidth, (-dy * speed) / innerHeight, 0);

				let preY = inv[13];
				inv = translate4(inv, 0, 0, 3 * speed * (1 - dscale));
				inv[13] = preY;

				viewMatrix = invert4(inv);

				startX = e.touches[0].clientX;
				altX = e.touches[1].clientX;
				startY = e.touches[0].clientY;
				altY = e.touches[1].clientY;
			}
		},
		{ passive: false },
	);
	canvas.addEventListener(
		"touchend",
		(e) => {
			e.preventDefault();
			down = false;
			startX = 0;
			startY = 0;
		},
		{ passive: false },
	);

	let jumpDelta = 0;
	let vertexCount = 0;

	let lastFrame = 0;
	let avgFps = 0;
	let start = 0;

	//add camera noise
	// Adapted from p5.js implementation
	let noisePermutations;
	function generateNoisePermutations() {
		const arr = Array.from({ length: 256 }, (_, i) => i);
		for (let i = 0; i < arr.length; i++) {
			const j = Math.floor(Math.random() * (i + 1));
			[arr[i], arr[j]] = [arr[j], arr[i]];
		}
		return arr.concat(arr);
	}

	function fade(t) {
		return t * t * t * (t * (t * 6 - 15) + 10);
	}

	function lerp(a, b, t) {
		return (1 - t) * a + t * b;
	}

	function grad(hash, x) {
		const h = hash & 15;
		const grad = 1 + (h & 7); // Gradient value is one of 8 values
		return grad * x; // Compute the dot product
	}

	function noise(x) {
		if (!noisePermutations) {
			noisePermutations = generateNoisePermutations();
		}

		const X = Math.floor(x) & 255;
		const xDiff = x - Math.floor(x);

		const u = fade(xDiff);

		return lerp(grad(noisePermutations[X], xDiff), grad(noisePermutations[X + 1], xDiff - 1), u) * 2;
	}

	let noiseOffsetX = 0;
	let noiseOffsetY = 1000;  // Start with different initial offsets
	let noiseOffsetZ = 2000;

	function getNoise(offset) {
		return (noise(offset) - 0.0) * 2; // Normalizing to be between -1 and 1
	}
	// Damping state variables are hoisted to main() level by changing to var
	var smTx = 0, smTy = 0, smTz = 0;
	var smRy = 0, smRz = 0, smRx = 0;
	var smOx = 0, smOy = 0;

	let globalMovementSpeed = 1.0;
	let lastModelLoadTime = 0;

	const frame = (now) => {
		let inv = invert4(viewMatrix);

		// Apply noise for constant camera shake
		noiseOffsetX += 0.1;
		noiseOffsetY += 0.1;
		noiseOffsetZ += 0.1;
		const noiseValueX = getNoise(noiseOffsetX);
		const noiseValueY = getNoise(noiseOffsetY);
		const noiseValueZ = getNoise(noiseOffsetZ);
		inv = translate4(inv, noiseValueX * 0.0003, noiseValueY * 0.0003, noiseValueZ * 0.00001);

		let targetTx = 0, targetTy = 0, targetTz = 0;
		let targetRy = 0, targetRz = 0, targetRx = 0;
		let targetOx = 0, targetOy = 0; // Orbit

		if ((activeKeys.includes("ArrowUp")) || (activeKeys.includes("å"))) {
			if (activeKeys.includes("Shift")) targetTy = -0.1;
			else targetTz = 0.1;
		}
		if ((activeKeys.includes("ArrowDown")) || (activeKeys.includes("æ"))) {
			if (activeKeys.includes("Shift")) targetTy = 0.1;
			else targetTz = -0.1;
		}
		if ((activeKeys.includes("ArrowLeft")) || (activeKeys.includes("ø"))) targetTx = -0.1;
		if ((activeKeys.includes("ArrowRight")) || (activeKeys.includes("@"))) targetTx = 0.1;

		if (activeKeys.includes("a")) targetRy = -0.01;
		if (activeKeys.includes("d")) targetRy = 0.01;
		if (activeKeys.includes("q")) targetRz = 0.01;
		if (activeKeys.includes("e")) targetRz = -0.01;
		if (activeKeys.includes("w")) targetRx = 0.01;
		if (activeKeys.includes("s")) targetRx = -0.01;

		if (activeKeys.includes("j")) targetOy = -0.01;
		if (activeKeys.includes("l")) targetOy = 0.01;
		if (activeKeys.includes("i")) targetOx = 0.01;
		if (activeKeys.includes("k")) targetOx = -0.01;

		// Rebalance specific arrow-key translation to be somewhat slower relative to rotation, and apply global speed modifier
		targetTx *= globalMovementSpeed * 0.4;
		targetTy *= globalMovementSpeed * 0.4;
		targetTz *= globalMovementSpeed * 0.4;

		targetRy *= globalMovementSpeed * 1.2;
		targetRz *= globalMovementSpeed * 1.2;
		targetRx *= globalMovementSpeed * 1.2;

		targetOx *= globalMovementSpeed;
		targetOy *= globalMovementSpeed;

		if (targetTx || targetTy || targetTz || targetRy || targetRz || targetRx || targetOx || targetOy) {
			carousel = false;
		}

		// Apply damping
		const lerpFactor = 0.04; // Made much lower for cinematic, buttery smooth start and stop ramping
		smTx += (targetTx - smTx) * lerpFactor;
		smTy += (targetTy - smTy) * lerpFactor;
		smTz += (targetTz - smTz) * lerpFactor;
		smRy += (targetRy - smRy) * lerpFactor;
		smRz += (targetRz - smRz) * lerpFactor;
		smRx += (targetRx - smRx) * lerpFactor;
		smOx += (targetOx - smOx) * lerpFactor;
		smOy += (targetOy - smOy) * lerpFactor;

		// Apply smoothed translations
		if (Math.abs(smTy) > 0.00001) {
			inv = translate4(inv, 0, smTy, 0);
		}
		if (Math.abs(smTz) > 0.00001) {
			let preY = inv[13];
			inv = translate4(inv, 0, 0, smTz);
			inv[13] = preY; // Keep height constant when moving back/forward
		}
		if (Math.abs(smTx) > 0.00001) {
			inv = translate4(inv, smTx, 0, 0);
		}

		// Apply smoothed rotations
		if (Math.abs(smRy) > 0.000001) inv = rotate4(inv, smRy, 0, 1, 0);
		if (Math.abs(smRz) > 0.000001) inv = rotate4(inv, smRz, 0, 0, 1);
		if (Math.abs(smRx) > 0.000001) inv = rotate4(inv, smRx, 1, 0, 0);

		// Apply smoothed orbit
		if (Math.abs(smOx) > 0.00001 || Math.abs(smOy) > 0.00001) {
			let d = 4;
			inv = translate4(inv, 0, 0, d);
			if (Math.abs(smOy) > 0.00001) inv = rotate4(inv, smOy, 0, 1, 0);
			if (Math.abs(smOx) > 0.00001) inv = rotate4(inv, smOx, 1, 0, 0);
			inv = translate4(inv, 0, 0, -d);
		}

		// inv[13] = preY;
		viewMatrix = invert4(inv);

		/*
		if (carousel) {
			let inv = invert4(defaultViewMatrix);

			const t = Math.sin((Date.now() - start) / 5000);
			inv = translate4(inv, 2.5 * t, 0, 6 * (1 - Math.cos(t)));
			inv = rotate4(inv, -0.6 * t, 0, 1, 0);

			viewMatrix = invert4(inv);
		}
		*/
		if (carousel) {
			let inv = invert4(defaultViewMatrix);
			//let inv = invert4(viewMatrix);

			const elapsedTime = (Date.now() - start) / 5000;
			const radius = 6; // Radius of the circular path
			const angle = elapsedTime * 0.3; // This controls the speed of the orbit

			// Calculating the camera's position on the circular path
			const x = radius * Math.sin(angle);
			const z = radius * Math.cos(angle);

			// Reset the camera to the default position
			inv = translate4(inv, -x, 0, -z);

			// Calculate the rotation angle to face the center
			const rotationAngle = angle + Math.PI / 2 - 1.5;

			// Apply the rotation
			inv = rotate4(inv, rotationAngle, 0, 1, 0);

			viewMatrix = invert4(inv);
		}


		/*
				if (carousel) {
		
					let inv = invert4(defaultViewMatrix);
		//			let inv = invert4(viewMatrix);
			
					// Apply noise for constant camera shake
					noiseOffsetX += 0.1;
					noiseOffsetY += 0.1;
					noiseOffsetZ += 0.1;
					const noiseValueX = getNoise(noiseOffsetX);
					const noiseValueY = getNoise(noiseOffsetY);
					const noiseValueZ = getNoise(noiseOffsetZ);
					inv = translate4(inv, noiseValueX * 0.0003, noiseValueY * 0.0003, noiseValueZ * 0.00001);
			
					const t = (Date.now() - start) % 50000 / 15000; // Reset t every 50000 ms (50 seconds)
					const scaledT = 2 * Math.PI * t / 10; // Scale t to span a full circle in 50 seconds
				
					inv = translate4(inv, 2.5 * Math.sin(scaledT), 0, 6 * (1 - Math.cos(scaledT)));
					//inv = translate4(inv, 2.5 * t, 0, 6 * (1 - Math.cos(t)));
					inv = rotate4(inv, -1.2 * scaledT, 0, 1, 0);
				
					viewMatrix = invert4(inv);
				}
		*/
		if (activeKeys.includes(" ")) {
			jumpDelta = Math.min(1, jumpDelta + 0.05);
		} else {
			jumpDelta = Math.max(0, jumpDelta - 0.05);
		}

		let inv2 = invert4(viewMatrix);
		inv2[13] -= jumpDelta;
		inv2 = rotate4(inv2, -0.1 * jumpDelta, 1, 0, 0);
		let actualViewMatrix = invert4(inv2);

		const actualViewModelMatrix = multiply4(actualViewMatrix, activeModelMatrix);
		const viewProjModel = multiply4(projectionMatrix, actualViewModelMatrix);
		worker.postMessage({ view: viewProjModel });

		const currentFps = 1000 / (now - lastFrame) || 0;
		avgFps = avgFps * 0.9 + currentFps * 0.1;

		if (vertexCount > 0) {
			document.getElementById("spinner").style.display = "none";
			// console.time('render')
			gl.uniformMatrix4fv(u_view, false, actualViewMatrix);
			gl.uniformMatrix4fv(u_model, false, activeModelMatrix);
			ext.drawArraysInstancedANGLE(gl.TRIANGLE_FAN, 0, 4, vertexCount);
			// console.timeEnd('render')
		} else {
			gl.clear(gl.COLOR_BUFFER_BIT);
			document.getElementById("spinner").style.display = "";
			start = Date.now() + 2000;
		}
		const progress = (100 * vertexCount) / (splatData.length / rowLength);
		if (progress < 100) {
			document.getElementById("progress").style.width = progress + "%";
		} else {
			document.getElementById("progress").style.display = "none";
		}
		fps.innerText = Math.round(avgFps) + " fps";

		// Frame-synced model scale controls
		if (activeKeys.includes('m') || activeKeys.includes('n')) {
			const scaleMultiplier = 1 + (0.01 * globalMovementSpeed);
			if (activeKeys.includes('m')) globalScaleFactor *= scaleMultiplier;
			if (activeKeys.includes('n')) globalScaleFactor /= scaleMultiplier;
			worker.postMessage({ type: "setGlobalScaleFactor", value: globalScaleFactor });
			needUpdate = true;
		}

		// Frame-synced model loading controls (throttled to max 5 skips per second)
		if (activeKeys.includes('g') || activeKeys.includes('h')) {
			if (now - lastModelLoadTime > 200) {
				let splatJump = Math.max(1, Math.round(5 * globalMovementSpeed));
				if (activeKeys.includes('h')) {
					modelIndex += splatJump;
				} else if (activeKeys.includes('g')) {
					modelIndex = Math.max(0, modelIndex - splatJump);
				}
				loadSplatModel();
				lastModelLoadTime = now;
			}
		}

		lastFrame = now;
		requestAnimationFrame(frame);
	};

	frame();

	const processModel = (arrayBuffer, fileName) => {
		if (/\.json$/i.test(fileName)) {
			cameras = JSON.parse(arrayBuffer);
			viewMatrix = getViewMatrix(cameras[0]);
			projectionMatrix = getProjectionMatrix(
				camera.fx / downsample,
				camera.fy / downsample,
				canvas.width,
				canvas.height,
			);
			gl.uniformMatrix4fv(u_projection, false, projectionMatrix);

			console.log("Loaded Cameras");
		} else {
			const splatData = new Uint8Array(arrayBuffer);
			console.log("Loaded", Math.floor(splatData.length / rowLength));

			if (Math.floor(splatData.length / rowLength) < vertexLimit) {
				worker.postMessage({
					buffer: splatData.buffer,
					vertexCount: Math.floor(splatData.length / rowLength),
				});
			} else { console.log("stopped") }
		}
	};

	const selectFile = (file) => {
		const fr = new FileReader();
		fr.onload = () => {
			processModel(fr.result, file.name);
		};
		if (/\.json$/i.test(file.name)) {
			fr.readAsText(file);
		} else {
			fr.readAsArrayBuffer(file);
		}
	};


	window.addEventListener("hashchange", (e) => {
		try {
			viewMatrix = JSON.parse(decodeURIComponent(location.hash.slice(1)));
			carousel = false;
		} catch (err) { }
	});

	const preventDefault = (e) => {
		e.preventDefault();
		e.stopPropagation();
	};
	document.addEventListener("dragenter", preventDefault);
	document.addEventListener("dragover", preventDefault);
	document.addEventListener("dragleave", preventDefault);
	document.addEventListener("drop", (e) => {
		e.preventDefault();
		e.stopPropagation();
		selectFile(e.dataTransfer.files[0]);
	});

	//load next with key h
	let modelIndex = 0;

	//	const directoryPath = './splats/a_three_dimensional_image_of_a_smooth_sundown_in_metal_alloy_pocket_sized_sculpture_terraced_garden_aureate_CGI_asset_luxurious_stunning_ebon_stage/';
	//	const filenamePrefix = 'model_';  // The common prefix for all files
	//	const filenameExtension = '.splat';

	//	const directoryPath = './splats/an_ethereal_projection_of_eggshell_barriers_transcendent_clarity_divine_ink_black_backdrop_butter_smooth/';
	//	const filenamePrefix = 'model_';  // The common prefix for all files
	//	const filenameExtension = '.splat';

	//	const directoryPath = './splats/xilitla/';
	//	const filenamePrefix = 'xilitla_';  // The common prefix for all files
	//	const filenameExtension = '.splat';

	//	const directoryPath = './splats/casa_lysekrone2/';
	//	const filenamePrefix = 'casalys2_';  // The common prefix for all files
	//	const filenameExtension = '.splat';

	//const directoryPath = './splats/jungleruinwalk2/';
	//const filenamePrefix = 'jungleruinwalk_';  // The common prefix for all files
	//const filenameExtension = '.splat';

	//const directoryPath = './splats/anartistic_splat/';
	//const filenamePrefix = 'anartistic_';  // The common prefix for all files
	//const filenameExtension = '.splat';

	directoryPath = './splats/1/';
	const filenamePrefix = 'model_'; // Constant prefix
	const filenameExtension = '.splat';

	let maxModelIndex = Infinity;
	let currentSplatBuffer = null;

	function loadSplatModel() {
		if (modelIndex > maxModelIndex) {
			modelIndex = maxModelIndex;
			return; // Stop requesting if we already proved it's the ceiling
		}

		const fileName = `${directoryPath}${filenamePrefix}${String(modelIndex).padStart(5, '0')}${filenameExtension}`;

		fetch(fileName)
			.then(response => {
				if (!response.ok) {
					// We jumped into the void! Cap the max index mathematically to backtrack.
					maxModelIndex = Math.max(0, modelIndex - 1);
					modelIndex = maxModelIndex;
					loadSplatModel(); // Try loading the new confirmed ceiling
					throw new Error('Splat boundary reached');
				}
				return response.arrayBuffer();
			})
			.then(buffer => {
				currentSplatBuffer = buffer;
				processModel(buffer, fileName);
			})
			.catch(error => {
				// Hide the intentional boundary discovery error to keep console clean
				if (error.message !== 'Splat boundary reached') {
					console.error("Splat Loading Error: ", error);
				}
			});
		needUpdate = true;
	}

	// Event listener for keypress
	document.addEventListener('keydown', (event) => {
		if (event.altKey && event.code.startsWith('Digit')) {
			const folderIndex = parseInt(event.code.replace('Digit', ''), 10) - 1; // Convert key to array index
			if (folderIndex >= 0 && folderIndex < splatFolders.length) {
				directoryPath = splatFolders[folderIndex];
				maxModelIndex = Infinity; // Reset ceiling rule for new folder
				loadSplatModel();
			}
		}
	});

	window.renderFolderList = () => {
		const folderList = document.getElementById('folder-list');
		if (!folderList) return;
		folderList.innerHTML = '';
		
		splatFolders.forEach((fullPath, idx) => {
			const item = document.createElement('div');
			item.className = 'folder-item';
			item.style.display = 'flex';
			item.style.justifyContent = 'space-between';
			item.style.alignItems = 'center';

			const label = document.createElement('span');
			label.style.flexGrow = '1';
			label.innerText = fullPath.replace('./splats/', '').replace('/', '');
			label.addEventListener('click', () => {
				directoryPath = fullPath;
				console.log('Switched to folder via menu:', directoryPath);
				maxModelIndex = Infinity; // Reset ceiling rule for new folder
				loadSplatModel();
				document.getElementById('folder-overlay').classList.add('hidden');
			});

			const btnContainer = document.createElement('div');
			const upBtn = document.createElement('button');
			upBtn.innerText = '↑';
			upBtn.style.marginRight = '5px';
			upBtn.disabled = idx === 0;
			upBtn.onclick = () => window.moveFolder(idx, -1);
			
			const downBtn = document.createElement('button');
			downBtn.innerText = '↓';
			downBtn.disabled = idx === splatFolders.length - 1;
			downBtn.onclick = () => window.moveFolder(idx, 1);

			btnContainer.appendChild(upBtn);
			btnContainer.appendChild(downBtn);
			
			item.appendChild(label);
			item.appendChild(btnContainer);
			folderList.appendChild(item);
		});
	};

	window.moveFolder = (idx, dir) => {
		if (idx + dir < 0 || idx + dir >= splatFolders.length) return;
		const temp = splatFolders[idx];
		splatFolders[idx] = splatFolders[idx + dir];
		splatFolders[idx + dir] = temp;
		window.renderFolderList();
	};

	let fadeAmount = 0.0;
	let currentFadeVelocity = 0.0;
	let isFadePlaying = false;
	let fadeSequenceDirection = 1; // 1 = forward, -1 = backward
	let isFadeInitialized = false;
	let fadeFolderB = null;
	let fadeTargetFolderDir = 1;
	let currentSplatBufferB = null;

	document.getElementById('btn-fade-dir')?.addEventListener('click', (e) => {
		fadeSequenceDirection *= -1;
		e.target.innerText = fadeSequenceDirection === 1 ? 'Dir: Forward' : 'Dir: Backward';
	});

	let lastFadeTime = 0;
	function animateFadeLoop(now) {
		if (!isFadeInitialized) return;
		
		let dt = (now - lastFadeTime) / 1000.0;
		lastFadeTime = now;
		if (dt > 0.1) dt = 0.1; // clamp delta
		
		let speedSlider = parseFloat(document.getElementById('fade-speed').value) || 0.5;
		let targetVel = 0;
		if (isFadePlaying) {
			if (fadeSequenceDirection === fadeTargetFolderDir) {
				targetVel = speedSlider;
			} else {
				targetVel = -speedSlider;
			}
		}
		
		// Smooth velocity (easing)
		currentFadeVelocity += (targetVel - currentFadeVelocity) * 5.0 * dt;
		
		// Apply velocity
		fadeAmount += currentFadeVelocity * dt;
		
		const fadeMode = parseInt(document.getElementById('fade-mode').value) || 1;

		if (fadeAmount >= 1.0) {
			// Reached B!
			directoryPath = fadeFolderB;
			currentSplatBuffer = currentSplatBufferB;
			worker.postMessage({
				buffer: currentSplatBuffer,
				vertexCount: currentSplatBuffer.byteLength / 32,
				vertexCountA: currentSplatBuffer.byteLength / 32,
				fadeAmount: 0.0,
				fadeMode: 0
			});
			isFadeInitialized = false;
			isFadePlaying = false;
			document.getElementById('btn-fade-play').innerText = 'Play';
			return; // Stop loop
		} else if (fadeAmount <= 0.0 && currentFadeVelocity <= 0 && targetVel <= 0) {
			// Reverted back to A!
			worker.postMessage({
				buffer: currentSplatBuffer,
				vertexCount: currentSplatBuffer.byteLength / 32,
				vertexCountA: currentSplatBuffer.byteLength / 32,
				fadeAmount: 0.0,
				fadeMode: 0
			});
			isFadeInitialized = false;
			isFadePlaying = false;
			document.getElementById('btn-fade-play').innerText = 'Play';
			return; // Stop loop
		}
		
		let renderFade = Math.max(0.0, Math.min(1.0, fadeAmount));
		worker.postMessage({ fadeAmount: renderFade, fadeMode: fadeMode });
		
		if (isFadePlaying || Math.abs(currentFadeVelocity) > 0.005) {
			requestAnimationFrame(animateFadeLoop);
		}
	}

	document.getElementById('btn-fade-play')?.addEventListener('click', (e) => {
		isFadePlaying = !isFadePlaying;
		e.target.innerText = isFadePlaying ? 'Pause' : 'Play';
		
		if (isFadePlaying && !isFadeInitialized) {
			let currentFolderIndex = splatFolders.indexOf(directoryPath);
			let targetIndex = currentFolderIndex + fadeSequenceDirection;
			if (targetIndex < 0 || targetIndex >= splatFolders.length) {
				isFadePlaying = false;
				e.target.innerText = 'Play';
				return;
			}
			
			fadeTargetFolderDir = fadeSequenceDirection;
			fadeFolderB = splatFolders[targetIndex];
			const pathB = `${fadeFolderB}/${filenamePrefix}${String(modelIndex).padStart(5, '0')}${filenameExtension}`;
			
			e.target.innerText = 'Loading...';
			fetch(pathB).then(r => r.ok ? r.arrayBuffer() : Promise.reject('Missing next splat'))
			.then(bufferB => {
				const bufA = currentSplatBuffer;
				if (!bufA) { isFadePlaying = false; e.target.innerText = 'Play'; return; }
				
				const combined = new Uint8Array(bufA.byteLength + bufferB.byteLength);
				combined.set(new Uint8Array(bufA), 0);
				combined.set(new Uint8Array(bufferB), bufA.byteLength);
				
				currentSplatBufferB = bufferB;
				fadeAmount = 0.0;
				currentFadeVelocity = 0.0;
				
				worker.postMessage({
					buffer: combined.buffer,
					vertexCount: combined.length / 32,
					vertexCountA: bufA.byteLength / 32,
					fadeAmount: 0.0,
					fadeMode: parseInt(document.getElementById('fade-mode').value) || 1
				});
				
				isFadeInitialized = true;
				e.target.innerText = 'Pause';
				lastFadeTime = performance.now();
				requestAnimationFrame(animateFadeLoop);
			}).catch(err => {
				console.error("Fade load failed:", err);
				isFadePlaying = false;
				e.target.innerText = 'Play';
			});
		} else if (isFadePlaying && isFadeInitialized) {
			lastFadeTime = performance.now();
			requestAnimationFrame(animateFadeLoop);
		}
	});

	// Keydown listeners for g/h moved dynamically into frame loop!

	//controll splat size
	// Keydown listeners for m/n moved dynamically into frame loop!

	// ==========================================
	// Video Recording with MediaRecorder API
	// ==========================================
	let mediaRecorder;
	let recordedChunks = [];

	window.addEventListener('keydown', function (event) {
		if (event.key === 'r') {
			const canvas = document.getElementById('canvas');
			const messageDiv = document.getElementById('message');

			if (!mediaRecorder || mediaRecorder.state === 'inactive') {
				console.log('Started recording...');
				// Capture at 60 Frames Per Second
				const stream = canvas.captureStream(60);

				// Check for mp4 support (e.g. Safari), fallback to webm (e.g. Chrome)
				let options = { mimeType: 'video/webm; codecs=vp9' };
				if (MediaRecorder.isTypeSupported('video/mp4')) {
					options = { mimeType: 'video/mp4' };
				}

				try {
					mediaRecorder = new MediaRecorder(stream, options);
				} catch (e) {
					console.error('MediaRecorder error:', e);
					return;
				}

				recordedChunks = [];

				mediaRecorder.ondataavailable = function (e) {
					if (e.data.size > 0) {
						recordedChunks.push(e.data);
					}
				};

				mediaRecorder.onstop = function () {
					console.log('Stopped recording, downloading file...');
					const blob = new Blob(recordedChunks, {
						type: options.mimeType
					});
					const url = URL.createObjectURL(blob);
					const a = document.createElement('a');
					a.style.display = 'none';
					a.href = url;

					// Name the file properly based on format
					const extension = options.mimeType === 'video/mp4' ? 'mp4' : 'webm';
					a.download = `3d_splat_recording.${extension}`;

					document.body.appendChild(a);
					a.click();

					setTimeout(() => {
						document.body.removeChild(a);
						URL.revokeObjectURL(url);
					}, 100);
				};

				mediaRecorder.start();
				if (messageDiv) messageDiv.innerText = '🔴 Recording... Press "r" to stop';
			} else {
				// Stop the recording
				mediaRecorder.stop();
				if (messageDiv) messageDiv.innerText = '';
			}
		}
	});


	window.addEventListener('resize', (e) => {
		const canvas = document.getElementById("canvas");
		canvas.width = innerWidth / activeDownsample;
		canvas.height = innerHeight / activeDownsample;
	})

	let bytesRead = 0;
	let lastVertexCount = -1;
	let stopLoading = false;

	while (true) {
		const { done, value } = await reader.read();
		if (done || stopLoading) break;

		splatData.set(value, bytesRead);
		bytesRead += value.length;

		if (vertexCount > lastVertexCount) {
			worker.postMessage({
				buffer: splatData.buffer,
				vertexCount: Math.floor(bytesRead / rowLength),
			});
			lastVertexCount = vertexCount;
			//console.log("postvertexcount");
		}
	}
	if (!stopLoading)
		worker.postMessage({
			buffer: splatData.buffer,
			vertexCount: Math.floor(bytesRead / rowLength),
		});
	// ==========================================
	// Dynamic Folder Loading
	// ==========================================
	const folderBtn = document.getElementById('folder-menu-btn');
	const folderOverlay = document.getElementById('folder-overlay');

	if (folderBtn && folderOverlay) {
		folderBtn.addEventListener('click', () => {
			folderOverlay.classList.toggle('hidden');
		});

		fetch('./splats/')
			.then(res => res.text())
			.then(html => {
				const parser = new DOMParser();
				const doc = parser.parseFromString(html, 'text/html');
				// http.server returns simple <a> tags for directories
				const links = Array.from(doc.querySelectorAll('a'));

				let folders = links
					.map(a => a.getAttribute('href'))
					.filter(href => href && href !== '../' && href.endsWith('/'));

				if (folders.length > 0) {
					splatFolders.length = 0; // Clear the hardcoded ones
					
					folders.forEach(folder => {
						splatFolders.push(`./splats/${folder}`);
					});

					window.renderFolderList();
				} else {
					document.getElementById('folder-list').innerHTML = '<div style="font-size:0.8rem; color:#aaa; font-style:italic;">No folders found</div>';
				}
			})
			.catch(err => {
				console.error("Failed to load folder structure:", err);
				document.getElementById('folder-list').innerHTML = '<div style="font-size:0.8rem; color:#f55; font-style:italic;">Error loading folders from server</div>';
			});
	}

	const speedBtns = document.querySelectorAll('.speed-btn');
	speedBtns.forEach(btn => {
		btn.addEventListener('click', (e) => {
			speedBtns.forEach(b => b.classList.remove('active'));
			e.target.classList.add('active');
			globalMovementSpeed = parseFloat(e.target.getAttribute('data-speed'));
		});
	});
}

main().catch((err) => {
	document.getElementById("spinner").style.display = "none";
	document.getElementById("message").innerText = err.toString();
});
