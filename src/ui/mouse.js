class Mouse {
    constructor() {
        this.obj = null;
        this.mouseMoveDelegates = [];
    }

    bindObject(object) {
        this.obj = object;
    }

    initListeners(){
        this.initMouseMove();
    }

    addMouseMoveDelegate(func) {
        this.mouseMoveDelegates.push(func);
    }

    _initEventListener(event, delegates, payload) {
        const self = this;
        self.obj.addEventListener(event, function() {
            delegates.map(item => item(payload))
        })
    }

    initMouseMove() {
        const payload = {x: 'x', y: 'y'}
        this._initEventListener('mousemove', this.mouseMoveDelegates, payload);
    }
}

const mouse = new Mouse();

export { mouse }