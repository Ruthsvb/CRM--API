const Sequelize = require('sequelize');
const allConfigs = require('../../../config/config.js');
const env = process.env.NODE_ENV || 'development';
const config = allConfigs[env];

const ClienteModel = require('./cliente');

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,
});

const Cliente = ClienteModel(sequelize, Sequelize.DataTypes);

module.exports = {
  sequelize,
  Cliente,
};
