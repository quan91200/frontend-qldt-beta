<script>
import {
  defineComponent,
  ref,
} from "vue"

import AvatarContext from "~/app/contexts/AvatarContext"

export default defineComponent({
  name: "AvatarComponent",

  props: {
    src: {
      type: String,
      default: ""
    },
    name: {
      type: String,
      default: ""
    },
    alt: {
      type: String,
      default: ""
    },
    size: {
      type: String,
      default: "md",
      validator: (value) => [
        "xs",
        "sm",
        "md",
        "lg",
        "xl"
      ].includes(value)
    },
    rounded: {
      type: Boolean,
      default: true
    },
    bordered: {
      type: Boolean,
      default: false
    },
    isDisabled: {
      type: Boolean,
      default: false
    }
  },

  setup(props) {
    const hasImageError = ref(false)

    // Handle image load error
    const handleImageError = () => {
      hasImageError.value = true
    }

    // Handle successful image load
    const handleImageLoad = () => {
      hasImageError.value = false
    }

    const context = AvatarContext.create({
      props,
      hasImageErrorRef: hasImageError,
      handleImageError,
      handleImageLoad,
      hasImageError,
    })
      .setupComponent()

    return {
      context,
    }
  }
})
</script>

<template>
  <div :class="context.generateAvatarClassObject()">
    <!-- Display image if available and no error -->
    <img
      v-if="context.isShowImage()"
      :src="context.src"
      :alt="context.alt"
      class="avatar-image"
      @error="context.handleImageError"
      @load="context.handleImageLoad"
    >

    <!-- Display name fallback if no image or error -->
    <span
      v-else
      class="avatar-text"
    >
      {{ context.generateName() }}
    </span>
  </div>
</template>

<style scoped>
.avatar {
  display: inline-flex;
  align-items: center;
  justify-content: center;

  flex-shrink: 0;

  font-weight: var(--font-weight-medium);

  background-color: var(--color-blue-50);
  color: var(--color-gray-400);

  overflow: hidden;
  position: relative;

  user-select: none;
}

/* Sizes */
.avatar.xs {
  width: var(--size-avatar-xs);
  height: var(--size-avatar-xs);
  font-size: var(--font-size-xs);
}

.avatar.sm {
  width: var(--size-avatar-sm);
  height: var(--size-avatar-sm);
  font-size: var(--font-size-sm);
}

.avatar.md {
  width: var(--size-avatar-md);
  height: var(--size-avatar-md);
  font-size: var(--font-size-md);
}

.avatar.lg {
  width: var(--size-avatar-lg);
  height: var(--size-avatar-lg);
  font-size: var(--font-size-lg);
}

.avatar.xl {
  width: var(--size-avatar-xl);
  height: var(--size-avatar-xl);
  font-size: var(--font-size-xl);
}

/* Rounded styles */
.avatar.rounded {
  border-radius: 50%;
}

.avatar:not(.rounded) {
  border-radius: var(--size-border-radius-tiny);
}

/* Bordered styles */
.avatar.bordered {
  border: 2px solid var(--color-zinc-50);
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);
}

/* Disabled state */
.avatar.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Image styles */
.avatar-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border: none;
}

/* Text styles */
.avatar-text {
  line-height: 1;
  text-align: center;
  text-transform: uppercase;
  font-weight: 600;
}

/* Color variations for text avatars */
.avatar:not(:has(.avatar-image)) {
  background: var(--avatar-linear-gradient);
  color: var(--color-zinc-50);
}

/* Hover effect for non-disabled avatars */
.avatar:not(.disabled):hover {
  transform: scale(1.05);
  transition: transform 0.2s ease-in-out;
}

/* Focus styles for accessibility */
.avatar:focus {
  outline: 2px solid var(--color-blue-500);
  outline-offset: 2px;
}

/* Animation for error state */
.avatar .avatar-text {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
