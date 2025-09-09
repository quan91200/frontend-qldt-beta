import { ref, computed, watch } from 'vue'

/**
 * Composable for enhanced DatePicker functionality
 * Provides validation, formatting, and utility functions for date/time handling
 */
export const useDatePicker = (options = {}) => {
  const {
    initialValue = '',
    required = false,
    minDate = null,
    maxDate = null,
    format = 'YYYY-MM-DD HH:mm',
    validateOnChange = true,
    customValidation = null
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

    // Check if the format is valid
    const dateTimeRegex = /^\d{4}-\d{2}-\d{2}( \d{2}:\d{2})?$/
    if (!dateTimeRegex.test(value.value)) {
      error.value = 'Invalid date/time format'
      isValid.value = false
      return false
    }

    // Validate required
    const requiredError = validateRequired()
    if (requiredError) {
      error.value = requiredError
      isValid.value = false
      return false
    }

    // Validate date range
    const rangeError = validateDateRange()
    if (rangeError) {
      error.value = rangeError
      isValid.value = false
      return false
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

    if (!timePart) {
      // Date only
      return formatDate(datePart, formatStr)
    }

    const formattedDate = formatDate(datePart, 'DD/MM/YYYY')
    const formattedTime = formatTime(timePart, 'HH:mm')

    return `${formattedDate} ${formattedTime}`
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
      return `${date} ${time}`
    },

    tomorrow: () => {
      const date = new Date()
      date.setDate(date.getDate() + 1)
      const dateStr = date.toISOString().split('T')[0]
      return `${dateStr} 09:00`
    },

    nextWeek: () => {
      const date = new Date()
      date.setDate(date.getDate() + 7)
      const dateStr = date.toISOString().split('T')[0]
      return `${dateStr} 09:00`
    },

    nextMonday: () => {
      const date = new Date()
      const dayOfWeek = date.getDay()
      const daysUntilMonday = dayOfWeek === 0 ? 1 : 8 - dayOfWeek
      date.setDate(date.getDate() + daysUntilMonday)
      const dateStr = date.toISOString().split('T')[0]
      return `${dateStr} 09:00`
    }
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
    validateRange = true
  } = options

  const startPicker = useDatePicker({
    initialValue: startDate,
    ...options,
    customValidation: (value) => {
      if (!validateRange || !value || !endPicker.value.value) return null

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
    ...options,
    customValidation: (value) => {
      if (!validateRange || !value || !startPicker.value.value) return null

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
    return startPicker.getDaysBetween(startPicker.value.value, endPicker.value.value)
  })

  const isValidRange = computed(() => {
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
