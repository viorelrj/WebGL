import { Scene } from './scene';
import { setSize } from './ui/size';
import Pickr from '@simonwep/pickr';

function initContext() {
    const canvas = document.getElementById("gl-canvas");
    const gl = WebGLUtils.setupWebGL(canvas);
    if (!gl) { alert("WebGL isn't available"); }


    setSize(canvas, gl);
    gl.clearColor(.1, .1, .1, 1);
    gl.enable(gl.DEPTH_TEST);
    gl.cullFace(gl.BACK);
    gl.frontFace(gl.CCW);

    const program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    return { gl, canvas, program };
}

window.onload = function init() {
    const { gl, canvas, program } = initContext();
    const scene = new Scene(gl, canvas, program);

    window.onresize = function() {
        setSize(canvas, gl, scene);
    }


    const btn_addObject = document.getElementById('add-object');
    const select_objectType = document.getElementById('object-type');

    btn_addObject.addEventListener('click', function() {
        const objectType = select_objectType.value;
        scene.addObject(gl, program, objectType);
    });

    const glslrgba = arr => arr.map( item => item / 255).filter( (item, index) => index != 3 );

    function render() {
        gl.clearColor(.1, .1, .1, 1);
        gl.clear(gl.COLOR_BUFFER_BIT);

        scene.drawAll(gl, program);

        requestAnimationFrame(render);
    }

    this.requestAnimationFrame(render);
}