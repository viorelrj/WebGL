class GLSLVar {
    constructor(gl, program, name, dataType = 'uniformMatrix4fv') {
        this.id = gl.getUniformLocation(program, name);
        this.dataType = dataType;
    }

    _uploadTranspose(gl, variable) {
        gl[this.dataType](this.id, gl.FALSE, variable);
    }

    _uploadNoTranspose(gl, variable) {
        gl[this.dataType](this.id, variable);
    }
}

class GLSLVarMat4 extends GLSLVar {
    constructor(gl, program, name) {
        super(gl, program, name, 'uniformMatrix4fv');
    }

    upload(gl, variable) {
        this._uploadTranspose(gl, variable)
    }
}

class GLSLVarVec3 extends GLSLVar {
    constructor(gl, program, name) {
        super(gl, program, name, 'uniform3fv');
    }

    upload(gl, variable) {
        this._uploadNoTranspose(gl, variable);
    }
}

export {
    GLSLVarMat4,
    GLSLVarVec3
}