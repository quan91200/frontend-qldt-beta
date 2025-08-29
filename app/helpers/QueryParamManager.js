import {
  useRoute,
  useRouter
} from 'vue-router'

export class QueryParamManager {
  /**
   * Constructor of this class.
   *
   * @param {{
   *   key?: string
   * }} params - Parameters.
   */
  constructor({
    key
  }) {
    this.key = key
  }

  /**
   * Factory method.
   *
   * @param {{
   *   key?: string
   * }} [params] - Parameters.
   * @returns {QueryParamManager}
   */
  static create({
    key
  } = {}) {
    return new this({
      key
    })
  }

  /**
   * Validate query key
   * @param {string} key
   * @returns {boolean}
   */
  isValidKey(key) {
    if (typeof key !== 'string') return false

    if (key.length === 0) return false

    return true
  }

  /**
   * Get a query parameter by key.
   *
   * @param {string} [key]
   * @param {any} [defaultValue=null] - Default value if not found.
   * @returns {string|undefined}
   */
  getParam(
    key = this.key,
    defaultValue = null
  ) {
    const route = useRoute()
    return route.query[key] ?? defaultValue
  }

  /**
   * Set a query parameter value.
   *
   * @param {string} [key]
   * @param {string|number} value
   */
  setParam(key = this.key, value) {
    if (!this.isValidKey(key)) return

    const route = useRoute()
    const router = useRouter()

    router.push({
      query: {
        ...route.query,
        [key]: value,
      },
    })
  }

  /**
  * Remove a query parameter from URL.
  *
  * @param {string} [key]
  */
  removeParam(key = this.key) {
    if (!this.isValidKey(key)) return

    const route = useRoute()
    const router = useRouter()

    const query = {
      ...route.query
    }
    if (!(key in query)) {
      return
    }

    delete query[key]

    router.push({
      query
    })
  }
}
