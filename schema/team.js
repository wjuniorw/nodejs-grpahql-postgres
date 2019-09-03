import { gql } from 'apollo-server-express'

export default gql`
type Team {
  id: ID
  name: String!
  # owner: User!
  owner: ID
  members: [User!]!
  channels: [Channel!]!
}
type Query {
  oneTeam(id:ID!): Team
  allTeams: [Team]!
}
type createTeamResponse {
  ok: Boolean!
  team: Team
  errors: [Error]
}
type Mutation {
  createTeam(
    name: String!
    # token: String!
  ): createTeamResponse!
}
`
