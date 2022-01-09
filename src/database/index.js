'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const modelsPath = path.join(__dirname, "models");
const config = require('../../config');
const { database, sequelizeOptions } = config;
const { name, username, password } = database;
const db = {};

let sequelize = new Sequelize(name, username, password, sequelizeOptions);

fs
.readdirSync(modelsPath)
.filter((file) => file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js')
.forEach((file) => {
  const model = require(path.join(modelsPath, file))(sequelize, Sequelize.DataTypes);
  db[model.name] = model;
  
});

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;