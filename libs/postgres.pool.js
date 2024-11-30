const {Pool} = require('pg');
//conexion de tipo pool
const pool = new Pool({
  host: 'localhost',
  port: '5432',
  user: 'mario',
  password: 'admin123',
  database: 'my_store'
});


module.exports = pool;
