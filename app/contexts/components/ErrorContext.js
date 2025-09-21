/**
 * ErrorContext.
 */
export default class ErrorContext {
  /**
   * Constructor.
   *
   * @param {ErrorContextParams} params
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
   * @template {X extends typeof ErrorContext ? X : never} T,X
   * @param {ErrorContextFactoryParams} params
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
   * get error.
   *
   * @returns {{
   *  statusCode: number
   *  message: string
   * }}
   */
  get getError() {
    return this.props
      .error
  }

  /**
   * get error status code.
   *
   * @returns {number}
   */
  get getErrorStatusCode() {
    return this.getError
      .statusCode
  }

  /**
   * get error type by error code.
   *
   * @returns {Record<number, string>}
   */
  get getErrorType() {
    return {
      400: 'Bad Request',
      402: 'Bad Gateway',
      404: 'Not Found',
      500: 'Internal Server Error',
      503: 'Service Unvailable',
    }
  }

  /**
   * get error message.
   *
   * @returns {string}
   */
  get getErrorMessage() {
    return this.getError
      .message
  }

  /**
   * Setup component.
   *
   * @returns {this}
   */
  setupComponent() {
    return this
  }

  /**
   * generate error message.
   *
   * @returns {string}
   */
  generateError() {
    const errorType = this.getErrorType[
      this.getErrorStatusCode
    ] ||
      'Unknown Error'

    return `Error: ${this.getErrorStatusCode} - ${errorType}`
  }
}

/**
 * @typedef {{
 *  statusCode: number
 *  message: string
 * }} ErrorObject
 */

/**
 * @typedef {{
 *  error: ErrorObject
 * }} ErrorProps
 */

/**
 * @typedef {{
 *  props: ErrorProps
 *  componentContext: import('vue').SetupContext
 * }} ErrorContextParams
 */

/**
 * @typedef {ErrorContextParams} ErrorContextFactoryParams
 */
