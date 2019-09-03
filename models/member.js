
export default (sequelize, DataTypes) => {
  const Member = sequelize.define('member', {
      username : {
        type: DataTypes.STRING,
        unique: true,
      },
      email : {
        type: DataTypes.STRING,
        unique: true,
      },
      password : DataTypes.STRING,
    },
  )
  Member.associate = (models)=> {}

  return Member
}
