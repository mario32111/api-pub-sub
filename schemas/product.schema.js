const Joi = require ('joi');

const id = Joi.string().guid({ version: 'uuidv4' });  // Corrección aquí
const name = Joi.string().min(3).max(15);
const price = Joi.number().integer().min(10).strict();
const image = Joi.string().uri();

const createProductSchema = Joi.object({
  name: name.required(),
  price: price.required(),
  image: image.required(),
});

const updatedProductSchema = Joi.object({
  name: name,
  price: price,
  image: image,
});

const getProductSchema = Joi.object({
  id: id.required(),
});

module.exports = { createProductSchema, updatedProductSchema, getProductSchema };
