/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _consts_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./consts.js */ \"./src/consts.js\");\n/* harmony import */ var _webgl__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./webgl */ \"./src/webgl.js\");\nlet gl;\r\nlet canvas;\r\n\r\nconst identityMatrix = glMatrix.mat4.create();\r\n\r\n\r\n\r\n\r\n\r\n\r\nfunction getProgram() {\r\n    canvas = document.getElementById(\"gl-canvas\");\r\n\r\n    gl = WebGLUtils.setupWebGL(canvas);\r\n    if (!gl) { alert(\"WebGL isn't available\"); }\r\n\r\n    gl.viewport(0, 0, canvas.width, canvas.height);\r\n    gl.clearColor(1.0, 1.0, 1.0, 1.0);\r\n\r\n    gl.enable(gl.DEPTH_TEST);\r\n\r\n    let program = initShaders(gl, \"vertex-shader\", \"fragment-shader\");\r\n    gl.useProgram(program);\r\n\r\n    return program;\r\n}\r\n\r\nfunction setPerspective(canvas, obj) {\r\n    glMatrix.mat4.lookAt(obj.viewMatrix, [0, 0, 15], [0, 0, 0], [0, 1, 0]);\r\n    glMatrix.mat4.perspective(obj.projectionMatrix, radians(45), canvas.width / canvas.height, 0.1, 1000.0);\r\n}\r\n\r\nfunction createSphere(precision = 3, radius = 1) {\r\n    let x, y, z, xy;\r\n\r\n    let sectorCount = precision;\r\n    let stackCount = precision;\r\n\r\n    let sectorStep = 2 * Math.PI / sectorCount;\r\n    let stackStep = Math.PI / stackCount;\r\n    let sectorAngle, stackAngle;\r\n\r\n    let vertices = [];\r\n    for (let i = 0; i <= stackCount; i++) {\r\n        stackAngle = Math.PI / 2 - i * stackStep;\r\n        xy = radius * Math.cos(stackAngle);\r\n        z = radius * Math.sin(stackAngle);\r\n\r\n        for (let j = 0; j <= sectorCount; ++j) {\r\n            sectorAngle = j * sectorStep;\r\n\r\n            x = xy * Math.cos(sectorAngle);\r\n            y = xy * Math.sin(sectorAngle);\r\n            vertices.push(x);\r\n            vertices.push(y);\r\n            vertices.push(z);\r\n        }\r\n    }\r\n\r\n    colors = [];\r\n    let length = vertices.length\r\n    for (let i = 0; i < vertices.length; i++) {\r\n        colors.push(\r\n            ...[\r\n                Math.random() * 10 * i / length,\r\n                Math.random() * 10 * i / length,\r\n                Math.random() * 10 * i / length\r\n            ]\r\n        )\r\n    }\r\n\r\n    indices = [];\r\n\r\n    let k1, k2;\r\n    for (let i = 0; i < stackCount; i++) {\r\n        k1 = i * (sectorCount + 1);\r\n        k2 = k1 + sectorCount + 1;\r\n\r\n        for (let j = 0; j < sectorCount; j++ , k1++ , k2++) {\r\n            if (i != 0) {\r\n                indices.push(k1);\r\n                indices.push(k2);\r\n                indices.push(k1 + 1);\r\n            }\r\n\r\n            if (i != (stackCount - 1)) {\r\n                indices.push(k1 + 1);\r\n                indices.push(k2);\r\n                indices.push(k2 + 1);\r\n            }\r\n        }\r\n    }\r\n\r\n    return {\r\n        vertices: vertices,\r\n        indices: indices,\r\n        colors: colors\r\n    }\r\n\r\n}\r\n\r\nwindow.onload = function init() {\r\n    const program = getProgram();\r\n\r\n    const cube = new _webgl__WEBPACK_IMPORTED_MODULE_1__[\"CanvasObject\"](_consts_js__WEBPACK_IMPORTED_MODULE_0__[\"cubeProps\"].vertices, _consts_js__WEBPACK_IMPORTED_MODULE_0__[\"cubeProps\"].colors, _consts_js__WEBPACK_IMPORTED_MODULE_0__[\"cubeProps\"].indices);\r\n    cube.initSelf(canvas, gl, program);\r\n\r\n    let angle;\r\n    function render() {\r\n        angle = (performance.now() / 1000) / 6 * (2 * Math.PI);\r\n\r\n        gl.clearColor(0.9, 0.9, 0.9, 1);\r\n        gl.clear(gl.COLOR_BUFFER_BIT);\r\n\r\n        cube.activateSelf(gl, program);\r\n        cube.rotate(gl, identityMatrix, angle, [0, 1, .3]);\r\n        cube.drawSelf(gl);\r\n\r\n\r\n        requestAnimationFrame(render);\r\n    }\r\n\r\n    this.requestAnimationFrame(render);\r\n}\n\n//# sourceURL=webpack:///./src/app.js?");

/***/ }),

/***/ "./src/consts.js":
/*!***********************!*\
  !*** ./src/consts.js ***!
  \***********************/
/*! exports provided: cubeProps, pyramidProps */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"cubeProps\", function() { return cubeProps; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"pyramidProps\", function() { return pyramidProps; });\nconst cubeProps = {\r\n    vertices: [\r\n        // Face\r\n        ...[-1, -1, -1],\r\n        ...[1, -1, -1],\r\n        ...[1, 1, -1],\r\n        ...[-1, 1, -1],\r\n\r\n        // Back\r\n\r\n        ...[1, -1, 1],\r\n        ...[-1, -1, 1],\r\n        ...[-1, 1, 1],\r\n        ...[1, 1, 1]\r\n    ],\r\n\r\n    indices: [\r\n        // Front\r\n        ...[0, 1, 2],\r\n        ...[0, 2, 3],\r\n\r\n        // Right\r\n        ...[1, 4, 7],\r\n        ...[1, 7, 2],\r\n\r\n        // Left\r\n        ...[5, 0, 3],\r\n        ...[5, 3, 6],\r\n\r\n        // Top\r\n        ...[3, 2, 7],\r\n        ...[3, 7, 6],\r\n\r\n        // Bottom\r\n        ...[1, 0, 5],\r\n        ...[1, 5, 4],\r\n\r\n        // Back\r\n        ...[4, 5, 6],\r\n        ...[4, 6, 7]\r\n    ],\r\n\r\n    colors: [\r\n        ...[0, 0, 0],\r\n        ...[0, 0, 1],\r\n        ...[0, 1, 0],\r\n        ...[0, 1, 1],\r\n\r\n        ...[1, 0, 0],\r\n        ...[1, 0, 1],\r\n        ...[1, 1, 0],\r\n        ...[1, 1, 1],\r\n\r\n    ]\r\n}\r\n\r\nconst pyramidProps = {\r\n    vertices: [\r\n        // top\r\n        ...[0, 1, 0],\r\n\r\n        // Front left\r\n        ...[0.5, 0, -0.5],\r\n\r\n        // Front right\r\n        ...[0.5, 0, -0.5],\r\n\r\n        // back right\r\n        ...[0.5, 0, 0.5],\r\n\r\n        // back left\r\n        ...[-0.5, 0, 0.5],\r\n    ],\r\n\r\n    indices: [\r\n        ...[4, 2, 1],\r\n        ...[4, 3, 2],\r\n        ...[1, 2, 0],\r\n        ...[2, 3, 0],\r\n        ...[3, 4, 0],\r\n        ...[4, 1, 0],\r\n    ],\r\n    colors: [\r\n        ...[1, .75, 0.796078],\r\n        ...[1, 1, 0],\r\n        ...[1, 1, 0],\r\n        ...[1, 1, 0],\r\n        ...[1, 1, 0],\r\n    ]\r\n}\r\n\r\n\n\n//# sourceURL=webpack:///./src/consts.js?");

/***/ }),

/***/ "./src/webgl.js":
/*!**********************!*\
  !*** ./src/webgl.js ***!
  \**********************/
/*! exports provided: ArrayBuffer, IndexBuffer, GLSLVar, CanvasObject */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ArrayBuffer\", function() { return ArrayBuffer; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"IndexBuffer\", function() { return IndexBuffer; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"GLSLVar\", function() { return GLSLVar; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"CanvasObject\", function() { return CanvasObject; });\nfunction setPerspective(canvas, obj) {\r\n    glMatrix.mat4.lookAt(obj.viewMatrix, [0, 0, 15], [0, 0, 0], [0, 1, 0]);\r\n    glMatrix.mat4.perspective(obj.projectionMatrix, radians(45), canvas.width / canvas.height, 0.1, 1000.0);\r\n}\r\n\r\nclass Buffer {\r\n    constructor() {\r\n        this.target = null;\r\n        this.id = null;\r\n    }\r\n\r\n    upload(gl, data) {\r\n        const type = (this.target === gl.ELEMENT_ARRAY_BUFFER) ? Uint16Array : Float32Array;\r\n\r\n        // Make the buffer active\r\n        gl.bindBuffer(this.target, this.id);\r\n        // Upload data to buffer\r\n        gl.bufferData(this.target, new type(data), gl.STATIC_DRAW);\r\n        // Unbind the buffer\r\n        gl.bindBuffer(this.target, null);\r\n    }\r\n\r\n    getType() {\r\n        return this.target;\r\n    }\r\n\r\n    activate(gl) {\r\n        gl.bindBuffer(this.target, this.id);\r\n    }\r\n}\r\n\r\nclass ArrayBuffer extends Buffer {\r\n    constructor(gl) {\r\n        super();\r\n        this.id = gl.createBuffer();\r\n        this.target = gl.ARRAY_BUFFER;\r\n        if (!this.id) { console.error('Failed to create buffer'); }\r\n    }\r\n}\r\n\r\nclass IndexBuffer extends Buffer {\r\n    constructor(gl) {\r\n        super();\r\n        this.id = gl.createBuffer();\r\n        this.target = gl.ELEMENT_ARRAY_BUFFER;\r\n        if (!this.id) { console.error('Failed to create buffer'); }\r\n    }\r\n}\r\n\r\nclass GLSLVar {\r\n    constructor(gl, program, name) {\r\n        this.id = gl.getUniformLocation(program, name);\r\n    }\r\n\r\n    upload(gl, variable) {\r\n        gl.uniformMatrix4fv(this.id, gl.FALSE, variable);\r\n    }\r\n}\r\n\r\nclass CanvasObject {\r\n    constructor(vertices = [], colors = [], indices = []) {\r\n        this.vertices = vertices;\r\n        this.colors = colors;\r\n        this.indices = indices;\r\n\r\n        this.scale = {\r\n            'x': 1,\r\n            'y': 1,\r\n            'z': 1\r\n        }\r\n\r\n        this.verticesBuffer = null;\r\n        this.colorsBuffer = null;\r\n        this.indicesBuffer = null;\r\n\r\n        this.worldMatrix = null;\r\n        this.viewMatrix = null;\r\n        this.projectionMatrix = null;\r\n        this.rotationMatrix = null;\r\n\r\n        this.glsl_projectionMatrix = null;\r\n        this.glsl_viewMatrix = null;\r\n        this.glsl_worldMatrix = null;\r\n        this.glsl_rotationMatrix = null;\r\n    }\r\n\r\n    initBuffer(gl) {\r\n        this.verticesBuffer = new ArrayBuffer(gl);\r\n        this.colorsBuffer = new ArrayBuffer(gl);\r\n        this.indicesBuffer = new IndexBuffer(gl);\r\n    }\r\n\r\n    uploadSelfToBuffer(gl) {\r\n        this.verticesBuffer.upload(gl, this.getVertices());\r\n        this.colorsBuffer.upload(gl, this.getColors());\r\n        this.indicesBuffer.upload(gl, this.getIndices());\r\n    }\r\n\r\n    getVertices() {\r\n        return this.vertices;\r\n    }\r\n\r\n    getIndices() {\r\n        return this.indices;\r\n    }\r\n\r\n    getIndicesLength() {\r\n        return this.indices.length\r\n    }\r\n\r\n    getColors() {\r\n        return this.colors;\r\n    }\r\n\r\n    rotate(gl, identityMatrix, angle, axis) {\r\n        let identity = glMatrix.mat4.create();\r\n        let translator = glMatrix.mat4.create();\r\n\r\n        glMatrix.mat4.mul(translator, identity, axis);\r\n\r\n        glMatrix.mat4.rotate(this.rotationMatrix, identityMatrix, angle, axis);\r\n        this.glsl_rotationMatrix.upload(gl, this.rotationMatrix);\r\n    }\r\n\r\n    setScale(...props) {\r\n        if (props.length == 1) {\r\n            this.scale.x = props[0];\r\n            this.scale.y = props[0];\r\n            this.scale.z = props[0];\r\n        }\r\n\r\n        if (props.length == 3) {\r\n            this.scale.x = props[0];\r\n            this.scale.y = props[1];\r\n            this.scale.z = props[2];\r\n        }\r\n    }\r\n\r\n    translate(gl, axis) {\r\n        let translator = glMatrix.vec3.clone(axis);\r\n\r\n\r\n        glMatrix.mat4.fromTranslation(this.worldMatrix, translator);\r\n        this.glsl_worldMatrix.upload(gl, this.worldMatrix);\r\n    }\r\n\r\n    initSelf(canvas, gl, program) {\r\n        this.initBuffer(gl);\r\n\r\n        this.glsl_projectionMatrix = new GLSLVar(gl, program, 'projectionMatrix');\r\n        this.glsl_viewMatrix = new GLSLVar(gl, program, 'viewMatrix');\r\n        this.glsl_worldMatrix = new GLSLVar(gl, program, 'worldMatrix');\r\n        this.glsl_rotationMatrix = new GLSLVar(gl, program, 'rotationMatrix');\r\n\r\n        this.worldMatrix = new glMatrix.mat4.create();\r\n        this.viewMatrix = new glMatrix.mat4.create();\r\n        this.projectionMatrix = new glMatrix.mat4.create();\r\n        this.rotationMatrix = new glMatrix.mat4.create();\r\n\r\n        setPerspective(canvas, this);\r\n    }\r\n\r\n    activateSelf(gl, program) {\r\n        this.uploadSelfToBuffer(gl);\r\n        this.indicesBuffer.activate(gl);\r\n\r\n        this.verticesBuffer.activate(gl);\r\n        const coord = gl.getAttribLocation(program, 'coordinates');\r\n        gl.vertexAttribPointer(coord, 3, gl.FLOAT, false, 0, 0);\r\n        gl.enableVertexAttribArray(coord);\r\n\r\n        this.colorsBuffer.activate(gl);\r\n        const color = gl.getAttribLocation(program, 'color');\r\n        gl.vertexAttribPointer(color, 3, gl.FLOAT, false, 0, 0);\r\n        gl.enableVertexAttribArray(color);\r\n\r\n        this.glsl_worldMatrix.upload(gl, this.worldMatrix);\r\n        this.glsl_viewMatrix.upload(gl, this.viewMatrix);\r\n        this.glsl_projectionMatrix.upload(gl, this.projectionMatrix);\r\n        this.glsl_rotationMatrix.upload(gl, this.rotationMatrix);\r\n    }\r\n\r\n    drawSelf(gl) {\r\n        gl.drawElements(gl.TRIANGLES, this.getIndicesLength(), gl.UNSIGNED_SHORT, 0);\r\n    }\r\n}\r\n\r\n\n\n//# sourceURL=webpack:///./src/webgl.js?");

/***/ })

/******/ });