import {
  ref,
  computed,
  watch
} from 'vue'

/**
 * Composable for enhanced DatePicker functionality
 * Provides validation, formatting, and utility functions for date/time handling
 *
 * @param {Object} [options={}] - Configuration options for the DatePicker.
 * @param {string} [options.initialValue=""] - Initial date/time value
 * ...
 *
 * @returns {{
 *  value: import('vue').Ref<string>
 *  error: import('vue').Ref<string>
 *  ...
 */

export const useDatePicker = (options = {}) => {
  const {
    initialValue = '',
    required = false,
    minDate = null,
    maxDate = null,
    format = 'YYYY-MM-DD HH:mm',
    validateOnChange = true,
    customValidation = null,
    dateOnly = false,
    timeOnly = false
  } = options

  // Reactive state
  const value = ref(initialValue)
  const error = ref('')
  const isValid = ref(true)
  const isDirty = ref(false)
  const isTouched = ref(false)

  // Computed properties
  const isEmpty = computed(() => !value.value || value.value.trim() === '')

  const hasError = computed(() => Boolean(error.value))

  const formattedValue = computed(() => {
    if (!value.value) return ''
    return formatDateTime(value.value, format)
  })

  // Date utilities
  const today = computed(() => {
    const now = new Date()
    return now.toISOString().split('T')[0]
  })

  const tomorrow = computed(() => {
    const date = new Date()
    date.setDate(date.getDate() + 1)
    return date.toISOString().split('T')[0]
  })

  const nextWeek = computed(() => {
    const date = new Date()
    date.setDate(date.getDate() + 7)
    return date.toISOString().split('T')[0]
  })

  const nextMonth = computed(() => {
    const date = new Date()
    date.setMonth(date.getMonth() + 1)
    return date.toISOString().split('T')[0]
  })

  // Validation functions
  const validateRequired = () => {
    if (required && isEmpty.value) {
      return 'This field is required'
    }
    return null
  }

  const validateDateRange = () => {
    if (!value.value) return null

    const selectedDate = new Date(value.value.split(' ')[0])

    if (minDate) {
      const min = new Date(minDate)
      if (selectedDate < min) {
        return `Date must be after ${formatDate(minDate)}`
      }
    }

    if (maxDate) {
      const max = new Date(maxDate)
      if (selectedDate > max) {
        return `Date must be before ${formatDate(maxDate)}`
      }
    }

    return null
  }

  const validateDateTime = () => {
    if (!value.value) {
      error.value = validateRequired() || ''
      isValid.value = !error.value
      return isValid.value
    }

    // Define regex patterns for different modes
    let isValidFormat = false

    if (timeOnly) {
      // Time only format: HH:mm or H:mm
      const timeOnlyRegex = /^\d{1,2}:\d{2}$/
      isValidFormat = timeOnlyRegex.test(value.value)
    } else if (dateOnly) {
      // Date only format: YYYY-MM-DD
      const dateOnlyRegex = /^\d{4}-\d{2}-\d{2}$/
      isValidFormat = dateOnlyRegex.test(value.value)
    } else {
      // DateTime format: YYYY-MM-DD HH:mm or just YYYY-MM-DD
      const dateTimeRegex = /^\d{4}-\d{2}-\d{2}( \d{1,2}:\d{2})?$/
      isValidFormat = dateTimeRegex.test(value.value)
    }

    if (!isValidFormat) {
      const expectedFormat = timeOnly ? 'HH:mm' : dateOnly ? 'YYYY-MM-DD' : 'YYYY-MM-DD HH:mm'
      error.value = `Invalid format. Expected: ${expectedFormat}`
      isValid.value = false
      return false
    }

    // Validate that the date/time is actually valid (not just format)
    if (!timeOnly) {
      const datePart = value.value.split(' ')[0]
      const testDate = new Date(datePart)
      if (isNaN(testDate.getTime())) {
        error.value = 'Invalid date'
        isValid.value = false
        return false
      }
    }

    if (!dateOnly && value.value.includes(' ')) {
      const timePart = value.value.split(' ')[1]
      const [hours, minutes] = timePart.split(':').map(Number)
      if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
        error.value = 'Invalid time'
        isValid.value = false
        return false
      }
    }

    // Validate required
    const requiredError = validateRequired()
    if (requiredError) {
      error.value = requiredError
      isValid.value = false
      return false
    }

    // Validate date range (only for date-containing modes)
    if (!timeOnly) {
      const rangeError = validateDateRange()
      if (rangeError) {
        error.value = rangeError
        isValid.value = false
        return false
      }
    }

    // Custom validation
    if (customValidation && typeof customValidation === 'function') {
      const customError = customValidation(value.value)
      if (customError) {
        error.value = customError
        isValid.value = false
        return false
      }
    }

    error.value = ''
    isValid.value = true
    return true
  }

  // Utility functions
  const formatDate = (dateString, formatStr = 'DD/MM/YYYY') => {
    if (!dateString) return ''

    const date = new Date(dateString)
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear()

    switch (formatStr) {
      case 'DD/MM/YYYY':
        return `${day}/${month}/${year}`
      case 'MM/DD/YYYY':
        return `${month}/${day}/${year}`
      case 'YYYY-MM-DD':
        return `${year}-${month}-${day}`
      default:
        return dateString
    }
  }

  const formatTime = (timeString, formatStr = 'HH:mm') => {
    if (!timeString) return ''

    // Handle full datetime string
    if (timeString.includes(' ')) {
      timeString = timeString.split(' ')[1]
    }

    const [hours, minutes] = timeString.split(':')
    const hour24 = parseInt(hours)

    switch (formatStr) {
      case 'HH:mm':
        return `${String(hour24).padStart(2, '0')}:${minutes}`
      case 'h:mm A':
        const hour12 = hour24 === 0 ? 12 : hour24 > 12 ? hour24 - 12 : hour24
        const ampm = hour24 >= 12 ? 'PM' : 'AM'
        return `${hour12}:${minutes} ${ampm}`
      default:
        return timeString
    }
  }

  const formatDateTime = (dateTimeString, formatStr = 'DD/MM/YYYY HH:mm') => {
    if (!dateTimeString) return ''

    const [datePart, timePart] = dateTimeString.split(' ')

    // Handle different format patterns
    if (formatStr.includes('YYYY') || formatStr.includes('MM') || formatStr.includes('DD')) {
      // Contains date formatting
      if (formatStr.includes('HH') || formatStr.includes('mm') || formatStr.includes('A')) {
        // Contains both date and time formatting
        if (!timePart) {
          // Only date part available, format just the date
          return formatDate(datePart, extractDateFormat(formatStr))
        }

        // Format both date and time according to formatStr
        const dateFormatPart = extractDateFormat(formatStr)
        const timeFormatPart = extractTimeFormat(formatStr)

        const formattedDate = formatDate(datePart, dateFormatPart)
        const formattedTime = formatTime(timePart, timeFormatPart)

        // Reconstruct according to the original format pattern
        return formatStr
          .replace(/DD\/MM\/YYYY|MM\/DD\/YYYY|YYYY-MM-DD/g, formattedDate)
          .replace(/HH:mm|h:mm A/g, formattedTime)
      } else {
        // Only date formatting requested
        return formatDate(datePart, formatStr)
      }
    } else if (formatStr.includes('HH') || formatStr.includes('mm') || formatStr.includes('A')) {
      // Only time formatting requested
      return formatTime(timePart || datePart, formatStr)
    } else {
      // Fallback to original behavior
      const formattedDate = formatDate(datePart, 'DD/MM/YYYY')
      const formattedTime = timePart ? formatTime(timePart, 'HH:mm') : ''
      return timePart ? `${formattedDate} ${formattedTime}` : formattedDate
    }
  }

  // Helper functions to extract date and time format parts
  const extractDateFormat = (formatStr) => {
    if (formatStr.includes('DD/MM/YYYY')) return 'DD/MM/YYYY'
    if (formatStr.includes('MM/DD/YYYY')) return 'MM/DD/YYYY'
    if (formatStr.includes('YYYY-MM-DD')) return 'YYYY-MM-DD'
    return 'DD/MM/YYYY' // default
  }

  const extractTimeFormat = (formatStr) => {
    if (formatStr.includes('h:mm A')) return 'h:mm A'
    if (formatStr.includes('HH:mm')) return 'HH:mm'
    return 'HH:mm' // default
  }

  const parseDateTime = (dateTimeString) => {
    if (!dateTimeString) return null

    const date = new Date(dateTimeString)
    return {
      date: date.toISOString().split('T')[0],
      time: date.toTimeString().substring(0, 5),
      dateTime: dateTimeString,
      timestamp: date.getTime(),
      isValid: !isNaN(date.getTime())
    }
  }

  const addDays = (dateString, days) => {
    if (!dateString) return ''

    const date = new Date(dateString.split(' ')[0])
    date.setDate(date.getDate() + days)

    const timePart = dateString.includes(' ') ? ' ' + dateString.split(' ')[1] : ''
    return date.toISOString().split('T')[0] + timePart
  }

  const subtractDays = (dateString, days) => {
    return addDays(dateString, -days)
  }

  const getDaysBetween = (startDate, endDate) => {
    if (!startDate || !endDate) return 0

    const start = new Date(startDate.split(' ')[0])
    const end = new Date(endDate.split(' ')[0])
    const diffTime = Math.abs(end - start)
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  }

  const isWeekend = (dateString) => {
    if (!dateString) return false

    const date = new Date(dateString.split(' ')[0])
    const day = date.getDay()
    return day === 0 || day === 6 // Sunday or Saturday
  }

  const getWeekday = (dateString) => {
    if (!dateString) return ''

    const date = new Date(dateString.split(' ')[0])
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    return weekdays[date.getDay()]
  }

  // Event handlers
  const handleChange = (newValue) => {
    value.value = newValue
    isDirty.value = true

    if (validateOnChange) {
      validateDateTime()
    }
  }

  const handleFocus = () => {
    isTouched.value = true
  }

  const handleBlur = () => {
    if (isTouched.value) {
      validateDateTime()
    }
  }

  const reset = () => {
    value.value = initialValue
    error.value = ''
    isValid.value = true
    isDirty.value = false
    isTouched.value = false
  }

  const clear = () => {
    value.value = ''
    error.value = ''
    isValid.value = !required
    isDirty.value = true
  }

  // Watch for changes and validate
  watch(value, () => {
    if (validateOnChange && (isDirty.value || isTouched.value)) {
      validateDateTime()
    }
  })

  // Date presets
  const presets = {
    today: () => {
      const now = new Date()
      const date = now.toISOString().split('T')[0]
      const time = now.toTimeString().substring(0, 5)

      if (timeOnly) return time
      if (dateOnly) return date
      return `${date} ${time}`
    },

    tomorrow: () => {
      const date = new Date()
      date.setDate(date.getDate() + 1)
      const dateStr = date.toISOString().split('T')[0]

      if (timeOnly) return '09:00'
      if (dateOnly) return dateStr
      return `${dateStr} 09:00`
    },

    nextWeek: () => {
      const date = new Date()
      date.setDate(date.getDate() + 7)
      const dateStr = date.toISOString().split('T')[0]

      if (timeOnly) return '09:00'
      if (dateOnly) return dateStr
      return `${dateStr} 09:00`
    },

    nextMonday: () => {
      const date = new Date()
      const dayOfWeek = date.getDay()
      const daysUntilMonday = dayOfWeek === 0 ? 1 : 8 - dayOfWeek
      date.setDate(date.getDate() + daysUntilMonday)
      const dateStr = date.toISOString().split('T')[0]

      if (timeOnly) return '09:00'
      if (dateOnly) return dateStr
      return `${dateStr} 09:00`
    },

    // Time-specific presets
    morning: () => timeOnly || !dateOnly ? '09:00' : '',
    afternoon: () => timeOnly || !dateOnly ? '14:00' : '',
    evening: () => timeOnly || !dateOnly ? '18:00' : ''
  }

  const setPreset = (presetName) => {
    if (presets[presetName]) {
      value.value = presets[presetName]()
      isDirty.value = true
      validateDateTime()
    }
  }

  return {
    // State
    value,
    error,
    isValid,
    isDirty,
    isTouched,

    // Computed
    isEmpty,
    hasError,
    formattedValue,
    today,
    tomorrow,
    nextWeek,
    nextMonth,

    // Methods
    validateDateTime,
    handleChange,
    handleFocus,
    handleBlur,
    reset,
    clear,

    // Utilities
    formatDate,
    formatTime,
    formatDateTime,
    parseDateTime,
    addDays,
    subtractDays,
    getDaysBetween,
    isWeekend,
    getWeekday,

    // Presets
    presets,
    setPreset
  }
}

/**
 * Composable for handling multiple date pickers with relationships
 * Useful for date ranges, event planning, etc.
 */
export const useDateRange = (options = {}) => {
  const {
    startDate = '',
    endDate = '',
    minGap = 0, // Minimum days between start and end
    maxGap = null, // Maximum days between start and end
    validateRange = true,
    dateOnly = false,
    timeOnly = false,
    ...pickerOptions
  } = options

  const startPicker = useDatePicker({
    initialValue: startDate,
    dateOnly,
    timeOnly,
    ...pickerOptions,
    customValidation: (value) => {
      if (!validateRange || !value || !endPicker.value.value) return null

      // Skip range validation for time-only mode
      if (timeOnly) return null

      const start = new Date(value.split(' ')[0])
      const end = new Date(endPicker.value.value.split(' ')[0])

      if (start >= end) {
        return 'Start date must be before end date'
      }

      return null
    }
  })

  const endPicker = useDatePicker({
    initialValue: endDate,
    dateOnly,
    timeOnly,
    ...pickerOptions,
    customValidation: (value) => {
      if (!validateRange || !value || !startPicker.value.value) return null

      // Skip range validation for time-only mode
      if (timeOnly) return null

      const start = new Date(startPicker.value.value.split(' ')[0])
      const end = new Date(value.split(' ')[0])

      if (end <= start) {
        return 'End date must be after start date'
      }

      const daysBetween = Math.ceil((end - start) / (1000 * 60 * 60 * 24))

      if (minGap && daysBetween < minGap) {
        return `Minimum ${minGap} days required between dates`
      }

      if (maxGap && daysBetween > maxGap) {
        return `Maximum ${maxGap} days allowed between dates`
      }
      return null
    }
  })

  const duration = computed(() => {
    if (!startPicker.value.value || !endPicker.value.value) return 0

    // For time-only mode, calculate duration in minutes
    if (timeOnly) {
      const startTime = startPicker.value.value.split(':')
      const endTime = endPicker.value.value.split(':')
      const startMinutes = parseInt(startTime[0]) * 60 + parseInt(startTime[1])
      const endMinutes = parseInt(endTime[0]) * 60 + parseInt(endTime[1])
      return Math.abs(endMinutes - startMinutes)
    }

    // For date modes, calculate duration in days
    return startPicker.getDaysBetween(startPicker.value.value, endPicker.value.value)
  })

  const isValidRange = computed(() => {
    if (timeOnly) {
      // For time-only, just check if both values are valid
      return startPicker.isValid.value && endPicker.isValid.value
    }
    // For date modes, check validity and that duration > 0
    return startPicker.isValid.value && endPicker.isValid.value && duration.value > 0
  })

  const validateBoth = () => {
    const startValid = startPicker.validateDateTime()
    const endValid = endPicker.validateDateTime()
    return startValid && endValid && isValidRange.value
  }

  const resetBoth = () => {
    startPicker.reset()
    endPicker.reset()
  }

  const clearBoth = () => {
    startPicker.clear()
    endPicker.clear()
  }

  return {
    startPicker,
    endPicker,
    duration,
    isValidRange,
    validateBoth,
    resetBoth,
    clearBoth
  }
}

export default useDatePicker
