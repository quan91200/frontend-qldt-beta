<script>
import {
  defineComponent
} from "vue"

import Dropdown from "~/components/Dropdown.vue"

import Button from "~/components/Button.vue"

export default defineComponent({
  name: "DemoDropdown",

  components: {
    Dropdown,
    Button
  },
})
</script>

<template>
  <div class="unit-container">
    <h1>
      Dropdown Component Demo
    </h1>

    <!-- Default Dropdown -->
    <section class="unit-content">
      <h2>Default Dropdown</h2>
      <Dropdown>
        <template #trigger="{ isOpen }">
          <Button
            variant="primary"
          >
            {{ isOpen
              ? 'Close'
              : 'Open' }} Dropdown
          </Button>
        </template>
        <template #content="{ close }">
          <div class="dropdown-demo-content">
            <div class="dropdown-demo-item">
              Item 1
            </div>
            <div class="dropdown-demo-item">
              Item 2
            </div>
            <div
              class="dropdown-demo-item"
              @click="close"
            >
              Close
            </div>
          </div>
        </template>
      </Dropdown>
    </section>

    <!-- Disabled Dropdown -->
    <section class="unit-content">
      <h2>Disabled Dropdown</h2>
      <Dropdown disabled>
        <template #trigger>
          <Button
            variant="secondary"
            disabled
          >
            Disabled Dropdown
          </Button>
        </template>
      </Dropdown>
    </section>

    <!-- Positioned Dropdown -->
    <section class="unit-content">
      <h2>Position Variants</h2>
      <div class="unit-button">
        <Dropdown dropdownPosition="left">
          <template #trigger>
            <Button variant="outline-primary">
              Left
            </Button>
          </template>
          <template #content>
            <div class="dropdown-demo-content">
              Left-aligned content
            </div>
          </template>
        </Dropdown>

        <Dropdown verticalPosition="top">
          <template #trigger>
            <Button variant="outline-warning">
              Top
            </Button>
          </template>
          <template #content>
            <div class="dropdown-demo-content">
              Top content
            </div>
          </template>
        </Dropdown>

        <Dropdown dropdownPosition="right">
          <template #trigger>
            <Button variant="outline-success">
              Right
            </Button>
          </template>
          <template #content>
            <div class="dropdown-demo-content">
              Right-aligned content
            </div>
          </template>
        </Dropdown>
      </div>
    </section>
  </div>
</template>

<style scoped>
.unit-container {
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: var(--size-space-medium);

  padding-block: var(--size-space-medium);
  padding-inline: var(--size-space-medium);
}

.unit-container > .unit-content {
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: var(--size-space-medium);
}

.unit-container > .unit-content > .unit-button {
  display: flex;
  align-items: center;
  gap: var(--size-space-small);
}

/* Demo dropdown content style */
.dropdown-demo-content {
  display: flex;
  flex-direction: column;
  gap: var(--size-space-small);
  padding: var(--size-space-small);
}

.dropdown-demo-item {
  padding: var(--size-space-small);
  cursor: pointer;
}

.dropdown-demo-item:hover {
  background: var(--color-neutral-100);
}
</style>

