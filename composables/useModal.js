import {
  computed,
  onUnmounted,
  watch,
  ref,
} from 'vue'

export function useModal(
  props,
  emit,
  slots,
) {
  const isConfirmModal = computed(
    () => !slots.body
      && !slots.footer
  )

  const hasEventListener = ref(false)

  const closeModal = () => {
    emit(
      'update:isVisible',
      false,
    )

    emit('close')
  }

  const handleBackdropClick = () => {
    if (props.closeOnClickOutside) {
      closeModal()
    }
  }

  const handleEscPress = (keyboardEvent) => {
    if (props.closeOnEsc
      && keyboardEvent.key
      === 'Escape'
    ) {

      closeModal()
      keyboardEvent.stopPropagation()
      keyboardEvent.preventDefault()
    }
  }

  const addModalEventListeners = () => {
    if (!hasEventListener.value) {
      window.addEventListener(
        'keydown',
        handleEscPress,
      )

      hasEventListener.value = true
    }
  }

  const removeModalEventListeners = () => {
    if (hasEventListener.value) {
      window.removeEventListener(
        'keydown',
        handleEscPress,
      )

      hasEventListener.value = false
    }
  }

  watch(
    () => props.isVisible,
    isModalOpen => {
      if (isModalOpen) {
        document.body
          .style
          .overflow = 'hidden'
        addModalEventListeners()

        return
      }

      document.body.style.overflow = ''
      removeModalEventListeners()
    },
    {
      immediate: false,
    }
  )

  onUnmounted(() => {
    removeModalEventListeners()

    if (props.isVisible) {
      document.body.style.overflow = ''
    }
  })

  return {
    isConfirmModal,
    closeModal,
    handleEscPress,
    handleBackdropClick,
  }
}
