/**
 * BaseAppContext
 */
export default class BaseAppContext {
  /**
   * normalize date.
   *
   * @param {{
   *   value: string
   * }} params
   * @returns {string}
   */
  normalizeDateString({
    value,
  }) {
    return new Date(value)
      .toLocaleString()
  }

  /**
   * Formats a date value based on the specified format type.
   *
   * @param {{
   *   value: string
   *   format?: 'YYYY-MM-DD' | 'MM-DD-YYYY' | 'DD MMM, YYYY hh:mm A'
   * }} params
   * @returns {string}
   */
  generateDateFormatted({
    value,
    format = 'MM-DD-YYYY',
  }) {
    if (!value) return ''
    const date = new Date(value)

    if (format === 'MM-DD-YYYY') {
      return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }).format(date)
    }

    if (format === 'YYYY-MM-DD') {
      return new Intl.DateTimeFormat('en-CA', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }).format(date)
    }

    if (format === 'DD MMM, YYYY hh:mm A') {
      return new Intl.DateTimeFormat('en-US', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      }).format(date)
    }

    return date.toLocaleDateString()
  }
}
