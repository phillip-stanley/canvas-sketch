export const mockConstructor = jest.fn();
export const mockSetkeyspressed = jest.fn();
export const mockRemoveKey = jest.fn();
export const mockGetKeysPressed = jest.fn(() => ['left']);
export const mockIsKeyPressed = jest.fn();

export const mock = jest.mock('../services/keyboard.service', () => {
  return jest.fn().mockImplementation(() => {
    return {
      setKeyspressed: mockSetkeyspressed,
      removeKey: mockRemovekey,
      getKeysPressed: mockGetSKeysPressed
    }
  })
})

export default mock;

// class KeyboardService {
//   constructor() {
//     console.log('Mock keyboard service: constructor was called');
//   }

//   setKeyspressed() {
//     console.log('Mock keyboard service: setKeysPressed')
//   }
//   getKeysPressed() {
//     console.log('Mock keyboard service: getKeysPressed');
//     return ['left'];
//   }
//   removeKey() {
//     console.log('Mock keyboard service: removeKey');
//   }
//   isKeyPressed() {
//     console.log('Mock keyboard service: isKeyspressed');
//   }
// }

