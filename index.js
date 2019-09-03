import express from 'express'
import { ApolloServer, gql } from 'apollo-server-express'

import models from './models'
import typeDefs from './schema'
import resolvers from './resolvers'

const app = express()
const PORT = process.env.PORT || 9090
const SECRET = 'qwertyuiop'
const SECRET2 = 'qwertyuiopasdfg'

const context = ({ req, res }) => ({
  models,
  SECRET,
  SECRET2,
  user: { id: 1 },
  token: req.headers['auth-token'],
})

const server = new ApolloServer({
  typeDefs, resolvers, context
})

server.applyMiddleware({ app , path: '/slack' })

// clear db:
//models.sequelize.sync({force: true}).then(() => {
 models.sequelize.sync().then((err) => {
  // if (err) {
  //   process.exit(0)
  //   console.log('server error ..................', err)
  // }
  app.listen(PORT, () => {
    console.log(`Server rodando em: http://localhost:${PORT}${server.graphqlPath}`)
  })
})
