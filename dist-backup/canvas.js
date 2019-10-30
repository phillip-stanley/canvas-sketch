"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class Canvas {
  /**
   * @name constructor
   * @description initalise canvas and context.
   * @param {string: id} canvasElement
   * @param {int} width
   * @param {int} height
   */
  constructor(canvasElement, width, height) {
    // throw and error if a element ID is not provided
    if (!canvasElement) throw Error('Error: No canvas element supplied'); // Initialise the canvas element

    this.canvas = document.querySelector("#".concat(canvasElement));
    this.canvas.width = width || this.canvas.clientWidth;
    this.canvas.height = height || this.canvas.clientHeight;
    this.canvas.ctx = this.canvas.getContext('2d'); // Begin path and move to the center of the canvas

    this.ctx.beginPath();
    this.moveTo(this.canvas.width / 2, this.canvas.height / 2);
  }
  /**
   * @name moveTO
   * @description move to a point on the canvas
   * @param {*} xPos
   * @param {*} yPos
   */


  moveTo(xPos, yPos) {
    if (!xPos || !yPos) return;
    this.ctx.moveTo(xPos, yPos);
  }
  /**
   * @name drawLine
   * @description draw a line to the X and Y position provided
   * @param {int} X position
   * @param {int} Y position
   * @return {*} none
   */


  drawLine(xPos, yPos) {
    if (!xPos || !yPos) return;
    this.ctx.lineTo(xPos, yPos);
    this.ctx.stroke();
  }
  /**
   * @name resetCanvas
   * @description clear the canvas
   * @return {*} none
   */


  resetCanvas() {
    this.canvas.ctx.clearReact(0, 0, this.canvas.width, this.canvas.height);
    this.canvas.ctx.beginPath();
    this.moveTo(this.canvas.width / 2, this.canvas.height / 2);
  }

}

var _default = Canvas;
exports.default = _default;