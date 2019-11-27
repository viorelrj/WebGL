const setSize = function (canvas, gl, scene) {
    const body = document.getElementById('body');
    const height = body.offsetHeight;
    const width = body.offsetWidth;

    canvas.style.height = height + 'px';
    canvas.style.width = width + 'px';
    gl.viewport(0, 0, canvas.width, canvas.height);

    if (scene) {
        scene.camera.setHeight(height);
        scene.camera.setWidth(width);
    }
}

export { setSize };