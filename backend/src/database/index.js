const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const User = require('../model/User');
const Pac = require('../model/Pac');
const Cuid = require('../model/Cuid');
const Ped = require('../model/Ped');

const connection = new Sequelize(dbConfig);

User.init(connection);
Pac.init(connection);
Cuid.init(connection);
Ped.init(connection);

// User.associate(connection.models);
Pac.associate(connection.models);
// Cuid.associate(connection.models);
// Ped.associate(connection.models);

module.exports = connection;
