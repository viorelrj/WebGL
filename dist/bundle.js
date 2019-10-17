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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/consts.js":
/*!***********************!*\
  !*** ./src/consts.js ***!
  \***********************/
/*! exports provided: cubeProps, pyramidProps, createSphere */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"cubeProps\", function() { return cubeProps; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"pyramidProps\", function() { return pyramidProps; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"createSphere\", function() { return createSphere; });\nconst cubeProps = {\r\n    vertices: [\r\n        // Face\r\n        ...[-1, -1, -1],\r\n        ...[1, -1, -1],\r\n        ...[1, 1, -1],\r\n        ...[-1, 1, -1],\r\n\r\n        // Back\r\n\r\n        ...[1, -1, 1],\r\n        ...[-1, -1, 1],\r\n        ...[-1, 1, 1],\r\n        ...[1, 1, 1]\r\n    ],\r\n\r\n    indices: [\r\n        // Front\r\n        ...[0, 1, 2],\r\n        ...[0, 2, 3],\r\n\r\n        // Right\r\n        ...[1, 4, 7],\r\n        ...[1, 7, 2],\r\n\r\n        // Left\r\n        ...[5, 0, 3],\r\n        ...[5, 3, 6],\r\n\r\n        // Top\r\n        ...[3, 2, 7],\r\n        ...[3, 7, 6],\r\n\r\n        // Bottom\r\n        ...[1, 0, 5],\r\n        ...[1, 5, 4],\r\n\r\n        // Back\r\n        ...[4, 5, 6],\r\n        ...[4, 6, 7]\r\n    ],\r\n\r\n    colors: [\r\n        ...[0, 0, 0],\r\n        ...[0, 0, 1],\r\n        ...[0, 1, 0],\r\n        ...[0, 1, 1],\r\n\r\n        ...[1, 0, 0],\r\n        ...[1, 0, 1],\r\n        ...[1, 1, 0],\r\n        ...[1, 1, 1],\r\n\r\n    ]\r\n}\r\n\r\nconst pyramidProps = {\r\n    vertices: [\r\n        // top\r\n        ...[0, 1, 0],\r\n\r\n        // Front left\r\n        ...[0.5, 0, -0.5],\r\n\r\n        // Front right\r\n        ...[0.5, 0, -0.5],\r\n\r\n        // back right\r\n        ...[0.5, 0, 0.5],\r\n\r\n        // back left\r\n        ...[-0.5, 0, 0.5],\r\n    ],\r\n\r\n    indices: [\r\n        ...[4, 2, 1],\r\n        ...[4, 3, 2],\r\n        ...[1, 2, 0],\r\n        ...[2, 3, 0],\r\n        ...[3, 4, 0],\r\n        ...[4, 1, 0],\r\n    ],\r\n    colors: [\r\n        ...[1, .75, 0.796078],\r\n        ...[1, 1, 0],\r\n        ...[1, 1, 0],\r\n        ...[1, 1, 0],\r\n        ...[1, 1, 0],\r\n    ]\r\n}\r\n\r\nfunction createSphere(precision = 3, radius = 1) {\r\n    let x, y, z, xy;\r\n\r\n    let sectorCount = precision;\r\n    let stackCount = precision;\r\n\r\n    let sectorStep = 2 * Math.PI / sectorCount;\r\n    let stackStep = Math.PI / stackCount;\r\n    let sectorAngle, stackAngle;\r\n\r\n    let vertices = [];\r\n    for (let i = 0; i <= stackCount; i++) {\r\n        stackAngle = Math.PI / 2 - i * stackStep;\r\n        xy = radius * Math.cos(stackAngle);\r\n        z = radius * Math.sin(stackAngle);\r\n\r\n        for (let j = 0; j <= sectorCount; ++j) {\r\n            sectorAngle = j * sectorStep;\r\n\r\n            x = xy * Math.cos(sectorAngle);\r\n            y = xy * Math.sin(sectorAngle);\r\n            vertices.push(x);\r\n            vertices.push(y);\r\n            vertices.push(z);\r\n        }\r\n    }\r\n\r\n    colors = [];\r\n    let length = vertices.length\r\n    for (let i = 0; i < vertices.length; i++) {\r\n        colors.push(\r\n            ...[\r\n                Math.random() * 10 * i / length,\r\n                Math.random() * 10 * i / length,\r\n                Math.random() * 10 * i / length\r\n            ]\r\n        )\r\n    }\r\n\r\n    indices = [];\r\n\r\n    let k1, k2;\r\n    for (let i = 0; i < stackCount; i++) {\r\n        k1 = i * (sectorCount + 1);\r\n        k2 = k1 + sectorCount + 1;\r\n\r\n        for (let j = 0; j < sectorCount; j++ , k1++ , k2++) {\r\n            if (i != 0) {\r\n                indices.push(k1);\r\n                indices.push(k2);\r\n                indices.push(k1 + 1);\r\n            }\r\n\r\n            if (i != (stackCount - 1)) {\r\n                indices.push(k1 + 1);\r\n                indices.push(k2);\r\n                indices.push(k2 + 1);\r\n            }\r\n        }\r\n    }\r\n\r\n    return {\r\n        vertices: vertices,\r\n        indices: indices,\r\n        colors: colors\r\n    }\r\n\r\n}\r\n\r\n\n\n//# sourceURL=webpack:///./src/consts.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _consts_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./consts.js */ \"./src/consts.js\");\n/* harmony import */ var _webgl_canvas_object__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./webgl/canvas-object */ \"./src/webgl/canvas-object.js\");\n/* harmony import */ var _webgl_camera__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./webgl/camera */ \"./src/webgl/camera.js\");\n\r\n\r\n\r\n\r\nlet gl;\r\nlet canvas;\r\n\r\nfunction getProgram() {\r\n    canvas = document.getElementById(\"gl-canvas\");\r\n\r\n    gl = WebGLUtils.setupWebGL(canvas);\r\n    if (!gl) { alert(\"WebGL isn't available\"); }\r\n\r\n    gl.viewport(0, 0, canvas.width, canvas.height);\r\n    gl.clearColor(1.0, 1.0, 1.0, 1.0);\r\n\r\n    gl.enable(gl.DEPTH_TEST);\r\n\r\n    let program = initShaders(gl, \"vertex-shader\", \"fragment-shader\");\r\n    gl.useProgram(program);\r\n\r\n    return program;\r\n}\r\n\r\nwindow.onload = function init() {\r\n    const program = getProgram();\r\n\r\n    const camera = new _webgl_camera__WEBPACK_IMPORTED_MODULE_2__[\"Camera\"]([0, 0, 15], [0, 0, 0], [0, 1, 0], canvas.width, canvas.height);\r\n\r\n    const cube = new _webgl_canvas_object__WEBPACK_IMPORTED_MODULE_1__[\"CanvasObject\"](_consts_js__WEBPACK_IMPORTED_MODULE_0__[\"cubeProps\"].vertices, _consts_js__WEBPACK_IMPORTED_MODULE_0__[\"cubeProps\"].colors, _consts_js__WEBPACK_IMPORTED_MODULE_0__[\"cubeProps\"].indices);\r\n    cube.initSelf(gl, program);\r\n\r\n\r\n    function render() {\r\n        gl.clearColor(0.9, 0.9, 0.9, 1);\r\n        gl.clear(gl.COLOR_BUFFER_BIT);\r\n\r\n        cube.drawSelf(gl, program, camera);\r\n\r\n        requestAnimationFrame(render);\r\n    }\r\n\r\n    this.requestAnimationFrame(render);\r\n}\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/webgl/buffer.js":
/*!*****************************!*\
  !*** ./src/webgl/buffer.js ***!
  \*****************************/
/*! exports provided: IndexBuffer, ArrayBuffer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"IndexBuffer\", function() { return IndexBuffer; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ArrayBuffer\", function() { return ArrayBuffer; });\nclass Buffer {\r\n    constructor() {\r\n        this.target = null;\r\n        this.id = null;\r\n    }\r\n\r\n    upload(gl, data) {\r\n        const type = (this.target === gl.ELEMENT_ARRAY_BUFFER) ? Uint16Array : Float32Array;\r\n\r\n        // Make the buffer active\r\n        gl.bindBuffer(this.target, this.id);\r\n        // Upload data to buffer\r\n        gl.bufferData(this.target, new type(data), gl.STATIC_DRAW);\r\n        // Unbind the buffer\r\n        gl.bindBuffer(this.target, null);\r\n    }\r\n\r\n    getType() {\r\n        return this.target;\r\n    }\r\n\r\n    activate(gl) {\r\n        gl.bindBuffer(this.target, this.id);\r\n    }\r\n}\r\n\r\nclass ArrayBuffer extends Buffer {\r\n    constructor(gl) {\r\n        super();\r\n        this.id = gl.createBuffer();\r\n        this.target = gl.ARRAY_BUFFER;\r\n        if (!this.id) { console.error('Failed to create buffer'); }\r\n    }\r\n}\r\n\r\nclass IndexBuffer extends Buffer {\r\n    constructor(gl) {\r\n        super();\r\n        this.id = gl.createBuffer();\r\n        this.target = gl.ELEMENT_ARRAY_BUFFER;\r\n        if (!this.id) { console.error('Failed to create buffer'); }\r\n    }\r\n}\r\n\r\n\n\n//# sourceURL=webpack:///./src/webgl/buffer.js?");

/***/ }),

/***/ "./src/webgl/camera.js":
/*!*****************************!*\
  !*** ./src/webgl/camera.js ***!
  \*****************************/
/*! exports provided: Camera */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Camera\", function() { return Camera; });\nclass Camera {\r\n    constructor(\r\n        position,\r\n        focusPoint,\r\n        up,\r\n        width,\r\n        height,\r\n        fov = 45,\r\n        closest = 0.1,\r\n        furthest = 1000.0\r\n    ) {\r\n        this.position = position;\r\n        this.focusPoint = focusPoint;\r\n        this.up = up;\r\n\r\n        this.viewWidth = width;\r\n        this.viewHeight= height;\r\n        this.fov = radians(fov);\r\n        this.closest = closest;\r\n        this.furthest = furthest;\r\n    }\r\n\r\n    getWarpedView(matrix) {\r\n        glMatrix.mat4.lookAt(matrix, this.position, this.focusPoint, this.up);\r\n        return matrix;\r\n    }\r\n\r\n    getWarpedProjection(matrix) {\r\n        glMatrix.mat4.perspective(matrix, this.fov, this.viewWidth / this.viewHeight, this.closest, this.furthest);\r\n        return matrix;\r\n    }\r\n\r\n    _setProp(property, vec) {\r\n        this[property] = vec;\r\n    }\r\n\r\n    _warpProp(property, vec) {\r\n        this[property] = [\r\n            this[property][0] + vec[0],\r\n            this[property][1] + vec[1],\r\n            this[property][2] + vec[2],\r\n        ];\r\n    }\r\n\r\n    panBy(vec) {\r\n        this._warpProp('position', vec);\r\n        this._warpProp('focusPoint', vec);\r\n    }\r\n\r\n    panTo(vec) {\r\n        this._setProp('position', vec);\r\n        this._setProp('focusPoint', vec);\r\n    }\r\n\r\n    translateBy(vec) {\r\n        this._warpProp('position', vec);\r\n    }\r\n\r\n    translateTo(vec) {\r\n        this._setProp('position', vec);\r\n    }\r\n\r\n    moveFocusPointBy(vec) {\r\n        this._warpProp('focusPoint', vec);\r\n    }\r\n\r\n    moveFocusPointTo(vec) {\r\n        this._setProp('focusPoint', vec);\r\n    }\r\n\r\n    setUpVector(vec) {\r\n        this.up = vec;\r\n    }\r\n\r\n    setAspectRatio(x, y) {\r\n        this.viewWidth = x;\r\n        this.viewHeight = y;\r\n    }\r\n\r\n    setFov(val) {\r\n        this.fov = radians(val);\r\n    }\r\n\r\n    setViewBox(close, far) {\r\n        this.closest = close;\r\n        this.furthest = far;\r\n    }\r\n}\r\n\r\n\n\n//# sourceURL=webpack:///./src/webgl/camera.js?");

/***/ }),

/***/ "./src/webgl/canvas-object.js":
/*!************************************!*\
  !*** ./src/webgl/canvas-object.js ***!
  \************************************/
/*! exports provided: CanvasObject */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"CanvasObject\", function() { return CanvasObject; });\n/* harmony import */ var _buffer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./buffer */ \"./src/webgl/buffer.js\");\n/* harmony import */ var _primitives__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./primitives */ \"./src/webgl/primitives.js\");\n\r\n\r\n\r\n\r\nclass CanvasObject {\r\n    constructor(vertices = [], colors = [], indices = []) {\r\n        this.vertices = vertices;\r\n        this.colors = colors;\r\n        this.indices = indices;\r\n\r\n        this.verticesBuffer = null;\r\n        this.colorsBuffer = null;\r\n        this.indicesBuffer = null;\r\n\r\n        this.scaleProps = [1, 1, 1]\r\n        this.translationProps = [0, 0, 0];\r\n        this.rotationProps = [0, 0, 0];\r\n\r\n        this.viewMatrix = null;\r\n        this.projectionMatrix = null;\r\n\r\n\r\n        this.glsl_viewMatrix = null;\r\n        this.glsl_projectionMatrix = null;\r\n        this.glsl_scaleProps = null;\r\n        this.glsl_translationProps = null;\r\n        this.glsl_rotationProps = null;\r\n    }\r\n\r\n    initBuffer(gl) {\r\n        this.verticesBuffer = new _buffer__WEBPACK_IMPORTED_MODULE_0__[\"ArrayBuffer\"](gl);\r\n        this.colorsBuffer = new _buffer__WEBPACK_IMPORTED_MODULE_0__[\"ArrayBuffer\"](gl);\r\n        this.indicesBuffer = new _buffer__WEBPACK_IMPORTED_MODULE_0__[\"IndexBuffer\"](gl);\r\n    }\r\n\r\n    uploadSelfToBuffer(gl) {\r\n        this.verticesBuffer.upload(gl, this.getVertices());\r\n        this.colorsBuffer.upload(gl, this.getColors());\r\n        this.indicesBuffer.upload(gl, this.getIndices());\r\n    }\r\n\r\n    getVertices() {\r\n        return this.vertices;\r\n    }\r\n\r\n    getIndices() {\r\n        return this.indices;\r\n    }\r\n\r\n    getIndicesLength() {\r\n        return this.indices.length\r\n    }\r\n\r\n    getColors() {\r\n        return this.colors;\r\n    }\r\n\r\n\r\n\r\n    _setProp(property, vec) {\r\n        this[property] = vec;\r\n    }\r\n\r\n    _warpProp(property, vec) {\r\n        this[property] = [\r\n            this[property][0] + vec[0],\r\n            this[property][1] + vec[1],\r\n            this[property][2] + vec[2],\r\n        ];\r\n    }\r\n\r\n    translateBy(translator) {\r\n        this._warpProp('translationProps', translator);\r\n    }\r\n\r\n    translateSet(translator) {\r\n        this._setProp('translationProps', translator)\r\n    }\r\n\r\n    scaleBy(scaler) {\r\n        this._warpProp('scaleProps', scaler);\r\n    }\r\n\r\n    scaleSet(scaler) {\r\n        this._setProp('scaleProps', scaler);\r\n    }\r\n\r\n    rotateBy(scaler) {\r\n        this._warpProp('rotationProps', scaler);\r\n    }\r\n\r\n    rotateSet(scaler) {\r\n        this._setProp('rotationProps', scaler);\r\n    }\r\n\r\n    initSelf(gl, program) {\r\n        this.initBuffer(gl);\r\n\r\n        this.glsl_projectionMatrix = new _primitives__WEBPACK_IMPORTED_MODULE_1__[\"GLSLVarMat4\"](gl, program, 'projectionMatrix');\r\n        this.glsl_viewMatrix = new _primitives__WEBPACK_IMPORTED_MODULE_1__[\"GLSLVarMat4\"](gl, program, 'viewMatrix');\r\n\r\n        this.glsl_scaleProps = new _primitives__WEBPACK_IMPORTED_MODULE_1__[\"GLSLVarVec3\"](gl, program, 'scaleProps');\r\n        this.glsl_translationProps = new _primitives__WEBPACK_IMPORTED_MODULE_1__[\"GLSLVarVec3\"](gl, program, 'translationProps');\r\n        this.glsl_rotationProps = new _primitives__WEBPACK_IMPORTED_MODULE_1__[\"GLSLVarVec3\"](gl, program, 'rotationProps');\r\n\r\n        this.viewMatrix = new glMatrix.mat4.create();\r\n        this.projectionMatrix = new glMatrix.mat4.create();\r\n    }\r\n\r\n    drawSelf(gl, program, camera) {\r\n        this.uploadSelfToBuffer(gl);\r\n        this.indicesBuffer.activate(gl);\r\n\r\n        this.verticesBuffer.activate(gl);\r\n        const coord = gl.getAttribLocation(program, 'coordinates');\r\n        gl.vertexAttribPointer(coord, 3, gl.FLOAT, false, 0, 0);\r\n        gl.enableVertexAttribArray(coord);\r\n\r\n        this.colorsBuffer.activate(gl);\r\n        const color = gl.getAttribLocation(program, 'color');\r\n        gl.vertexAttribPointer(color, 3, gl.FLOAT, false, 0, 0);\r\n        gl.enableVertexAttribArray(color);\r\n\r\n        this.viewMatrix = camera.getWarpedView(this.viewMatrix);\r\n        this.projectionMatrix = camera.getWarpedProjection(this.projectionMatrix);\r\n\r\n        this.glsl_viewMatrix.upload(gl, this.viewMatrix);\r\n        this.glsl_projectionMatrix.upload(gl, this.projectionMatrix);\r\n        this.glsl_scaleProps.upload(gl, this.scaleProps);\r\n        this.glsl_translationProps.upload(gl, this.translationProps);\r\n        this.glsl_rotationProps.upload(gl, this.rotationProps);\r\n\r\n        gl.drawElements(gl.TRIANGLES, this.getIndicesLength(), gl.UNSIGNED_SHORT, 0);\r\n    }\r\n}\r\n\r\n\n\n//# sourceURL=webpack:///./src/webgl/canvas-object.js?");

/***/ }),

/***/ "./src/webgl/primitives.js":
/*!*********************************!*\
  !*** ./src/webgl/primitives.js ***!
  \*********************************/
/*! exports provided: GLSLVarMat4, GLSLVarVec3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"GLSLVarMat4\", function() { return GLSLVarMat4; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"GLSLVarVec3\", function() { return GLSLVarVec3; });\nclass GLSLVar {\r\n    constructor(gl, program, name, dataType = 'uniformMatrix4fv') {\r\n        this.id = gl.getUniformLocation(program, name);\r\n        this.dataType = dataType;\r\n    }\r\n\r\n    _uploadTranspose(gl, variable) {\r\n        gl[this.dataType](this.id, gl.FALSE, variable);\r\n    }\r\n\r\n    _uploadNoTranspose(gl, variable) {\r\n        gl[this.dataType](this.id, variable);\r\n    }\r\n}\r\n\r\nclass GLSLVarMat4 extends GLSLVar {\r\n    constructor(gl, program, name) {\r\n        super(gl, program, name, 'uniformMatrix4fv');\r\n    }\r\n\r\n    upload(gl, variable) {\r\n        this._uploadTranspose(gl, variable)\r\n    }\r\n}\r\n\r\nclass GLSLVarVec3 extends GLSLVar {\r\n    constructor(gl, program, name) {\r\n        super(gl, program, name, 'uniform3fv');\r\n    }\r\n\r\n    upload(gl, variable) {\r\n        this._uploadNoTranspose(gl, variable);\r\n    }\r\n}\r\n\r\n\n\n//# sourceURL=webpack:///./src/webgl/primitives.js?");

/***/ })

/******/ });