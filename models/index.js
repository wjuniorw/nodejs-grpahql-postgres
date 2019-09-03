import Sequelize from 'sequelize'

// const sequelize = new Sequelize('postgres://postgres:postgres@localhost:5432/slack', {
//   define: { underscored: true }
// })
const sequelize = new Sequelize('slack', 'postgres', 'postgres', {
  host: 'localhost',
  dialect: 'postgres',
  // dialect: 'mysql'|'sqlite'|'postgres'|'mssql',
})

const models = {
  User: sequelize.import('./user'),
  Team: sequelize.import('./team'),
  Message: sequelize.import('./message'),
  Member: sequelize.import('./member'),
  Channel: sequelize.import('./channel'),
}

Object.keys(models).forEach(modelName => {
  if ('associate' in models[modelName]) {
    models[modelName].associate(models)
  }
})

models.sequelize = sequelize
models.Sequelize = Sequelize

export default models
