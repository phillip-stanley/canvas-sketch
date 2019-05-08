'use strict';

class CanvasSketch {
  constructor(
    canvasElement = undefined,
    mode = undefined,
    width = undefined,
    height = undefined,
  ) {

    // state
    this.state = {
      xPos: 0,
      yPos: 0,
      lineSpeed: 5,
      lineColor: '#111', // black
      keysPressed: [],
      drawing: false,
      clearCanvas: false,
      fps: 30,
      now: undefined,
      then: Date.now(),
      delta: undefined,
      interval: (1000 / 30)
    }

    // Class properties
    this.canvas;
    this.ctx;
    this.mode = mode || 'prod';

    // init canvas sketch and state
    this.init(canvasElement, width, height);
    this.setupEvents();

    // bind methods
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
    this.canvas = document.querySelector(`#${canvasElement}`);
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
   * @name handleKeyPress
   * @description toggle drawing state on event type and update direction array.
   * @param {Object} evt: event object
   */
  handleKeyPress(evt) {
    const { keyCode } = evt;

    const keycodes = {
      37: 'left',
      38: 'up',
      39: 'right',
      40: 'down'
    }
    const direction = keycodes[keyCode] || undefined;
    if(direction === undefined) return;

    // on keyup cancel drawing and remove from keys pressed
    if (evt.type === 'keyup') {
      const pressed = this.state.keysPressed.filter(item => !item === direction);
      this.state.keysPressed = pressed;
      this.state.drawing = false;
      return;
    }

    // add key pressed to state
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

    if (this.state.keysPressed.includes('right') && this.state.xPos < (this.canvas.width - 5)) {
      deltaX += this.state.lineSpeed;
    }

    if (this.state.keysPressed.includes('up') && this.state.yPos > 5) {
      deltaY -= this.state.lineSpeed;
    }

    if (this.state.keysPressed.includes('down') && this.state.yPos < (this.canvas.height - 5)) {
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
    const { drawing } = this.state;

    // draw state to screen
    this.state.now = Date.now();
    this.state.delta = (this.state.now - this.state.then);

    if (this.state.delta > this.state.interval) {

      // update state
      this.update();

      this.state.then = this.state.now - (this.state.delta % this.state.interval);
      this.draw();

      // Run debug if in dev
      if(this.state.mode === 'dev') this.debug();

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
    window.addEventListener('keydown', this.handleKeyPress.bind(this));
    window.addEventListener('keyup', this.handleKeyPress.bind(this));
    clearBtn.addEventListener('click', this.resetCanvas.bind(this));
  }
  /**
   * @name debug
   * @description print state values and event handler calls to screen.
   * @param {bool} debug
   */
  debug() {
    this.display = document.querySelector('#debug-screen');
    if (this.mode !== 'dev' || !this.display) return;
    const content = `
        x position: ${this.state.xPos}
        y position: ${this.state.yPos}
        lineSpeed: ${this.state.lineSpeed}
        lineColour: ${this.state.lineColor}
        keysPress: ${this.state.keysPressed}
        drawing: ${this.state.drawing}
        clearCanvas: ${this.state.clearCanvas}
        FPS: ${this.state.fps}
        NOW: ${this.state.now}
        Then: ${this.state.then}
        Delta: ${this.state.delta}
        Interval: ${this.state.interval}
    `;
    this.display.innerHTML = content;
  }
}
