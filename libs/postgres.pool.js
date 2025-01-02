const {Pool} = require('pg');
const {config }= require('./../config/config')

let URI = '';
if(config.isProd){
  URI = config.dbUrl;
} else{
  const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`
}

const USER = encodeURIComponent(config.dbUser);
const PASSWORD= encodeURIComponent(config.dbPassword);

//conexion de tipo pool
const pool = new Pool({ connectionString: URI});

module.exports = pool;
