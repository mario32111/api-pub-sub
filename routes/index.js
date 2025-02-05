const express = require('express');
const mqttRouter = require('./mqtt.router');
const usersRouter = require('./users.router');
const authRouter = require('./auth.router');
const irrigationRouter = require('./irrigation.router');
function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/mqtt', mqttRouter);
  router.use('/users', usersRouter);
  router.use('/auth', authRouter);
  router.use('/irrigation', irrigationRouter);
}

module.exports = routerApi;
