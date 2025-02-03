const express = require('express');
const mqttRouter = require('./mqtt.router');
const usersRouter = require('./users.router');
function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/mqtt', mqttRouter);
  router.use('/users', usersRouter);
}

module.exports = routerApi;
