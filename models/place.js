'use strict';

module.exports = (sequelize, DataTypes) => {
  var Place = sequelize.define ('Place', {
    Place: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [1, 100],
    },
    Type: {
        type: DataTypes.STRING,
        allowNull: false,
        len: [1, 100]
    },
    Address1: {
        type: DataTypes.STRING,
        allowNull: false,
        len: [1, 300]
    },
    Address2: {
        type: DataTypes.STRING,
        allowNull: false,
        len: [1, 300]
    },
    Active: DataTypes.BOOLEAN
  });

  Place.associate = function (models) {
    Place.hasMany(models.Users, { onDelete: 'CASCADE' });
    Place.hasMany(models.Location, { onDelete: 'CASCADE' });
  };

  return Place;
};
