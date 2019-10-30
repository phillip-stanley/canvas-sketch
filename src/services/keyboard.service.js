/**
 * @name keyboardService
 * @description monitor keyboard interactions
 */
class KeyboardService {
  constructor() {
    this._keyspressed = [];
    this._keycodes = {
      37: 'left',
      38: 'up',
      39: 'right',
      40: 'down'
    }
  }
  /**
   * @name setKeyspressed
   * @description add a direction to the keyspressed array
   * @return {*} none
   */
  setKeyspressed(keycode) {
    const direction = this._keycodes[keycode] || undefined;
    if (direction === undefined || this._keyspressed.includes(direction)) {
      return;
    }
    console.log(keycode);
    this._keyspressed.push(direction);
  }
  /**
   * @name getKeyspressed
   * @description return array of keys pressed
   * @return {array:string} array of keyspressed (strings)
   */
  getKeysPressed() {
    return this._keyspressed;
  }
  /**
   * @name removeKey
   * @description remove key from keyspressed array
   * @return {*} none
   */
  removeKey(keycode) {
    const filteredKeys = this._keyspressed.filter(item => (
      !item === this._keycodes[keycode]
    ));
    this._keyspressed = filteredKeys;
  }
  /**
   * @name keyPressed
   * @description checks if a direction exists in keyspressed
   * @return {bool}
   */
  isKeyPressed(key) {
    if(this._keyspressed.includes(key)) {
      return true;
    }
    return false;
  }
}

export default KeyboardService;
