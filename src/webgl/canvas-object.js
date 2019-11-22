import {ArrayBuffer, IndexBuffer} from './buffer';
import {GLSLVarMat4, GLSLVarVec3} from './primitives';


class CanvasObject {
    constructor(vertices = [], colors = [], indices = []) {
        this.vertices = vertices;
        this.colors = colors;
        this.indices = indices;
        this.normals = this.fillNormals();
        this.unoptimizedVertices = this.getUnoptimizedVertices();
        this.unoptimizedColors = this.getUnoptimizedColors();

        this.verticesBuffer = null;
        this.colorsBuffer = null;
        this.indicesBuffer = null;
        this.normalsBuffer = null;

        this.scaleProps = [1, 1, 1]
        this.translationProps = [0, 0, 0];
        this.rotationProps = [0, 0, 0];

        this.viewMatrix = null;
        this.projectionMatrix = null;


        this.glsl_viewMatrix = null;
        this.glsl_projectionMatrix = null;
        this.glsl_scaleProps = null;
        this.glsl_translationProps = null;
        this.glsl_rotationProps = null;
    }

    fillNormals() {
        const triangles = this.getTriangles();
        let normals = []

        function calculateNormal(a, b, c) {
            // 3 main lines of NORMALS CALCULATION FOR 1 TRIANGLE WITH VERTICES a, b, c!
            let t1 = glMatrix.vec3.create();
            let t2 = glMatrix.vec3.create();
            let normal = glMatrix.vec3.create();

            glMatrix.vec3.subtract(t1, b, a);
            glMatrix.vec3.subtract(t2, c, a);

            glMatrix.vec3.cross(normal, t2, t1);
            glMatrix.vec3.normalize(normal, normal);

            // converting vec3 to vec4, not needed if you send only vec3 to shaders, needed otherwise
            return normal;
        }

        for (let triangle of triangles) {
            normals.push(...calculateNormal(triangle[0], triangle[1], triangle[2]));
            normals.push(...calculateNormal(triangle[0], triangle[1], triangle[2]));
            normals.push(...calculateNormal(triangle[0], triangle[1], triangle[2]));
        }

        return normals;
    }

    getUnoptimizedVertices() {
        const verts = [];
        
        for (let i = 0; i < this.indices.length; i++) {
            verts.push(
                this.vertices[this.indices[i]*3],
                this.vertices[this.indices[i]*3 + 1],
                this.vertices[this.indices[i]*3 + 2]
            )
        }

        return verts;
    }

    getUnoptimizedColors() {
        const colors = [];

        for (let i = 0; i < this.indices.length; i++) {
            colors.push(
                this.colors[this.indices[i] * 3],
                this.colors[this.indices[i] * 3 + 1],
                this.colors[this.indices[i] * 3 + 2]
            )
        }

        return colors;
    }

    getPoint(index) {
        index *= 3;
        return glMatrix.vec3.fromValues(
            this.vertices[index],
            this.vertices[index + 1],
            this.vertices[index + 2],
        )
    }

    getTriangles() {
        let triangles = [];

        for (let i = 0; i < this.indices.length; i += 3) {;
            triangles.push([
                this.getPoint(this.indices[i]),
                this.getPoint(this.indices[i + 1]),
                this.getPoint(this.indices[i + 2])
            ]);
        }

        return triangles;
    }

    initBuffer(gl) {
        this.verticesBuffer = new ArrayBuffer(gl);
        this.colorsBuffer = new ArrayBuffer(gl);
        this.indicesBuffer = new IndexBuffer(gl);
        this.normalsBuffer = new ArrayBuffer(gl);
    }

    uploadSelfToBuffer(gl) {

        this.verticesBuffer.upload(gl, this.getVertices());
        this.colorsBuffer.upload(gl, this.getColors());
        this.indicesBuffer.upload(gl, this.getIndices());
        this.normalsBuffer.upload(gl, this.getNormals());
    }

    getVertices() {
        return this.unoptimizedVertices;
    }

    getIndices() {
        return this.indices;
    }

    getNormals() {
        return this.normals;
    }

    getIndicesLength() {
        return this.indices.length
    }

    getColors() {
        return this.unoptimizedColors;
    }

    _setProp(property, vec) {
        this[property] = vec;
    }

    _warpProp(property, vec) {
        this[property] = [
            this[property][0] + vec[0],
            this[property][1] + vec[1],
            this[property][2] + vec[2],
        ];
    }

    translateBy(translator) {
        this._warpProp('translationProps', translator);
    }

    translateSet(translator) {
        this._setProp('translationProps', translator)
    }

    scaleBy(scaler) {
        this._warpProp('scaleProps', scaler);
    }

    scaleSet(scaler) {
        this._setProp('scaleProps', scaler);
    }

    rotateBy(rotator) {
        this._warpProp('rotationProps', rotator);
    }

    rotateSet(rotator) {
        this._setProp('rotationProps', rotator);
    }

    initSelf(gl, program) {
        this.initBuffer(gl);

        this.glsl_projectionMatrix = new GLSLVarMat4(gl, program, 'projectionMatrix');
        this.glsl_viewMatrix = new GLSLVarMat4(gl, program, 'viewMatrix');

        this.glsl_lightPosition = new GLSLVarVec3(gl, program, 'lightPosition');
        this.glsl_scaleProps = new GLSLVarVec3(gl, program, 'scaleProps');
        this.glsl_translationProps = new GLSLVarVec3(gl, program, 'translationProps');
        this.glsl_rotationProps = new GLSLVarVec3(gl, program, 'rotationProps');

        this.viewMatrix = new glMatrix.mat4.create();
        this.projectionMatrix = new glMatrix.mat4.create();
    }

    drawSelfElements(gl, program, camera) {
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

        this.normalsBuffer.activate(gl);
        const normals = gl.getAttribLocation(program, 'normals');
        gl.vertexAttribPointer(normals, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(normals);

        this.viewMatrix = camera.getWarpedView(this.viewMatrix);
        this.projectionMatrix = camera.getWarpedProjection(this.projectionMatrix);

        this.glsl_viewMatrix.upload(gl, this.viewMatrix);
        this.glsl_projectionMatrix.upload(gl, this.projectionMatrix);
        this.glsl_scaleProps.upload(gl, this.scaleProps);
        this.glsl_translationProps.upload(gl, this.translationProps);
        this.glsl_rotationProps.upload(gl, this.rotationProps);

        gl.drawElements(gl.TRIANGLES, this.getIndicesLength(), gl.UNSIGNED_SHORT, 0);
    }

    drawSelfTriangles(gl, program, camera) {
        this.uploadSelfToBuffer(gl);

        this.verticesBuffer.activate(gl);
        const coord = gl.getAttribLocation(program, 'coordinates');
        gl.vertexAttribPointer(coord, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(coord);

        this.colorsBuffer.activate(gl);
        const color = gl.getAttribLocation(program, 'color');
        gl.vertexAttribPointer(color, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(color);

        this.normalsBuffer.activate(gl);
        const normals = gl.getAttribLocation(program, 'normals');
        gl.vertexAttribPointer(normals, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(normals);

        this.viewMatrix = camera.getWarpedView(this.viewMatrix);
        this.projectionMatrix = camera.getWarpedProjection(this.projectionMatrix);

        this.glsl_lightPosition.upload(gl, [4, 4, -4]);
        this.glsl_viewMatrix.upload(gl, this.viewMatrix);
        this.glsl_projectionMatrix.upload(gl, this.projectionMatrix);
        this.glsl_scaleProps.upload(gl, this.scaleProps);
        this.glsl_translationProps.upload(gl, this.translationProps);
        this.glsl_rotationProps.upload(gl, this.rotationProps);

        gl.drawArrays(gl.TRIANGLES, 0, this.getVertices().length);
    }

    drawSelf(gl, program, camera) {
        this.drawSelfTriangles(gl, program, camera)
    }
}

export {
    CanvasObject
}