<script>
import {
  defineComponent,
} from 'vue'

import {
  Icon,
} from '#components'

import AccordionContext from '~/app/contexts/AccordionContext'

export default defineComponent({
  name: "Accordion",

  components: {
    Icon,
  },

  props: {
    isOpen: {
      type: Boolean,
      required: false,
      default: false,
    },
  },

  emits: [
    'update:isOpen'
  ],

  setup (
    props,
    { emit },
  ) {

    const context = AccordionContext.create({
      props,
      componentContext: { emit },
    })

    return {
      context,
    }
  }
})
</script>

<template>
  <div
    :class="[
      'unit-section',
      {
        'is-open': context.isOpen,
      },
    ]"
  >
    <div
      class="accordion-header"
      @click="context.toggleAccordion()"
    >
      <div class="header-content">
        <slot name="header" />
      </div>
      <div
        :class="[
          'helper-content',
          {
            'is-open': context.isOpen,
          },
        ]"
        class="helper-content"
      >
        <slot name="helper" />
      </div>
      <div class="accordion-icon">
        <Icon
          name="ph:caret-down-bold"
          size="1rem"
          class="icon"
        />
      </div>
    </div>
    <div
      class="accordion-content"
    >
      <slot name="content" />
    </div>
  </div>
</template>

<style scoped>
.unit-section {
  position: relative;

  display: flex;
  flex-direction: column;
  gap: var(--size-space-tiny);

  width: 100%;
}

.unit-section > .accordion-header {
  display: flex;
  align-items: center;

  border-radius: var(--size-border-radius);
  padding-block: var(--size-space-medium);
  padding-inline: var(--size-space-tiny);

  background-color: var(--color-gray-100);

  cursor: pointer;
  user-select: none;
}

.unit-section > .accordion-header > .header-content {
  flex: 1;

  display: flex;
  gap: var(--size-space-tiny);
}

.unit-section.is-open > .accordion-header > .header-content {
  color: var(--color-blue-500);
}

.unit-section > .accordion-header > .helper-content {
  margin-right: var(--size-space-medium);
}

.unit-section > .accordion-header > .helper-content:empty {
  margin-right: var(--size-space-medium);
}

.unit-section > .accordion-header > .accordion-icon {
  display: flex;
  align-items: center;
  justify-content: center;

  transition: transform 250ms ease;
}

.unit-section > .accordion-header > .accordion-icon > .icon {
  transition: all 250ms ease;
}

.unit-section.is-open > .accordion-header > .accordion-icon > .icon {
  transform: rotate(180deg);

  color: var(--color-blue-500);
}

.unit-section > .accordion-content {
  display: none;
}

.unit-section.is-open > .accordion-content {
  margin-inline-start: var(--size-space-large);

  display: flex;
  flex-direction: column;
  gap: var(--size-space-tiny);

  animation: slide-down 250ms ease;
}
</style>
