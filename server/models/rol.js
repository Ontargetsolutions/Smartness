'use strict';

module.exports = (sequelize, DataTypes) => {
    var Rol = sequelize.define('Rol', {
        Rol: {
            type: DataTypes.STRING,
            allowNull: false,
            len: [1, 50]
        },
        Active: DataTypes.BOOLEAN
    });

    Rol.associate = function (models) {
        Rol.hasMany(models.Users);
    };

    return Rol;
};