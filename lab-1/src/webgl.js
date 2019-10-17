function setPerspective(canvas, obj) {
    glMatrix.mat4.lookAt(obj.viewMatrix, [0, 0, 15], [0, 0, 0], [0, 1, 0]);
    glMatrix.mat4.perspective(obj.projectionMatrix, radians(45), canvas.width / canvas.height, 0.1, 1000.0);
}

class Buffer {
    constructor() {
        this.target = null;
        this.id = null;
    }

    upload(gl, data) {
        const type = (this.target === gl.ELEMENT_ARRAY_BUFFER) ? Uint16Array : Float32Array;

        // Make the buffer active
        gl.bindBuffer(this.target, this.id);
        // Upload data to buffer
        gl.bufferData(this.target, new type(data), gl.STATIC_DRAW);
        // Unbind the buffer
        gl.bindBuffer(this.target, null);
    }

    getType() {
        return this.target;
    }

    activate(gl) {
        gl.bindBuffer(this.target, this.id);
    }
}

class ArrayBuffer extends Buffer {
    constructor(gl) {
        super();
        this.id = gl.createBuffer();
        this.target = gl.ARRAY_BUFFER;
        if (!this.id) { console.error('Failed to create buffer'); }
    }
}

class IndexBuffer extends Buffer {
    constructor(gl) {
        super();
        this.id = gl.createBuffer();
        this.target = gl.ELEMENT_ARRAY_BUFFER;
        if (!this.id) { console.error('Failed to create buffer'); }
    }
}

class GLSLVar {
    constructor(gl, program, name) {
        this.id = gl.getUniformLocation(program, name);
    }

    upload(gl, variable) {
        gl.uniformMatrix4fv(this.id, gl.FALSE, variable);
    }
}

class CanvasObject {
    constructor(vertices = [], colors = [], indices = []) {
        this.vertices = vertices;
        this.colors = colors;
        this.indices = indices;

        this.scale = {
            'x': 1,
            'y': 1,
            'z': 1
        }

        this.verticesBuffer = null;
        this.colorsBuffer = null;
        this.indicesBuffer = null;

        this.worldMatrix = null;
        this.viewMatrix = null;
        this.projectionMatrix = null;
        this.rotationMatrix = null;

        this.glsl_projectionMatrix = null;
        this.glsl_viewMatrix = null;
        this.glsl_worldMatrix = null;
        this.glsl_rotationMatrix = null;
    }

    initBuffer(gl) {
        this.verticesBuffer = new ArrayBuffer(gl);
        this.colorsBuffer = new ArrayBuffer(gl);
        this.indicesBuffer = new IndexBuffer(gl);
    }

    uploadSelfToBuffer(gl) {
        this.verticesBuffer.upload(gl, this.getVertices());
        this.colorsBuffer.upload(gl, this.getColors());
        this.indicesBuffer.upload(gl, this.getIndices());
    }

    getVertices() {
        return this.vertices;
    }

    getIndices() {
        return this.indices;
    }

    getIndicesLength() {
        return this.indices.length
    }

    getColors() {
        return this.colors;
    }

    rotate(gl, identityMatrix, angle, axis) {
        let identity = glMatrix.mat4.create();
        let translator = glMatrix.mat4.create();

        glMatrix.mat4.mul(translator, identity, axis);

        glMatrix.mat4.rotate(this.rotationMatrix, identityMatrix, angle, axis);
        this.glsl_rotationMatrix.upload(gl, this.rotationMatrix);
    }

    setScale(...props) {
        if (props.length == 1) {
            this.scale.x = props[0];
            this.scale.y = props[0];
            this.scale.z = props[0];
        }

        if (props.length == 3) {
            this.scale.x = props[0];
            this.scale.y = props[1];
            this.scale.z = props[2];
        }
    }

    translate(gl, axis) {
        let translator = glMatrix.vec3.clone(axis);


        glMatrix.mat4.fromTranslation(this.worldMatrix, translator);
        this.glsl_worldMatrix.upload(gl, this.worldMatrix);
    }

    initSelf(canvas, gl, program) {
        this.initBuffer(gl);

        this.glsl_projectionMatrix = new GLSLVar(gl, program, 'projectionMatrix');
        this.glsl_viewMatrix = new GLSLVar(gl, program, 'viewMatrix');
        this.glsl_worldMatrix = new GLSLVar(gl, program, 'worldMatrix');
        this.glsl_rotationMatrix = new GLSLVar(gl, program, 'rotationMatrix');

        this.worldMatrix = new glMatrix.mat4.create();
        this.viewMatrix = new glMatrix.mat4.create();
        this.projectionMatrix = new glMatrix.mat4.create();
        this.rotationMatrix = new glMatrix.mat4.create();

        setPerspective(canvas, this);
    }

    activateSelf(gl, program) {
        this.uploadSelfToBuffer(gl);
        this.indicesBuffer.activate(gl);

        this.verticesBuffer.activate(gl);
        const coord = gl.getAttribLocation(program, 'coordinates');
        gl.vertexAttribPointer(coord, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(coord);

        this.colorsBuffer.activate(gl);
        const color = gl.getAttribLocation(program, 'color');
        gl.vertexAttribPointer(color, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(color);

        this.glsl_worldMatrix.upload(gl, this.worldMatrix);
        this.glsl_viewMatrix.upload(gl, this.viewMatrix);
        this.glsl_projectionMatrix.upload(gl, this.projectionMatrix);
        this.glsl_rotationMatrix.upload(gl, this.rotationMatrix);
    }

    drawSelf(gl) {
        gl.drawElements(gl.TRIANGLES, this.getIndicesLength(), gl.UNSIGNED_SHORT, 0);
    }
}

export {
    ArrayBuffer,
    IndexBuffer,
    GLSLVar,
    CanvasObject
}