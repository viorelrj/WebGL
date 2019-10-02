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

class ArrayBuffer extends Buffer {
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

class Square {
    constructor() {
        this.vertices = [
            ...[-0.5, -0.5, 0],
            ...[0.5, -0.5, 0],
            ...[0.5, 0.5, 0],
            ...[-0.5, 0.5, 0],
        ];

        this.colors = [
            ...[1, 0, 0],
            ...[0, 1, 0],
            ...[0, 0, 1],
            ...[1, 1, 1]
        ]

        this.indices = [
            ...[0, 1, 2],
            ...[0, 2, 3]
        ]
    }

    getVertices() {
        return this.vertices;
    }

    getIndices() {
        return this.indices;
    }

    getColors() {
        return this.colors;
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

    getColors() {
        return this.colors;
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

    const square = new Square();

    const squareVerticesBuffer = new ArrayBuffer(gl);
    squareVerticesBuffer.upload(gl, square.getVertices());

    const squareColorsBuffer = new ArrayBuffer(gl);
    squareColorsBuffer.upload(gl, square.getColors());

    const squareIndexBuffer = new IndexBuffer(gl);
    squareIndexBuffer.upload(gl, square.getIndices());

    // Make the triangle's indexes as main buffer
    gl.bindBuffer(squareVerticesBuffer.getType(), squareVerticesBuffer.id);
    gl.bindBuffer(squareIndexBuffer.getType(), squareIndexBuffer.id);

    // Get the attribute location
    const coord = gl.getAttribLocation(program, 'coordinates');

    // Point an attribute to the currently bound VBO
    gl.vertexAttribPointer(coord, 3, gl.FLOAT, false, 0, 0);

    // Enable the attribute
    gl.enableVertexAttribArray(coord);


    gl.bindBuffer(squareColorsBuffer.getType(), squareColorsBuffer.id);
    const color = gl.getAttribLocation(program, 'color');
    gl.vertexAttribPointer(color, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(color);


    // Clear the canvas
    gl.clearColor(0.5, 0.5, 0.5, 1);

    // Clear the color buffer bit
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Draw the triangle
    gl.drawElements(gl.TRIANGLES, square.getIndices().length, gl.UNSIGNED_SHORT, 0);
}