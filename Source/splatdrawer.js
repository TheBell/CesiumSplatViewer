const CesiumViewer =  new Cesium.Viewer("cesiumContainer", {
    baseLayerPicker: false,
    geocoder: false,
    timeline: false,
    animation: false,
    homeButton: false,
    fullscreenButton: false,
    selectionIndicator: false,
    infoBox: false,
    useDefaultRenderLoop: true,
    orderIndependentTranslucency: true,
    scene3DOnly: true,
    automaticallyTrackDataSourceClocks: false,
    dataSources: null,
    clock: null,
    targetFrameRate: 60,
    resolutionScale: 0.1,
    terrainShadows: Cesium.ShadowMode.ENABLED,
    navigationHelpButton: false,
    contextOptions: {
        //requestWebgl2: true, // for a one day upgrade test
        webgl: {
        alpha: false,
        antialias: true,
        preserveDrawingBuffer: true,
        failIfMajorPerformanceCaveat: false,
        depth: true,
        stencil: true,
        antialias: false,
        },
    },
});

  // abstract primitive to hook into render pipe
class GaussianSplatPrimitive {
	constructor(options) {
		console.log("constructor");
		console.log(options);
		this.vertexArray = options.vertexArray;
		this.uniformMap = options.uniformMap;
		this.vertexShaderSource = options.vertexShaderSource;
		this.fragmentShaderSource = options.fragmentShaderSource;
		this.renderState = options.renderState;
		this.modelMatrix = options.modelMatrix;
		this.instanceCount = options.instanceCount;
		//this.framebuffer = options.framebuffer;
		this.show = true;
		this.commandToExecute = undefined;
	}

	createCommand(context) {

		var shaderProgram = Cesium.ShaderProgram.fromCache({
			context: context,
			attributeLocations: this.vertexArray.attributes,
			vertexShaderSource: this.vertexShaderSource,
			fragmentShaderSource: this.fragmentShaderSource,
			debugShaders: true,
			logShaderCompilation: true
		});

		var cachedRenderState = Cesium.RenderState.fromCache(this.renderState);
		console.log("instance count:", this.instanceCount);
		return new Cesium.DrawCommand({
			owner: this,
			vertexArray: this.vertexArray,
			primitiveType: Cesium.PrimitiveType.TRIANGLE_FAN,
			uniformMap: this.uniformMap,
			modelMatrix: this.modelMatrix, 
			instanceCount: this.instanceCount, 
			shaderProgram: shaderProgram,
			//framebuffer: this.framebuffer,
			renderState: cachedRenderState,
			pass: Cesium.Pass.TRANSLUCENT
		});
	}
	
	update(frameState) {
		if (!this.show) {
			return;
		}

		if (!Cesium.defined(this.commandToExecute)) {
			this.commandToExecute = this.createCommand(frameState.context);
		}

		frameState.commandList.push(this.commandToExecute);
	}

	isDestroyed() {
		return false;
	}

	destroy() {
		if (Cesium.defined(this.commandToExecute)) {
			this.commandToExecute.shaderProgram = this.commandToExecute.shaderProgram && this.commandToExecute.shaderProgram.destroy();
		}
		return Cesium.destroyObject(this);
	}
}

var floatView = new Float32Array(1);
var int32View = new Int32Array(floatView.buffer);
function floatToHalf(float) {
	floatView[0] = float;
	var f = int32View[0];

	var sign = (f >> 31) & 0x0001;
	var exp = (f >> 23) & 0x00ff;
	var frac = f & 0x007fffff;

	var newExp;
	if (exp == 0) {
		newExp = 0;
	} else if (exp < 113) {
		newExp = 0;
		frac |= 0x00800000;
		frac = frac >> (113 - exp);
		if (frac & 0x01000000) {
			newExp = 1;
			frac = 0;
		}
	} else if (exp < 142) {
		newExp = exp - 112;
	} else {
		newExp = 31;
		frac = 0;
	}

	return (sign << 15) | (newExp << 10) | (frac >> 13);
}

function packHalf2x16(x, y) {
	return (floatToHalf(x) | (floatToHalf(y) << 16)) >>> 0;
}

function generateTexture(buffer, vertexCount) {
	CesiumViewer.scene.globe.show = false;
	if (!buffer) return;
	console.log("Generating texture from", vertexCount, "vertices");

	const f_buffer = new Float32Array(buffer);
	const u_buffer = new Uint8Array(buffer);

	var texwidth = 1024 * 2; // Set to your desired width
	var texheight = Math.ceil((2 * vertexCount) / texwidth); // Set to your desired height
	var texdata = new Uint32Array(texwidth * texheight * 4); // 4 components per pixel (RGBA)
	var texdata_c = new Uint8Array(texdata.buffer);
	var texdata_f = new Float32Array(texdata.buffer);

	// Here we convert from a .splat file buffer into a texture
	// With a little bit more foresight perhaps this texture file
	// should have been the native format as it'd be very easy to
	// load it into webgl.
	for (let i = 0; i < vertexCount; i++) {
		// x, y, z
		texdata_f[8 * i + 0] = f_buffer[8 * i + 0];
		texdata_f[8 * i + 1] = f_buffer[8 * i + 1];
		texdata_f[8 * i + 2] = f_buffer[8 * i + 2];

		//console.log("XYZ", texdata_f[8 * i + 0], texdata_f[8 * i + 1], texdata_f[8 * i + 2]);

		// r, g, b, a
		texdata_c[4 * (8 * i + 7) + 0] = u_buffer[32 * i + 24 + 0];
		texdata_c[4 * (8 * i + 7) + 1] = u_buffer[32 * i + 24 + 1];
		texdata_c[4 * (8 * i + 7) + 2] = u_buffer[32 * i + 24 + 2];
		texdata_c[4 * (8 * i + 7) + 3] = u_buffer[32 * i + 24 + 3];

		// quaternions
		let scale = [
			f_buffer[8 * i + 3 + 0],
			f_buffer[8 * i + 3 + 1],
			f_buffer[8 * i + 3 + 2],
		];
		let rot = [
			(u_buffer[32 * i + 28 + 0] - 128) / 128,
			(u_buffer[32 * i + 28 + 1] - 128) / 128,
			(u_buffer[32 * i + 28 + 2] - 128) / 128,
			(u_buffer[32 * i + 28 + 3] - 128) / 128,
		];

		// Compute the matrix product of S and R (M = S * R)
		const M = [
			1.0 - 2.0 * (rot[2] * rot[2] + rot[3] * rot[3]),
			2.0 * (rot[1] * rot[2] + rot[0] * rot[3]),
			2.0 * (rot[1] * rot[3] - rot[0] * rot[2]),

			2.0 * (rot[1] * rot[2] - rot[0] * rot[3]),
			1.0 - 2.0 * (rot[1] * rot[1] + rot[3] * rot[3]),
			2.0 * (rot[2] * rot[3] + rot[0] * rot[1]),

			2.0 * (rot[1] * rot[3] + rot[0] * rot[2]),
			2.0 * (rot[2] * rot[3] - rot[0] * rot[1]),
			1.0 - 2.0 * (rot[1] * rot[1] + rot[2] * rot[2]),
		].map((k, i) => k * scale[Math.floor(i / 3)]);

		const sigma = [
			M[0] * M[0] + M[3] * M[3] + M[6] * M[6],
			M[0] * M[1] + M[3] * M[4] + M[6] * M[7],
			M[0] * M[2] + M[3] * M[5] + M[6] * M[8],
			M[1] * M[1] + M[4] * M[4] + M[7] * M[7],
			M[1] * M[2] + M[4] * M[5] + M[7] * M[8],
			M[2] * M[2] + M[5] * M[5] + M[8] * M[8],
		];

		texdata[8 * i + 4] = packHalf2x16(4 * sigma[0], 4 * sigma[1]);
		texdata[8 * i + 5] = packHalf2x16(4 * sigma[2], 4 * sigma[3]);
		texdata[8 * i + 6] = packHalf2x16(4 * sigma[4], 4 * sigma[5]);
	}
	//self.postMessage({ texdata, texwidth, texheight }, [texdata.buffer]);
	return  [
		texdata,
		texwidth,
		texheight
	];
}

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

var GSplatDrawer = null;
function SetupSplatDrawer(data) {
	if (GSplatDrawer != null) return;

	console.log("SetupSplatDrawer");
	let InWebGLContext = CesiumViewer.scene.context;	
	
	//data = JSON.parse(dataRaw);
    splatData = atob(data.buffer);
	console.log("Buffer is", data.bufferSize, "bytes with", data.N, "splats");
	console.log(data);

	let refLLA = data.lla;
	let bbox = data.boundingBox;
	let InPointCount = data.N;
	let elemWidth = data.elemSize;

	//let ENAtoECEF = new Cesium.Matrix4.fromRowMajorArray(data.ENAtoECEF);
	let ENAtoECEF = new Cesium.Matrix4.fromArray(data.ENAtoECEF);

	let [ texdata, splatTexWidth, splatTexHeight ] = generateTexture(data.buffer, InPointCount);

	console.log("Splat Texture:", splatTexWidth, splatTexHeight);
	console.log("ENA TO ECEF Matrix:", ENAtoECEF);
	//console.log(texdata);

	try {
		let vertexShaderSource = `
			#version 300 es
			precision highp float;
			precision highp int;
						
			uniform highp usampler2D u_texture;
			
			uniform vec2 focal;

			in vec2 position;
			in int index;

			out vec4 vColor;
			out vec2 vPosition;

			void main () {
				uvec4 cen = texelFetch(u_texture, ivec2((uint(index) & 0x3ffu) << 1, uint(index) >> 10), 0);
				
				vec4 cam = czm_view * vec4(uintBitsToFloat(cen.xyz), 1);
				vec4 pos2d = czm_projection * cam;

				float clip = 1.2 * pos2d.w;
				if (pos2d.z < -clip || pos2d.x < -clip || pos2d.x > clip || pos2d.y < -clip || pos2d.y > clip) {
					gl_Position = vec4(0.0, 0.0, 2.0, 1.0);
					return;
				}

				uvec4 cov = texelFetch(u_texture, ivec2(((uint(index) & 0x3ffu) << 1) | 1u, uint(index) >> 10), 0);
				vec2 u1 = unpackHalf2x16(cov.x), u2 = unpackHalf2x16(cov.y), u3 = unpackHalf2x16(cov.z);
				mat3 Vrk = mat3(u1.x, u1.y, u2.x, u1.y, u2.y, u3.x, u2.x, u3.x, u3.y);

				mat3 J = mat3(
					focal.x / cam.z, 0., -(focal.x * cam.x) / (cam.z * cam.z), 
					0., -focal.y / cam.z, (focal.y * cam.y) / (cam.z * cam.z), 
					0., 0., 0.
				);

				mat3 T = transpose(mat3(czm_view)) * J;
				mat3 cov2d = transpose(T) * Vrk * T;

				float mid = (cov2d[0][0] + cov2d[1][1]) / 2.0;
				float radius = length(vec2((cov2d[0][0] - cov2d[1][1]) / 2.0, cov2d[0][1]));
				float lambda1 = mid + radius, lambda2 = mid - radius;

				if(lambda2 < 0.0) return;
				vec2 diagonalVector = normalize(vec2(cov2d[0][1], lambda1 - cov2d[0][0]));
				vec2 majorAxis = min(sqrt(2.0 * lambda1), 1024.0) * diagonalVector;
				vec2 minorAxis = min(sqrt(2.0 * lambda2), 1024.0) * vec2(diagonalVector.y, -diagonalVector.x);

				vColor = clamp(pos2d.z/pos2d.w+1.0, 0.0, 1.0) * vec4((cov.w) & 0xffu, (cov.w >> 8) & 0xffu, (cov.w >> 16) & 0xffu, (cov.w >> 24) & 0xffu) / 255.0;
				vPosition = position;

				vec2 vCenter = vec2(pos2d) / pos2d.w;
				gl_Position = vec4(
					vCenter 
					+ position.x * majorAxis / czm_viewport.zw 
					+ position.y * minorAxis / czm_viewport.zw, 0.0, 1.0);

			}
		`.trim();

		let fragmentShaderSource = `
			#version 300 es
			precision highp float;

			in vec4 vColor;
			in vec2 vPosition;

			void main () {
				float A = -dot(vPosition, vPosition);
				if (A < -4.0) discard;
				float B = exp(A) * vColor.a;
				out_FragColor = vec4(B * vColor.rgb, B);
				//out_FragColor = vec4(1.0,0.0,1.0,0.0);  // BB: DEBUG: Color blue for testing
			}

		`.trim();		

		var splatRenderState =
		{
			blending: { 
				enabled: true,
				equationRgb: Cesium.BlendEquation.ADD,
				equationAlpha: Cesium.BlendEquation.ADD,
				functionSourceRgb: Cesium.BlendFunction.ONE_MINUS_DST_ALPHA,
				functionSourceAlpha: Cesium.BlendFunction.ONE_MINUS_DST_ALPHA,
				functionDestinationRgb: Cesium.BlendFunction.ONE,
				functionDestinationAlpha: Cesium.BlendFunction.ONE,
			},
			depthTest: {
				enabled: false
			},
			depthMask: false,
			cull: {
				enabled: false,
				face: Cesium.CullFace.FRONT
			}
		};

		var vertexSource = new Cesium.ShaderSource({
			sources: [vertexShaderSource]
		});

		var fragmentSource = new Cesium.ShaderSource({			
			sources: [fragmentShaderSource]
		});

		const triangleVertices = new Float32Array([-2, -2, 2, -2, 2, 2, -2, 2]);
		const triBuffer = Cesium.Buffer.createVertexBuffer({
			context: InWebGLContext,
			typedArray: triangleVertices,
			usage: Cesium.BufferUsage.DYNAMIC_DRAW
		});
				
		let cloudIndexPnts = new Int32Array(InPointCount);
		for (let i = 0; i < cloudIndexPnts; i++)
		{
			cloudIndexPnts[i] = i;
		}
		const orderedSplatIndices = Cesium.Buffer.createVertexBuffer({
			context: InWebGLContext,
			typedArray: cloudIndexPnts,
			usage: Cesium.BufferUsage.DYNAMIC_DRAW
		});

		const tempSplatTexture = new Cesium.Texture({
			context: InWebGLContext,
			width: splatTexWidth,
			height: splatTexHeight,
			pixelFormat: Cesium.PixelFormat.RGBA_INTEGER,	  //custom cesium
			pixelDatatype: Cesium.PixelDatatype.UNSIGNED_INT,  //custom cesium
			source: {
				width: splatTexWidth,
				height: splatTexHeight,
				arrayBufferView: texdata
			},
			sampler: new Cesium.Sampler({
				wrapS: Cesium.TextureWrap.CLAMP_TO_EDGE,
				wrapT: Cesium.TextureWrap.CLAMP_TO_EDGE,
				minificationFilter: Cesium.TextureMinificationFilter.NEAREST,
				magnificationFilter: Cesium.TextureMagnificationFilter.NEAREST,
			}),
		});

		var uniformMap = {
			u_texture: function () {
				return tempSplatTexture;
			},
			focal: function () {
				return new Float32Array(1000, 1000);
			}
		};

		const attributes = [
			{
				index: 0,
				enabled: true,
				vertexBuffer: triBuffer,
				componentsPerAttribute: 2,
				componentDatatype: Cesium.ComponentDatatype.FLOAT,
				normalize: false,
				offsetInBytes: 0,
				strideInBytes: 0,
		        instanceDivisor: 0 
			},
			{
				index: 1,
				enabled: true,
				vertexBuffer: orderedSplatIndices,
				componentsPerAttribute: 1,
				componentDatatype: Cesium.ComponentDatatype.INT,
				normalize: false,
				offsetInBytes: 0,
				strideInBytes: 0,
				bindAsInteger: true, //custom cesium
		        instanceDivisor: 1
			}
		];

		const splatsVertexArray = new Cesium.VertexArray({
			context: InWebGLContext,
			attributes : attributes
		});

		// var modelMatrix = new Cesium.Matrix4(1.3199364149435819, -2.1495093374730554, 0.054563037493707056, 45.763303750083615,
		// 					-2.5223700317314628, -1.5070748509345899, 1.6475730937891855, 701.86230514266265,
		// 					-0.41042493462292667, -0.27434721847257998, -0.87929655698630071, 3202.5400643716443,
		// 					-0.40700470297935443, -0.27206097570614557, -0.87196903457090036, 3275.8520419969559);
		
		var modelMatrix = new Cesium.Matrix4(getProjectionMatrix(1000, 1000, 1000, 1000));
		console.log("InPointCount:", InPointCount);
		var gaussianSplatPrimitive = new GaussianSplatPrimitive({
			vertexArray: splatsVertexArray,
			uniformMap: uniformMap,
			modelMatrix: ENAtoECEF, //does this need to be CameraECEFMatrix
			vertexShaderSource: vertexSource,
			fragmentShaderSource: fragmentSource,
			renderState: splatRenderState,
			instanceCount : InPointCount
		});

		GSplatDrawer = {
			orderedSplatIndices: orderedSplatIndices
		};

		CesiumViewer.scene.primitives.add(gaussianSplatPrimitive);

	} catch (err) {
		console.log("SetupSplatDrawer(ERROR)" + err);
		console.log("SetupSplatDrawer(ERROR)" + err.message);
	}
	
	CesiumViewer.camera.flyTo({
		destination: Cesium.Cartesian3.fromDegrees(refLLA.longitude, refLLA.latitude, 10)
	});   
	console.log("END SetupSplatDrawer");
}
var data = {
    "ENAtoECEF" : [-0.0, 1.0, 0.0, 0.0,
                  -0.0, -0.0, 1.0, 0.0,
                   1.0, 0.0, 0.0, 0.0,
                   6378137.0, 0.0, 0.0, 1.0],
    "N" : 9,
    "boundingBox" : {
		"xMax" : 1.0,
		"xMin" : -1.0,
		"yMax" : 1.0,
		"yMin" : -1.0,
		"zMax" : 1.0,
		"zMin" : -1.0
	},
    "buffer" : "AAAAAAAAAAAAAAAAVZUKPlWVCj5VlQo+f3/Huv+AgIAAAIC/AACAvwAAgL8uHKg9LhyoPS4cqD3Hf3+6/4CAgAAAgL8AAIA/AACAvy4cqD0uHKg9LhyoPcd/f7r/gICAAACAPwAAgD8AAIC/LhyoPS4cqD0uHKg9x39/uv+AgIAAAIA/AACAvwAAgL8uHKg9LhyoPS4cqD3Hf3+6/4CAgAAAgL8AAIC/AACAPy4cqD0uHKg9LhyoPX/Hf7r/gICAAACAvwAAgD8AAIA/LhyoPS4cqD0uHKg9f8d/uv+AgIAAAIA/AACAPwAAgD8uHKg9LhyoPS4cqD1/x3+6/4CAgAAAgD8AAIC/AACAPy4cqD0uHKg9LhyoPX/Hf7r/gICA",
	"bufferSize" : 288,
	"elemSize" : 32,
	"lla" : 
	{
		"altitude" : 0.0,
		"latitude" : 0.0,
		"longitude" : 0.0
	}
};

SetupSplatDrawer(data);
