const Joi = require ('joi');

const id = Joi.number().integer();  // Corrección aquí
const name = Joi.string().min(3).max(15);
const price = Joi.number().integer().min(10);
const description = Joi.string().min(10);
const image = Joi.string().uri();
const categoryId = Joi.number().integer();  // Corrección aquí

const limit = Joi.number().integer().min(1).max(100);
const offset = Joi.number().integer().min(0);

const price_min = Joi.number().integer();
const price_max = Joi.number().integer();

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

const queryProductSchema = Joi.object({
  limit,
  offset,
  price,
  price_min,
  price_max:price_max.when('price_min', {
    is: Joi.number().required(),
    then: Joi.required(),
  })
});
module.exports = { createProductSchema, updatedProductSchema, getProductSchema, queryProductSchema };
