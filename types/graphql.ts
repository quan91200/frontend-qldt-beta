import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
} from '@apollo/client/core'

const uri = process.env.ENV_LINK || 'http://localhost:4000/graphql'

export default defineNuxtPlugin(() => {
  const httpLink = new HttpLink({ 
    uri: uri,
  })

  const authLink = new ApolloLink((operation, forward) => {
    const token = localStorage.getItem('token')

    operation.setContext({
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
      },
    })
    return forward(operation)
  })

  const apolloClient = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  })

  return {
    provide: {
      apollo: apolloClient
    },
  }
})
