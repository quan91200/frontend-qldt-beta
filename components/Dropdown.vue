<script>
import {
  defineComponent,
  watch,
} from "vue"

import useDropdown from "~/composables/useDropdown"

/**
 * BaseDropdownComponent
 *
 * A reusable dropdown component with slots for trigger and content.
 *
 * @component
 *
 * @props {string} [dropdownPosition='left'] - Horizontal dropdown alignment (`left`, `right`, `auto`).
 * @props {string} [verticalPosition='auto'] - Vertical dropdown alignment (`top`, `bottom`, `auto`).
 * @props {boolean} [disabled=false] - Disable dropdown interaction.
 *
 * @emits {void} open - Fired when the dropdown opens.
 * @emits {void} close - Fired when the dropdown closes.
 * @emits {boolean} toggle - Fired when dropdown toggles, with current state.
 *
 * @slots
 * - `trigger`: Custom trigger element. Slot props: `{ isOpen, toggle }`.
 * - `content`: Custom dropdown content. Slot props: `{ isOpen, close }`.
 *
 * @expose
 * - `open()`: Open the dropdown.
 * - `close()`: Close the dropdown.
 * - `toggle()`: Toggle dropdown open/close.
 * - `isOpen`: Ref<boolean> reactive state.
 */
export default defineComponent({
  name: "BaseDropdownComponent",

  props: {
    dropdownPosition: {
      type: String,
      default: 'left',
      validator: (value) => [
        'left',
        'right',
        'auto',
      ].includes(value),
    },
    verticalPosition: {
      type: String,
      default: 'auto',
      validator: (value) => [
        'auto',
        'top',
        'bottom'
      ].includes(value),
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },

  emits: [
    'open',
    'close',
    'toggle',
  ],

  setup(
    props,
  {
    emit,
    expose
  }) {
    // useDropdown composable
    const {
      isOpen,
      dropdownRef,
      contentRef,
      dropdownClasses,
      contentClasses,
      triggerAttrs,
      toggle,
      open,
      close,
    } = useDropdown(props)

    // Emit events when state changes
    watch(isOpen, (newValue, oldValue) => {
      if (newValue !== oldValue) {
        emit('toggle', newValue)
        if (newValue) {
          emit('open')
        } else {
          emit('close')
        }
      }
    })

    // Methods with disabled guard
    const handleToggle = () => {
      if (!props.disabled) toggle()
    }

    const handleOpen = () => {
      if (!props.disabled) open()
    }

    const handleClose = () => {
      close()
    }

    // Official Vue expose API
    expose({
      open: handleOpen,
      close: handleClose,
      toggle: handleToggle,
      isOpen,
    })

    return {
      // Refs
      isOpen,
      dropdownRef,
      contentRef,

      // Methods (for template use)
      toggleDropdown: handleToggle,
      openDropdown: handleOpen,
      closeDropdown: handleClose,

      // Classes
      dropdownClasses,
      contentClasses,

      // Attributes
      triggerAttrs,
    }
  }
})
</script>

<template>
  <div
    ref="dropdownRef"
    :class="dropdownClasses"
  >
    <!-- Trigger slot -->
    <div
      class="dropdown__trigger"
      v-bind="triggerAttrs"
      @click="toggleDropdown"
    >
      <slot
        name="trigger"
        :is-open="isOpen"
        :toggle="toggleDropdown"
      >
        <button
          type="button"
          class="dropdown__button"
          :disabled="$props.disabled"
        >
          Dropdown
        </button>
      </slot>
    </div>

    <!-- Content slot -->
    <Transition name="dropdown-fade">
      <div
        v-show="isOpen"
        ref="contentRef"
        :class="contentClasses"
      >
        <slot
          name="content"
          :is-open="isOpen"
          :close="closeDropdown"
        >
          <div class="dropdown__item">
            Default content
          </div>
        </slot>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown__trigger {
  cursor: pointer;
}

.dropdown__trigger[aria-disabled="true"] {
  cursor: not-allowed;
  opacity: 0.6;
}

.dropdown__button {
  padding: 8px 16px;
  border: 1px solid #ddd;
  background: white;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.dropdown__button:hover:not(:disabled) {
  border-color: #999;
}

.dropdown__button:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.dropdown__content {
  position: absolute;
  z-index: 1000;
  min-width: 160px;
  background: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  opacity: 0;
  visibility: hidden;
  transition: all 0.2s ease;
}

.dropdown__content--visible {
  opacity: 1;
  visibility: visible;
}

/* Position classes */
.dropdown__content--left {
  left: 0;
}

.dropdown__content--right {
  right: 0;
}

.dropdown__content--top {
  bottom: 100%;
  margin-bottom: 4px;
}

.dropdown__content--bottom {
  top: 100%;
  margin-top: 4px;
}

.dropdown__item {
  padding: 8px 16px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.dropdown__item:hover {
  background-color: #f5f5f5;
}

/* Transition classes */
.dropdown-fade-enter-active,
.dropdown-fade-leave-active {
  transition: all 0.2s ease;
}

.dropdown-fade-enter-from,
.dropdown-fade-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
