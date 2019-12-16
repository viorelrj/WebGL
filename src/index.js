import { Scene } from './scene';
import { setSize } from './ui/size';
import { mouse } from './ui/mouse';
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

    window.onresize = function () {
        setSize(canvas, gl, scene);
    }

    mouse.bindObject(canvas);
    mouse.initListeners();

    const btn_addObject = document.getElementById('add-object');
    const btns_import = document.getElementsByClassName('js-upload-file');

    document.getElementById('controls-toggler').addEventListener('click', function() {
        document.getElementById('controls').classList.toggle('active');
    })

    for (let i = 0; i < btns_import.length; i++) {
        const button = btns_import[i];
        button.addEventListener('change', async function() {
            let selectedFiles = this.files;
    
            if (selectedFiles.length == 0) {
                alert('Error : No file selected');
                return;
            }
            
            if (button.dataset.type === 'obj') {
                let firstFile = selectedFiles[0];
                await scene.importObject(gl, program, firstFile);
                addObjectsToPanel();
            }

            if (button.dataset.type === 'image') {
                let firstFile = selectedFiles[0];
                scene.importTexture(firstFile);
            }
        });
    }

    const glslrgba = arr => arr.map(item => item / 255).filter((item, index) => index != 3);

    function render() {
        gl.clearColor(.1, .1, .1, 1);
        gl.clear(gl.COLOR_BUFFER_BIT);

        scene.drawAll(gl, program);

        requestAnimationFrame(render);
    }

    this.requestAnimationFrame(render);
}