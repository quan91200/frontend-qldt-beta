/**
 * AccordionContext
 */
export default class AccordionContext {
  /**
   * Contrucstor.
   *
   * @param {AccordionContextParams} params
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
   * @template {X extends typeof AccordionContext ? X : never} T,X
   * @param {AccordionContextFactoryParams} params
   * @returns {InstanceType<T>}
   * @this {T}
   */
  static create({
    props,
    componentContext,
  }) {
    return /**@type {InstanceType<T>} */ (
      new this({
        props,
        componentContext,
      })
    )
  }

  /**
   * emit event name.
   *
   * @returns {Record<string, string>}
   */
  get EMIT_EVENT_NAME() {
    return {
      UPDATE_IS_OPEN: 'update:isOpen',
    }
  }

  /**
   * setup component.
   *
   * @template {X extends AccordionContext ? X : never} T,X
   * @returns {T}
   * @this {T}
   */
  setupComponent() {
    return this
  }

  /**
   * get: isOpen
   *
   * @returns {ComponentProps['isOpen']}
   */
  get isOpen() {
    return this.props.isOpen
  }

  /**
   * Toggle accordion state and emit update.
   */
  toggleAccordion() {
    this.componentContext
      .emit(
        this.EMIT_EVENT_NAME.UPDATE_IS_OPEN,
        !this.isOpen
      )
  }
}

/**
 * @typedef {'update:isOpen'} AccordionEmits
 */

/**
 * @typedef {import('vue').SetupContext<AccordionEmits[]>} ComponentContext
 */

/**
 * @typedef {{
 *  isOpen: boolean
 * }} ComponentProps
 */

/**
 * @typedef {{
 *  props: ComponentProps
 *  componentContext: ComponentContext
 * }} AccordionContextParams
 */

/**
 * @typedef {AccordionContextParams} AccordionContextFactoryParams
 */
