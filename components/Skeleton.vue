<script>
import {
  defineComponent,
} from 'vue'

export default defineComponent({
  props: {
    type: {
      /** @type {import('vue').PropType<'title' | 'desc' | 'avatar'>} */
      type: String,
      default: 'desc',
      validator: value => [
        'title',
        'desc',
        'avatar',
      ].includes(value),
    }
  },

  setup(props) {
    return {
      props,
    }
  }
})
</script>

<template>
  <div
    class="skeleton-block"
    :class="props.type"
  />
</template>

<style scoped>
.skeleton-block {
  --skeleton-title: 1.2rem;
  --skeleton-desc: 3rem;
  --skeleton-avatar: 4rem;
  --skeleton-speed: 5s;

  margin-block: var(--size-space-tiny);

  width: 85%;

  background: var(--color-linear-gradient-loading);
  background-size: 200% 100%;
  background-position: 100% 0;
  animation: skeleton-pulse var(--skeleton-speed) infinite;
}

.skeleton-block.title {
  border-radius: var(--size-border-radius-large);
  height: var(--skeleton-title);
}

.skeleton-block.desc {
  border-radius: var(--size-border-radius);
  height: var(--skeleton-desc);
}

.skeleton-block.avatar {
  border-radius: var(--size-border-radius-full);
  height: var(--skeleton-avatar);
  width: var(--skeleton-avatar);
}

@keyframes skeleton-pulse {
  100% {
    background-position: -100% 0;
  }
}
</style>
