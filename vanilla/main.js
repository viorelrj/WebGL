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

const pyramidProps = {
    vertices: [
        // top
        ...[0, 1, 0],

        // Front left
        ...[0.5, 0, -0.5],

        // Front right
        ...[0.5, 0, -0.5],

        // back right
        ...[0.5, 0, 0.5],

        // back left
        ...[-0.5, 0, 0.5],
    ],

    indices: [
        ...[4, 2, 1],
        ...[4, 3, 2],
        ...[1, 2, 0],
        ...[2, 3, 0],
        ...[3, 4, 0],
        ...[4, 1, 0],
    ],
    colors: [
        ...[1, .75, 0.796078],
        ...[1, 1, 0],
        ...[1, 1, 0],
        ...[1, 1, 0],
        ...[1, 1, 0],
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
        let identity = glMatrix.mat4.create();
        let translator = glMatrix.mat4.create();

        glMatrix.mat4.mul(translator, identity, axis);

        glMatrix.mat4.rotate(this.rotationMatrix, identityMatrix, angle, axis);
        this.glsl_rotationMatrix.upload(gl, this.rotationMatrix);
    }

    setScale(...props) {
        if (props.length  == 1) {
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
        this.initBuffer();

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

function setPerspective(canvas, obj) {
    glMatrix.mat4.lookAt(obj.viewMatrix, [0, 0, 15], [0, 0, 0], [0, 1, 0]);
    glMatrix.mat4.perspective(obj.projectionMatrix, radians(45), canvas.width / canvas.height, 0.1, 1000.0);
}

function createSphere(precision = 3, radius = 1) {
    let x, y, z, xy;

    let sectorCount = precision;
    let stackCount = precision;

    let sectorStep = 2 * Math.PI / sectorCount;
    let stackStep = Math.PI / stackCount;
    let sectorAngle, stackAngle;

    let vertices = [];
    for (let i = 0; i <= stackCount; i++) {
        stackAngle = Math.PI / 2 - i * stackStep;
        xy = radius * Math.cos(stackAngle);
        z = radius * Math.sin(stackAngle);

        for (let j = 0; j <= sectorCount; ++j) {
            sectorAngle = j * sectorStep;

            x = xy * Math.cos(sectorAngle);
            y = xy * Math.sin(sectorAngle);
            vertices.push(x);
            vertices.push(y);
            vertices.push(z);
        }
    }

    colors = [];
    let length = vertices.length
    for (let i = 0; i < vertices.length; i++) {
        colors.push(
            ...[
                Math.random() * 10 * i / length,
                Math.random() * 10 * i / length,
                Math.random() * 10 * i / length
            ]
        )
    }

    indices = [];

    let k1, k2;
    for (let i = 0; i < stackCount; i++) {
        k1 = i * (sectorCount + 1);
        k2 = k1 + sectorCount + 1;

        for (let j = 0; j < sectorCount; j++, k1++, k2++) {
            if (i != 0) {
                indices.push(k1);
                indices.push(k2);
                indices.push(k1 + 1);
            }

            if (i != (stackCount - 1)) {
                indices.push(k1 + 1);
                indices.push(k2);
                indices.push(k2 + 1);
            }
        }
    }

    return {
        vertices: vertices,
        indices: indices,
        colors: colors
    }

}

window.onload = function init() {
    const program = getProgram();

    const cube = new CanvasObject(cubeProps.vertices, cubeProps.colors, cubeProps.indices);
    cube.initSelf(canvas, gl, program);

    let angle;
    function render() {
        angle = (performance.now() / 1000) / 6 * (2 * Math.PI);

        gl.clearColor(0.9, 0.9, 0.9, 1);
        gl.clear(gl.COLOR_BUFFER_BIT);

        cube.activateSelf(gl, program);
        cube.rotate(gl, identityMatrix, angle, [0, 1, .3]);
        cube.drawSelf(gl);


        requestAnimationFrame(render);
    }

    this.requestAnimationFrame(render);
}