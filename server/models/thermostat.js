'use restrict';

module.exports = (sequelize, DataTypes) => {
  var Thermostat = sequelize.define ('Thermostat', {
    Current_room_temp: {
      type: DataTypes.REAL,
      allowNull: false,
    },
    Outside_temp: {
      type: DataTypes.REAL,
      allowNull: false,
    },
    Desired_temp: {
      type: DataTypes.REAL,
      allowNull: false,
    },
    TimeStamp: DataTypes.DATE,
    Active: DataTypes.BOOLEAN
  });

  Thermostat.associate = function (models) {
    Thermostat.belongsTo (models.Device, {onDelete: 'SET NULL'});
  };

  return Thermostat;
};
