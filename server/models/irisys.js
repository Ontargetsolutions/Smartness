'use restrict';

module.exports = (sequelize, DataTypes) => {
  var Irisys = sequelize.define ('Irisys', {
    Longitude: {
      type: DataTypes.REAL,
      allowNull: false,
    },
    Latitude: {
      type: DataTypes.REAL,
      allowNull: false,
    },
    Up_time: DataTypes.DATE,
    Active: DataTypes.BOOLEAN
  });

  Irisys.associate = function(models) {
      Irisys.belongsTo(models.Device, { onDelete: 'SET NULL' });
      Irisys.hasMany(models.Count_log, { onDelete: 'CASCADE' });
  }

  return Irisys;
};
