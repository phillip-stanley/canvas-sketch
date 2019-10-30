import CanvasSketch from '../app';
import KeyboardService from '../services/keyboard.service';
import Canvas from '../services/canvas.services';
jest.dontMock('../services/keyboard.service');
jest.mock('../services/canvas.services');

const mockSetkeyspressed = jest.fn();
const mockRemovekey = jest.fn();
const mockGetSKeysPressed = jest.fn(() => ['left']);

jest.mock('../services/keyboard.service', () => {
  return jest.fn().mockImplementation(() => {
    return {
      setKeyspressed: mockSetkeyspressed,
      removeKey: mockRemovekey,
      getKeysPressed: mockGetSKeysPressed
    }
  })
})

describe('canvas sketch app', () => {
  let app;

  beforeEach(() => {
    KeyboardService.mockClear();
  });

  it('Should initialise keyboard service on load', () => {
    app = new CanvasSketch({ canvasElement: 'canvas' });
    expect(KeyboardService).toHaveBeenCalled();
  });

  it('Should initialise the canvas service on load', () => {
    app = new CanvasSketch({ canvasElement: 'canvas' });
    expect(Canvas).toHaveBeenCalled();
  });

  it('Should handle a keydown event by calling the keyboard service', () => {
    app = new CanvasSketch({ canvasElement: 'canvasd' });
    app.handleKeyPress({ type: 'keydown', keyCode: 27 });
    expect(mockSetkeyspressed).toHaveBeenCalled();
    expect(mockSetkeyspressed.mock.calls[0][0]).toEqual(27);
  });

  it('Should handle a keyup event by calling the keyboard service', () => {
    app = new CanvasSketch({ canvasElement: 'canvas' });
    app.handleKeyPress({ type: 'keyup', keyCode: 27 });
    expect(mockRemovekey).toHaveBeenCalled();
    expect(mockSetkeyspressed.mock.calls[0][0]).toEqual(27);
  });
});
