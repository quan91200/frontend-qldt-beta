<script>
import {
  defineComponent,
} from 'vue'

import EmptyState from '~/components/Table/EmptyState.vue'

export default defineComponent({
  name: "Table",

  components: {
    EmptyState,
  },

  props: {
    data: {
      /**
       * @type {import('vue').PropType<
       *   Array<Record<string, any>>
       * >}
       */
      type: Array,
      required: true,
    },
    columns: {
      /**
       * @type {import('vue').PropType<
       *   Array<{
       *     key: string
       *     label: string
       *   }>
       * >}
       */
      type: Array,
      required: true,
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
    errorMessages: {
      type: String,
      default: '',
    },
    emptyState: {
      /**
       * @type {import('vue').PropType<{
       *   title: string
       *   desc: string
       * }>}
       */
      type: Object,
      default: () => ({
        title: 'No available',
        desc: 'There is no available for this table.',
      }),
    },
    displayHeader: {
      type: Boolean,
      default: true,
    },
  },

  setup(props) {
    return {
      props,
    }
  }
})
</script>

<template>
  <div class="unit-table">
    <table
      class="table"
    >
      <thead v-if="props.displayHeader">
        <tr>
          <th
            v-for="column in props.columns"
            :key="column.key"
            class="head cell"
          >
            {{ column.label }}
          </th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-if="props.isLoading"
          class="row"
        >
          <td
            :colspan="props.columns.length"
            class="cell loading"
          >
            <slot name="isLoading">
              Loading
            </slot>
          </td>
        </tr>

        <tr
          v-else-if="props.errorMessages"
          class="row"
        >
          <td
            :colspan="props.columns.length"
            class="cell error-message"
          >
            <slot
              name="errorMessage"
            >
              {{ props.errorMessages }}
            </slot>
          </td>
        </tr>

        <tr
          v-else-if="!props.data.length"
          class="row"
        >
          <td
            :colspan="props.columns.length"
            class="cell empty"
          >
            <slot
              name="empty"
            >
              <EmptyState
                :title="props.emptyState.title"
                :desc="props.emptyState.desc"
              />
            </slot>
          </td>
        </tr>

        <template v-else>
          <tr
            v-for="(row, rowIndex) in props.data"
            :key="rowIndex"
            class="row"
          >
            <td
              v-for="column in props.columns"
              :key="column.key"
              class="cell"
            >
              <slot
                :name="column.key"
                :row="row"
                :column="column"
                :value="row[column.key]"
              >
                {{ row[column.key] }}
              </slot>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.unit-table {
  width: 100%;

  border-radius: var(--size-border-radius);

  overflow-x: auto;
}

.unit-table > .table {
  border-collapse: collapse;
  width: 100%;
  background-color: var(--color-gray-50);
}

.table .head {
  text-align: left;
  font-weight: var(--font-weight-bold);
  font-size: var(--font-size-body-small);
  color: var(--color-neutral-700);
  border-bottom: 2px solid var(--color-gray-200);
  min-width: 5.5rem;
}

.table .row:hover:not(:has(.cell.empty, .cell.loading, .cell.error-message)) {
  background-color: var(--color-gray-100);
}

.table .cell {
  padding-block: var(--size-space-medium);
  padding-inline: var(--size-space-medium);
}

.table .cell:first-child {
  border-top-left-radius: var(--size-border-radius);
  border-bottom-left-radius: var(--size-border-radius);
}

.table .cell:last-child {
  border-top-right-radius: var(--size-border-radius);
  border-bottom-right-radius: var(--size-border-radius);
}

.table .cell.empty,
.table .cell.loading,
.table .cell.error-message {
  padding-block: var(--size-space-medium);
  vertical-align: middle;
  text-align: center;
  height: 10rem;
}

.table .cell.error-message {
  color: var(--color-red-500);
}
</style>
