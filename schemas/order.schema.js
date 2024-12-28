const Joi = require('joi');

const orderId = Joi.number().integer();
const customerId = Joi.number().integer();
const total = Joi.number();


const getOrderSchema = Joi.object({
  id: orderId.required(),
});

const createOrderSchema = Joi.object({
  total: total.required(),
  customerId: customerId.required(),
});

const updateOrderSchema = Joi.object({
  total,
  customerId: customerId.required(),
});

module.exports = { getOrderSchema, createOrderSchema, updateOrderSchema };
