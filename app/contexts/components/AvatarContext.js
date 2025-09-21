import {
  reactive,
} from "vue"

/**
 * Context class for Avatar component.
 */
export default class AvatarContext {
  /**
   * Constructor.
   *
   * @param {AvatarContextParams} params
   */
  constructor({
    props,
    hasImageErrorRef,
  }) {
    this.props = props
    this.hasImageErrorRef = hasImageErrorRef

    this.state = reactive({
      src: props.src,
      isDisabled: props.isDisabled,
      name: props.name,
      alt: props.alt,
      size: props.size,
      rounded: props.rounded,
      bordered: props.bordered
    })
  }

  /**
   * Factory method.
   *
   * @template {X extends typeof AvatarContext ? X : never} T, X
   * @param {AvatarContextFactoryParams} params
   * @returns {InstanceType<T>}
   * @this {T}
   */
  static create({
    props,
    hasImageErrorRef,
  }) {
    return new this({
      props,
      hasImageErrorRef
    })
  }

  /**
   * Setup Component
   */
  setupComponent() {
    // Reset error state when src changes
    watch(() => this.src, (newSrc, oldSrc) => {
      if (newSrc !== oldSrc && newSrc) {
        this.hasImageErrorRef.value = false
      }
      // Update reactive state
      this.src = newSrc
    })

    // Watch other props for updates
    watch(() => this.name, (newName) => {
      this.name = newName
    })

    watch(() => this.isDisabled, (newDisabled) => {
      this.isDisabled = newDisabled
    })

    watch(() => this.size, (newSize) => {
      this.size = newSize
    })

    watch(() => this.rounded, (newRounded) => {
      this.rounded = newRounded
    })

    watch(() => this.bordered, (newBordered) => {
      this.bordered = newBordered
    })

    watch(() => this.alt, (newAlt) => {
      this.alt = newAlt
    })

    return this
  }

  /**
   * get: src
   *
   * @returns {AvatarProps['src']}
   */
  get src() {
    return this.state.src
  }

  /**
   * get: disabled
   *
   * @returns {AvatarProps['isDisabled']}
   */
  get isDisabled() {
    return this.state.isDisabled
  }

  /**
   * get: name
   *
   * @returns {AvatarProps['name']}
   */
  get name() {
    return this.state.name
  }

  /**
   * get: alt
   *
   * @returns {AvatarProps['alt']}
   */
  get alt() {
    return this.state.alt
  }

  /**
   * get: size
   *
   * @returns {AvatarProps['size']}
   */
  get size() {
    return this.state.size
  }

  /**
   * get: rounded
   *
   * @returns {AvatarProps['rounded']}
   */
  get rounded() {
    return this.state.rounded
  }

  /**
   * get: bordered
   *
   * @returns {AvatarProps['bordered']}
   */
  get bordered() {
    return this.state.bordered
  }

  /**
   * generate name fallback (initials)
   *
   * @returns {string}
   */
  generateName() {
    if (!this.name) {
      return '?'
    }

    return this.name
      .trim()
      .split(' ')
      .filter(word => word.length > 0) // Remove empty strings
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  /**
   * Get name fallback for display
   *
   * @returns {string}
   */
  getNameFallback() {
    return this.generateName()
  }

  /**
   * generate: avatar
   *
   * @returns {Array<string | object>}
   */
  generateAvatar() {
    return [
      'avatar',
      this.size,
      {
        bordered: this.bordered,
        rounded: this.rounded,
      },
    ]
  }

  /**
   * generate avatar class object
   *
   * @returns {Object}
   */
  generateAvatarClassObject() {
    return {
      avatar: true,
      [this.size]: true,
      bordered: this.bordered,
      rounded: this.rounded,
      disabled: this.isDisabled,
    }
  }

  /**
   * Check if the image should be displayed
   *
   * @returns {Boolean}
   */
  isShowImage() {
    return Boolean(
      this.src &&
      this.src.trim() !== '' &&
      !this.hasImageErrorRef.value
    )
  }
}

/**
 * @typedef {{
 *   src?: string
 *   isDisabled?: boolean
 *   name?: string
 *   alt?: string
 *   size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
 *   rounded?: boolean
 *   bordered?: boolean
 * }} AvatarProps
 */

/**
 * @typedef {{
 *   props: AvatarProps
 *   hasImageErrorRef: import('vue').Ref<boolean>
 * }} AvatarContextParams
 */

/**
 * @typedef {AvatarContextParams} AvatarContextFactoryParams
 */
