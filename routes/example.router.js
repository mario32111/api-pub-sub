const express = require('express');
const validatorHandler = require('../middlewares/validator.handler');
const ExampleService = require('../services/example.service');
const { createExampleSchema } = require('../schemas/example.schema');

const service = new ExampleService();
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const users = await service.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;
