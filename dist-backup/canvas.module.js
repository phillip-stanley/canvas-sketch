"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Canvas =
/*#__PURE__*/
function () {
  /**
   * @name constructor
   * @description initalise canvas and context.
   * @param {string: id} canvasElement
   * @param {int} width
   * @param {int} height
   */
  function Canvas(canvasElement, width, height) {
    _classCallCheck(this, Canvas);

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


  _createClass(Canvas, [{
    key: "moveTo",
    value: function moveTo(xPos, yPos) {
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

  }, {
    key: "drawLine",
    value: function drawLine(xPos, yPos) {
      if (!xPos || !yPos) return;
      this.ctx.lineTo(xPos, yPos);
      this.ctx.stroke();
    }
    /**
     * @name resetCanvas
     * @description clear the canvas
     * @return {*} none
     */

  }, {
    key: "resetCanvas",
    value: function resetCanvas() {
      this.canvas.ctx.clearReact(0, 0, this.canvas.width, this.canvas.height);
      this.canvas.ctx.beginPath();
      this.moveTo(this.canvas.width / 2, this.canvas.height / 2);
    }
  }]);

  return Canvas;
}();

module.exports = {
  Canvas: Canvas
};