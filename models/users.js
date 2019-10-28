'use strict';
module.exports = (sequelize, DataTypes) => {
  var Users = sequelize.define('Users', {
    LastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: 3,
          msg: 'Last-name must be at least 3 characters in length'
        }
      }
    },
    FirstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: 3,
          msg: 'Name must be at least 3 characters in length'
        }
      }
    },
    Telephone: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [1, 15]
    },
    Email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: {
          args: [6, 128],
          msg: 'Email address must be between 6 and 128 characters in length'
        },
        isEmail: {
          msg: 'Email address must be valid'
        }
      }
    },
    Username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      len: [1, 200],
      isEmail: true,
    },
    Password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Google_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      len: [15]
    },
    Active: DataTypes.BOOLEAN
  }, {
    instanceMethods: {
      generateHash: function (password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
      },
      validPassword: function (password) {
        return bcrypt.compareSync(password, this.password)
      }
    }

  });
  Users.associate = function(models) {
    // associations can be defined here
    Users.belongsTo(models.Place, { onDelete: 'SET NULL' });
    Users.belongsTo(models.Rol, { onDelete: 'SET NULL' });
  };
  return Users;
};