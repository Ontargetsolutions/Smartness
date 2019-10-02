'use strict';

module.exports = (sequelize, DataTypes) => {
  var SubLocation = sequelize.define('SubLocation', {
    Sublocation_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Active: DataTypes.BOOLEAN
  });

  SubLocation.associate = function (models){
    SubLocation.hasMany(models.Device, { onDelete : 'CASCADE' });
    SubLocation.belongsTo(models.Location)
  }

  return SubLocation;
};
