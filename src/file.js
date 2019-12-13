function getFileContent(file) {
    return new Promise((resolve, reject) => {
        let reader = new FileReader();

        reader.onload = () => {
            resolve(reader.result);
        };

        reader.onerror = reject;

        reader.readAsText(file);
    })
}

async function parseWaveFront(file) {
    let content = await getFileContent(file);
    let lines = content.split('\n');

    let preNormals = [];
    let normalsIndex = [];

    let preTextures = [];
    let textureIndex = [];

    const obj = {
        vertices: [],
        verticesTextures: [],
        normals: [],

        vertexIndices: [],
        textureIndices: [],
        normalsIndices: []
    }

    const pushLineInto = (line, point) => {
        line = line.slice(3, line.length);
        line = line.split(' ');
        line.map(num => point.push(parseFloat(num)))
    } 

    lines.map(line => {
        if (line.startsWith('v ')) {
            pushLineInto(line, obj.vertices);
        } else if (line.startsWith('vn')) {
            line = line.slice(3, line.length);
            line = line.split(' ');
            preNormals.push(line.map(num => parseFloat(num)))
        } else if (line.startsWith('vt ')) {
            line = line.slice(3, line.length);
            line = line.split(' ');
            obj.verticesTextures.push(
                parseInt(line[0]),
                parseInt(line[2])
            )
        } else if (line.startsWith('f ')) {
            line = line.slice(2, line.length - 2);
            line = line.split(' ');
            line.map(item => {
                item = item.split('/')
                obj.vertexIndices.push(parseInt(item[0]) - 1)
                obj.textureIndices.push(parseInt(item[1]) - 1)
                normalsIndex.push(parseInt(item[2]) - 1)
            })
        }
    })

    normalsIndex.map(index => {
        obj.normals.push(
        preNormals[index][0],
        preNormals[index][1],
        preNormals[index][2],
    )})

    return obj;
}

export {parseWaveFront}