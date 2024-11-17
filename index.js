const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');
const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler')

const app = express();
//con esto el puerto es dinamico, se asigna segun el puerto que heroku diga
const port = process.env.PORT || 3000;

app.use(express.json());

//solucionar el problema de CORS, y gestionar los accesos a la api
const whitelist = ['http://localhost:8080'];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin){
      callback(null, true);
    }else{
      callback(new Error('no permitido'))
    }
  }
};

app.use(cors());

app.get('/', (req, res) => {
  res.send('Hola mi server en express');
});


app.get('/nueva-ruta', (req, res) => {
  res.send('Hola soy un nuevo endpoint');
});

routerApi(app)

//se ejecutan en este orden
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log("Mi port " + port)
});
