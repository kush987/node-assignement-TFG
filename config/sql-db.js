// config/database.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('my_database', 'root', 'my-secret-pw', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;
