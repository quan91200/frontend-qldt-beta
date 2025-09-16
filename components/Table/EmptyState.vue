<script>
import {
  defineComponent,
} from 'vue'

export default defineComponent({
  name: "EmptyState",

  props: {
    title: {
      type: String,
      default: '',
    },
    imgUrl: {
      type: String,
      default: '/not-found.webp',
    },
    desc: {
      type: String,
      default: '',
    },
    size: {
      /** @type {import('vue').PropType<'small' | 'medium' | 'large'>} */
      type: String,
      default: 'medium',
      /** @type {(value: string) => value is 'small' | 'medium' | 'large'} */
      validator: value => [
        'small',
        'medium',
        'large',
      ].includes(value),
    },
  }
})
</script>

<template>
  <div class="unit-empty-state-container">
    <slot name="icon">
      <img
        class="icon"
        :src="imgUrl"
        alt="Empty State"
        :class="{
          small: size === 'small',
          medium: size === 'medium',
          large: size === 'large',
        }"
      >
    </slot>

    <slot name="title">
      <p
        class="title"
        :class="{
          small: size === 'small',
          medium: size === 'medium',
          large: size === 'large',
        }"
      >
        {{ title }}
      </p>
    </slot>

    <slot name="desc">
      <p
        class="desc"
        :class="{
          small: size === 'small',
          medium: size === 'medium',
          large: size === 'large',
        }"
      >
        {{ desc }}
      </p>
    </slot>
  </div>
</template>

<style scoped>
.unit-empty-state-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.title {
  font-weight: var(--font-weight-medium);
  color: var(--color-gray-600);
}

.title.small {
  font-size: var(--font-size-label-small);
}

.title.medium {
  font-size: var(--font-size-label-medium);
}

.title.large {
  font-size: var(--font-size-label-large);
}

.desc {
  font-weight: var(--font-weight-small);
  color: var(--color-gray-600);
}

.desc.small {
  font-size: var(--font-size-body-small);
}

.desc.medium {
  font-size: var(--font-size-body-medium);
}

.desc.large {
  font-size: var(--font-size-body-large);
}

.icon {
  height: auto;
  object-fit: contain;
}

.icon.small {
  width: 8rem;
}

.icon.medium {
  width: 12.5rem;
}

.icon.large {
  width: 16.25rem;
}
</style>
