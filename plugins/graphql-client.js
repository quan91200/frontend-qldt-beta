import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
} from '@apollo/client/core'

import {
  GRAPHQL_ENDPOINT_LINK,
} from '~/app/constants.js'

const uri = GRAPHQL_ENDPOINT_LINK

export default defineNuxtPlugin(() => {
  const httpLink = new HttpLink({ uri })

  const authLink = new ApolloLink((operation, forward) => {
    if (process.client) {
      const token = localStorage.getItem('token')
      operation.setContext(({ headers = {} }) => ({
        headers: {
          ...headers,
          Authorization: token ? `Bearer ${token}` : '',
        },
      }))
    }
    return forward(operation)
  })

  const apolloClient = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  })

  return {
    provide: {
      apollo: apolloClient,
    },
  }
})
