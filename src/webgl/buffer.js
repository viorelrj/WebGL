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

class TextureBuffer {
    constructor(gl) {
        this.id = gl.createTexture();
        if (!this.id) { console.error('Failed to create texture buffer'); }
    }
    
    upload(gl, data, textureIndex) {
        const self = this;
        console.log('from Buffer ' + textureIndex)
        const image = new Image();
        image.src = data;
        
        image.onload = function() {
            gl.activeTexture(gl.TEXTURE0 + textureIndex);
            gl.bindTexture(gl.TEXTURE_2D, self.id);
            gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
            // gl.bindTexture(gl.TEXTURE_2D, null);
        }

        // gl.bindTexture(gl.TEXTURE_2D, this.id);
        // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        // gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, data);
    }
}

export {
    IndexBuffer,
    ArrayBuffer,
    TextureBuffer
};