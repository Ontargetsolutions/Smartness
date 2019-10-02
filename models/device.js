'use strict'

module.exports = (sequelize, DataTypes) => {
    var Device = sequelize.define('Device', {
        Serial_number: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Web_API: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Status: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Active: DataTypes.BOOLEAN       
    });
    Device.association = function(models){
        // associations can be defined here
        Device.belongsTo(models.SubLocation, { onDelete: 'SET NULL' });
        Device.hasOne(models.Irisys, { onDelete: 'CASCADE' });
        Device.hasOne(models.Thermostate, { onDelete: 'CASCADE' });
    };
    return Device;
}