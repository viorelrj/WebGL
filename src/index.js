import { Camera } from './webgl/camera';
import { Scene } from './scene';

function initContext() {
    const canvas = document.getElementById("gl-canvas");

    const gl = WebGLUtils.setupWebGL(canvas);
    if (!gl) { alert("WebGL isn't available"); }

    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(1.0, 1.0, 1.0, 1.0);

    gl.enable(gl.DEPTH_TEST);

    const program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    return { gl, canvas, program };
}

function addObjectsToPanel(items) {
    const select = document.getElementById('object-index');

    while (select.firstChild) {
        select.removeChild(select.firstChild);
    }

    for (let i = 0; i < items.length; i++) {
        const option = document.createElement('option');
        const text = document.createTextNode(items[i]);
        option.setAttribute('value', i);
        option.appendChild(text);
        select.appendChild(option);
    }
}

window.onload = function init() {
    const {gl, canvas, program} = initContext();
    const camera = new Camera([0, 0, 15], [0, 0, 0], [0, 1, 0], canvas.width, canvas.height);
    const scene = new Scene();


    const btn_addObject = document.getElementById('add-object');
    const btns_translation = document.getElementsByClassName('js-translate-button');
    const select_objectIndex = document.getElementById('object-index');
    const select_objectType = document.getElementById('object-type');

    btn_addObject.addEventListener('click', function() {
        const objectType = select_objectType.value;
        scene.addObject(gl, program, objectType);

        addObjectsToPanel(scene.getNameList());
    });

    select_objectIndex.addEventListener('change', function() {
        const index = select_objectIndex.value;
        scene.selectIndex(index);
    });


    // Translation event listener
    for (let i = 0; i < btns_translation.length; i++) {
        const button = btns_translation[i];
        
        button.addEventListener('click', function(e) {
            const method = e.target.getAttribute('data-method');
            const axisIndex = parseFloat(e.target.getAttribute('data-axis-index'));
            const direction = parseFloat(e.target.getAttribute('data-direction'));

            scene.dispatch(
                method,
                {
                    axisIndex,
                    direction
                }
            )
        })
    }

    function render() {
        gl.clearColor(0.9, 0.9, 0.9, 1);
        gl.clear(gl.COLOR_BUFFER_BIT);

        scene.drawAll(gl, program, camera);

        requestAnimationFrame(render);
    }

    this.requestAnimationFrame(render);
}