 import { gql } from 'apollo-server-express'

 export default gql`
   type Team {
     owner: User!
     members: [User!]!
     channels: [Channel!]!
   }
   type Channel {
     id: Int!
     name: String!
     public: Boolean
     messages: [Message!]!
     users: [User!]!
     # team: Team!
   }
   type Message {
     id: Int!
     text: String!
     user: User!
     channel: Channel!
   }
   type User {
     id: Int!
     userName: String!
     email: String!
     teams: [Team!]!
     messages: Message!
   }
   type Query {
     hi: String
     yo: String
   }
 `
