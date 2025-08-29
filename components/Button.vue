<script>
import {
  defineComponent,
} from "vue"

import {
  Icon,
} from "#components"

export default defineComponent({
  name: "Button",

  components: {
    Icon,
  },

  props: {
    type: {
      type: String,
      default: 'submit',
      validator: value => [
        'submit',
        'button',
        'reset',
      ].includes(value),
    },
    variant: {
      type: String,
      default: "default",
      validator: value => [
        "primary",
        "secondary",
        "warning",
        "danger",
        "success",
        "outline-primary",
        "outline-secondary",
        "outline-warning",
        "outline-danger",
        "outline-success",
        "default",
      ].includes(value),
    },
    size: {
      type: String,
      default: "medium",
      validator: value => [
        "small",
        "medium",
        "large",
        "full",
      ].includes(value),
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },

  setup (props) {
    return {
      props,
    }
  },
})
</script>

<template>
  <button
    :type="props.type"
    :disabled="props.disabled || props.loading"
    :class="[
      'unit-button',
      variant,
      size,
      {
        loading: props.loading,
      },
    ]"
  >
    <Icon
      v-if="props.loading"
      class="spinner"
      name="svg-spinners:180-ring-with-bg"
      size="1rem"
    />

    <div class="unit-content">
      <!-- Left Icon -->
      <slot name="leftIcon" />

      <!-- Main Content -->
      <span class="content">
        <slot />
      </span>

      <!-- Right Icon -->
      <slot name="rightIcon" />
    </div>
  </button>
</template>

<style scoped>
.unit-button {
  border: 1px solid transparent;
  border-radius: var(--size-border-radius);

  display: grid;
  align-items: center;
  justify-content: center;
  gap: var(--size-space-tiny);

  text-align: center;

  cursor: pointer;
  user-select: none;
  transition: all 250ms ease-in-out;
}

.unit-button:hover:not(:disabled) {
  opacity: 0.85;
}

/** Variants */
.unit-button.primary {
  background-color: var(--color-blue-500);
  color: var(--color-blue-50);
}

.unit-button.primary:hover:not(:disabled) {
  background-color: var(--color-blue-50);
  color: var(--color-blue-500);

  border-color: var(--color-blue-500);
}

.unit-button.secondary {
  background-color: var(--color-gray-500);
  color: var(--color-gray-50);
}

.unit-button.secondary:hover:not(:disabled) {
  background-color: var(--color-gray-50);
  color: var(--color-gray-500);

  border-color: var(--color-gray-500);
}

.unit-button.success {
  background-color: var(--color-green-500);
  color: var(--color-green-50);
}

.unit-button.success:hover:not(:disabled) {
  background-color: var(--color-green-50);
  color: var(--color-green-500);

  border-color: var(--color-green-500);
}

.unit-button.warning {
  background-color: var(--color-yellow-500);
  color: var(--color-yellow-50);
}

.unit-button.warning:hover:not(:disabled) {
  background-color: var(--color-yellow-50);
  color: var(--color-yellow-500);

  border-color: var(--color-yellow-500);
}

.unit-button.danger {
  background-color: var(--color-red-500);
  color: var(--color-gray-50);
}

.unit-button.danger:hover:not(:disabled) {
  background-color: var(--color-red-50);
  color: var(--color-red-500);

  border-color: var(--color-red-500);
}

.unit-button.outline-primary {
  background-color: var(--color-blue-50);
  color: var(--color-blue-500);

  border-color: var(--color-blue-500);
}

.unit-button.outline-primary:hover:not(:disabled) {
  background-color: var(--color-blue-500);
  color: var(--color-blue-50);

  border-color: var(--color-blue-50);
}

.unit-button.outline-secondary {
  background-color: var(--color-gray-50);
  color: var(--color-gray-500);

  border-color: var(--color-gray-500);
}

.unit-button.outline-secondary:hover:not(:disabled) {
  background-color: var(--color-gray-500);
  color: var(--color-gray-50);

  border-color: var(--color-gray-50);
}

.unit-button.outline-success {
  background-color: var(--color-green-50);
  color: var(--color-green-500);

  border-color: var(--color-green-500);
}

.unit-button.outline-success:hover:not(:disabled) {
  background-color: var(--color-green-500);
  color: var(--color-green-50);

  border-color: var(--color-green-50);
}

.unit-button.outline-warning {
  background-color: var(--color-yellow-50);
  color: var(--color-yellow-500);

  border-color: var(--color-yellow-500);
}

.unit-button.outline-warning:hover:not(:disabled) {
  background-color: var(--color-yellow-500);
  color: var(--color-yellow-50);

  border-color: var(--color-yellow-50);
}

.unit-button.outline-danger {
  background-color: var(--color-red-50);
  color: var(--color-red-500);

  border-color: var(--color-red-500);
}

.unit-button.outline-danger:hover:not(:disabled) {
  background-color: var(--color-red-500);
  color: var(--color-red-50);

  border-color: var(--color-red-50);
}

.unit-button.default {
  background-color: transparent;
}

.unit-button.default:hover:not(:disabled) {
  background-color: var(--color-blue-300);
  color: var(--color-gray-50);
}

/** State */
.unit-button.loading {
  opacity: 0.6;
  pointer-events: none;
}

.unit-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/** Loading spinner */
.unit-button > * {
  grid-column: 1 / 2;
  grid-row: 1 / 2;
  justify-self: center;
}

/** Content */
.unit-button > .unit-content  > .content {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--size-space-tiny);
}

.unit-button.loading > .unit-content {
  opacity: 0;
}

/** Size */
.unit-button.small {
  padding-inline: var(--size-space-medium);
  padding-block: var(--size-space-tiny);
  font-size: var(--font-size-body-xsmall);
}

.unit-button.medium {
  padding-inline: var(--size-space-large);
  padding-block: var(--size-space-small);
  font-size: var(--font-size-body-small);
}

.unit-button.large {
  padding-inline: var(--size-space-xlarge);
  padding-block: var(--size-space-medium);
  font-size: var(--font-size-body-medium);
}

.unit-button.full {
  width: 100%;
  padding-inline: var(--size-space-large);
  padding-block: var(--size-space-small);
  font-size: var(--font-size-body-small);
}
</style>
