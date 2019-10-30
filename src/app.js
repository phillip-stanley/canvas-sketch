import Canvas from './services/canvas.services';
import KeyboardService from './services/keyboard.service';
import { keycodes } from './helpers/helpers';

class CanvasSketch {
  constructor(options) {
    if(!options) {
      throw Error('Error: no options provided');
    }
    this.canvas = new Canvas({...options});
    this.keyboard = new KeyboardService();
    this.setupEvents(options);

    // Properties
    this.drawing = false;
    this.now = 0;
    this.then = 0;
    this.delta = 0;
    this.interval = (1000 / 30);

    this.render = this.render.bind(this);
  }
  /**
   * @name handleKeyPress
   * @description keyup and keydown handlers
   * @param {Object} evt
   */
  handleKeyPress(evt) {
    const { keyCode, type } = evt;
    if (type === 'keydown') {
      this.keyboard.setKeyspressed(keyCode);
    }
    if (type === 'keyup') {
      this.keyboard.removeKey(keyCode);
    }
    this.render();
  }
  /**
   * @name setupEvents
   * @description setup eventHandlers for keyboard events
   * @param {*} options
   */
  setupEvents(options) {
    const clearBtn = document.querySelector(options.clearBtn);

    // key controls
    window.addEventListener('keydown', this.handleKeyPress.bind(this));
    window.addEventListener('keyup', this.handleKeyPress.bind(this));
  }
  /**
   * @name render
   * @description renders the current state of canvas through update and draw methosd.
   * @param {none}
   */
  render() {
    this.now = Date.now();
    this.delta = (this.now - this.then);

    if (this.delta > this.interval) {
      this.canvas.updateCanvasPosition(this.keyboard.getKeysPressed());

      this.then = this.now - (this.delta % this.interval);
      this.canvas.draw();

      // If there is a keypressed update and render
      if(this.keyboard.getKeysPressed().length) {
        requestAnimationFrame(this.render);
      }
    }
  }
}

export default CanvasSketch;

// window.CanvasApp = CanvasSketch;
