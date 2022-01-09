'use strict';

const bcrypt = require("bcrypt");

module.exports = function( sequelize, DataTypes){
  let User = sequelize.define(
    'User', 
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      pictureId: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      bio: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      favoriteContent: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [5, 100],
            msg: "The password needs a length between 5 and 20 characters.",
          },
          notEmpty: {
            args: true,
            msg: "The password can't be empty.",
          },
        },
      },
      typeUser: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: new Date(),
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: new Date(),
      },
    },
    {
      freezeTableName: true,
      hooks : {
        beforeCreate: async (user) => {
          user.password = await bcrypt.hash(user.password, 12);
        },
        beforeUpdate: async (user) => {
          if (user.password) {
            console.log(user.password)
            user.password = await bcrypt.hash(user.password, 12);
          }
        }
      },
      indexes: [
        {
          unique: false,
          fields: ["firstName", "lastName"],
        },
        {
          unique: true,
          fields: ["username"],
        },
      ]
    }
  );
  
  User.associate = function (models) {
    User.hasMany(models.Post, { 
      foreignKey: "userId"
    });
  }
  
  return User;
};