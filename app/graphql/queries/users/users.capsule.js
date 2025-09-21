import USERS from '~/app/graphql/queries/users/users.payload.js'

/**
 * Capsule.
 */
export const allUsersCapsule = (apollo) => {
  return apollo.query({
    query: USERS,
    fetchPolicy: 'cache-first',
  })
}
