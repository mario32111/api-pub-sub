const Joi = require ('joi');

const id = Joi.number().integer();  // Corrección aquí
const name = Joi.string().min(3).max(15);
const price = Joi.number().integer().min(10).strict();
const description = Joi.string().min(10);
const image = Joi.string().uri();
const categoryId = Joi.number().integer();  // Corrección aquí


const createProductSchema = Joi.object({
  name: name.required(),
  price: price.required(),
  description: description.required(),
  image: image.required(),
  categoryId: categoryId.required(),
});

const updatedProductSchema = Joi.object({
  name: name,
  price: price,
  description: description.required(),
  image: image,
  categoryId: categoryId.required(),
});

const getProductSchema = Joi.object({
  id: id.required(),
});

module.exports = { createProductSchema, updatedProductSchema, getProductSchema };
