<script>
import {
  defineComponent,
} from 'vue'

import {
  Icon,
} from '#components'

import {
  useModal,
} from '~/composables/useModal'

import Button from '~/components/Button.vue'

export default defineComponent({
  name: 'Modal',

  components: {
    Icon,
    Button,
  },

  props: {
    isVisible: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      default: '',
    },
    showClose: {
      type: Boolean,
      default: true,
    },
    closeOnEsc: {
      type: Boolean,
      default: true,
    },
    closeOnClickOutside: {
      type: Boolean,
      default: true,
    },
    contentClass: {
      type: [
        String,
        Object,
        Array,
      ],
      default: '',
    },
    // Confirm modal props
    confirmTitle: {
      type: String,
      default: 'Confirm',
    },
    confirmMessage: {
      type: String,
      default: 'Are you sure you want to proceed?',
    },
    confirmText: {
      type: String,
      default: 'Confirm',
    },
    cancelText: {
      type: String,
      default: 'Cancel',
    },
  },

  emits: [
    'update:isVisible',
    'close',
    'confirm',
    'cancel',
  ],

  setup(
    props,
    {
      emit,
      slots,
    }
  ) {
    const {
      isConfirmModal,
      closeModal,
      handleEscPress,
      handleBackdropClick,
    } = useModal(
      props,
      emit,
      slots,
    )

    return {
      isConfirmModal,

      closeModal,
      handleEscPress,
      handleBackdropClick,
    }
  },
})
</script>

<template>
  <Teleport to="#teleports">
    <Transition name="fade">
      <!-- Use modal as backdrop -->
      <div
        v-if="isVisible"
        class="unit-modal"
        role="dialog"
        @click="handleBackdropClick"
      >
        <div
          class="content"
          :class="contentClass"
          @click.stop
        >
          <!-- Header -->
          <div class="unit-header">
            <h3 class="title">
              <slot name="header">
                {{ title || confirmTitle }}
              </slot>
            </h3>
            <Icon
              v-if="showClose"
              name="ph-x-bold"
              size="1.25rem"
              class="close-icon"
              @click="closeModal"
            />
          </div>

          <!-- Body -->
          <div
            class="unit-body"
            :class="{
              'confirm-modal': isConfirmModal,
            }"
          >
            <slot name="body">
              <p>{{ confirmMessage }}</p>
            </slot>
          </div>

          <!-- Footer -->
          <div
            v-if="$slots.footer || isConfirmModal"
            class="unit-footer"
          >
            <slot name="footer">
              <Button
                variant="secondary"
                @click="$emit('cancel')"
              >
                {{ cancelText }}
              </Button>
              <Button
                variant="primary"
                @click="$emit('confirm')"
              >
                {{ confirmText }}
              </Button>
            </slot>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.unit-modal {
  position: fixed;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  z-index: 1000;

  background-color: var(--color-modal-backdrop);
  backdrop-filter: blur(2px);
}

.unit-modal > .content {
  padding-inline: var(--size-space-small);
  padding-block: var(--size-space-tiny);

  border-radius: var(--size-border-radius);
  box-shadow: var(--box-shadow);

  max-width: var(--size-width);
  max-height: var(--size-height);

  background: var(--color-gray-50);

  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.unit-modal > .content > .unit-header {
  flex-shrink: 0;

  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-inline: var(--size-space-large);
  padding-block: var(--size-space-large);

  border-bottom: 1px solid var(--color-gray-400);
}

.unit-modal > .content > .unit-header > .close-icon {
  padding-inline: var(--size-space-small);
  padding-block: var(--size-space-small);

  cursor: pointer;
  color: var(--color-gray-800);
}

.unit-modal > .content > .unit-header > .close-icon:hover {
  border-radius: var(----size-border-radius-full);
  color: var(--color-zinc-500);
}

.unit-modal > .content > .unit-header > .title {
  font-weight: var(--font-weight-semibold);
  color: var(--color-gray-600);
}

.unit-modal > .content > .unit-body {
  flex: 1;
  min-height: 0;
  min-width: var(--size-width);

  padding-inline: var(--size-space-large);
  padding-block: var(--size-space-x-large);

  overflow-y: auto;
  overflow-x: hidden;
}

.unit-modal > .content > .unit-body.confirm-modal {
  max-width: var(--size-max-width);
}

.unit-modal > .content > .unit-footer {
  flex-shrink: 0;

  margin-inline: var(--size-space-large);
  padding-block: var(--size-space-large);

  border-top: 1px solid var(--color-gray-400);

  display: flex;
  justify-content: flex-end;
  gap: var(--size-space-medium);
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
