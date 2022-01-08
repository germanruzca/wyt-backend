"use strict";

const Sequelize = require('sequelize');
const db = require('../../../config/db');

console.log('Hola')

const User = db.define(
  'User', 
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: Sequelize.STRING(250),
    },
  }
)

module.exports = User;