<script>
import Sidebar from '~/components/Layout/Sidebar.vue'

import Header from '~/components/Layout/Header.vue'

export default {
  name: 'DefaultLayout',

  components: {
    Sidebar,
    Header,
  },
}
</script>

<template>
  <div class="unit-container">
    <Header />

    <div class="unit-content">
      <Sidebar />

      <main class="unit-main">
        <slot />
      </main>
    </div>
  </div>
</template>

<style>
.unit-container {
  height: 100dvh;

  color: var(--color-zinc-900);
  background-color: var(--color-gray-50);

  overflow: unset;
}
</style>

<style scoped>
.unit-content {
  min-width: 0;

  flex-grow: 1;
  display: flex;

  gap: var(--size-space-tiny);
}

.unit-content > .unit-main {
  margin-block-start: var(--size-header-height);
  margin-block-end: var(--size-space-large);
  margin-inline-end: var(--size-space-large);

  padding: var(--size-space-large);
  border-radius: var(--size-border-radius-small);

  flex-grow: 1;

  min-height: calc(100dvh - var(--size-header-height) - 1rem);
  background-color: var(--color-gray-200);

  overflow-y: auto;
  overflow-x: hidden;
}
</style>
