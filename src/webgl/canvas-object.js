import {ArrayBuffer, IndexBuffer} from './buffer';
import {GLSLVarMat4, GLSLVarVec3} from './primitives';


class CanvasObject {
    constructor(vertices = [], colors = [], indices = []) {
        this.vertices = vertices;
        this.colors = colors;
        this.indices = indices;

        this.verticesBuffer = null;
        this.colorsBuffer = null;
        this.indicesBuffer = null;

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

    rotateBy(scaler) {
        this._warpProp('rotationProps', scaler);
    }

    rotateSet(scaler) {
        this._setProp('rotationProps', scaler);
    }

    initSelf(gl, program) {
        this.initBuffer(gl);

        this.glsl_projectionMatrix = new GLSLVarMat4(gl, program, 'projectionMatrix');
        this.glsl_viewMatrix = new GLSLVarMat4(gl, program, 'viewMatrix');

        this.glsl_scaleProps = new GLSLVarVec3(gl, program, 'scaleProps');
        this.glsl_translationProps = new GLSLVarVec3(gl, program, 'translationProps');
        this.glsl_rotationProps = new GLSLVarVec3(gl, program, 'rotationProps');

        this.viewMatrix = new glMatrix.mat4.create();
        this.projectionMatrix = new glMatrix.mat4.create();
    }

    drawSelf(gl, program, camera) {
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

        this.viewMatrix = camera.getWarpedView(this.viewMatrix);
        this.projectionMatrix = camera.getWarpedProjection(this.projectionMatrix);

        this.glsl_viewMatrix.upload(gl, this.viewMatrix);
        this.glsl_projectionMatrix.upload(gl, this.projectionMatrix);
        this.glsl_scaleProps.upload(gl, this.scaleProps);
        this.glsl_translationProps.upload(gl, this.translationProps);
        this.glsl_rotationProps.upload(gl, this.rotationProps);

        gl.drawElements(gl.TRIANGLES, this.getIndicesLength(), gl.UNSIGNED_SHORT, 0);
    }
}

export {
    CanvasObject
}