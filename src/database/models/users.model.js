"use strict";

const Sequelize = require('sequelize');
const DataTypes = require('sequelize').DataTypes;
const db = require('../../../config/db');

const User = db.define(
  'User', 
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    fisrtName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    pictureId: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    bio: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    favoritePop: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    username: {
      type: Sequelize.STRING,
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
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
    isActive: {
      type: Sequelize.BOOLEAN,
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
  }
)

module.exports = User;