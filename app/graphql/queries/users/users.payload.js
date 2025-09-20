import {
  gql,
} from '@apollo/client/core'

/**
 * Payload.
 */
const USERS = gql`
  query getUsers {
    users {
      id
      email
      created_at
      updated_at
    }
  }
`

export default USERS
