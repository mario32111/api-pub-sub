const { Sequelize } = require('sequelize');
const {config }= require('../config/config')
const setupModels = require('../db/models/index');


const USER = encodeURIComponent(config.dbUser);
const PASSWORD= encodeURIComponent(config.dbPassword);
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`

//esto ya implementa la conexion de tipo pool
const sequelize = new Sequelize(URI , {
  dialect: 'postgres',
  logging: true,
});

setupModels(sequelize);

//aqui sincroniza la estructura del schema de acuerdo a la estructura de la bd
sequelize.sync()

module.exports = sequelize;
