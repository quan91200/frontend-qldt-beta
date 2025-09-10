<script>
import {
  ref,
  defineComponent,
} from 'vue'

import {
  useRoute,
  useRouter,
} from "vue-router"

import Tab from '~/components/Tab.vue'

export default defineComponent({
  components: {
    Tab,
  },

  setup () {
    const route = useRoute()
    const router = useRouter()

    const tabs = [
      {
        value: 'overview',
        label: 'Overview',
      },
      {
        value: 'users',
        label: 'Users',
      },
      {
        value: 'settings',
        label: 'Settings',
      },
    ]

    const activeTab = ref(route.query.tab || "overview")

    watch(activeTab, (val) => {
      router.replace({
        query: {
          ...route.query,
          tab: val
        }
      })
    })

    watch(
      () => route.query.tab,
      (val) => {
        if (val
          && tabs.some(
            t => t.value === val
          )
        ) {
            activeTab.value = val
        }
      }
    )

    return {
      activeTab,
      tabs,
    }
  }
})

</script>

<template>
  <Tab
    v-model="activeTab"
    :tabs="tabs"
    variants="underline"
  >
    <template #default>
      <div v-if="activeTab === 'overview'">
        <h2>
          Overview
        </h2>
        <p>This is the overview section.</p>
      </div>
      <div v-else-if="activeTab === 'users'">
        <h2>
          Users
        </h2>
        <p>Manage your users here.</p>
      </div>
      <div v-else-if="activeTab === 'settings'">
        <h2>
          Settings
        </h2>
        <p>Update your settings here.</p>
      </div>
    </template>
  </Tab>
</template>
