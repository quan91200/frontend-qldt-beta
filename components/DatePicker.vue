<script>
import {
  ref,
  watch,
  computed,
  defineComponent
} from "vue"

export default defineComponent({
  name: "DatePicker",
  
  props: {
    modelValue: {
      type: String,
      default: ""
    },
    placeholderDate: {
      type: String,
      default: "Pick a date"
    },
    placeholderTime: {
      type: String,
      default: "Pick a time"
    },
    valueFormat: {
      type: String,
      default: "YYYY-MM-DD HH:mm"
    },
    disabled: {
      type: Boolean,
      default: false
    },
    required: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: ""
    },
    error: {
      type: String,
      default: ""
    },
    minDate: {
      type: String,
      default: ""
    },
    maxDate: {
      type: String,
      default: ""
    },
    timeOnly: {
      type: Boolean,
      default: false
    },
    dateOnly: {
      type: Boolean,
      default: false
    }
  },

  emits: ["update:modelValue", "change", "focus", "blur"],

  setup(props, { emit }) {
    const date = ref("")
    const time = ref("")
    const isFocused = ref(false)

    // Computed properties
    const hasError = computed(() => Boolean(props.error))
    const isDisabled = computed(() => props.disabled)
    const showDate = computed(() => !props.timeOnly)
    const showTime = computed(() => !props.dateOnly)

    // Format today's date for min/max constraints
    const today = computed(() => {
      const now = new Date()
      return now.toISOString().split('T')[0]
    })

    // đồng bộ từ ngoài vào trong
    watch(
      () => props.modelValue,
      (val) => {
        if (val) {
          if (props.dateOnly) {
            date.value = val
            time.value = ""
          } else if (props.timeOnly) {
            time.value = val
            date.value = ""
          } else {
            const [d, t] = val.split(" ")
            date.value = d || ""
            time.value = t || ""
          }
        } else {
          date.value = ""
          time.value = ""
        }
      },
      { immediate: true }
    )

    // đồng bộ từ trong ra ngoài
    watch([date, time], () => {
      let value = ""
      
      if (props.dateOnly && date.value) {
        value = date.value
      } else if (props.timeOnly && time.value) {
        value = time.value
      } else if (date.value && time.value) {
        value = `${date.value} ${time.value}`
      }
      
      emit("update:modelValue", value)
      emit("change", value)
    })

    const handleFocus = () => {
      isFocused.value = true
      emit("focus")
    }

    const handleBlur = () => {
      isFocused.value = false
      emit("blur")
    }

    const clearValues = () => {
      date.value = ""
      time.value = ""
    }

    return {
      date,
      time,
      isFocused,
      hasError,
      isDisabled,
      showDate,
      showTime,
      today,
      handleFocus,
      handleBlur,
      clearValues
    }
  }
})
</script>

<template>
  <div class="unit-date-time-picker" :class="{ 'has-error': hasError, 'is-disabled': isDisabled, 'is-focused': isFocused }">
    <!-- Label -->
    <label v-if="label" class="unit-picker-label">
      {{ label }}
      <span v-if="required" class="required-asterisk">*</span>
    </label>

    <!-- Input wrapper -->
    <div class="unit-picker-wrapper">
      <!-- Date input -->
      <div v-if="showDate" class="unit-input-group">
        <input
          type="date"
          v-model="date"
          class="unit-date-input"
          :placeholder="placeholderDate"
          :disabled="isDisabled"
          :required="required"
          :min="minDate || (today)"
          :max="maxDate"
          @focus="handleFocus"
          @blur="handleBlur"
        >
      </div>

      <!-- Time input -->
      <div v-if="showTime" class="unit-input-group">
        <input
          type="time"
          v-model="time"
          class="unit-time-input"
          :placeholder="placeholderTime"
          :disabled="isDisabled"
          :required="required"
          @focus="handleFocus"
          @blur="handleBlur"
        >
      </div>

      <!-- Clear button -->
      <button
        v-if="(date || time) && !isDisabled"
        type="button"
        class="unit-clear-btn"
        @click="clearValues"
        title="Clear"
      >
        ×
      </button>
    </div>

    <!-- Error message -->
    <div v-if="hasError" class="unit-error-message">
      {{ error }}
    </div>

    <!-- Helper text -->
    <div v-if="!hasError && (showDate && showTime)" class="unit-helper-text">
      Select both date and time for complete datetime
    </div>
  </div>
</template>

<style scoped>
.unit-date-time-picker {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 8px;
}

.unit-date-time-picker > .unit-picker-label {
  font-size: 14px;
  font-weight: 600;
  color: var(--color-gray-700, #374151);
  margin-bottom: 4px;
  display: block;
}

.unit-picker-label > .required-asterisk {
  color: var(--color-red-500, #ef4444);
  margin-left: 2px;
}

.unit-date-time-picker > .unit-picker-wrapper {
  display: flex;
  gap: 8px;
  width: 100%;
  position: relative;
  align-items: stretch;
}

.unit-picker-wrapper > .unit-input-group {
  flex: 1;
  position: relative;
}

.unit-input-group > .unit-date-input,
.unit-input-group > .unit-time-input {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid var(--color-gray-300, #d1d5db);
  border-radius: 8px;
  font-size: 14px;
  background-color: var(--color-white, #ffffff);
  transition: all 0.2s ease-in-out;
  outline: none;
  box-sizing: border-box;
}

.unit-input-group > .unit-date-input:focus,
.unit-input-group > .unit-time-input:focus {
  border-color: var(--color-blue-500, #3b82f6);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.unit-input-group > .unit-date-input:hover,
.unit-input-group > .unit-time-input:hover {
  border-color: var(--color-gray-400, #9ca3af);
}

.unit-input-group > .unit-date-input:disabled,
.unit-input-group > .unit-time-input:disabled {
  background-color: var(--color-gray-100, #f3f4f6);
  color: var(--color-gray-500, #6b7280);
  cursor: not-allowed;
  border-color: var(--color-gray-200, #e5e7eb);
}

.unit-picker-wrapper > .unit-clear-btn {
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  background: var(--color-gray-400, #9ca3af);
  color: white;
  border: none;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 14px;
  line-height: 1;
  transition: background-color 0.2s ease;
  z-index: 10;
}

.unit-picker-wrapper > .unit-clear-btn:hover {
  background: var(--color-gray-600, #4b5563);
}

.unit-date-time-picker > .unit-error-message {
  font-size: 12px;
  color: var(--color-red-500, #ef4444);
  margin-top: 4px;
}

.unit-date-time-picker > .unit-helper-text {
  font-size: 12px;
  color: var(--color-gray-500, #6b7280);
  margin-top: 4px;
}

/* State classes */
.unit-date-time-picker.has-error > .unit-picker-wrapper > .unit-input-group > .unit-date-input,
.unit-date-time-picker.has-error > .unit-picker-wrapper > .unit-input-group > .unit-time-input {
  border-color: var(--color-red-500, #ef4444);
}

.unit-date-time-picker.has-error > .unit-picker-wrapper > .unit-input-group > .unit-date-input:focus,
.unit-date-time-picker.has-error > .unit-picker-wrapper > .unit-input-group > .unit-time-input:focus {
  border-color: var(--color-red-500, #ef4444);
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
}

.unit-date-time-picker.is-disabled {
  opacity: 0.6;
}

/* Dark mode support (optional) */
@media (prefers-color-scheme: dark) {
  .unit-input-group > .unit-date-input,
  .unit-input-group > .unit-time-input {
    background-color: #1f2937;
    border-color: #374151;
    color: #f9fafb;
  }
  
  .unit-input-group > .unit-date-input:focus,
  .unit-input-group > .unit-time-input:focus {
    border-color: #3b82f6;
  }
  
  .unit-date-time-picker > .unit-picker-label {
    color: #f9fafb;
  }
}

/* Responsive design */
@media (max-width: 768px) {
  .unit-date-time-picker > .unit-picker-wrapper {
    flex-direction: column;
    gap: 12px;
  }
  
  .unit-picker-wrapper > .unit-clear-btn {
    position: absolute;
    right: 12px;
    top: 12px;
    transform: none;
  }
  
  .unit-input-group > .unit-date-input,
  .unit-input-group > .unit-time-input {
    padding-right: 40px;
  }
}

/* Enhanced focus states */
.unit-input-group > .unit-date-input:focus-visible,
.unit-input-group > .unit-time-input:focus-visible {
  outline: 2px solid var(--color-blue-500, #3b82f6);
  outline-offset: 2px;
}

/* Calendar and clock icons for better UX */
.unit-input-group > .unit-date-input::-webkit-calendar-picker-indicator,
.unit-input-group > .unit-time-input::-webkit-calendar-picker-indicator {
  cursor: pointer;
  filter: opacity(0.7);
  transition: filter 0.2s ease;
}

.unit-input-group > .unit-date-input::-webkit-calendar-picker-indicator:hover,
.unit-input-group > .unit-time-input::-webkit-calendar-picker-indicator:hover {
  filter: opacity(1);
}

.unit-input-group > .unit-date-input:disabled::-webkit-calendar-picker-indicator,
.unit-input-group > .unit-time-input:disabled::-webkit-calendar-picker-indicator {
  cursor: not-allowed;
  filter: opacity(0.3);
}
</style>
