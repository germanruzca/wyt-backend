const Sequelize = require('sequelize');


module.exports = new Sequelize('wyt_databse', 'wyt_user', 'n8jZ4EdBNnCGQen', {
  host: 'localhost',
  port: '5001',
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
})