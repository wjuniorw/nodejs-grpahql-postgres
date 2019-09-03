import { mergeResolvers } from 'merge-graphql-schemas'

import user from './user'
import team from './team'
import channel from './channel'
import message from './message'

export default mergeResolvers([
  user,
  team,
  channel,
  message,
])
