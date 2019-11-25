import {ArrayBuffer, IndexBuffer} from './buffer';
import {GLSLVarMat4, GLSLVarVec3, GLSLVarF1} from './primitives';


class CanvasObject {
    constructor(vertices = [], colors = [], indices = [], normals=[], VBO = true) {
        this.meta = {}
        this.meta.isVBO = VBO;

        this.setVertices(vertices, indices, colors, normals);

        this.verticesBuffer = null;
        this.colorsBuffer = null;
        this.indicesBuffer = null;
        this.normalsBuffer = null;

        this.scaleProps = [1, 1, 1]
        this.translationProps = [0, 0, 0];
        this.rotationProps = [0, 0, 0];

        this.shininess = .1;
        this.ambient = [1, 1, 1];
        this.diffuse = [1, 1, 1];
        this.specular = [1, 1, 1];

        this.viewMatrix = null;
        this.projectionMatrix = null;

        this.glsl_viewMatrix = null;
        this.glsl_projectionMatrix = null;
        this.glsl_scaleProps = null;
        this.glsl_translationProps = null;
        this.glsl_rotationProps = null;
        this.glsl_shininess = null;
        this.glsl_ambient = null;
        this.glsl_diffuse = null;
        this.glsl_specular = null;
    }

    setVertices(vertices, indices, colors, normals) {
        if (this.meta.isVBO) {
            this.vertices = vertices;
            this.indices = indices;
            this.colors = colors;
            this.normals = normals;
        } else {
            this.indices = indices;

            const _vertices = [];
            const _colors = []
            
            for (let i = 0; i < indices.length; i++) {
                _vertices.push(
                    vertices[indices[i] * 3 + 0],
                    vertices[indices[i] * 3 + 1],
                    vertices[indices[i] * 3 + 2]
                )

                _colors.push(
                    colors[indices[i] * 3 + 0],
                    colors[indices[i] * 3 + 1],
                    colors[indices[i] * 3 + 2]
                )
            }

            this.vertices = _vertices;
            this.colors = _colors;
            this.normals = this.getStandartNormals();
        }
    }

    getStandartNormals() {
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

    getPoint(index) {
        index *= 3;
        return glMatrix.vec3.fromValues(
            this.vertices[index + 0],
            this.vertices[index + 1],
            this.vertices[index + 2],
        )
    }

    getTriangles() {
        let triangles = [];

        for (let i = 0; i < this.vertices.length / 3; i += 3) {
            triangles.push([
                this.getPoint(i + 0),
                this.getPoint(i + 1),
                this.getPoint(i + 2)
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
        return this.vertices;
    }

    getVerticesLength() {
        return this.vertices.length;
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

    rotateBy(rotator) {
        this._warpProp('rotationProps', rotator);
    }

    rotateSet(rotator) {
        this._setProp('rotationProps', rotator);
    }

    specularSet(val) {
        this._setProp('specular', val);
    }

    ambientSet(val) {
        this._setProp('ambient', val);
    }

    diffuseSet(val) {
        this._setProp('diffuse', val);
    }

    shininessSet(val) {
        this._setProp('shininess', val);
    }

    initSelf(gl, program) {
        this.initBuffer(gl);

        this.glsl_projectionMatrix = new GLSLVarMat4(gl, program, 'projectionMatrix');
        this.glsl_viewMatrix = new GLSLVarMat4(gl, program, 'viewMatrix');

        this.glsl_scaleProps = new GLSLVarVec3(gl, program, 'scaleProps');
        this.glsl_translationProps = new GLSLVarVec3(gl, program, 'translationProps');
        this.glsl_rotationProps = new GLSLVarVec3(gl, program, 'rotationProps');

        this.glsl_shininess = new GLSLVarF1(gl, program, 'material_shininess');
        this.glsl_ambient = new GLSLVarVec3(gl, program, 'material_ambient');
        this.glsl_diffuse = new GLSLVarVec3(gl, program, 'material_diffuse');
        this.glsl_specular = new GLSLVarVec3(gl, program, 'material_specular');

        this.viewMatrix = new glMatrix.mat4.create();
        this.projectionMatrix = new glMatrix.mat4.create();
    }

    uploadUniforms(gl) {
        this.glsl_viewMatrix.upload(gl, this.viewMatrix);
        this.glsl_projectionMatrix.upload(gl, this.projectionMatrix);
        this.glsl_scaleProps.upload(gl, this.scaleProps);
        this.glsl_translationProps.upload(gl, this.translationProps);
        this.glsl_rotationProps.upload(gl, this.rotationProps);
        
        this.glsl_shininess.upload(gl, this.shininess);
        this.glsl_ambient.upload(gl, this.ambient);
        this.glsl_diffuse.upload(gl, this.diffuse);
        this.glsl_specular.upload(gl, this.specular);
    }

    uploadAttributes(gl, program) {
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
    }

    drawSelf(gl, program, camera) {
        this.uploadSelfToBuffer(gl);

        if (this.meta.isVBO) {
            this.indicesBuffer.activate(gl);
        }

        this.uploadAttributes(gl, program);

        this.viewMatrix = camera.getWarpedView(this.viewMatrix);
        this.projectionMatrix = camera.getWarpedProjection(this.projectionMatrix);
        this.uploadUniforms(gl);

        if (this.meta.isVBO) {
            gl.drawElements(gl.TRIANGLES, this.getIndicesLength(), gl.UNSIGNED_SHORT, 0);
        } else {
            gl.drawArrays(gl.TRIANGLES, 0, this.getVerticesLength() / 3);
        }
    }
}

export {
    CanvasObject
}