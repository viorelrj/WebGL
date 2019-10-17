let gl;
let canvas;

const identityMatrix = glMatrix.mat4.create();

import { cubeProps, pyramidProps } from './consts.js';
import { ArrayBuffer, IndexBuffer, GLSLVar, CanvasObject } from './webgl';



function getProgram() {
    canvas = document.getElementById("gl-canvas");

    gl = WebGLUtils.setupWebGL(canvas);
    if (!gl) { alert("WebGL isn't available"); }

    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(1.0, 1.0, 1.0, 1.0);

    gl.enable(gl.DEPTH_TEST);

    let program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    return program;
}

function setPerspective(canvas, obj) {
    glMatrix.mat4.lookAt(obj.viewMatrix, [0, 0, 15], [0, 0, 0], [0, 1, 0]);
    glMatrix.mat4.perspective(obj.projectionMatrix, radians(45), canvas.width / canvas.height, 0.1, 1000.0);
}

function createSphere(precision = 3, radius = 1) {
    let x, y, z, xy;

    let sectorCount = precision;
    let stackCount = precision;

    let sectorStep = 2 * Math.PI / sectorCount;
    let stackStep = Math.PI / stackCount;
    let sectorAngle, stackAngle;

    let vertices = [];
    for (let i = 0; i <= stackCount; i++) {
        stackAngle = Math.PI / 2 - i * stackStep;
        xy = radius * Math.cos(stackAngle);
        z = radius * Math.sin(stackAngle);

        for (let j = 0; j <= sectorCount; ++j) {
            sectorAngle = j * sectorStep;

            x = xy * Math.cos(sectorAngle);
            y = xy * Math.sin(sectorAngle);
            vertices.push(x);
            vertices.push(y);
            vertices.push(z);
        }
    }

    colors = [];
    let length = vertices.length
    for (let i = 0; i < vertices.length; i++) {
        colors.push(
            ...[
                Math.random() * 10 * i / length,
                Math.random() * 10 * i / length,
                Math.random() * 10 * i / length
            ]
        )
    }

    indices = [];

    let k1, k2;
    for (let i = 0; i < stackCount; i++) {
        k1 = i * (sectorCount + 1);
        k2 = k1 + sectorCount + 1;

        for (let j = 0; j < sectorCount; j++ , k1++ , k2++) {
            if (i != 0) {
                indices.push(k1);
                indices.push(k2);
                indices.push(k1 + 1);
            }

            if (i != (stackCount - 1)) {
                indices.push(k1 + 1);
                indices.push(k2);
                indices.push(k2 + 1);
            }
        }
    }

    return {
        vertices: vertices,
        indices: indices,
        colors: colors
    }

}

window.onload = function init() {
    const program = getProgram();

    const cube = new CanvasObject(cubeProps.vertices, cubeProps.colors, cubeProps.indices);
    cube.initSelf(canvas, gl, program);

    let angle;
    function render() {
        angle = (performance.now() / 1000) / 6 * (2 * Math.PI);

        gl.clearColor(0.9, 0.9, 0.9, 1);
        gl.clear(gl.COLOR_BUFFER_BIT);

        cube.activateSelf(gl, program);
        cube.rotate(gl, identityMatrix, angle, [0, 1, .3]);
        cube.drawSelf(gl);


        requestAnimationFrame(render);
    }

    this.requestAnimationFrame(render);
}