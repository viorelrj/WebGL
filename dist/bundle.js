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
/*! exports provided: cubeProps, pyramidProps, sphereProps */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"cubeProps\", function() { return cubeProps; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"pyramidProps\", function() { return pyramidProps; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"sphereProps\", function() { return sphereProps; });\nconst cubeProps = {\n    vertices: [\n        // Face\n        ...[-1, -1, -1],\n        ...[1, -1, -1],\n        ...[1, 1, -1],\n        ...[-1, 1, -1],\n\n        // Back\n\n        ...[1, -1, 1],\n        ...[-1, -1, 1],\n        ...[-1, 1, 1],\n        ...[1, 1, 1]\n    ],\n\n    indices: [\n        // Front\n        ...[0, 1, 2],\n        ...[0, 2, 3],\n\n        // Right\n        ...[1, 4, 7],\n        ...[1, 7, 2],\n\n        // Left\n        ...[5, 0, 3],\n        ...[5, 3, 6],\n\n        // Top\n        ...[3, 2, 7],\n        ...[3, 7, 6],\n\n        // Bottom\n        ...[1, 0, 5],\n        ...[1, 5, 4],\n\n        // Back\n        ...[4, 5, 6],\n        ...[4, 6, 7]\n    ],\n\n    colors: [\n        ...[0, 0, 0],\n        ...[0, 0, 1],\n        ...[0, 1, 0],\n        ...[0, 1, 1],\n\n        ...[1, 0, 0],\n        ...[1, 0, 1],\n        ...[1, 1, 0],\n        ...[1, 1, 1],\n\n    ]\n}\n\nconst pyramidProps = {\n    vertices: [\n        // top\n        ...[0, 1, 0],\n\n        // Front left\n        ...[0.5, 0, -0.5],\n\n        // Front right\n        ...[0.5, 0, -0.5],\n\n        // back right\n        ...[0.5, 0, 0.5],\n\n        // back left\n        ...[-0.5, 0, 0.5],\n    ],\n\n    indices: [\n        ...[4, 2, 1],\n        ...[4, 3, 2],\n        ...[1, 2, 0],\n        ...[2, 3, 0],\n        ...[3, 4, 0],\n        ...[4, 1, 0],\n    ],\n    colors: [\n        ...[1, .75, 0.796078],\n        ...[1, 1, 0],\n        ...[1, 1, 0],\n        ...[1, 1, 0],\n        ...[1, 1, 0],\n    ]\n}\n\nfunction createSphere(precision = 3, radius = 1) {\n    let x, y, z, xy;\n\n    let sectorCount = precision;\n    let stackCount = precision;\n\n    let sectorStep = 2 * Math.PI / sectorCount;\n    let stackStep = Math.PI / stackCount;\n    let sectorAngle, stackAngle;\n\n    let vertices = [];\n    for (let i = 0; i <= stackCount; i++) {\n        stackAngle = Math.PI / 2 - i * stackStep;\n        xy = radius * Math.cos(stackAngle);\n        z = radius * Math.sin(stackAngle);\n\n        for (let j = 0; j <= sectorCount; ++j) {\n            sectorAngle = j * sectorStep;\n\n            x = xy * Math.cos(sectorAngle);\n            y = xy * Math.sin(sectorAngle);\n            vertices.push(x);\n            vertices.push(y);\n            vertices.push(z);\n        }\n    }\n\n    let colors = [];\n    let length = vertices.length\n    for (let i = 0; i < vertices.length; i++) {\n        colors.push(\n            ...[\n                Math.random() * 10 * i / length,\n                Math.random() * 10 * i / length,\n                Math.random() * 10 * i / length\n            ]\n        )\n    }\n\n    let indices = [];\n\n    let k1, k2;\n    for (let i = 0; i < stackCount; i++) {\n        k1 = i * (sectorCount + 1);\n        k2 = k1 + sectorCount + 1;\n\n        for (let j = 0; j < sectorCount; j++ , k1++ , k2++) {\n            if (i != 0) {\n                indices.push(k1);\n                indices.push(k2);\n                indices.push(k1 + 1);\n            }\n\n            if (i != (stackCount - 1)) {\n                indices.push(k1 + 1);\n                indices.push(k2);\n                indices.push(k2 + 1);\n            }\n        }\n    }\n\n    return {\n        vertices: vertices,\n        indices: indices,\n        colors: colors\n    }\n\n}\n\nconst sphereProps = createSphere(20, 1);\n\n\n\n//# sourceURL=webpack:///./src/consts.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _scene__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scene */ \"./src/scene.js\");\n\n\nfunction initContext() {\n    const canvas = document.getElementById(\"gl-canvas\");\n\n    const gl = WebGLUtils.setupWebGL(canvas);\n    if (!gl) { alert(\"WebGL isn't available\"); }\n\n    gl.viewport(0, 0, canvas.width, canvas.height);\n    gl.clearColor(1.0, 1.0, 1.0, 1.0);\n\n    gl.enable(gl.DEPTH_TEST);\n\n    const program = initShaders(gl, \"vertex-shader\", \"fragment-shader\");\n    gl.useProgram(program);\n\n    return { gl, canvas, program };\n}\n\nwindow.onload = function init() {\n    const { gl, canvas, program } = initContext();\n    const scene = new _scene__WEBPACK_IMPORTED_MODULE_0__[\"Scene\"](gl, canvas, program);\n\n\n    const btn_addObject = document.getElementById('add-object');\n    const btns_dispatchObject = document.getElementsByClassName('js-dispatch-object-button');\n    const btns_dispatchCamera = document.getElementsByClassName('js-dispatch-camera-button');\n    const inputs_dispatchCamera = document.getElementsByClassName('js-dispatch-camera-input');\n    const select_objectIndex = document.getElementById('object-index');\n    const select_objectType = document.getElementById('object-type');\n\n    function addObjectsToPanel() {\n        const items = scene.getNameList();\n        const select = document.getElementById('object-index');\n\n        while (select.firstChild) {\n            select.removeChild(select.firstChild);\n        }\n\n        for (let i = 0; i < items.length; i++) {\n            const option = document.createElement('option');\n            const text = document.createTextNode(items[i]);\n            option.setAttribute('value', i);\n            option.appendChild(text);\n            select.appendChild(option);\n        }\n\n        select.value = scene.selectedIndex;\n    }\n\n    // Add button event listener\n    btn_addObject.addEventListener('click', function() {\n        const objectType = select_objectType.value;\n        scene.addObject(gl, program, objectType);\n\n        addObjectsToPanel(scene);\n    });\n\n    // Focus listener\n    select_objectIndex.addEventListener('change', function() {\n        const index = select_objectIndex.value;\n        scene.selectIndex(index);\n    });\n\n    // Modifications event listener\n    for (let i = 0; i < btns_dispatchObject.length; i++) {\n        const button = btns_dispatchObject[i];\n        \n        button.addEventListener('click', function(e) {\n            const method = e.target.getAttribute('data-method');\n            const axisIndex = parseFloat(e.target.getAttribute('data-axis-index'));\n            const direction = parseFloat(e.target.getAttribute('data-direction'));\n\n            scene.dispatchObject(\n                method,\n                {\n                    axisIndex,\n                    direction\n                }\n            );\n\n            addObjectsToPanel(scene.getNameList());\n        })\n    }\n\n    for (let i = 0; i < btns_dispatchCamera.length; i++) {\n        const button = btns_dispatchCamera[i];\n\n        button.addEventListener('click', function (e) {\n            const method = e.target.getAttribute('data-method');\n            const axisIndex = parseFloat(e.target.getAttribute('data-axis-index'));\n            const direction = parseFloat(e.target.getAttribute('data-direction'));\n\n            scene.dispatchCamera(\n                method,\n                {\n                    axisIndex,\n                    direction\n                }\n            );\n\n            addObjectsToPanel(scene.getNameList());\n        })\n    }\n\n    for (let i = 0; i < inputs_dispatchCamera.length; i++) {\n        const input = inputs_dispatchCamera[i];\n\n        input.addEventListener('change', function(e) {\n            const value = parseFloat(input.value);\n            const method = e.target.getAttribute('data-method');\n\n            scene.dispatchCamera(\n                method,\n                {\n                    value\n                }\n            );\n        })\n    }\n\n    function render() {\n        gl.clearColor(0.9, 0.9, 0.9, 1);\n        gl.clear(gl.COLOR_BUFFER_BIT);\n\n        scene.drawAll(gl, program);\n\n        requestAnimationFrame(render);\n    }\n\n    this.requestAnimationFrame(render);\n}\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/scene.js":
/*!**********************!*\
  !*** ./src/scene.js ***!
  \**********************/
/*! exports provided: Scene */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Scene\", function() { return Scene; });\n/* harmony import */ var _consts_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./consts.js */ \"./src/consts.js\");\n/* harmony import */ var _webgl_canvas_object__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./webgl/canvas-object */ \"./src/webgl/canvas-object.js\");\n/* harmony import */ var _webgl_camera__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./webgl/camera */ \"./src/webgl/camera.js\");\n\n\n\n\nconst objectMap = {\n    'cube': {\n        counter: 0,\n        self: _consts_js__WEBPACK_IMPORTED_MODULE_0__[\"cubeProps\"]\n    },\n    'pyramid': {\n        counter: 0,\n        self: _consts_js__WEBPACK_IMPORTED_MODULE_0__[\"pyramidProps\"]\n    },\n    'sphere': {\n        counter: 0,\n        self: _consts_js__WEBPACK_IMPORTED_MODULE_0__[\"sphereProps\"]\n    }\n};\n\nclass SceneObject {\n    constructor(name, object) {\n        this.name = name;\n        this.self = object;\n    }\n}\n\nclass Scene {\n    constructor (gl, canvas, program) {\n        this.objectList = [];\n        this.selectedIndex = 0;\n        this.camera = new _webgl_camera__WEBPACK_IMPORTED_MODULE_2__[\"Camera\"]([0, 0, 15], [0, 0, 0], [0, 1, 0], canvas.width, canvas.height);;\n    }\n\n    addObject(gl, program, type) {\n        const object = objectMap[type];\n        const drawable = new _webgl_canvas_object__WEBPACK_IMPORTED_MODULE_1__[\"CanvasObject\"](object.self.vertices, object.self.colors, object.self.indices, [], false);\n        drawable.initSelf(gl, program);\n\n        this.objectList.push(\n            new SceneObject(\n                type + \"-\" + ++objectMap[type].counter,\n                drawable\n            )\n        );\n    }\n\n    getNameList() {\n        return this.objectList.map(obj => obj.name);\n    }\n\n    selectIndex(index) {\n        this.selectedIndex = index;\n    }\n\n    dispatchObject(action, payload) {\n        if (action === 'translateBy') {\n            const {axisIndex, direction} = payload;\n            const object = this.objectList[this.selectedIndex];\n\n            const actionVector = [0, 0, 0];\n            actionVector[axisIndex] += direction * 0.2;\n\n            object.self.translateBy(actionVector);\n        }\n\n        if (action === 'rotateBy') {\n            const { axisIndex, direction } = payload;\n            const object = this.objectList[this.selectedIndex];\n\n            const actionVector = [0, 0, 0];\n            actionVector[axisIndex] += direction * 6;\n\n            object.self.rotateBy(actionVector);\n        }\n\n        if (action === 'scaleBy') {\n            const { axisIndex, direction } = payload;\n            const object = this.objectList[this.selectedIndex];\n\n            const actionVector = [0, 0, 0];\n            actionVector[axisIndex] += direction * .1;\n\n            object.self.scaleBy(actionVector);\n        }\n\n        if (action === 'remove') {\n            this.objectList.splice(this.selectedIndex, 1);\n            this.selectedIndex = 0;\n        }\n    }\n\n    dispatchCamera(action, payload) {\n        if (action === 'panBy') {\n            const { axisIndex, direction } = payload;\n\n            const actionVector = [0, 0, 0];\n            actionVector[axisIndex] += direction * 0.2;\n\n            this.camera.panBy(actionVector);\n        }\n\n        if (action === 'translateBy') {\n            const { axisIndex, direction } = payload;\n\n            const actionVector = [0, 0, 0];\n            actionVector[axisIndex] += direction;\n\n            this.camera.translateBy(actionVector);\n        }\n\n        if (action === 'moveFocusPointBy') {\n            const { axisIndex, direction } = payload;\n\n            const actionVector = [0, 0, 0];\n            actionVector[axisIndex] += direction * .2;\n\n            this.camera.moveFocusPointBy(actionVector);\n        }\n\n        if (action === 'setFov') {\n            const { value } = payload;\n            this.camera.setFov(value);\n        }\n\n        if (action === 'setClose') {\n            const { value } = payload;\n            this.camera.setClose(value);\n        }\n\n        if (action === 'setFar') {\n            const { value } = payload;\n            this.camera.setFar(value);\n        }\n\n        if (action === 'setWidth') {\n            const { value } = payload;\n            this.camera.setWidth(value);\n        }\n\n        if (action === 'setHeight') {\n            const { value } = payload;\n            this.camera.setHeight(value);\n        }\n\n        if (action === 'setUpX') {\n            const { value } = payload;\n            this.camera.setUpX(value);\n        }\n\n        if (action === 'setUpY') {\n            const { value } = payload;\n            this.camera.setUpY(value);\n        }\n\n        if (action === 'setUpZ') {\n            const { value } = payload;\n            this.camera.setUpZ(value);\n        }\n\n    }\n\n    drawAll(gl, program) {\n        for (let sceneObject of this.objectList) {\n            sceneObject.self.drawSelf(gl, program, this.camera);\n        }\n    }\n}\n\n\n\n//# sourceURL=webpack:///./src/scene.js?");

/***/ }),

/***/ "./src/webgl/buffer.js":
/*!*****************************!*\
  !*** ./src/webgl/buffer.js ***!
  \*****************************/
/*! exports provided: IndexBuffer, ArrayBuffer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"IndexBuffer\", function() { return IndexBuffer; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ArrayBuffer\", function() { return ArrayBuffer; });\nclass Buffer {\n    constructor() {\n        this.target = null;\n        this.id = null;\n    }\n\n    upload(gl, data) {\n        const type = (this.target === gl.ELEMENT_ARRAY_BUFFER) ? Uint16Array : Float32Array;\n        // Make the buffer active\n        gl.bindBuffer(this.target, this.id);\n        // Upload data to buffer\n        gl.bufferData(this.target, new type(data), gl.STATIC_DRAW);\n        // Unbind the buffer\n        gl.bindBuffer(this.target, null);\n    }\n\n    getType() {\n        return this.target;\n    }\n\n    activate(gl) {\n        gl.bindBuffer(this.target, this.id);\n    }\n}\n\nclass ArrayBuffer extends Buffer {\n    constructor(gl) {\n        super();\n        this.id = gl.createBuffer();\n        this.target = gl.ARRAY_BUFFER;\n        if (!this.id) { console.error('Failed to create buffer'); }\n    }\n}\n\nclass IndexBuffer extends Buffer {\n    constructor(gl) {\n        super();\n        this.id = gl.createBuffer();\n        this.target = gl.ELEMENT_ARRAY_BUFFER;\n        if (!this.id) { console.error('Failed to create buffer'); }\n    }\n}\n\n\n\n//# sourceURL=webpack:///./src/webgl/buffer.js?");

/***/ }),

/***/ "./src/webgl/camera.js":
/*!*****************************!*\
  !*** ./src/webgl/camera.js ***!
  \*****************************/
/*! exports provided: Camera */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Camera\", function() { return Camera; });\nclass Camera {\n    constructor(\n        position,\n        focusPoint,\n        up,\n        width,\n        height,\n        fov = 45,\n        closest = 0.1,\n        furthest = 1000.0\n    ) {\n        this.position = position;\n        this.focusPoint = focusPoint;\n        this.up = up;\n\n        this.viewWidth = width;\n        this.viewHeight= height;\n        this.fov = radians(fov);\n        this.closest = closest;\n        this.furthest = furthest;\n    }\n\n    getWarpedView(matrix) {\n        glMatrix.mat4.lookAt(matrix, this.position, this.focusPoint, this.up);\n        return matrix;\n    }\n\n    getWarpedProjection(matrix) {\n        glMatrix.mat4.perspective(matrix, this.fov, this.viewWidth / this.viewHeight, this.closest, this.furthest);\n        return matrix;\n    }\n\n    _setProp(property, vec) {\n        this[property] = vec;\n    }\n\n    _warpProp(property, vec) {\n        this[property] = [\n            this[property][0] + vec[0],\n            this[property][1] + vec[1],\n            this[property][2] + vec[2],\n        ];\n    }\n\n    panBy(vec) {\n        this._warpProp('position', vec);\n        this._warpProp('focusPoint', vec);\n    }\n\n    panTo(vec) {\n        this._setProp('position', vec);\n        this._setProp('focusPoint', vec);\n    }\n\n    translateBy(vec) {\n        this._warpProp('position', vec);\n    }\n\n    translateTo(vec) {\n        this._setProp('position', vec);\n    }\n\n    moveFocusPointBy(vec) {\n        this._warpProp('focusPoint', vec);\n    }\n\n    moveFocusPointTo(vec) {\n        this._setProp('focusPoint', vec);\n    }\n\n    setUpVector(vec) {\n        this.up = vec;\n    }\n\n    setUpX(value) {\n        this.up[0] = value;\n    }\n\n    setUpY(value) {\n        this.up[1] = value;\n    }\n\n    setUpZ(value) {\n        this.up[2] = value;\n    }\n\n    setAspectRatio(x, y) {\n        this.viewWidth = x;\n        this.viewHeight = y;\n    }\n\n    setWidth(x) {\n        this.viewWidth = x;\n    }\n\n    setHeight(y) {\n        this.viewHeight = y;\n    }\n\n    setFov(val) {\n        this.fov = radians(val);\n    }\n\n    setViewBox(close, far) {\n        this.closest = close;\n        this.furthest = far;\n    }\n\n    setClose(close) {\n        this.closest = close;\n    }\n\n    setFar(far) {\n        this.furthest = far;\n    }\n\n}\n\n\n\n//# sourceURL=webpack:///./src/webgl/camera.js?");

/***/ }),

/***/ "./src/webgl/canvas-object.js":
/*!************************************!*\
  !*** ./src/webgl/canvas-object.js ***!
  \************************************/
/*! exports provided: CanvasObject */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"CanvasObject\", function() { return CanvasObject; });\n/* harmony import */ var _buffer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./buffer */ \"./src/webgl/buffer.js\");\n/* harmony import */ var _primitives__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./primitives */ \"./src/webgl/primitives.js\");\n\n\n\n\nclass CanvasObject {\n    constructor(vertices = [], colors = [], indices = [], normals=[], VBO = true) {\n        this.meta = {}\n        this.meta.isVBO = VBO;\n\n        this.setVertices(vertices, indices, colors, normals);\n\n        this.verticesBuffer = null;\n        this.colorsBuffer = null;\n        this.indicesBuffer = null;\n        this.normalsBuffer = null;\n\n        this.scaleProps = [1, 1, 1]\n        this.translationProps = [0, 0, 0];\n        this.rotationProps = [0, 0, 0];\n\n        this.viewMatrix = null;\n        this.projectionMatrix = null;\n\n\n        this.glsl_viewMatrix = null;\n        this.glsl_projectionMatrix = null;\n        this.glsl_scaleProps = null;\n        this.glsl_translationProps = null;\n        this.glsl_rotationProps = null;\n    }\n\n    setVertices(vertices, indices, colors, normals) {\n        if (this.meta.isVBO) {\n            this.vertices = vertices;\n            this.indices = indices;\n            this.colors = colors;\n            this.normals = normals;\n        } else {\n            this.indices = indices;\n\n            const _vertices = [];\n            const _colors = []\n            \n            for (let i = 0; i < indices.length; i++) {\n                _vertices.push(\n                    vertices[indices[i] * 3 + 0],\n                    vertices[indices[i] * 3 + 1],\n                    vertices[indices[i] * 3 + 2]\n                )\n\n                _colors.push(\n                    colors[indices[i] * 3 + 0],\n                    colors[indices[i] * 3 + 1],\n                    colors[indices[i] * 3 + 2]\n                )\n            }\n\n            this.vertices = _vertices;\n            this.colors = _colors;\n            this.normals = _colors;\n        }\n    }\n\n    fillNormals() {\n        const triangles = this.getTriangles();\n        let normals = []\n\n        function calculateNormal(a, b, c) {\n            // 3 main lines of NORMALS CALCULATION FOR 1 TRIANGLE WITH VERTICES a, b, c!\n            let t1 = glMatrix.vec3.create();\n            let t2 = glMatrix.vec3.create();\n            let normal = glMatrix.vec3.create();\n\n            glMatrix.vec3.subtract(t1, b, a);\n            glMatrix.vec3.subtract(t2, c, a);\n\n            glMatrix.vec3.cross(normal, t2, t1);\n            glMatrix.vec3.normalize(normal, normal);\n\n            // converting vec3 to vec4, not needed if you send only vec3 to shaders, needed otherwise\n            return normal;\n        }\n\n        for (let triangle of triangles) {\n            normals.push(...calculateNormal(triangle[0], triangle[1], triangle[2]));\n        }\n\n        return normals;\n    }\n\n    getPoint(index) {\n        index *= 3;\n        return glMatrix.vec3.fromValues(\n            this.vertices[index],\n            this.vertices[index + 1],\n            this.vertices[index + 2],\n        )\n    }\n\n    getTriangles() {\n        let triangles = [];\n\n        for (let i = 0; i < this.indices.length; i += 3) {;\n            triangles.push([\n                this.getPoint(this.indices[i]),\n                this.getPoint(this.indices[i + 1]),\n                this.getPoint(this.indices[i + 2])\n            ]);\n        }\n\n        return triangles;\n    }\n\n    initBuffer(gl) {\n        this.verticesBuffer = new _buffer__WEBPACK_IMPORTED_MODULE_0__[\"ArrayBuffer\"](gl);\n        this.colorsBuffer = new _buffer__WEBPACK_IMPORTED_MODULE_0__[\"ArrayBuffer\"](gl);\n        this.indicesBuffer = new _buffer__WEBPACK_IMPORTED_MODULE_0__[\"IndexBuffer\"](gl);\n        this.normalsBuffer = new _buffer__WEBPACK_IMPORTED_MODULE_0__[\"ArrayBuffer\"](gl);\n    }\n\n    uploadSelfToBuffer(gl) {\n        this.verticesBuffer.upload(gl, this.getVertices());\n        this.colorsBuffer.upload(gl, this.getColors());\n        this.indicesBuffer.upload(gl, this.getIndices());\n        this.normalsBuffer.upload(gl, this.getNormals());\n    }\n\n    getVertices() {\n        return this.vertices;\n    }\n\n    getVerticesLength() {\n        return this.vertices.length;\n    }\n\n    getIndices() {\n        return this.indices;\n    }\n\n    getNormals() {\n        // console.log(this.normals);\n        return this.normals;\n    }\n\n    getIndicesLength() {\n        return this.indices.length\n    }\n\n    getColors() {\n        return this.colors;\n    }\n\n\n\n    _setProp(property, vec) {\n        this[property] = vec;\n    }\n\n    _warpProp(property, vec) {\n        this[property] = [\n            this[property][0] + vec[0],\n            this[property][1] + vec[1],\n            this[property][2] + vec[2],\n        ];\n    }\n\n    translateBy(translator) {\n        this._warpProp('translationProps', translator);\n    }\n\n    translateSet(translator) {\n        this._setProp('translationProps', translator)\n    }\n\n    scaleBy(scaler) {\n        this._warpProp('scaleProps', scaler);\n    }\n\n    scaleSet(scaler) {\n        this._setProp('scaleProps', scaler);\n    }\n\n    rotateBy(rotator) {\n        this._warpProp('rotationProps', rotator);\n    }\n\n    rotateSet(rotator) {\n        this._setProp('rotationProps', rotator);\n    }\n\n    initSelf(gl, program) {\n        this.initBuffer(gl);\n\n        this.glsl_projectionMatrix = new _primitives__WEBPACK_IMPORTED_MODULE_1__[\"GLSLVarMat4\"](gl, program, 'projectionMatrix');\n        this.glsl_viewMatrix = new _primitives__WEBPACK_IMPORTED_MODULE_1__[\"GLSLVarMat4\"](gl, program, 'viewMatrix');\n\n        this.glsl_scaleProps = new _primitives__WEBPACK_IMPORTED_MODULE_1__[\"GLSLVarVec3\"](gl, program, 'scaleProps');\n        this.glsl_translationProps = new _primitives__WEBPACK_IMPORTED_MODULE_1__[\"GLSLVarVec3\"](gl, program, 'translationProps');\n        this.glsl_rotationProps = new _primitives__WEBPACK_IMPORTED_MODULE_1__[\"GLSLVarVec3\"](gl, program, 'rotationProps');\n\n        this.viewMatrix = new glMatrix.mat4.create();\n        this.projectionMatrix = new glMatrix.mat4.create();\n    }\n\n    drawSelf(gl, program, camera) {\n        this.uploadSelfToBuffer(gl);\n\n        if (this.meta.isVBO) {\n            this.indicesBuffer.activate(gl);\n        }\n\n        this.verticesBuffer.activate(gl);\n        const coord = gl.getAttribLocation(program, 'coordinates');\n        gl.vertexAttribPointer(coord, 3, gl.FLOAT, false, 0, 0);\n        gl.enableVertexAttribArray(coord);\n\n        this.colorsBuffer.activate(gl);\n        const color = gl.getAttribLocation(program, 'color');\n        gl.vertexAttribPointer(color, 3, gl.FLOAT, false, 0, 0);\n        gl.enableVertexAttribArray(color);\n\n        this.normalsBuffer.activate(gl);\n        const normals = gl.getAttribLocation(program, 'normals');\n        gl.vertexAttribPointer(normals, 3, gl.FLOAT, false, 0, 0);\n        gl.enableVertexAttribArray(normals);\n\n        this.viewMatrix = camera.getWarpedView(this.viewMatrix);\n        this.projectionMatrix = camera.getWarpedProjection(this.projectionMatrix);\n\n        this.glsl_viewMatrix.upload(gl, this.viewMatrix);\n        this.glsl_projectionMatrix.upload(gl, this.projectionMatrix);\n        this.glsl_scaleProps.upload(gl, this.scaleProps);\n        this.glsl_translationProps.upload(gl, this.translationProps);\n        this.glsl_rotationProps.upload(gl, this.rotationProps);\n\n\n        if (this.meta.isVBO) {\n            gl.drawElements(gl.TRIANGLES, this.getIndicesLength(), gl.UNSIGNED_SHORT, 0);\n        } else {\n            gl.drawArrays(gl.TRIANGLES, 0, this.getVerticesLength() / 3);\n        }\n    }\n}\n\n\n\n//# sourceURL=webpack:///./src/webgl/canvas-object.js?");

/***/ }),

/***/ "./src/webgl/primitives.js":
/*!*********************************!*\
  !*** ./src/webgl/primitives.js ***!
  \*********************************/
/*! exports provided: GLSLVarMat4, GLSLVarVec3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"GLSLVarMat4\", function() { return GLSLVarMat4; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"GLSLVarVec3\", function() { return GLSLVarVec3; });\nclass GLSLVar {\n    constructor(gl, program, name, dataType = 'uniformMatrix4fv') {\n        this.id = gl.getUniformLocation(program, name);\n        this.dataType = dataType;\n    }\n\n    _uploadTranspose(gl, variable) {\n        gl[this.dataType](this.id, gl.FALSE, variable);\n    }\n\n    _uploadNoTranspose(gl, variable) {\n        gl[this.dataType](this.id, variable);\n    }\n}\n\nclass GLSLVarMat4 extends GLSLVar {\n    constructor(gl, program, name) {\n        super(gl, program, name, 'uniformMatrix4fv');\n    }\n\n    upload(gl, variable) {\n        this._uploadTranspose(gl, variable)\n    }\n}\n\nclass GLSLVarVec3 extends GLSLVar {\n    constructor(gl, program, name) {\n        super(gl, program, name, 'uniform3fv');\n    }\n\n    upload(gl, variable) {\n        this._uploadNoTranspose(gl, variable);\n    }\n}\n\n\n\n//# sourceURL=webpack:///./src/webgl/primitives.js?");

/***/ })

/******/ });