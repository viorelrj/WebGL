const setSize = function (canvas, gl, scene) {
    const body = document.getElementById('body');
    const height = body.offsetHeight;
    const width = body.offsetWidth;

    canvas.height = height;
    canvas.width = width;
    gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);

    if (scene) {
        scene.camera.setHeight(height);
        scene.camera.setWidth(width);
    }
}

export { setSize };