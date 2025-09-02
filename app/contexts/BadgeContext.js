/**
 * Badge Context.
 */
export default class BadgeContext {
  /**
   * Constructor.
   *
   * @param {BadgeContextParams} params
   */
  constructor({
    props,
    componentContext,
  }) {
    this.props = props
    this.componentContext = componentContext
  }

  /**
   * Factory method.
   *
   * @template {X extends typeof BadgeContext ? X : never} T,X
   * @param {BadgeContextFactoryParams} params
   * @returns {InstanceType<T>}
   * @this {T}
   */
  static create({
    props,
    componentContext,
  }) {
    return /** @type {InstanceType<T>} */ (
      new this({
        props,
        componentContext,
      })
    )
  }

  /**
   * Setup component.
   *
   * @template {X extends BadgeContext ? X : never} T, X
   * @returns {T}
   * @this {T}
   */
  setupComponent() {
    return this
  }

  /**
   * get anchorOrigin
   *
   * @returns {ComponentProps['anchorOrigin']}
   */
  get anchorOrigin() {
    return this.props.anchorOrigin
  }

  /**
   * get content
   *
   * @returns {ComponentProps['content']}
   */
  get content() {
    return this.props.content
  }

  /**
   * get children
   *
   * @returns {ComponentProps['children']}
   */
  get children() {
    return this.props.children
  }

  /**
   * get classes
   *
   * @returns {ComponentProps['classes']}
   */
  get classes() {
    return this.props.classes
  }

  /**
   * get badge color.
   *
   * @returns {ComponentProps['color']}
   */
  get color() {
    return this.props.color
  }

  /**
   * get invisible
   *
   * @returns {ComponentProps['invisible']}
   */
  get invisible() {
    return this.props.invisible
  }

  /**
   * get max
   *
   * @returns {ComponentProps['max']}
   */
  get max() {
    return this.props.max
  }

  /**
   * get overlap
   *
   * @returns {ComponentProps['overlap']}
   */
  get overlap() {
    return this.props.overlap
  }

  /**
   * get showZero
   *
   * @returns {ComponentProps['showZero']}
   */
  get showZero() {
    return this.props.showZero
  }

  /**
   * get badge variant.
   *
   * @returns {ComponentProps['variant']}
   */
  get variant() {
    return this.props.variant
  }

  /**
   * generate position
   *
   * @returns {string}
   */
  generatePosition() {
    const {
      vertical,
      horizontal,
    } = this.anchorOrigin

    return `anchor-${vertical}-${horizontal}`
  }

  /**
   * generate class object for badge element.
   *
   * @returns {object}
   */
  generateBadgeClassObject() {
    return {
      badge: true,
      [this.generatePosition()]: true,
      [this.variant]: true,
      [this.color]: true,
      [this.overlap]: true,
    }
  }

  /**
   * check insisible badge
   */
  isInvisible() {
    return this.invisible || (
      !this.isDotVariant() &&
      this.displayContent() === ''
    )
  }


  /**
   * check variant dot
   *
   */
  isDotVariant() {
    return this.variant === 'dot'
  }

  /**
   * check content zero
   */
  isHiddenZero() {
    return this.content === 0 && !this.showZero
  }

  /**
   * format value if max value is exceeded
   *
   * @param {any} value
   */
  formatValue(value) {
    if (typeof value === 'number' && value > this.max) {
      return `${this.max}+`
    }

    return value
  }

  /**
   * show content badge
   *
   * @returns {void}
   */
  displayContent() {
    if (this.isDotVariant()) return null

    if (this.isHiddenZero()) return ''

    return this.formatValue(this.content)
  }
}

/**
 * @typedef {{
 *   anchorOrigin: {
 *     vertical: 'top' | 'bottom'
 *     horizontal: 'left' | 'right'
 *   }
 *   content: string | number | null
 *   children: null
 *   classes: object
 *   color: 'primary' | 'secondary' | 'success' | 'danger' | 'warning'
 *   invisible: boolean
 *   max: number
 *   overlap: string
 *   showZero: boolean
 *   variant: 'dot' | 'standard'
 * }} ComponentProps
 */

/**
 * @typedef {import('vue').SetupContext<BadgeEmits[]>} ComponentContext
 */

/**
 * @typedef {'close'} BadgeEmits
 */

/**
 * @typedef {{
 *   props: ComponentProps
 *   componentContext: ComponentContext
 * }} BadgeContextParams
 */

/**
 * @typedef {BadgeContextParams} BadgeContextFactoryParams
 */
