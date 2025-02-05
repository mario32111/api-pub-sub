const express = require('express');
const mqttRouter = require('./mqtt.router');
const usersRouter = require('./users.router');
const authRouter = require('./auth.router');
const irrigationRouter = require('./irrigation.router');
const keyRouter = require('./key.router');
const keySistemRouter = require('./keySistem.router');
function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/mqtt', mqttRouter);
  router.use('/users', usersRouter);
  router.use('/auth', authRouter);
  router.use('/irrigation', irrigationRouter);
  router.use('/key', keyRouter);
  router.use('/keySistem', keySistemRouter);
}

module.exports = routerApi;
