// Creating the buffer object must happen only once

let gl;


class Buffer {
    uploadToBuffer(gl, id, data, vbo = false) {
        const target = (vbo) ? gl.ELEMENT_ARRAY_BUFFER : gl.ARRAY_BUFFER;
        const type = (vbo)? Uint16Array : Float32Array;

        // Make the buffer active
        gl.bindBuffer(target, id);

        // Upload data to buffer
        gl.bufferData(target, new type(data), gl.STATIC_DRAW);

        // Unbind the buffer
        gl.bindBuffer(target, null);
    }
}

class VertexBuffer extends Buffer {
    constructor(gl) {
        super();
        this.id = gl.createBuffer();
        this.target = gl.ARRAY_BUFFER;
        if (!this.id) { console.error('Failed to create buffer'); }
    }

    upload(gl, data) {
        this.uploadToBuffer(gl, this.id, data, false);
    }

    getType() {
        return gl.ARRAY_BUFFER;
    }
}

class IndexBuffer extends Buffer {
    constructor(gl) {
        super();
        this.id = gl.createBuffer();
        this.target = gl.ELEMENT_ARRAY_BUFFER;
        if (!this.id) { console.error('Failed to create buffer'); }
    }

    upload(gl, data) {
        this.uploadToBuffer(gl, this.id, data, true);
    }

    getType() {
        return gl.ELEMENT_ARRAY_BUFFER;
    }
}

class Triangle {
    constructor() {
        this.vertices = [
            ...[-0.5, -0.5, 0],
            ...[0.5, -0.5, 0],
            ...[0.0, 0.5, 0],
        ];
        this.indices = [
            0, 1, 2
        ]
    }

    getVertices() {
        return this.vertices;
    }

    getIndices() {
        return this.indices;
    }
}



function getProgram() {
    const canvas = document.getElementById("gl-canvas");

    gl = WebGLUtils.setupWebGL(canvas);
    if (!gl) { alert("WebGL isn't available"); }

    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(1.0, 1.0, 1.0, 1.0);

    gl.enable(gl.DEPTH_TEST);

    var program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    return program;
}

window.onload = function init() {
    const program = getProgram();
    const triangle = new Triangle();

    const triangleVerticesBuffer = new VertexBuffer(gl);
    triangleVerticesBuffer.upload(gl, triangle.getVertices());

    const triangleIndexBuffer = new IndexBuffer(gl);
    triangleIndexBuffer.upload(gl, triangle.getIndices());


    // Make the triangle's indexes as main buffer
    gl.bindBuffer(triangleVerticesBuffer.getType(), triangleVerticesBuffer.id);
    gl.bindBuffer(triangleIndexBuffer.getType(), triangleIndexBuffer.id);

    // Get the attribute location
    const coord = gl.getAttribLocation(program, 'coordinates');

    // Point an attribute to the currently bound VBO
    gl.vertexAttribPointer(coord, 3, gl.FLOAT, false, 0, 0);

    // Enable the attribute
    gl.enableVertexAttribArray(coord);

    // Clear the canvas
    gl.clearColor(0.5, 0.5, 0.5, 1);

    // Clear the color buffer bit
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Draw the triangle
    gl.drawElements(gl.TRIANGLES, triangle.getIndices().length, gl.UNSIGNED_SHORT, 0);
}