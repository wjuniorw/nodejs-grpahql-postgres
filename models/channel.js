
export default (sequelize, DataTypes) => {
  const Channel = sequelize.define(
    'channel',
    {
      name : DataTypes.STRING,
      public : DataTypes.BOOLEAN,
      team_Id: DataTypes.STRING
    },
  )
    Channel.associate = (models)=> {
      Channel.belongsTo(models.Team, {
        foreignKey: {
          name: 'teamId',
          field: 'team_id',
        }
      })
      //
      Channel.belongsToMany(models.User, {
        through: 'channel_member',
        foreignKey: { name:'channelId', field: 'chanel_id' }
      })
    }
    return Channel
}
