<script>
import { defineComponent } from "vue"
import { Icon } from "#components"

export default defineComponent({
  name: "Breadcrumb",

  components: {
    Icon
},

  props: {
    items: {
      type: Array,
      required: true,
    },
  },
})
</script>

<template>
  <nav
    class="unit-breadcrumb"
    aria-label="Breadcrumb"
  >
    <ol
      class="unit-breadcrumb-list"
    >
      <li
        v-for="(item, index) in items"
        :key="index"
        class="unit-breadcrumb-item"
      >
        <!-- Nếu có href thì render link -->
        <a
          v-if="item.href"
          :href="item.href"
          class="unit-breadcrumb-link"
        >
          {{ item.label }}
        </a>

        <!-- Nếu là item cuối cùng thì render span -->
        <span
          v-else
          class="unit-breadcrumb-current"
        >
          {{ item.label }}
        </span>

        <!-- Separator -->
        <Icon
          v-if="index < items.length - 1"
          name="mdi:chevron-right"
          class="unit-breadcrumb-separator"
        />
      </li>
    </ol>
  </nav>
</template>

<style scoped>
.unit-breadcrumb {
  /* Layout */
  display: flex;
  align-items: center;
}

.unit-breadcrumb-list {
  /* Layout */
  display: flex;
  align-items: center;
  gap: var(--size-space-small);

  /* Reset */
  list-style: none;
  margin: 0;
  padding: 0;
}

.unit-breadcrumb-item {
  display: flex;
  align-items: center;
  gap: var(--size-space-small);
}

.unit-breadcrumb-link {
  /* Typography */
  color: var(--color-blue-600);
  font-size: var(--font-size-body-medium);
  font-weight: var(--font-weight-medium);
  text-decoration: none;

  /* Interaction */
  transition: color 0.2s ease;
}

.unit-breadcrumb-link:hover {
  color: var(--color-blue-800);
}

.unit-breadcrumb-current {
  /* Typography */
  font-size: var(--font-size-body-medium);
  font-weight: var(--font-weight-medium);
  color: var(--color-gray-600);
}

.unit-breadcrumb-separator {
  font-size: var(--font-size-md);
  color: var(--color-gray-400);
}
</style>
