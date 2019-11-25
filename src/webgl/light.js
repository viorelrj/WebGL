import {GLSLVarVec3} from './primitives';

class Light {
    constructor () {
        this.instances = [];

        this.glsl_position = null;
        this.glsl_color = null;
    }

    add(position, color) {
        if (this.instances.length < 16) {
            this.instances.push({
                'position': position,
                'color': color
            });
        }
    }

    remove(index) {
        if (index > 0 && index < this.instances.length) {
            this.instances.splice(index);
        }
    }

    initSelf(gl, program) {
        this.glsl_position = new GLSLVarVec3(gl, program, 'lightPosition');
        this.glsl_color = new GLSLVarVec3(gl, program, 'lightColor');
    }

    uploadSelf(gl) {
        const position = [];
        const color = [];
        
        for (let i = 0; i < this.instances.length; i++) {
            position.push(...this.instances[i].position);
            color.push(...this.instances[i].color);
        }

        this.glsl_position.upload(gl, position);
        this.glsl_color.upload(gl, color);
    }
}

export { Light }