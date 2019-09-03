import bcrypt from 'bcrypt-nodejs'

export default (sequelize, DataTypes) => {
  const User = sequelize.define(
    'user', {
      userName : {
        type: DataTypes.STRING,
        unique: true,
        validate: {
          len: {
            // args: [5, 15], msg: 'Somente numeros e letras...'
            args: [5, 15], msg: 'userName deve conter minimo 5 caracteres e maximo 15'
          }
        }
      },
      email : {
        type: DataTypes.STRING,
        unique: true,
        validate: {
          isEmail: {
            args: true, msg: 'Email invalido'
          }
        }
      },
      password : {
        type: DataTypes.STRING,
        validate: {
          len: {
            args: [8, 25], msg: 'password deve conter minimo 8 caracteres e maximo 25'
          }
        },
      },
    },
    {
      // hooks: {
      //   afterValidate: async (user) => {
      //     console.log('hook password.........', user)
      //     const passHash = await bcrypt.hashSync(user.password)
      //     user.password = passHash
      //   }
      // }
    },
  )
  // User.associate = (models)=> {
  //   User.belongsToMany(models.Team, {
  //     through: 'member',
  //     foreignKey: { name:'userId', field: 'user_id' }
  //   })
  //   User.belongsToMany(models.Channel, {
  //     through: 'channel_member',
  //     foreignKey: { name:'userId', field: 'user_id' }
  //   })
  //   User.belongsToMany(models.Team, {
  //     through: 'member',
  //     // foreignKey: { name:'owner', field: 'user_id' }
  //     foreignKey: 'owner'
  //   })
  // }
  return User
}
