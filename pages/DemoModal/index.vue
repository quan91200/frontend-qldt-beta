<script>
import {
  defineComponent,
  ref,
} from "vue"

import Modal from "~/components/Modal.vue"
import Button from "~/components/Button.vue"

export default defineComponent({
  name: "DemoModal",

  components: {
    Modal,
    Button,
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
    <Button
      variant="primary"
      @click="openModal"
    >
      Mở Modal
    </Button>

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
        <Button
          variant="danger"
          @click="closeModal"
        >
          Xác nhận
        </Button>
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
