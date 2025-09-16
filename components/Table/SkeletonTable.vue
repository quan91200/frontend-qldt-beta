<script>
import {
  defineComponent,
} from 'vue'

import Skeleton from '~/components/Skeleton.vue'

export default defineComponent({
  name: 'SkeletonTable',

  components: {
    Skeleton,
  },

  props: {
    rows: {
      type: Number,
      default: 3
    },
    columns: {
      type: [Number, Array],
      default: 4
    },
  },

  setup(props) {
    const columnCount = computed(() => {
      return Array.isArray(props.columns)
        ? props.columns.length
        : props.columns
    })

    const totalCells = computed(() => {
      return props.rows * columnCount.value
    })

    return {
      columnCount,
      totalCells,
    }
  }
})
</script>

<template>
  <div
    class="skeleton-table"
    :style="{
      '--rows': rows,
      '--columns': columnCount,
    }"
  >
    <Skeleton
      v-for="n in totalCells"
      :key="n"
      type="desc"
    />
  </div>
</template>

<style scoped>
.skeleton-table {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(var(--columns), 1fr);
  grid-template-rows: repeat(var(--rows), auto);
  gap: var(--size-space-small);
}
</style>
