<script>
import {
   ref,
   onMounted,
   defineComponent,
  } from 'vue'

import Table from '~/components/Table/Table.vue'

export default defineComponent({
  components: {
    Table,
  },

  setup() {
    const isLoading = ref(true)
    const errorMessages = ref('')
    const users = ref([])

    const columns = [
      { key: 'id', label: 'ID' },
      { key: 'name', label: 'Name' },
      { key: 'email', label: 'Email' },
      { key: 'role', label: 'Role' },
    ]

    onMounted(() => {
      setTimeout(() => {
        users.value = [
          { id: 1, name: 'Alice', email: 'alice@mail.com', role: 'Admin' },
          { id: 2, name: 'Bob', email: 'bob@mail.com', role: 'User' },
        ]
        isLoading.value = false
      }, 1200)
    })

    return {
      errorMessages,
      users,
      columns,
      isLoading,
    }
  }
})
</script>

<template>
  <section class="p-6">
    <!-- Table -->
    <Table
      :data="users"
      :columns="columns"
      :is-loading="isLoading"
      :error-messages="errorMessages"
      :empty-state="{ title: 'No users', desc: 'Try adding a new user' }"
    />
  </section>
</template>
