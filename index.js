const express = require("express");
const routerApi = require('./routes');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware para parsear JSON en las solicitudes
app.use(express.json());
app.use(cors());
require('./utils/auth');

routerApi(app);

// Inicia la API (hace que sea accesible desde otras PCs)
app.listen(port, '0.0.0.0', () => {
  console.log(`API escuchando en http://0.0.0.0:${port}`);
});
