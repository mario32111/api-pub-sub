const express = require('express');

const exampleRouter = require('./example.router');


function routerApi (app){
  const router = express.Router();
  app.use('/api/v1', router)
  router.use('/example', exampleRouter);


}

module.exports = routerApi;
