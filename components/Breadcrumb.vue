<script>
import {
  defineComponent,
  computed,
} from "vue"

import {
  useRoute
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
       * @type {import('vue').PropType<Array<string>>}
       */
      disabledSegments: {
        type: Array,
        default: () => [],
      },
    },

  setup(props) {
    const route = useRoute()

    /**
     * Format a segment label into human-readable form
     *
     * @param {string} label
     * @returns {string}
     */
    const formatLabel = (label) => {
      return label
        .replace(/([a-z])([A-Z])/g, "$1 $2")
        .replace(/-/g, " ")
        .replace(/\b\w/g, c => c.toUpperCase())
    }

    /**
     * Computed breadcrumb segments
     *
     * @type {import("vue").ComputedRef<{label: string, path: string}[]>}
     */
    const segments = computed(() => {
      const parts = route.path.split("/").filter(Boolean)
      return parts.map((segment, index) => ({
        label: formatLabel(decodeURIComponent(segment)),
        path: "/" + parts.slice(0, index + 1).join("/"),
      }))
    })

    /**
     * Check if a segment is disabled
     *
     * @param {{ label: string, path: string }} segment
     * @returns {boolean}
     */
    const isDisabled = (segment) =>
      props.disabledSegments.includes(segment.label)

    return {
       segments,
       isDisabled
    }
  },
})
</script>


<template>
  <nav
    class="unit-breadcrumb"
    aria-label="Breadcrumb"
  >
    <div
      v-for="(segment, index) in segments"
      :key="index"
      class="unit-breadcrumb-item"
      role="listitem"
    >
      <!-- Not last segment -->
      <template v-if="index < segments.length - 1">
        <!-- Linkable if not disabled -->
        <NuxtLink
          v-if="!isDisabled(segment)"
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
        />
      </template>

      <!-- Last segment -->
      <span
        v-else
        class="unit-breadcrumb-current"
      >
        {{ segment.label }}
      </span>
    </div>
  </nav>
</template>


<style scoped>
.unit-breadcrumb {
  display: flex;
  align-items: center;
}

.unit-breadcrumb > .unit-breadcrumb-item {
  display: flex;
  align-items: center;
  gap: var(--size-space-small);
}

.unit-breadcrumb > .unit-breadcrumb-item > .unit-breadcrumb-link {
  transition: color 0.2s ease;
  cursor: pointer;
}

.unit-breadcrumb > .unit-breadcrumb-item > .unit-breadcrumb-link:hover {
  color: var(--color-blue-800);
}

.unit-breadcrumb > .unit-breadcrumb-item > .unit-breadcrumb-disabled {
  font-size: var(--font-size-body-medium);
  font-weight: var(--font-weight-medium);
  color: var(--color-gray-400);
  cursor: not-allowed;
}

.unit-breadcrumb > .unit-breadcrumb-item > .unit-breadcrumb-current {
  font-size: var(--font-size-body-medium);
  font-weight: var(--font-weight-medium);
  color: var(--color-gray-600);
}

.unit-breadcrumb > .unit-breadcrumb-item > .unit-breadcrumb-separator {
  font-size: var(--font-size-md);
  color: var(--color-gray-400);
}

</style>
