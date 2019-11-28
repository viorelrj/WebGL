class Mouse {
    constructor() {
        this.obj = null;
        this.mouseMoveDelegates = [];
        this.mouseDownDelegates = [];
    }

    bindObject(object) {
        this.obj = object;
    }

    initListeners(){
        this._preventContextMenu();
        this.initMouseMove();
        this.initMouseDown();
    }

    _preventContextMenu() {
        this.obj.addEventListener('contextmenu', (e) => e.preventDefault())
    }

    _initEventListener(event, delegates, payload) {
        const self = this;
        self.obj.addEventListener(event, function (e) {
            delegates.map(item => item(payload, e))
        })
    }

    addMouseMoveDelegate(func) {
        this.mouseMoveDelegates.push(func);
    }

    initMouseMove() {
        const payload = {x: 'x', y: 'y'}
        this._initEventListener('mousemove', this.mouseMoveDelegates, payload);
    }

    initMouseDown() {
        const payload = { x: 'x', y: 'y' }
        const mouseDownFunctions = [];
        
        mouseDownFunctions.push(this._handleLeftBtnDown);
        mouseDownFunctions.push(this._handleRightBtnDown);
        mouseDownFunctions.push(this._handleMiddleBtnDown);

        this._initEventListener('mousedown', mouseDownFunctions, payload);
    }

    _handleLeftBtnDown(payload, e) {
        if (e.which === 1 || e.button === 0) {
            console.log('left button down!');
        }
    }

    _handleRightBtnDown(payload, e) {
        if (e.which === 3 || e.button === 2) {
            e.preventDefault();
            console.log('right button down!')
        }
    }

    _handleMiddleBtnDown(payload, e) {
        if (e.which === 2 || e.button === 1) {
            console.log('Middle button clicked!');
        }
    }
}

const mouse = new Mouse();

export { mouse }