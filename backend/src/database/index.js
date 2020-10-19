const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const User = require('../model/User');
const Pac = require('../model/Pac');
const Cuid = require('../model/Cuid');

const connection = new Sequelize(dbConfig);

User.init(connection);
Pac.init(connection);
Cuid.init(connection);

Pac.associate(connection.models);

module.exports = connection;
