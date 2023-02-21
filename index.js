'use strict';
require('dotenv').config();
const {start} = require('./src/app');


const {Sequelize} = require ('sequelize');


const DATABASE_URL = process.env.DATABASE_URL || 'sqlite:memory:';
const sequelizeDatabase = new Sequelize (DATABASE_URL);

module.exports = {
  sequelizeDatabase,
  start,

};
