let gl;
let canvas;

const identityMatrix = glMatrix.mat4.create();

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

        this.glsl_projectionMatrix = null;
        this.glsl_viewMatrix = null;
        this.glsl_worldMatrix = null;
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

    rotate(gl, identityMatrix, angle, axis) {
        glMatrix.mat4.rotate(this.worldMatrix, identityMatrix, angle, axis);
        this.glsl_worldMatrix.upload(gl, this.worldMatrix);
    }

    initSelf(canvas, gl, program) {
        this.initBuffer();

        this.glsl_projectionMatrix = new GLSLVar(gl, program, 'projectionMatrix');
        this.glsl_viewMatrix = new GLSLVar(gl, program, 'viewMatrix');
        this.glsl_worldMatrix = new GLSLVar(gl, program, 'worldMatrix');

        this.worldMatrix = new glMatrix.mat4.create();
        this.viewMatrix = new glMatrix.mat4.create();
        this.projectionMatrix = new glMatrix.mat4.create();

        glMatrix.mat4.lookAt(this.viewMatrix, [0, 0, 10], [0, 0, 0], [0, 1, 0]);
        glMatrix.mat4.perspective(this.projectionMatrix, radians(45), canvas.width / canvas.height, 0.1, 1000.0);
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
    }

    drawSelf(gl) {
        gl.drawElements(gl.TRIANGLES, this.getIndicesLength(), gl.UNSIGNED_SHORT, 0);
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
    cube.initSelf(canvas, gl, program);
    
    const secondCube = new CanvasObject(cubeProps.vertices.map(x => x + 3), cubeProps.colors, cubeProps.indices);
    secondCube.initSelf(canvas, gl, program);
    
    let angle;
    function render() {
        angle = (performance.now() / 1000) / 6 * (2 * Math.PI);

        gl.clearColor(0.5, 0.5, 0.5, 1);
        gl.clear(gl.COLOR_BUFFER_BIT);
        
        cube.rotate(gl, identityMatrix, angle, [0, 1, 0]);
        cube.activateSelf(gl, program);
        cube.drawSelf(gl);
        
        secondCube.rotate(gl, identityMatrix, angle, [0, 1, 0]);
        secondCube.activateSelf(gl, program);
        secondCube.drawSelf(gl);

        requestAnimationFrame(render);
    }

    this.requestAnimationFrame(render);
}