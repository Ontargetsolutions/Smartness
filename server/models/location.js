'use strict';

module.exports = (sequelize, DataTypes) => {
  var Location = sequelize.define('Location', {
    Location_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Active: DataTypes.BOOLEAN
  });

  Location.associate = function (models){
    //   Location.hasMany(models.SubLocation, { onDelete : 'CASCADE' });
      Location.belongsTo(models.Place)
  }

  return Location;
};
