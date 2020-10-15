const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const User = require('../model/User');
const Cuid = require('../model/Cuid');

const connection = new Sequelize(dbConfig);

User.init(connection);
Cuid.init(connection);

module.exports = connection;
