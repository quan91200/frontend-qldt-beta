import {
  ref,
  computed,
  watch,
  onMounted,
  onUnmounted,
  nextTick,
} from 'vue'

import {
  useDebounce
} from '~/composables/useDebounce'

/**
 * Composables for dropdown behavior.
 *
 * Handles:
 * - Open/close state.
 * - Position calculation (auto, top/bottom, left/right).
 * - Outside click handling.
 * - Resize/scroll reposition with debounce
 *
 * @param {{
 *   dropdownPosition: 'auto' | 'left' | 'right'
 *   verticalPosition: 'auto' | 'top' | 'bottom'
 *   disabled?: boolean
 * }} props - Dropdown props
 *
 * @returns {{
 *   isOpen: import('vue').Ref<boolean>
 *   dropdownRef: import('vue').Ref<HTMLElement | null>
 *   contentRef: import('vue').Ref<HTMLElement | null>
 *   dropdownPosition: import('vue').ComputedRef<string>
 *   verticalPosition: import('vue').ComputedRef<string>
 *   calculatedPos: import('vue').Ref<string>
 *   calculatedVertPos: import('vue').Ref<string>
 *   dropdownClasses: import('vue').ComputedRef<Record<string, boolean>>
 *   contentClasses: import('vue').ComputedRef<Record<string, boolean>>
 *   triggerAttrs: import('vue').ComputedRef<Record<string, any>>
 *   toggle: () => void
 *   open: () => void
 *   close: () => void
 *   calculatePosition: () => Promise<void>
 * }}
 */
export default function useDropdown(props) {
  const isOpen = ref(false)
  const dropdownRef = ref(null)
  const contentRef = ref(null)
  const calculatedPos = ref(props.dropdownPosition)
  const calculatedVertPos = ref(props.verticalPosition)

  // Mirror props via computed reactive prop changes
  const dropdownPosition = computed(() => props.dropdownPosition)
  const verticalPosition = computed(() => props.verticalPosition)

  // Watch prop changes update calculated positions
  watch(dropdownPosition, (newPos) => {
    calculatedPos.value = newPos
  })

  watch(verticalPosition, (newPos) => {
    calculatedVertPos.value = newPos
  })

  /**
   * Calculate dropdown position relative to trigger element & viewport
   *
   * @returns {Promise<void>}
   */
  const calculatePosition = async () => {
    if (!dropdownRef.value || !contentRef.value) return

    await nextTick()

    const dropdown = dropdownRef.value
    const content = contentRef.value
    const dropdownRect = dropdown.getBoundingClientRect()
    const contentRect = content.getBoundingClientRect()
    const viewportWidth = window.innerWidth
    const viewportHeight = window.innerHeight

    // ---- Horizontal ----
    if (dropdownPosition.value !== 'auto') {
      calculatedPos.value = dropdownPosition.value
    } else {
      const spaceRight = viewportWidth - dropdownRect.right
      const spaceLeft = dropdownRect.left

      calculatedPos.value =
        spaceRight >= contentRect.width
          ? 'left'
          : spaceLeft >= contentRect.width
            ? 'right'
            : 'left' // fallback
    }

    // ---- Vertical ----
    if (verticalPosition.value !== 'auto') {
      calculatedVertPos.value = verticalPosition.value
    } else {
      const spaceBottom = viewportHeight - dropdownRect.bottom
      const spaceTop = dropdownRect.top

      calculatedVertPos.value =
        spaceBottom >= contentRect.height
          ? 'bottom'
          : spaceTop >= contentRect.height
            ? 'top'
            : 'bottom' // fallback
    }
  }

  // Debounced version of calculatePosition
  const {
    run: debouncedCalculatePosition,
    cancel: cancelDebounce
  } =
    useDebounce({
      callback: calculatePosition,
      timeInMs: 100,
    })

  // Watch isOpen -> only recalc when open
  watch(isOpen, (open) => {
    if (open) debouncedCalculatePosition()
  })

  /**
   * Close dropdown on outside click.
   *
   * @param {MouseEvent} e
   */
  const onClickOutside = (e) => {
    if (!isOpen.value) return

    const target = e.target
    const dropdownEl = dropdownRef.value
    const contentEl = contentRef.value

    if (
      dropdownEl &&
      !dropdownEl.contains(target) &&
      contentEl &&
      !contentEl.contains(target)
    ) {
      isOpen.value = false
    }
  }

  // Setup event listeners
  onMounted(() => {
    document.addEventListener('click', onClickOutside)
    window.addEventListener('resize', debouncedCalculatePosition)
    window.addEventListener('scroll', debouncedCalculatePosition, { passive: true })
  })

  onUnmounted(() => {
    document.removeEventListener('click', onClickOutside)
    window.removeEventListener('resize', debouncedCalculatePosition)
    window.removeEventListener('scroll', debouncedCalculatePosition, { passive: true })
    cancelDebounce()
  })

  // Computed classes
  const dropdownClasses = computed(() => ({
    dropdown: true,
    'dropdown--open': isOpen.value,
    [`dropdown--${calculatedPos.value}`]: true,
    [`dropdown--${calculatedVertPos.value}`]: true,
  }))

  const contentClasses = computed(() => ({
    'dropdown__content': true,
    'dropdown__content--visible': isOpen.value,
    [`dropdown__content--${calculatedPos.value}`]: true,
    [`dropdown__content--${calculatedVertPos.value}`]: true,
  }))

  const triggerAttrs = computed(() => ({
    'aria-expanded': isOpen.value,
    'aria-disabled': Boolean(props.disabled),
  }))

  // Public methods

  /**
   * Toggle dropdown open/close state.
   *
   * @returns {void}
   */
  const toggle = () => {
    if (props.disabled) return

    isOpen.value = !isOpen.value
  }

  /**
   * Open the dropdown.
   *
   * @returns {void}
   */
  const open = () => {
    if (props.disabled) return

    isOpen.value = true
  }

  /**
   * Close the dropdown.
   *
   * @returns {void}
   */
  const close = () => {
    if (props.disabled) return

    isOpen.value = false
  }

  return {
    // State
    isOpen,
    dropdownRef,
    contentRef,

    // Computed properties
    dropdownPosition,
    verticalPosition,
    calculatedPos,
    calculatedVertPos,
    dropdownClasses,
    contentClasses,
    triggerAttrs,

    // Methods
    toggle,
    open,
    close,
    calculatePosition,
  }
}
