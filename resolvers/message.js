export default {
  Mutation: {
    createMessage: async (parent, args, { models, user })=> {
      try {
        console.log('createMessage args....', args, user)
        await models.Message.create({
          ...args, userId: user.id
        })
        return true
      } catch (e) {
        console.log('erro createMessage.....', e)
        return false
      }
    }
  }
}
