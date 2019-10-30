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
      if (!canvasElement) throw Error('Error: No canvas element supplied');

      // Initialise the canvas element
      this.canvas = document.querySelector(`#${canvasElement.canvasElement}`);
      this.canvas.width = width || this.canvas.clientWidth;
      this.canvas.height = height || this.canvas.clientHeight;
      this.ctx = this.canvas.getContext('2d');

      // Properties
      this.xPos = this.canvas.width / 2;
      this.yPos = this.canvas.height / 2;
      this.lineSpeed = 5;

      // Begin path and move to the center of the canvas
      this.ctx.beginPath();
      this.moveTo(this.canvas.width / 2, this.canvas.height / 2);

      // bind methods
      // this.resetCanvas = this.resetCanvas.bind(this);
    }
    /**
     * @name updateCanvasPosition
     * @description updates the x and y position on canvas
     * @param {directions} Array of directions to calculate delta x and y
     */
    updateCanvasPosition(directions) {
      let deltaX = 0;
      let deltaY = 0;

      if (directions.length === 0) {
        return;
      }
      // if directions contains left and xPos is greater than
      // 5 pixels aways from the edge of the canvas add linespeed to deltaX
      if (directions.includes('left') && this.xPos > 5) {
        deltaX -= this.lineSpeed;
      }
      // if directions contains right and xPos is less than
      // 5 pixels aways from the edge of the right side of the canvas
      // minus linespeed from deltaX
      if (directions.includes('right') && this.xPos < (this.canvas.width - 5)) {
        deltaX += this.lineSpeed
      }
      // if direction contains up and yPos is great than 5
      if (directions.includes('up') && this.yPos > 5) {
        deltaY -= this.lineSpeed;
      }
      // if direction includews down and the yPos is less than 5
      // pixels away from the edge of the top of the canvas.
      if (directions.includes('down') && this.yPos < (this.canvas.height - 5)) {
        deltaY += this.lineSpeed;
      }

      console.log('--- update ---', deltaX, deltaY);

      this.xPos += deltaX;
      this.yPos += deltaY;
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
     * @name draw
     * @description draw line from current state x and y position
     * @return {*} none
     */
    draw() {
      console.log('-- draw --', this.xPos, this.yPos);
      this.ctx.lineTo(this.xPos, this.yPos);
      this.ctx.stroke();
    }
    /**
     * @name resetCanvas
     * @description clear the canvas
     * @return {*} none
     */
    resetCanvas() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.beginPath();
      this.moveTo(this.canvas.width / 2, this.canvas.height / 2);
    }
  }

  export default Canvas;
