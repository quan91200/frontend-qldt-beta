import TimerClerk from "~/app/helpers/TimerClerk"

/**
 * Debounce execution of a function.
 *
 * @param {Object} params - Configuration options.
 * @param {Function} params.callback - The function to debounce.
 * @param {number} [params.timeInMs=200] - Debounce delay in milliseconds.
 * @param {boolean} [params.immediate=false] - If true, the callback is invoked immediately on the first call, then debounced afterward.
 *
 * @returns {{ run: (...args: any[]) => void, cancel: () => void }}
 * - `run(...args)`: Invoke the debounced function with arguments.
 * - `cancel()`: Cancel any pending debounced execution.
 */
export function useDebounce({
  callback,
  timeInMs = 200,
  immediate = false,
}) {
  let called = false

  const timerClerk = TimerClerk.create({
    callback: (...args) => {
      // Always run callback for trailing edge
      callback(...args)

      // Reset so that future calls can run immediately again
      called = false
    },

    timeInMilliseconds: timeInMs,
  })

  /**
   * Invoke the debounced function.
   * - If `immediate` is true and this is the first call, the callback is executed immediately.
   * - Subsequent calls reset the timer and execute after `timeInMs` if no new call occurs.
   *
   * @param {...any} args - Arguments passed to the original callback.
   * @returns {void}
   */
  const run = (...args) => {
    if (immediate && !called) {
      callback(...args)

      called = true
    }

    timerClerk.run(...args)
  }

  /**
   * Cancel the pending debounced execution.
   * - Clears the active timer.
   * - Resets `called` state (used for `immediate`).
   *
   * @returns {void}
   */
  const cancel = () => {
    timerClerk.cancel()

    called = false
  }

  return {
    run,
    cancel,
  }
}
