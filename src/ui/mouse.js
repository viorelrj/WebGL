const PRIMARY = 'primary';
const SECONDARY = 'secondary';
const MIDDLE = 'middle';

/*

    The module exports only the instance of Mouse class.
    It listens to all mouse events and processes them.
    For now, at the start of the program, we should bind the html node to the instance with bindObject().

    Create an event listener is initiated with _initEventListener().
    It should be called only once for every event type.
    Should be called with delegates which is either a function, or an array of functions.
    The delegates item/s will be executed for every fire of the event.

*/

class Mouse {
    constructor() {
        this.obj = null;
        this.lastClick = {
            x: null,
            y: null
        }
    }

    bindObject(object) {
        this.obj = object;
    }

    _setLastClick(x, y) {
        this.lastClick = {
            x: x,
            y: y
        }
    }

    _getLastClickVector() {
        return [this.lastClick.x, this.lastClick.y];
    }

    _getClientVector(e) {
        return [e.clientX, e.clientY];
    }

    _preventContextMenu() {
        this.obj.addEventListener('contextmenu', (e) => e.preventDefault())
    }

    _getMousePosition(e) {
        return {
            'x': e.clientX,
            'y': e.clientY
        }
    }

    _getMouseClick(e) {
        if (e.which === 1) {
            return PRIMARY;
        } else if (e.which === 3) {
            return SECONDARY;
        } else if (e.which === 2) {
            return MIDDLE
        }

        return false;
    }

    _getMouseMoveDirection(e) {
        const lastClick = this._getLastClickVector();
        const client = this._getClientVector(e);
        const result = client.map((item, index) => item - lastClick[index]);
        this._setLastClick(e.clientX, e.clientY);
        return result;
    }

    _initEventListener(event, delegates) {
        const self = this;
        self.obj.addEventListener(event, function (e) {
            if (Array.isArray(delegates)) {
                delegates.map(item => item(e))
            } else {
                delegates(e);
            }
        })
    }

    initListeners(){
        this._preventContextMenu();
        this.initMouseMove();
        this.initMouseDown();
    }

    registerMouseClick(e) {
        if(this._getMouseClick(e) == PRIMARY) {
            this._setLastClick(e.clientX, e.clientY);
        }
    }

    initMouseDown() {
        this._initEventListener('mousedown', this.registerMouseClick.bind(this))
    }

    initMouseMove() {
        this._initEventListener('mousemove', this.interpretMouseMove.bind(this));
    }

    interpretMouseMove(e) {
        if (this._getMouseClick(e) === PRIMARY) {
            console.log(this._getMouseMoveDirection(e));
        } else if (this._getMouseClick(e) === SECONDARY) {
            console.log('dragging secondary')
        } else if (this._getMouseClick(e) === MIDDLE) {
            console.log('dragging middle')
        } else if (!!!this._getMouseClick(e)) {
            console.log('just moving')
        }
    }
}

const mouse = new Mouse();

export { mouse }