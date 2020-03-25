// @flow

/**
 * Emits events
 */
export default class EventEmitter {
  _callbacks = {};

  /**
   * On callback
   */
  on(type: string, callback: () => void) {
    if (!this._callbacks[type]) {
      this._callbacks[type] = []
    }

    this._callbacks[type].push(callback)
  }

  /**
   * Emit function
   */
  emit(type: string) {
    if (!this._callbacks[type]) {
      this._callbacks[type] = []
    }

    const args = Array.prototype.slice.call(arguments, 1)
    for(let i = 0; i < this._callbacks[type].length; i++) {
      this._callbacks[type][i].apply(this, args)
    }
  }
}
