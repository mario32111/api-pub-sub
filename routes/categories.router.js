const express = require('express');

const CustomerService = require('../services/category.service');
const validationHandler = require('../middlewares/validator.handler');
const { checkRoles } = require('../middlewares/auth.handler');
const {
  createCategorySchema,
  getCategorySchema,
  updateCategorySchema,
} = require('../schemas/category.schema');
const passport = require('passport');

const router = express.Router();
const service = new CustomerService();

router.get('/',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin', 'customer'),
  async (req, res, next) => {
  try {
    res.json(await service.find());
  } catch (error) {
    next(error);
  }
});

router.get('/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin', 'customer'),
  validationHandler(getCategorySchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const category = await service.findOne(id);
      res.status(201).json(category);
    } catch (error) {
      next(error);
    }
  });

router.post('/',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
  validationHandler(createCategorySchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      res.status(201).json(await service.create(body));
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
  validationHandler(getCategorySchema, 'params'),
  validationHandler(updateCategorySchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      res.status(201).json(await service.update(id, body));
    } catch (error) {
      next(error);
    }
  }
);


router.delete('/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
  validationHandler(getCategorySchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      res.status(200).json(await service.delete(id));
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
