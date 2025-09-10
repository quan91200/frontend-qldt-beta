<script>
import {
  defineComponent,
} from "vue"

export default defineComponent({
  name: "Tab",

  props: {
    modelValue: {
      type: String,
      required: true,
    },
    tabs: {
      /** @type {import('vue').PropType<Array<{ value: string; label: string }>>} */
      type: Array,
      required: true,
      validator: (values) =>
        Array.isArray(values)
        && values.every(value => 'value' in value && 'label' in value),
    },
    variants: {
      /** @type {import('vue').PropType<'default' | 'underline'>} */
      type: String,
      default: 'default',
    },
  },

  emits: ['update:modelValue'],

  setup (props) {
    return {
      props,
    }
  }
})
</script>

<template>
  <div class="unit-tabs">
    <!-- Tab Header -->
    <div
      class="unit-tabs-header"
      :class="props.variants"
    >
      <button
        v-for="(tab, index) in props.tabs"
        :key="index"
        class="button"
        :class="[
          {
            active: modelValue === tab.value,
          },
          props.variants,
        ]"
        type="button"
        @click="$emit('update:modelValue', tab.value)"
      >
        {{ tab.label }}
      </button>
    </div>

    <!-- Tab Content -->
    <div class="unit-tabs-content">
      <slot :active-tab="props.modelValue" />
    </div>
  </div>
</template>

<style scoped>
.unit-tabs {
  width: 100%;
}

.unit-tabs > .unit-tabs-header {
  border-radius: var(--size-border-radius-tiny);
  padding-block: var(--size-space-medium);
  padding-inline: var(--size-space-medium);

  width: fit-content;

  color: var(--color-gray-600);
  background-color: var(--color-gray-50);
}

.unit-tabs > .unit-tabs-header.underline {
  border-radius: unset;
  border-bottom: 1px solid var(--color-gray-400);

  padding-block: 0;
  padding-inline: 0;

  width: 100%;

  background-color: unset;
}

.unit-tabs > .unit-tabs-header > .button {
  border-radius: var(--size-border-radius-tiny);
  border: none;

  padding-block: var(--size-space-medium);
  padding-inline: var(--size-space-medium);

  min-width: 5rem;

  color: var(--color-gray-600);
  background-color: none;

  transition: color 0.2s;
  cursor: pointer;
}

.unit-tabs > .unit-tabs-header > .button.underline {
  border-radius: 0;
  padding-bottom: var(--size-space-small);

  min-width: 9rem;
}

.unit-tabs > .unit-tabs-header > .button.active {
  font-weight: var(--font-weight-medium);
  color: var(--color-gray-800);
  background-color: var(--color-gray-200);
}

.unit-tabs > .unit-tabs-header > .button.active.underline {
  border-bottom: 1px solid var(--color-gray-600);

  color: var(--color-gray-800);
  background-color: unset;
}

.unit-tabs > .unit-tabs-content {
  margin-block-start: var(--size-space-medium);
}
</style>
