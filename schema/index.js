import { mergeTypes } from 'merge-graphql-schemas'

import user from './user'
import team from './team'
import channel from './channel'
import message from './message'
import error from './error'

export default mergeTypes([
  team,
  user,
  channel,
  message,
  error,
])
