import { cubeProps, pyramidProps } from './consts.js';
import { CanvasObject } from './webgl/canvas-object';
import { Camera } from './webgl/camera';

let gl;
let canvas;

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

window.onload = function init() {
    const program = getProgram();

    const camera = new Camera([0, 0, 15], [0, 0, 0], [0, 1, 0], canvas.width, canvas.height);

    const cube = new CanvasObject(cubeProps.vertices, cubeProps.colors, cubeProps.indices);
    cube.initSelf(gl, program);


    function render() {
        gl.clearColor(0.9, 0.9, 0.9, 1);
        gl.clear(gl.COLOR_BUFFER_BIT);

        cube.drawSelf(gl, program, camera);

        requestAnimationFrame(render);
    }

    this.requestAnimationFrame(render);
}