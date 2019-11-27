class Mouse {
    constructor() {
        this.obj = null;
        this.mouseMoveDelegates = [];
    }

    bindObject(object) {
        this.obj = object;
    }

    addMouseMoveDelegates(func) {
        
        this.mouseMoveDelegates.push(func);
    }

    _initEventListener(event, delegates) {
        const self = this;
        self.obj.addEventListener(event, function() {
            delegates.map(item => item())
        })
    }

    initMouseMove() {
        this._initEventListener('mousemove', this.mouseMoveDelegates);
    }
}

const mouse = new Mouse();

export { mouse }