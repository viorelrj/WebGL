class Camera {
    constructor(
        position,
        focusPoint,
        up,
        width,
        height,
        fov = 45,
        closest = 0.1,
        furthest = 1000.0
    ) {
        this.position = position;
        this.focusPoint = focusPoint;
        this.up = up;

        this.viewWidth = width;
        this.viewHeight= height;
        this.fov = radians(fov);
        this.closest = closest;
        this.furthest = furthest;
    }

    getWarpedView(matrix) {
        glMatrix.mat4.lookAt(matrix, this.position, this.focusPoint, this.up);
        return matrix;
    }

    getWarpedProjection(matrix) {
        glMatrix.mat4.perspective(matrix, this.fov, this.viewWidth / this.viewHeight, this.closest, this.furthest);
        return matrix;
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

    panBy(vec) {
        this._warpProp('position', vec);
        this._warpProp('focusPoint', vec);
    }

    panTo(vec) {
        this._setProp('position', vec);
        this._setProp('focusPoint', vec);
    }

    translateBy(vec) {
        this._warpProp('position', vec);
    }

    translateTo(vec) {
        this._setProp('position', vec);
    }

    moveFocusPointBy(vec) {
        this._warpProp('focusPoint', vec);
    }

    moveFocusPointTo(vec) {
        this._setProp('focusPoint', vec);
    }

    setUpVector(vec) {
        this.up = vec;
    }

    setAspectRatio(x, y) {
        this.viewWidth = x;
        this.viewHeight = y;
    }

    setFov(val) {
        this.fov = radians(val);
    }

    setViewBox(close, far) {
        this.closest = close;
        this.furthest = far;
    }
}

export {
    Camera
}