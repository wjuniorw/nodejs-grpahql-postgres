
export default {
  Query: {
    oneTeam: (parent, { id }, { models }) => models.Channel.findOne({ where: { id } }),
    allChannels: (parent, args, { models }) => models.Channel.findAll()
  },
  Mutation: {
    createChannel: async (parent, args, { models }) => {
      try {
        await models.Channel.create(args)
        return true
      } catch (err) {
        console.log('createChannel erro....', err)
        return false
      }
    }
  }
}
