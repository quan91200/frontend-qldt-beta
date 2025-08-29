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
   * Get a query parameter by key.
   *
   * @param {string} [key]
   * @param {any} [defaultValue=null] - Default value if not found.
   * @returns {string|undefined}
   */
  getParam(key = this.key, defaultValue = null) {
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
    const route = useRoute()
    const router = useRouter()

    const query = {
      ...route.query
    }
    delete query[key]

    router.push({
      query
    })
  }
}
