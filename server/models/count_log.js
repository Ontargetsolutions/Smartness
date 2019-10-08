'use restrict';

module.exports = (sequelize, DataTypes) => {
  var Count_log = sequelize.define ('Count_log', {
    Value: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    TimeStamp: DataTypes.DATE,
    Active: DataTypes.BOOLEAN
  });

  Count_log.associate = function(models) {
      Count_log.belongsTo(models.Irisys, { onDelete: 'SET NULL' });
  }

  return Count_log;
};