import {
  onMounted,
} from 'vue'

import BaseAppContext from '~/app/contexts/Base/BaseAppContext.js'

import {
  UsersLauncher,
} from '~/app/graphql/queries/users/users.launcher.js'

/**
 * Context class for User component.
 */
export default class UserContex extends BaseAppContext {
  /**
   * Constructor.
   *
   * @param {UserContextParams} params
   */
  constructor({
    props,
  }) {
    super({
      props,
    })

    this.props = props

    this.launcher = UsersLauncher()
  }

  /**
   * Factory method.
   *
   * @template {X extends typeof UserContext ? X : never} T,X
   * @param {UserContextFactoryparams} params
   * @returns {InstanceType<T>}
   * @this {T}
   */
  static create({
    props,
  }) {
    return /** @type {InstanceType<T>} */ (
      new this({
        props,
      })
    )
  }

  /**
   * Setup component.
   *
   * @template {X extends UserContext ? X : never} T, X
   * @returns {T}
   * @this {T}
   */
  setupComponent() {
    onMounted(() => {
      this.fetchUsers()
    })

    return this
  }

  /**
   * Fetch users from API.
   */
  async fetchUsers() {
    await this.launcher.fetchUsers()
  }

  /**
   * get users
   *
   * @returns {import('vue').Ref<GraphQLTypes.Users>}
   */
  get users() {
    return this.launcher
      .users
      .value
  }
}

/**
 * @typedef {{
 *   users: import('vue').Ref<GraphQLTypes.Users>
 * }} UserContextParams
 */

/**
 * @typedef {UserContextParams} UserContextFactoryparams
 */
