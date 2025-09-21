import ALL_USERS_QUERY from '~/app/graphql/queries/users/users.payload.js'

/**
 * Capsule.
 */
export const allUsersCapsule = (apollo) => {
  return apollo.query({
    query: ALL_USERS_QUERY,
    fetchPolicy: 'cache-first',
  })
}
