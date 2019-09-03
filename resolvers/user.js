
import bcrypt from 'bcrypt-nodejs'
import _ from 'lodash'
import { tryLogin } from '../services/auth'

const handleErros = async(err, models) => {
  if (err instanceof models.sequelize.ValidationError) {
    console.log('errors length..........', err.errors.length)
    const result = await err.errors.map(x => _.pick(x, ['path', 'message']))
    // const result = await err.errors.map(({path,message},i)=> {path,message})
    console.log('result.............', result)
    return result
    // return {ok: false, errors: result }
  }
  return {ok: false, errors:[{path: 'erro', message: 'Something went wrong' }]}
}
const createUser = async(user, models) => {
  console.log('passando por createUser....', user)
  return await models.User.create(user).then(data => {
    console.log('passando por createUser result....', data)
    return {
      ok: true,
      user: data,
    }
  })
  .catch((errors)=> {
    console.log('passando por createUser erro....', errors)
      return {
        ok: false,
        errors: handleErros(errors, models)
      }
    }
  )
}

export default {
  Query: {
    oneUser: (parent, { id }, { models }) =>
      models.User.findOne({ where: { id } }),
    allUsers: (parent, args, { models }) =>
      models.User.findAll()
  },
  Mutation: {
    login: async(parent, { email, password }, { models, SECRET, SECRET2 }) =>
      await tryLogin(email, password, models, SECRET, SECRET2),

    register: async(parent, args, { models })=> {
        const Resp = await createUser(args, models)
        return Resp
        // return await createUser(args, models)
    }
  },
}
