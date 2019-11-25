import {GLSLVarVec3} from './primitives';

class Light {
    constructor (position, color) {
        this.position = position;
        this.color = color;

        this.glsl_position = null;

    }

    initSelf(gl, program) {
        this.glsl_position = new GLSLVarVec3(gl, program, 'lightPosition');
        this.glsl_color = new GLSLVarVec3(gl, program, 'lightColor');
    }

    uploadSelf(gl) {
        this.glsl_position.upload(gl, this.position);
        this.glsl_color.upload(gl, this.color);
    }
}

export { Light }