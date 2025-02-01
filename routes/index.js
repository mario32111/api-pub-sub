const express = require('express');
const mqttRouter = require('./mqtt.router');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/mqtt', mqttRouter);
}

module.exports = routerApi;
