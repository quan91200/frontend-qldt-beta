<script>
import { defineComponent } from "vue"
import BaseDropdownComponent from "~/components/Dropdown.vue"
import Button from "~/components/Button.vue"
export default defineComponent({
  name: "DemoDropdown",

  components: {
    BaseDropdownComponent,
    Button
  },
})
</script>

<template>
  <div class="page">
    <!-- Basic Dropdown -->
    <section class="demo-section">
      <h2>Basic Dropdown</h2>
      <BaseDropdownComponent>
        <template #trigger="{ isOpen }">
          <Button variant="primary">
            Menu
          </Button>
        </template>

        <template #content>
          <div
            @click="$router.push('/DemoModal')"
            class="dropdown__item"
          >
            DemoModal
          </div>
          <div
            @click="$router.push('/')"
            class="dropdown__item"
          >
            Home
          </div>
          <div
            @click="$router.push('#')"
            class="dropdown__item"
          >
            Action 3
          </div>
        </template>
      </BaseDropdownComponent>
    </section>
  </div>
</template>

<style scoped>
.page {
  display: flex;

  padding-inline: var(--size-space-medium);
  padding-block: var(--size-space-medium);
}
</style>
