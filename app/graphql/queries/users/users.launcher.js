import {
  allUsersCapsule,
} from '~/app/graphql/queries/users/users.capsule.js'

/**
 * Launcher.
 *
 * @returns {{
 *   users: import('vue').Ref<GraphQLTypes.Users>
 *   fetchUsers: () => Promise<void>
 *   error: import('vue').Ref<Error | null>
 *   loading: import('vue').Ref<Boolean>
 * }}
 */
export const useUsersLauncher = () => {
  const {
    $apollo,
  } = useNuxtApp()

  const users = ref([])
  const loading = ref(false)
  const error = ref(null)

  const fetchUsers = async () => {
    loading.value = true
    error.value = null

    try {
      const {
        data,
      } = await allUsersCapsule($apollo)

      users.value = data.users
    } catch (err) {
      error.value = err
    } finally {
      loading.value = false
    }
  }

  return {
    users,
    loading,
    error,

    fetchUsers,
  }
}
