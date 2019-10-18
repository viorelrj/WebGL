import { cubeProps, pyramidProps, sphereProps } from './consts.js';
import { CanvasObject } from './webgl/canvas-object';

const objectMap = {
    'cube': {
        counter: 0,
        self: cubeProps
    },
    'pyramid': {
        counter: 0,
        self: pyramidProps
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
    constructor () {
        this.objectList = [];
        this.selectedIndex = 0;
    }

    addObject(gl, program, type) {
        const object = objectMap[type];
        const drawable = new CanvasObject(object.self.vertices, object.self.colors, object.self.indices);
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

    selectIndex(index) {
        this.selectedIndex = index;
        console.log(index);
    }

    dispatch(action, payload) {
        if (action === 'translateBy') {
            const {axisIndex, direction} = payload;
            const object = this.objectList[this.selectedIndex];

            const actionVector = [0, 0, 0];
            actionVector[axisIndex] += direction;
            console.log(actionVector);

            object.self.translateBy(actionVector);
        }
    }

    drawAll(gl, program, camera) {
        for (let sceneObject of this.objectList) {
            sceneObject.self.drawSelf(gl, program, camera);
        }
    }
}

export { Scene }