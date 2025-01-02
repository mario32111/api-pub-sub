const { Sequelize } = require('sequelize');
const {config }= require('../config/config')
const setupModels = require('../db/models/index');

/*
const USER = encodeURIComponent(config.dbUser);
const PASSWORD= encodeURIComponent(config.dbPassword);
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}` */

//esto ya implementa la conexion de tipo pool
const options = {
  dialect: 'postgres',
  logging: config.isProd ? false : true,
};

if (config.isProd) {
  options.ssl = {
    rejectUnauthorized: false,
  };
}
const sequelize = new Sequelize(config.dbUrl , options);

setupModels(sequelize);

//aqui sincroniza la estructura del schema de acuerdo a la estructura de la bd
//Esto no es recomendable en produccion
//sequelize.sync();

module.exports = sequelize;
