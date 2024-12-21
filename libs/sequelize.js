const { Sequelize } = require('sequelize');
const {config }= require('../config/config')
const setupModels = require('../db/models/index');


const USER = encodeURIComponent(config.dbUser);
const PASSWORD= encodeURIComponent(config.dbPassword);
const URI = `mysql://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`

//esto ya implementa la conexion de tipo pool
const sequelize = new Sequelize(URI , {
  dialect: 'mysql',
  logging: true,
});

setupModels(sequelize);

//aqui sincroniza la estructura del schema de acuerdo a la estructura de la bd
sequelize.sync()

module.exports = sequelize;
