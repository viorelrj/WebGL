import { Scene } from './scene';
import Pickr from '@simonwep/pickr';


function initContext() {
    const canvas = document.getElementById("gl-canvas");

    const gl = WebGLUtils.setupWebGL(canvas);
    if (!gl) { alert("WebGL isn't available"); }

    gl.viewport(0, 0, canvas.width, canvas.height);
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


    const btn_addObject = document.getElementById('add-object');
    const btns_dispatchObject = document.getElementsByClassName('js-dispatch-object-button');
    const btns_dispatchCamera = document.getElementsByClassName('js-dispatch-camera-button');
    const inputs_dispatchCamera = document.getElementsByClassName('js-dispatch-camera-input');
    const select_objectIndex = document.getElementById('object-index');
    const select_objectType = document.getElementById('object-type');
    const materialShininess = this.document.getElementById('material-shininess');
    const btn_addLight = document.getElementById('add-light');
    const btns_dispatchLight = document.getElementsByClassName('js-dispatch-light-button');
    const btns_import = document.getElementsByClassName('js-upload-file');


    function createPicker(id) {
        return Pickr.create({
            el: id,
            theme: 'classic',
            components: {
                // Main components
                preview: true,
                opacity: true,
                hue: true,
                // Input / output Options
                interaction: {
                    save: true
                }
            }
        });
    }

    const glslrgba = arr => arr.map( item => item / 255).filter( (item, index) => index != 3 );

    const materialDiffuse = createPicker('#material-diffuse');
    const materialAmbient = createPicker('#material-ambient');
    const materialSpecular = createPicker('#material-specular');


    materialDiffuse.on('save', function(instance) {
        scene.dispatchObject(
            'diffuseSet',
            glslrgba(instance.toRGBA())
        );
    });

    materialAmbient.on('save', function(instance) {
        scene.dispatchObject(
            'ambientSet',
            glslrgba(instance.toRGBA())
        );
    });

    materialSpecular.on('save', function(instance) {
        scene.dispatchObject(
            'specularSet',
            glslrgba(instance.toRGBA())
        );
    });


    const lightColor = createPicker('#light-color');
    const lightAmbient = createPicker('#light-ambient');

    lightAmbient.on('save', function(instance) {
        scene.dispatchLight(
            'ambientSet',
            glslrgba(instance.toRGBA())
        );
    });

    lightColor.on('save', function(instance) {
        scene.dispatchLight(
            'colorSet',
            glslrgba(instance.toRGBA())
        );
    });

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

    function addLightToPanel() {
        const items = scene.getLightNameList();
        const select = document.getElementById('light-index');

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

        addObjectsToPanel();
    });

    // Focus listener
    select_objectIndex.addEventListener('change', function() {
        const index = select_objectIndex.value;
        scene.selectIndex(index);
    });
    

    btn_addLight.addEventListener('click', function() {
        scene.addLight();

        addLightToPanel();
    })

    materialShininess.addEventListener('change', function(e) {
        scene.dispatchObject(
            'shininessSet',
            e.target.value
        );
    })

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
    

    for (let i = 0; i < btns_import.length; i++) {
        const button = btns_import[i];
        button.addEventListener('change', function() {
            let selectedFiles = this.files;
    
            if (selectedFiles.length == 0) {
                alert('Error : No file selected');
                return;
            }
            let firstFile = selectedFiles[0];
            scene.importObject(gl, program, firstFile)
        });
    }

    for ( let i = 0; i < btns_dispatchLight.length; i++) {
        const button = btns_dispatchLight[i];

        button.addEventListener('click', function (e) {
            const method = e.target.getAttribute('data-method');
            const axisIndex = parseFloat(e.target.getAttribute('data-axis-index'));
            const direction = parseFloat(e.target.getAttribute('data-direction'));

            scene.dispatchLight(
                method,
                {
                    axisIndex,
                    direction
                }
            );

            addLightToPanel();
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