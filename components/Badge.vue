<script>
import {
  defineComponent,
} from 'vue'

import BadgeContext from '~/app/contexts/BadgeContext'

export default defineComponent({
  name: 'Badge',

  props: {
    anchorOrigin: {
      type: Object,
      default: () => ({
        vertical: 'top',
        horizontal: 'right',
      }),
    },
    content: {
      type: [String, Number],
      default: null,
    },
    children: {
      type: null,
      default: null,
    },
    classes: {
      type: Object,
      default: () => ({}),
    },
    color: {
      type: String,
      default: 'secondary',
      validator: value => [
        'primary',
        'secondary',
        'success',
        'warning',
        'danger'
      ].includes(value)
    },
    invisible: {
      type: Boolean,
      default: false,
    },
    max: {
      type: Number,
      default: 99,
    },
    overlap: {
      type: String,
      default: 'rectangular',
      validator: value => [
        'rectangular',
        'circular',
      ].includes(value)
    },
    showZero: {
      type: Boolean,
      default: false,
    },
    variant: {
      type: String,
      default: 'standard',
      validator: value => [
        'standard',
        'dot',
      ].includes(value)
    },
  },

  setup(
    props,
    componentContext,
  ) {
    const context = BadgeContext.create({
      props,
      componentContext,
    })
      .setupComponent()

    return {
      context
    }
  },
})
</script>

<template>
  <div
    class="badge-root"
    :class="[
      context.overlap,
      context.classes.root,
    ]"
  >
    <slot />

    <span
      v-if="!context.isInvisible()"
      class="badge"
      :class="[
        context.generateBadgeClassObject(),
        context.generatePosition(),
      ]"
    >
      <template v-if="!context.isDotVariant()">
        {{ context.displayContent() }}
      </template>
    </span>
  </div>
</template>

<style scoped>
.badge-root {
  position: relative;
  display: inline-flex;
  vertical-align: middle;
}

.badge {
  --min-width: 1.2rem;
  --height: 1.2rem;
  --min-width-x: 0.6rem;
  --height-x: 0.6rem;

  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;

  min-width: var(--min-width);
  height: var(--height);

  white-space: nowrap;
  color: var(--color-zinc-50);
}

/** Variant */
.badge.standard {
  background-color: var(--color-gray-300);
  border-radius: var(--size-border-radius-tiny);

  padding-inline: var(--size-space-tiny);
}

.badge.dot {
  min-width: var(--min-width-x);
  height: var(--height-x);

  border-radius: var(--size-border-radius-full);

  color: transparent;
  line-height: 0;
}

/** Color */
.badge.primary {
  background-color: var(--color-blue-500);
}

.badge.secondary {
  background-color: var(--color-gray-500);
}

.badge.success {
  background-color: var(--color-green-500);
}

.badge.danger {
  background-color: var(--color-red-500);
}

.badge.warning {
  background-color: var(--color-yellow-500);
}

/** Position */
.badge.anchor-top-right  {
  top: 0;
  right: 0;
  transform: translate(50%, -50%);
}

.badge.anchor-top-left {
  top: 0;
  left: 0;
  transform: translate(-50%, -50%);
}

.badge.anchor-bottom-right {
  bottom: 0;
  right: 0;
  transform: translate(50%, 50%);
}

.badge.anchor-bottom-left {
  bottom: 0;
  left: 0;
  transform: translate(-50%, 50%);
}

/** Overlap */
.badge.rectangular {
  border-radius: var(--size-border-radius-tiny);
}

.badge.circular {
  border-radius: var(--size-border-radius-full);
}
</style>
