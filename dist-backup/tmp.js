'use strict';

const PI = Math.PI; // Mouse controls
// set active dial on mouse down.
// horizontal or vertical
// while active
// set direction
// update delta x and y
// draw to canvas

class CanvasSketch {
  constructor() {
    let canvasElement = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;
    let mode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
    let width = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
    let height = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : undefined;
    // state
    this.state = {
      xPos: 0,
      yPos: 0,
      lineSpeed: 5,
      lineColor: '#111',
      // black
      keysPressed: [],
      drawing: false,
      clearCanvas: false,
      fps: 30,
      now: undefined,
      then: Date.now(),
      delta: undefined,
      interval: 1000 / 30,
      activeDial: undefined,
      mouseX: undefined,
      mouseY: undefined,
      mouseDeltaX: undefined,
      mouseDeltaY: undefined,
      mouseDirection: undefined,
      degrees: 0 // Class properties

    };
    this.canvas;
    this.ctx;
    this.mode = mode || 'prod'; // init canvas sketch and state

    this.init(canvasElement, width, height);
    this.setupEvents(); // bind methods

    this.render = this.render.bind(this);
    this.update = this.update.bind(this);
  }
  /**
   * @name init
   * @description initialise canvas element and context.
   * @param {string} canvas element id
   * @param {int} width
   * @param {int} height
   * @return {null}
   */


  init(canvasElement, width, height) {
    this.canvas = document.querySelector("#".concat(canvasElement));
    this.canvas.width = width || this.canvas.clientWidth;
    this.canvas.height = height || this.canvas.clientHeight;
    this.ctx = this.canvas.getContext('2d');
    this.state.xPos = this.canvas.width / 2;
    this.state.yPos = this.canvas.height / 2;
    this.ctx.beginPath();
    this.ctx.moveTo(this.state.xPos, this.state.yPos);
    this.debug();
  }
  /**
   * @name handleMousedown
   * @description sets the active dial from the mouse event object
   * @param {Object} evt: event object
   */


  handleMousedown(evt) {
    const dial = evt.target.dataset.dial;

    if (dial === 'horizontal' || dial === 'vertical') {
      this.state.activeDial = dial;
      this.state.mouseX = evt.pageX;
      this.state.mouseY = evt.pageY;
    }

    if (evt.type === 'mouseup') {
      this.state.activeDial = undefined;
    }

    this.debug();
  }
  /**
   * @name handleMousemove
   * @description takes mouse x and y position
   * @param {object} evt : Event object
   */


  handleMousemove(evt) {
    setTimeout(() => {
      if (this.state.activeDial === undefined) return;
      this.state.mouseDeltaX = Math.abs(evt.pageX - this.state.mouseX);
      this.state.mouseDeltaY = Math.abs(evt.pageY - this.state.mouseY);
      const distance = Math.atan(this.state.mouseDeltaX, this.state.mouseDeltaX, this.state.mouseDeltaY, this.state.mouseDeltaY);
      console.log('---- distance ----', distance);

      if (evt.pageX > this.state.mouseX) {
        this.state.mouseDirection = 'right';
      }

      if (evt.pageX < this.state.mouseX) {
        this.state.mouseDirection = 'left';
      }

      const degrees = distance * (180 / Math.PI);
      this.rotateDial(parseInt(degrees, 10));
    }, 500);
  }
  /**
   * @name rotateDial
   * @Description rotate the active dial based on the distance of mouse movement.
   * @param {integer} degrees
   */


  rotateDial(degrees) {
    const dials = [].slice.call(document.getElementsByClassName('button__dial'));
    console.log('---- degrees ---', degrees);
    dials.forEach(dial => {
      if (dial.dataset.dial === this.state.activeDial) {
        if (this.mouseDirection === 'left') {
          dial.style.transform = "rotate(-".concat(this.state.degrees + degrees, "deg)");
        }

        dial.style.transform = "rotate(".concat(this.state.degrees + degrees, "deg)");
      }

      this.state.degrees = degrees;
    });
  }
  /**
   * @name handleKeyPress
   * @description toggle drawing state on event type and update direction array.
   * @param {Object} evt: event object
   */


  handleKeyPress(evt) {
    const keyCode = evt.keyCode;
    const keycodes = {
      37: 'left',
      38: 'up',
      39: 'right',
      40: 'down'
    };
    const direction = keycodes[keyCode] || undefined;
    if (direction === undefined) return; // on keyup cancel drawing and remove from keys pressed

    if (evt.type === 'keyup') {
      const pressed = this.state.keysPressed.filter(item => !item === direction);
      this.state.keysPressed = pressed;
      this.state.drawing = false;
      return;
    } // add key pressed to state


    if (!this.state.keysPressed.includes(direction)) {
      this.state.keysPressed.push(direction);
    }

    this.state.drawing = true;
    this.debug();
    this.render();
    evt.preventDefault();
  }
  /**
   * @name update
   * @description updates the current state based on keyspressed.
   * @param {none}
   */


  update() {
    let deltaX = 0;
    let deltaY = 0;

    if (this.state.keysPressed.includes('left') && this.state.xPos > 5) {
      deltaX -= this.state.lineSpeed;
    }

    if (this.state.keysPressed.includes('right') && this.state.xPos < this.canvas.width - 5) {
      deltaX += this.state.lineSpeed;
    }

    if (this.state.keysPressed.includes('up') && this.state.yPos > 5) {
      deltaY -= this.state.lineSpeed;
    }

    if (this.state.keysPressed.includes('down') && this.state.yPos < this.canvas.height - 5) {
      deltaY += this.state.lineSpeed;
    }

    this.state.xPos += deltaX;
    this.state.yPos += deltaY;
  }
  /**
   * @name draw
   * @description draw the current state to the canvas.
   * @param {none}
   */


  draw() {
    this.ctx.lineTo(this.state.xPos, this.state.yPos);
    this.ctx.stroke();
  }
  /**
   * @name render
   * @description renders the current state of canvas through update and draw methods.
   * @param {none}
   */


  render() {
    const drawing = this.state.drawing; // draw state to screen

    this.state.now = Date.now();
    this.state.delta = this.state.now - this.state.then;

    if (this.state.delta > this.state.interval) {
      // update state
      this.update();
      this.state.then = this.state.now - this.state.delta % this.state.interval;
      this.draw(); // Run debug if in dev

      if (this.state.mode === 'dev') this.debug();

      if (this.state.drawing) {
        requestAnimationFrame(this.render);
      }
    }
  }
  /**
   * @name clearCanvas
   * @description reset canvas element
   * @param {none}
   */


  resetCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.state.xPos = this.canvas.width / 2;
    this.state.yPos = this.canvas.height / 2;
    this.ctx.beginPath();
    this.ctx.moveTo(this.state.xPos, this.state.yPos);
  }
  /**
   * @name setupEvents
   * @description setup eventlistenrs for canvas UI.
   * @param {none}
   */


  setupEvents() {
    const clearBtn = document.querySelector('.button-clear');
    const leftDial = document.querySelector('#left-dial');
    const rightDial = document.querySelector('#right-dial'); // mouse controls

    clearBtn.addEventListener('click', this.resetCanvas.bind(this));
    leftDial.addEventListener('mousedown', this.handleMousedown.bind(this));
    rightDial.addEventListener('mousedown', this.handleMousedown.bind(this));
    window.addEventListener('mouseup', this.handleMousedown.bind(this));
    window.addEventListener('mouseup', this.handleMousedown.bind(this));
    window.addEventListener('mousemove', this.handleMousemove.bind(this)); // key controls

    window.addEventListener('keydown', this.handleKeyPress.bind(this));
    window.addEventListener('keyup', this.handleKeyPress.bind(this));
  }
  /**
   * @name debug
   * @description print state values and event handler calls to screen.
   * @param {bool} debug
   */


  debug() {
    this.display = document.querySelector('#debug-screen');
    if (this.mode !== 'dev' || !this.display) return;
    const content = "\n        x position: ".concat(this.state.xPos, "\n        y position: ").concat(this.state.yPos, "\n        lineSpeed: ").concat(this.state.lineSpeed, "\n        lineColour: ").concat(this.state.lineColor, "\n        keysPress: ").concat(this.state.keysPressed, "\n        drawing: ").concat(this.state.drawing, "\n        clearCanvas: ").concat(this.state.clearCanvas, "\n        FPS: ").concat(this.state.fps, "\n        NOW: ").concat(this.state.now, "\n        Then: ").concat(this.state.then, "\n        Delta: ").concat(this.state.delta, "\n        Interval: ").concat(this.state.interval, "\n        ActiveDIal: ").concat(this.state.activeDial, "\n        Mouse Direction: ").concat(this.state.mouseDirection, "\n    ");
    this.display.innerHTML = content;
  }

}