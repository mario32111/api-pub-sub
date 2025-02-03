const express = require('express');
const validatorHandler = require('../middlewares/validator.handler');
const { createUserSchema } = require('../schemas/user.schema');
const UserService = require('../services/user.service');
const service = new UserService();
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
