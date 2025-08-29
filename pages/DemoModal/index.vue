<script>
import {
  defineComponent,
  ref,
} from "vue"

import Modal from "~/components/Modal.vue"

export default defineComponent({
  name: "DemoModal",

  components: {
    Modal,
  },

  setup() {
    const isVisible = ref(false)

    const openModal = () => {
      isVisible.value = true
    }

    const closeModal = () => {
      isVisible.value = false
    }

    return {
      openModal,
      closeModal,
      isVisible,
    }
  }

})
</script>

<template>
  <div class="page">
    <button
      @click="openModal"
    >
      Mở Modal
    </button>

    <Modal
      :isVisible="isVisible"
      @close="closeModal"
    >
      <template #header>
        Thông báo
      </template>

      <template #body>
        <p>Đây là nội dung bên trong modal. Bạn có thể đặt bất kỳ component nào ở đây.</p>
      </template>

      <template #footer>
        <button
          @click="closeModal"
        >
          Xác nhận
        </button>
      </template>
    </Modal>
  </div>
</template>

<style scoped>
.page {
  display: flex;

  padding-inline: var(--size-space-medium);
  padding-block: var(--size-space-medium);
}
</style>
