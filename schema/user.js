import { gql } from 'apollo-server-express'

export default gql`
type User {
  id: Int!
  userName: String
  email: String
  teams: [Team]
  messages: [Message]
}
type Query {
  oneUser(id:ID!): User
  allUsers: [User]!
}
type Mutation {
  register(
    userName: String!,
    email: String!,
    password: String!
  ): RegisterResponse!
  login(
    email: String!
    password: String!
  ): LoginResponse!
}
type RegisterResponse {
  ok: Boolean
  user: User
  errors: [Error]
}
type LoginResponse {
  ok: Boolean!
  user: User
  token: String
  refreshToken: String
  errors: [Error]
}
`
