import { gql } from 'apollo-server-express'

export default gql`
type Channel {
  id: Int!
  name: String!
  public: Boolean
  messages: [Message!]!
  users: [User!]!
  # team: Team!
}
type Query {
  allChannels: [Channel]
}
type Mutation {
  createChannel(teamId:ID, name: String!, public: Boolean ): Channel!
}
`
