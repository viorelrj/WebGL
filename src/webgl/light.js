import {GLSLVarVec3, GLSLVarF1} from './primitives';

const props = {
    name: 'light-',
    counter: 1
}

class Light {
    constructor () {
        this.instances = [];
        this.ambient = [.1, .1, .1];
        this.selectedIndex = 0;

        this.glsl_position = null;
        this.glsl_color = null;
        this.glsl_ambient = null;
    }

    add(position = [4, 4, 4], color = [1, 1, 1]) {
        if (this.instances.length < 16) {
            this.instances.push({
                'position': position,
                'color': color,
                'name': props.name + props.counter
            });
            props.counter++
        }
    }

    remove() {
        if (this.selectedIndex >= 0 && this.selectedIndex < this.instances.length) {
            this.instances.splice(this.index);
        }
    }

    initSelf(gl, program) {
        this.glsl_position = new GLSLVarVec3(gl, program, 'lightPosition');
        this.glsl_color = new GLSLVarVec3(gl, program, 'lightColor');
        this.glsl_ambient = new GLSLVarVec3(gl, program, 'ambientLight');
    }

    uploadSelf(gl) {
        if (this.instances.length) {
            let position = [];
            let color = [];
            
            for (let i = 0; i < this.instances.length; i++) {
                position.push(...this.instances[i].position);
                color.push(...this.instances[i].color);
            }

            this.glsl_position.upload(gl, position);
            this.glsl_color.upload(gl, color);
            this.glsl_ambient.upload(gl, this.ambient);
        } else {
            this.glsl_position.upload(gl, [0, 0, 0]);
            this.glsl_color.upload(gl, [0, 0, 0]);
            this.glsl_ambient.upload(gl, this.ambient);
        }
    }

    _setProp(property, vec) {
        this.instances[this.selectedIndex][property] = vec;
    }

    _warpProp(property, vec) {
        const item = this.instances[this.selectedIndex];
        this.instances[this.selectedIndex][property] = [
            item[property][0] + vec[0],
            item[property][1] + vec[1],
            item[property][2] + vec[2],
        ];
    }

    translateBy(translator) {
        this._warpProp('position', translator);
    }

    dispatch(action, payload) {
        if (action === 'translateBy') {
            const { axisIndex, direction } = payload;
            const actionVector = [0, 0, 0];
            actionVector[axisIndex] += direction * 0.2;

            this.translateBy(actionVector);
        }

        if (action === 'remove') {
            this.remove();
        }

        if (action === 'ambientSet') {
            this.ambientSet(payload);
        }

        if (action === 'colorSet') {
            this.colorSet(payload);
        }
    }

    ambientSet(val) {
        this.ambient = val;
    }

    colorSet(val) {
        this._setProp('color', val);
    }
}

export { Light }