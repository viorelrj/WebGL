import { cubeProps, pyramidProps, coneProps, sphereProps } from './consts.js';
import { CanvasObject } from './webgl/canvas-object';
import { Light } from './webgl/light';
import { Camera } from './webgl/camera';
import { mouse } from './ui/mouse';

const objectMap = {
    'cube': {
        counter: 0,
        self: cubeProps
    },
    'pyramid': {
        counter: 0,
        self: pyramidProps
    },
    'cone': {
        counter: 0,
        self: coneProps
    },
    'sphere': {
        counter: 0,
        self: sphereProps
    }
};

class SceneObject {
    constructor(name, object) {
        this.name = name;
        this.self = object;
    }
}

class Scene {
    constructor (gl, canvas, program) {
        this.objectList = [];
        this.selectedIndex = 0;
    
        this.camera = new Camera([0, 0, 15], [0, 0, 0], [0, 1, 0], canvas.offsetWidth, canvas.offsetHeight);;

        this.light = new Light();
        this.light.initSelf(gl, program);

        mouse.subscribeToDragPrimary(this.handleMouseMove.bind(this))
    }

    handleMouseMove(payload) {
        // this.dispatchObject('rotateByViewPort', [payload[1], payload[0], 0])
    }

    addLight() {
        this.light.add();
    }

    addObject(gl, program, type) {
        const object = objectMap[type];
        const drawable = new CanvasObject(object.self.vertices, object.self.colors, object.self.indices, [], false);
        drawable.initSelf(gl, program);

        this.objectList.push(
            new SceneObject(
                type + "-" + ++objectMap[type].counter,
                drawable
            )
        );
    }

    getNameList() {
        return this.objectList.map(obj => obj.name);
    }

    getLightNameList() {
        return this.light.instances.map(obj => obj.name)
    }

    selectIndex(index) {
        this.selectedIndex = index;
    }

    dispatchObject(action, payload) {
        const object = this.objectList[this.selectedIndex];

        if (action === 'translateBy') {
            const {axisIndex, direction} = payload;
            const object = this.objectList[this.selectedIndex];

            const actionVector = [0, 0, 0];
            actionVector[axisIndex] += direction * 0.2;

            object.self.translateBy(actionVector);
        }

        if (action === 'rotateBy') {
            const actionVector = payload;

            object.self.rotateBy(actionVector);
        }

        if (action === 'rotateByViewPort') {
            const actionVector = payload;

            object.self.rotateByViewPort(actionVector);
        }

        if (action === 'scaleBy') {
            const { axisIndex, direction } = payload;
            const object = this.objectList[this.selectedIndex];

            const actionVector = [0, 0, 0];
            actionVector[axisIndex] += direction * .1;

            object.self.scaleBy(actionVector);
        }

        if (action === 'remove') {
            this.objectList.splice(this.selectedIndex, 1);
            this.selectedIndex = 0;
        }

        if (action === 'ambientSet') {
            object.self.ambientSet(payload);
        }

        if (action === 'diffuseSet') {
            object.self.diffuseSet(payload);
        }

        if (action === 'specularSet') {
            object.self.specularSet(payload);
        }

        if (action == 'shininessSet') {
            object.self.shininessSet(payload);
        }
    }

    dispatchCamera(action, payload) {
        if (action === 'panBy') {
            const { axisIndex, direction } = payload;

            const actionVector = [0, 0, 0];
            actionVector[axisIndex] += direction * 0.2;

            this.camera.panBy(actionVector);
        }

        if (action === 'translateBy') {
            const { axisIndex, direction } = payload;

            const actionVector = [0, 0, 0];
            actionVector[axisIndex] += direction;

            this.camera.translateBy(actionVector);
        }

        if (action === 'moveFocusPointBy') {
            const { axisIndex, direction } = payload;

            const actionVector = [0, 0, 0];
            actionVector[axisIndex] += direction * .2;

            this.camera.moveFocusPointBy(actionVector);
        }

        if (action === 'setFov') {
            const { value } = payload;
            this.camera.setFov(value);
        }

        if (action === 'setClose') {
            const { value } = payload;
            this.camera.setClose(value);
        }

        if (action === 'setFar') {
            const { value } = payload;
            this.camera.setFar(value);
        }

        if (action === 'setWidth') {
            const { value } = payload;
            this.camera.setWidth(value);
        }

        if (action === 'setHeight') {
            const { value } = payload;
            this.camera.setHeight(value);
        }

        if (action === 'setUpX') {
            const { value } = payload;
            this.camera.setUpX(value);
        }

        if (action === 'setUpY') {
            const { value } = payload;
            this.camera.setUpY(value);
        }

        if (action === 'setUpZ') {
            const { value } = payload;
            this.camera.setUpZ(value);
        }

    }

    dispatchLight(action, payload) {
        this.light.dispatch(action, payload);
    }

    drawAll(gl, program) {
        this.light.uploadSelf(gl);
        for (let sceneObject of this.objectList) {
            
            sceneObject.self.rotateBy([0, 0, 1]);
            // sceneObject.self.translateBy([0, 0, -0.1]);
            sceneObject.self.drawSelf(gl, program, this.camera);
        }
    }
}

export { Scene }