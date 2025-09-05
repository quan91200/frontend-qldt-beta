<script>
import {
    defineComponent,
    computed
} from "vue"

import {
    useRoute,
} from "vue-router"

import {
    Icon,
    NuxtLink,
} from "#components"

export default defineComponent({
  name: "Breadcrumb",

  components: {
    Icon,
    NuxtLink,
  },

  props: {
    /**
     * List of breadcrumb segments that should be disabled (not clickable).
     * @type {string[]}
     */
    disabledSegments: {
      type: Array,
      default: () => [],
    },
  },

  setup(props) {
    const route = useRoute()

    const formatLabel = (label) => {
      if (label.toLowerCase() === "index") return "Trang Chủ"
      return label
        .replace(/([a-z])([A-Z])/g, "$1 $2") // split camelCase
        .replace(/-/g, " ")                 // split kebab-case
        .replace(/\b\w/g, c => c.toUpperCase()) // capitalize first letter
    }

    const breadcrumb = {
      formatLabel,
      segments: computed(() => {
        const parts = route.path.split("/").filter(Boolean)
        return parts.map((segment, index) => ({
          raw: segment,
          label: formatLabel(decodeURIComponent(segment)),
          path: "/" + parts.slice(0, index + 1).join("/"),
        }))
      }),
      isDisabled(segment) {
        return props.disabledSegments.includes(segment.raw)
      },
    }

    return { breadcrumb }
  },
})
</script>

<template>
  <nav
    class="unit-breadcrumb"
    aria-label="Breadcrumb"
  >
    <ol class="unit-breadcrumb-list">
      <li
        v-for="(segment, index) in breadcrumb.segments"
        :key="index"
        class="unit-breadcrumb-item"
      >
        <!-- If not last segment -->
        <template v-if="index < breadcrumb.segments.length - 1">
          <!-- Linkable if not disabled -->
          <NuxtLink
            v-if="!breadcrumb.isDisabled(segment)"
            :to="segment.path"
            class="unit-breadcrumb-link"
          >
            {{ segment.label }}
          </NuxtLink>

          <!-- Disabled segment -->
          <span
            v-else
            class="unit-breadcrumb-disabled"
          >
            {{ segment.label }}
          </span>

          <!-- Separator -->
          <Icon
            name="mdi:chevron-right"
            class="unit-breadcrumb-separator"
            aria-hidden="true"
          />
        </template>

        <!-- Last segment (always text) -->
        <span
          v-else
          class="unit-breadcrumb-current"
        >
          {{ segment.label }}
        </span>
      </li>
    </ol>
  </nav>
</template>

<style scoped>
.unit-breadcrumb {
  display: flex;
  align-items: center;
}

.unit-breadcrumb-list {
  display: flex;
  align-items: center;
  gap: var(--size-space-small);

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
  color: var(--color-blue-600);
  font-size: var(--font-size-body-medium);
  font-weight: var(--font-weight-medium);
  text-decoration: none;
  transition: color 0.2s ease;
  cursor: pointer;
}

.unit-breadcrumb-link:hover {
  color: var(--color-blue-800);
}

.unit-breadcrumb-disabled {
  font-size: var(--font-size-body-medium);
  font-weight: var(--font-weight-medium);
  color: var(--color-gray-400);
  cursor: not-allowed;
}

.unit-breadcrumb-current {
  font-size: var(--font-size-body-medium);
  font-weight: var(--font-weight-medium);
  color: var(--color-gray-600);
}

.unit-breadcrumb-separator {
  font-size: var(--font-size-md);
  color: var(--color-gray-400);
}
</style>
