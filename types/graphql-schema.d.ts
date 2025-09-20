declare namespace GraphQLTypes {
  interface User {
    id: string
    email: string
    created_at?: string
    updated_at?: string
  }

  interface Users {
    users: User[]
  }

  interface CreateUserInput {
    email: string
    password: string
  }
}
