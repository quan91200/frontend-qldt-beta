<script>
import {
  defineComponent,
  ref,
} from "vue"

import {
  Icon,
} from "#components"

import Accordion from "@/components/Accordion.vue"

export default defineComponent({
  components: {
    Accordion,
    Icon,
  },

  setup () {
    const qldt = ref(false)
    const app = ref(false)
    const contexts = ref(false)
    const comp = ref(false)

    return {
      qldt,
      app,
      contexts,
      comp,
    }
  }
})
</script>

<template>
  <Accordion
    v-model:isOpen="qldt"
  >
    <template #header>
      <Icon name="ph:folder" />
      <h3>qldtbeta</h3>
    </template>

    <template #content>
      <Accordion v-model:isOpen="app">
        <template #header>
          <Icon name="ph:folder" />
          <h3>app</h3>
        </template>

        <template #content>
          <Accordion v-model:isOpen="contexts">
            <template #header>
              <Icon name="ph:folder" />
              <h3>contexts</h3>
            </template>

            <template #content>
              <div class="unit-file">
                <Icon name="ph:file-js" />
                <p>AccordionContext.js</p>
              </div>
            </template>
          </Accordion>
        </template>
      </Accordion>

      <Accordion v-model:isOpen="comp">
        <template #header>
          <Icon name="ph:folder" />
          <h3>components</h3>
        </template>

        <template #content>
          <div class="unit-file">
            <Icon name="ph:file-vue" />
            <p>Accordion.vue</p>
          </div>
        </template>
      </Accordion>
    </template>
  </Accordion>
</template>

<style scoped>
.unit-file {
  display: flex;
  align-items: center;
  gap: var(--size-space-tiny);
}
</style>
