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

/**\
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
  async function calculatePosition() {
    if (!dropdownRef.value || !contentRef.value) return

    await nextTick()

    const dropdown = dropdownRef.value
    const content = contentRef.value
    const dropdownRect = dropdown.getBoundingClientRect()
    const contentRect = content.getBoundingClientRect()
    const viewportWidth = window.innerWidth
    const viewportHeight = window.innerHeight

    // Horizontal
    if (dropdownPosition.value === 'auto') {
      const spaceRight = viewportWidth - dropdownRect.right
      const spaceLeft = dropdownRect.left

      if (spaceRight >= contentRect.width) {
        calculatedPos.value = 'left'
      } else if (spaceLeft >= contentRect.width) {
        calculatedPos.value = 'right'
      } else {
        calculatedPos.value = 'left' // fallback
      }
    } else {
      calculatedPos.value = dropdownPosition.value
    }

    // Vertical
    if (verticalPosition.value === 'auto') {
      const spaceBottom = viewportHeight - dropdownRect.bottom
      const spaceTop = dropdownRect.top

      if (spaceBottom >= contentRect.height) {
        calculatedVertPos.value = 'bottom'
      } else if (spaceTop >= contentRect.height) {
        calculatedVertPos.value = 'top'
      } else {
        calculatedVertPos.value = 'bottom' // fallback
      }
    } else {
      calculatedVertPos.value = verticalPosition.value
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

    if (dropdownRef.value && !dropdownRef.value.contains(e.target)) {
      isOpen.value = false
    }
  }

  // Setup event listeners
  onMounted(() => {
    document.addEventListener('click', onClickOutside)
    window.addEventListener('resize', debouncedCalculatePosition)
    window.addEventListener('scroll', debouncedCalculatePosition)
  })

  onUnmounted(() => {
    document.removeEventListener('click', onClickOutside)
    window.removeEventListener('resize', debouncedCalculatePosition)
    window.removeEventListener('scroll', debouncedCalculatePosition)
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
    isOpen.value = !isOpen.value
  }

  /**
   * Open the dropdown.
   *
   * @returns {void}
   */
  const open = () => {
    isOpen.value = true
  }

  /**
   * Close the dropdown.
   *
   * @returns {void}
   */
  const close = () => {
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
