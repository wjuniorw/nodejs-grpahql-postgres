
import _ from 'lodash'

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

export default handleErros
