import {
  HALF_DAY_HOURS,
  MONTH_NAME,
} from '~/app/constants.js'

const MAX_LENGTH = 2
const FILL_STRING = '0'

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
    if (!value) {
      return ''
    }

    const date = new Date(value)

    const year = date.getFullYear()

    const monthValue = date.getMonth() + 1
    const month = monthValue.toString()
      .padStart(MAX_LENGTH, FILL_STRING)

    const dayValue = date.getDate()
    const day = dayValue.toString()
      .padStart(MAX_LENGTH, FILL_STRING)

    if (format === 'MM-DD-YYYY') {
      return `${month}-${day}-${year}`
    }

    if (format === 'YYYY-MM-DD') {
      return `${year}-${month}-${day}`
    }

    if (format === 'DD MMM, YYYY hh:mm A') {
      const hours = date.getHours()
      const minutes = date.getMinutes()
        .toString()
        .padStart(MAX_LENGTH, FILL_STRING)

      const period = hours >= HALF_DAY_HOURS
        ? 'PM'
        : 'AM'

      const hourFormat = hours % HALF_DAY_HOURS
      const isMidnightOrNoon = hourFormat === 0
      const formattedHourValue = isMidnightOrNoon
        ? HALF_DAY_HOURS
        : hourFormat

      const formattedHours = formattedHourValue
        .toString()
        .padStart(MAX_LENGTH, FILL_STRING)

      const monthName = MONTH_NAME[date.getMonth()]

      return `${day} ${monthName}, ${year} ${formattedHours}:${minutes} ${period}`
    }

    return date.toLocaleDateString()
  }
}
