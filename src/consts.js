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
        ...[0.231372549, 0.403921569, 0.749019608],
        ...[0.231372549, 0.403921569, 0.749019608],
        ...[0.231372549, 0.403921569, 0.749019608],
        ...[0.231372549, 0.403921569, 0.749019608],

        ...[0.231372549, 0.403921569, 0.749019608],
        ...[0.231372549, 0.403921569, 0.749019608],
        ...[0.231372549, 0.403921569, 0.749019608],
        ...[0.231372549, 0.403921569, 0.749019608]
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

    let colors = [];
    for (let i = 0; i < vertices.length; i++) {
        colors.push(
            ...[0.231372549, 0.403921569, 0.749019608]
        )
    }

    let indices = [];

    let k1, k2;
    for (let i = 0; i < stackCount; i++) {
        k1 = i * (sectorCount + 1);
        k2 = k1 + sectorCount + 1;
        
        for (let j = 0; j < sectorCount; j++ , k1++ , k2++) {
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

function createCone(precision = 10, radius = 1) {
    let vertices = []
    let colors = []
    let step = Math.PI * 2 / precision;
    for(let i = 0; i < precision; i++) {
        vertices.push(Math.cos(i * step))
        vertices.push(Math.sin(i * step))
        vertices.push(0)
        colors.push(...[.4, .4, .4])
    }
    colors.push(...[.4, .4, .4])
    colors.push(...[.4, .4, .4])
    vertices.push(...[0, 0, 4])
    vertices.push(...[0, 0, 0]);

    let indices = [];

    for (let i = 0; i < precision - 1; i++) {
        indices.push(
            ...[i, i + 1, precision],
            ...[i, i + 1, precision + 1]
        )
    }

    indices.push(
        ...[precision - 1, 0, precision],
        ...[precision - 1, 0, precision + 1]
    )

    return {
        vertices: vertices,
        indices: indices,
        colors: colors
    }
}

// const sphereProps = createSphere(10, 1);
const coneProps = createCone(20);

export {cubeProps, pyramidProps, coneProps};