<script>
import {
  defineComponent,
} from 'vue'

import {
  NuxtLink,
} from '#components'

import Breadcrumb from '~/components/Breadcrumb.vue'

export default defineComponent({
  components: {
    NuxtLink,
    Breadcrumb,
  },
})
</script>

<template>
  <div class="unit-demo-breadcrumb">
    <Breadcrumb />

    <h1>Home Page</h1>
    <NuxtLink to="/DemoBreadcrumb/users">
      Go to Users
    </NuxtLink>
  </div>
</template>

<style scoped>
.unit-demo-breadcrumb {
  display: flex;
  flex-direction: column;

  gap: var(--size-space-large);
}
</style>
