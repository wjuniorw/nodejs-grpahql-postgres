
import handleErrors from '../services/handleErrors'
import requiresAuth from '../services/permissions'

export default {
  Query: {
    oneTeam: (parent, { id }, { models }) =>
      models.Team.findOne({ where: { id } }),
    allTeams: (parent, args, { models }) => models.Team.findAll()
  },
  Mutation: {
    createTeam: requiresAuth.createReolver(async (parent, args, { models, user }) => {
      console.log('createTeam context user...', user)
      try {
        // if(!!user) return { ok: false, errors: [{}]}
        const team = { ...args, owner: user.id }
        console.log('createTeam...', team)
        // await models.Team.create({ args, ...{owner: user.id} })
        const newTeam = await models.Team.create(team)
        return {
          ok: true,
          team: newTeam,
        }
      } catch (e) {
        console.error(e)
        return {
          ok: false,
          errors: handleErrors(e, models)
        }
      }
    })
  },
}
