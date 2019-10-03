let gl;
let canvas;

const cubeProps = {
    vertices: [
        // Face
        ...[-1, -1, -1],
        ...[1, -1, -1],
        ...[1, 1, -1],
        ...[-1, 1, -1],

        // Back

        ...[1, -1, 1],
        ...[-1, -1, 1],
        ...[-1, 1, 1],
        ...[1, 1, 1]
    ],

    indices: [
        // Front
        ...[0, 1, 2],
        ...[0, 2, 3],

        // Right
        ...[1, 4, 7],
        ...[1, 7, 2],

        // Left
        ...[5, 0, 3],
        ...[5, 3, 6],

        // Top
        ...[3, 2, 7],
        ...[3, 7, 6],

        // Bottom
        ...[1, 0, 5],
        ...[1, 5, 4],

        // Back
        ...[4, 5, 6],
        ...[4, 6, 7]
    ],

    colors: [
        ...[0, 0, 0],
        ...[0, 0, 1],
        ...[0, 1, 0],
        ...[0, 1, 1],

        ...[1, 0, 0],
        ...[1, 0, 1],
        ...[1, 1, 0],
        ...[1, 1, 1],

    ]
}

class Buffer {
    constructor() {
        this.target = null;
        this.id = null;
    }

    upload(gl, data) {
        const type = (this.target === gl.ELEMENT_ARRAY_BUFFER)? Uint16Array : Float32Array;

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
    constructor (gl, program, name) {
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

        this.verticesBuffer = null;
        this.colorsBuffer = null;
        this.indicesBuffer = null;
    }


    initBuffer() {
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
}

class Square {
    constructor(gl, origin = [0, 0, 0], size = 1) {
        this.vertices = [
            ...[-1, -1, 0],
            ...[1, -1, 0],
            ...[1, 1, 0],
            ...[-1, 1, 0],
        ].map((x) => x * size);

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

        this.verticesBuffer = null;
        this.colorsBuffer = null;
        this.indicesBuffer = null;
    }

    initBuffer() {
        this.verticesBuffer = new ArrayBuffer(gl);
        this.colorsBuffer = new ArrayBuffer(gl);
        this.indicesBuffer = new IndexBuffer(gl);
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
    canvas = document.getElementById("gl-canvas");

    gl = WebGLUtils.setupWebGL(canvas);
    if (!gl) { alert("WebGL isn't available"); }

    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(1.0, 1.0, 1.0, 1.0);

    gl.enable(gl.DEPTH_TEST);

    let program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    return program;
}

window.onload = function init() {
    const program = getProgram();

    const cube = new CanvasObject(cubeProps.vertices, cubeProps.colors, cubeProps.indices);


    cube.initBuffer();
    cube.uploadSelfToBuffer(gl);

    cube.indicesBuffer.activate(gl);
    cube.verticesBuffer.activate(gl);
    const coord = gl.getAttribLocation(program, 'coordinates');
    gl.vertexAttribPointer(coord, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(coord);

    cube.colorsBuffer.activate(gl);
    const color = gl.getAttribLocation(program, 'color');
    gl.vertexAttribPointer(color, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(color);

    const glsl_projectionMatrix = new GLSLVar(gl, program, 'projectionMatrix');
    const glsl_viewMatrix = new GLSLVar(gl, program, 'viewMatrix');
    const glsl_worldMatrix = new GLSLVar(gl, program, 'worldMatrix');

    let worldMatrix= new glMatrix.mat4.create();
    let viewMatrix= new glMatrix.mat4.create();
    let projectionMatrix = new glMatrix.mat4.create();

    glMatrix.mat4.lookAt(viewMatrix, [0, 0, 10], [0, 0, 0], [0, 1, 0]);
    glMatrix.mat4.perspective(projectionMatrix, radians(45), canvas.width / canvas.height, 0.1, 1000.0);

    glsl_worldMatrix.upload(gl, worldMatrix);
    glsl_viewMatrix.upload(gl, viewMatrix);
    glsl_projectionMatrix.upload(gl, projectionMatrix);


    const identityMatrix = glMatrix.mat4.create();
    let angle;

    function render() {
        angle = (performance.now() / 1000) / 6 * (2 * Math.PI);
        glMatrix.mat4.rotate(worldMatrix, identityMatrix, angle, [0, 1, 0]);

        glsl_worldMatrix.upload(gl, worldMatrix);

        // Clear the canvas
        gl.clearColor(0.5, 0.5, 0.5, 1);
        // Clear the color buffer bit
        gl.clear(gl.COLOR_BUFFER_BIT);
        // Draw the triangle
        gl.drawElements(gl.TRIANGLES, cube.getIndicesLength(), gl.UNSIGNED_SHORT, 0);


        requestAnimationFrame(render);
    }

    this.requestAnimationFrame(render);
}