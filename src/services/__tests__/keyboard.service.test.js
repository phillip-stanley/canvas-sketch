import KeyboardService from "../keyboard.service";
jest.dontMock('../keyboard.service');

console.log(KeyboardService);

describe('keyboard service', () => {
  let keyboardService;

  beforeEach(() => {
    keyboardService = new KeyboardService();
  });

  it('Should be able to add a direction to keyspress', () => {
    expect(keyboardService.getKeysPressed()).toEqual([]);
    keyboardService.setKeyspressed(39);
    expect(keyboardService.getKeysPressed()).toEqual(['right'])
  });

  it('Should be able to remove a direction from keyspressed', () => {
    keyboardService.setKeyspressed(37);
    expect(keyboardService.getKeysPressed()).toEqual(['left']);
    keyboardService.removeKey(37);
    expect(keyboardService.getKeysPressed()).toEqual([]);
  });

  it('Should return true if the supplied key is in the keyspressed array', () => {
    keyboardService.setKeyspressed(37);
    expect(keyboardService.isKeyPressed('left')).toEqual(true);
  });

  it('Should return false if the supplied key is not in the keyspressed array', () => {
    expect(keyboardService.isKeyPressed('left')).toEqual(false);
  })
})