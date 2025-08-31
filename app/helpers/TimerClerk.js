/**
 * TimerClerk
 *
 * @property {NodeJS.Timeout | number | null} lastTimer
 */
export default class TimerClerk {
  /**
   * @param {{
   *   callback: Function
   *   timeInMilliseconds: number
   * }} params
   */
  cunstructor({
    callback,
    timeInMilliseconds,
  }) {
    this.callback = callback
    this.timeInMilliseconds = timeInMilliseconds

    this.lastTimer = null
  }

  /**
   * Factory method.
   *
   * @template {X extends typeof TimerClerk ? X : never} T,X
   * @param {{
   *  callback: Function
   *  timeInMilliseconds: number
   * }} params
   * @returns {InstanceType<T>}
   * @this {T}
   */
  static create({
    callback,
    timeInMilliseconds,
  }) {
    return /**@type {InstanceType<T>} */ (
      new this({
        callback,
        timeInMilliseconds,
      })
    )
  }

  /**
   * Reset timer and schedule new callback
   *
   * @param {...array} args
   */
  run(...args) {
    this.cancel()

    this.lastTimer = setTimeout(
      () => this.callback(...args),
      this.timeInMilliseconds
    )
  }

  /**
   * Cancel present timer
   *
   * @returns {void}
   */
  cancel() {
    if (this.lastTimer) {
      clearTimeout(this.lastTimer)

      this.lastTimer = null
    }
  }
}
