import { Scene } from './scene';

function initContext() {
    const canvas = document.getElementById("gl-canvas");

    const gl = WebGLUtils.setupWebGL(canvas);
    if (!gl) { alert("WebGL isn't available"); }

    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(.1, .1, .1, 1);

    gl.enable(gl.DEPTH_TEST);

    const program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    return { gl, canvas, program };
}

window.onload = function init() {
    const { gl, canvas, program } = initContext();
    const scene = new Scene(gl, canvas, program);


    const btn_addObject = document.getElementById('add-object');
    const btns_dispatchObject = document.getElementsByClassName('js-dispatch-object-button');
    const btns_dispatchCamera = document.getElementsByClassName('js-dispatch-camera-button');
    const inputs_dispatchCamera = document.getElementsByClassName('js-dispatch-camera-input');
    const select_objectIndex = document.getElementById('object-index');
    const select_objectType = document.getElementById('object-type');

    function addObjectsToPanel() {
        const items = scene.getNameList();
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

        select.value = scene.selectedIndex;
    }

    // Add button event listener
    btn_addObject.addEventListener('click', function() {
        const objectType = select_objectType.value;
        scene.addObject(gl, program, objectType);

        addObjectsToPanel(scene);
    });

    // Focus listener
    select_objectIndex.addEventListener('change', function() {
        const index = select_objectIndex.value;
        scene.selectIndex(index);
    });

    // Modifications event listener
    for (let i = 0; i < btns_dispatchObject.length; i++) {
        const button = btns_dispatchObject[i];
        
        button.addEventListener('click', function(e) {
            const method = e.target.getAttribute('data-method');
            const axisIndex = parseFloat(e.target.getAttribute('data-axis-index'));
            const direction = parseFloat(e.target.getAttribute('data-direction'));

            scene.dispatchObject(
                method,
                {
                    axisIndex,
                    direction
                }
            );

            addObjectsToPanel(scene.getNameList());
        })
    }

    for (let i = 0; i < btns_dispatchCamera.length; i++) {
        const button = btns_dispatchCamera[i];

        button.addEventListener('click', function (e) {
            const method = e.target.getAttribute('data-method');
            const axisIndex = parseFloat(e.target.getAttribute('data-axis-index'));
            const direction = parseFloat(e.target.getAttribute('data-direction'));

            scene.dispatchCamera(
                method,
                {
                    axisIndex,
                    direction
                }
            );

            addObjectsToPanel(scene.getNameList());
        })
    }

    for (let i = 0; i < inputs_dispatchCamera.length; i++) {
        const input = inputs_dispatchCamera[i];

        input.addEventListener('change', function(e) {
            const value = parseFloat(input.value);
            const method = e.target.getAttribute('data-method');

            scene.dispatchCamera(
                method,
                {
                    value
                }
            );
        })
    }

    function render() {
        gl.clearColor(.1, .1, .1, 1);
        gl.clear(gl.COLOR_BUFFER_BIT);

        scene.drawAll(gl, program);

        requestAnimationFrame(render);
    }

    this.requestAnimationFrame(render);
}