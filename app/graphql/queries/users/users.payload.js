import {
  gql,
} from '@apollo/client/core'

/**
 * Payload.
 */
const USERS = gql`
  query {
    users {
      id
      email
      created_at
      updated_at
    }
  }
`

export default USERS
