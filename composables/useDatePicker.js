import {
  ref,
  computed,
  watch
} from 'vue'

/**
 * Simple DatePicker composable
 * Basic date selection functionality with validation
 * @param {Object} options - Configuration options
 * @param {string} [options.initialValue=''] - Initial date value (YYYY-MM-DD).
 * @param {boolean} [options.required=false] - If true, date selection is required.
 * @param {string|null} [options.minDate=null] - Minimum selectable date (YYYY-MM-DD).
 * @param {string|null} [options.maxDate=null] - Maximum selectable date (YYYY-MM-DD).
 * @return {Object} DatePicker state and methods{{
 * value: import('vue').Ref<string>,
 * error: import('vue').Ref<string>,
 * isTouched: import('vue').Ref<boolean>,
 * isEmpty: import('vue').ComputedRef<boolean>,
 * isValid: import('vue').ComputedRef<boolean>,
 * hasError: import('vue').ComputedRef<boolean>,
 * today: import('vue').ComputedRef<string>,
 * validate: () => boolean,
 * handleChange: (newValue: string) => void,
 * handleBlur: () => void,
 * clear: () => void,
 * reset: () => void,
 * formatDate: (dateString: string) => string
 * }}
 */
export const useDatePicker = (options = {}) => {
  const {
    initialValue = '',
    required = false,
    minDate = null,
    maxDate = null
  } = options

  // State
  const value = ref(initialValue)
  const error = ref('')
  const isTouched = ref(false)

  // Computed
  const isEmpty = computed(() => !value.value || value.value.trim() === '')
  const isValid = computed(() => !error.value)
  const hasError = computed(() => Boolean(error.value))

  // Today's date
  const today = computed(() => {
    return new Date().toISOString().split('T')[0]
  })

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return ''

    const date = new Date(dateString)
    return date.toLocaleDateString()
  }

  // Validation
  const validate = () => {
    error.value = ''

    // Required validation
    if (required && isEmpty.value) {
      error.value = 'Date is required'
      return false
    }

    if (!value.value) return true

    // Date format validation (YYYY-MM-DD)
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/
    if (!dateRegex.test(value.value)) {
      error.value = 'Invalid date format (YYYY-MM-DD)'
      return false
    }

    // Valid date check
    const date = new Date(value.value)
    if (isNaN(date.getTime())) {
      error.value = 'Invalid date'
      return false
    }

    // Min date validation
    if (minDate && value.value < minDate) {
      error.value = `Date must be after ${formatDate(minDate)}`
      return false
    }

    // Max date validation
    if (maxDate && value.value > maxDate) {
      error.value = `Date must be before ${formatDate(maxDate)}`
      return false
    }

    return true
  }

  // Event handlers
  const handleChange = (newValue) => {
    value.value = newValue
    validate()
  }

  const handleBlur = () => {
    isTouched.value = true
    validate()
  }

  const clear = () => {
    value.value = ''
    error.value = ''
  }

  const reset = () => {
    value.value = initialValue
    error.value = ''
    isTouched.value = false
  }

  // Watch for changes
  watch(value, () => {
    if (isTouched.value) {
      validate()
    }
  })

  return {
    // State
    value,
    error,
    isTouched,

    // Computed
    isEmpty,
    isValid,
    hasError,
    today,

    // Methods
    validate,
    handleChange,
    handleBlur,
    clear,
    reset,
    formatDate
  }
}

export default useDatePicker
