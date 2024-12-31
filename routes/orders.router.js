const express = require('express');

const OrderService = require('../services/order.service');
const validationHandler = require('../middlewares/validator.handler');
const {
  createOrderSchema,
  getOrderSchema,
  updateOrderSchema,
  addItemSchema
} = require('../schemas/order.schema');

const router = express.Router();
const service = new OrderService();

router.get('/', async (req, res, next) => {
  try {
    res.json(await service.find());
  } catch (error) {
    next(error);
  }
});

router.get('/:id',
  validationHandler(getOrderSchema, 'params'),
  async (req, res) => {
    try {
      const { id } = req.params;
      const order = await service.findOne(id);
      res.status(201).json(order);
    } catch (error) {
      res.status(404).json({
        message: error.message,
      });
    }
  }
);

router.post('/',
  validationHandler(createOrderSchema, 'body'),
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
  validationHandler(getOrderSchema, 'params'),
  validationHandler(updateOrderSchema, 'body'),
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
  validationHandler(getOrderSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      res.status(200).json(await service.delete(id));
    } catch (error) {
      next(error);
    }
  }
);



router.post('/add-item',
  validationHandler(addItemSchema , 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      res.status(201).json(await service.addItem(body));
    } catch (error) {
      next(error);
    }
  }
);
module.exports = router;
