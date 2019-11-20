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

export {
    IndexBuffer,
    ArrayBuffer
};