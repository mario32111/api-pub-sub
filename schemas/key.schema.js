const Joi = require('joi');

// Definición de reglas para cada campo
const id = Joi.number().integer();
const type = Joi.string().required();
const on = Joi.boolean().default(false);
const createdAt = Joi.date();
const keySystem_id = Joi.number().integer().required();

// Esquema para crear una nueva Key
const createKeySchema = Joi.object({
  type: type,
  on: on,
  keySystem_id: keySystem_id,
});

// Esquema para actualizar una Key
const updateKeySchema = Joi.object({
  type: type,
  on: on,
  keySystem_id: keySystem_id,
  createdAt: createdAt,
});

// Esquema para obtener una Key por ID
const getKeySchema = Joi.object({
  id: id.required(),
});

module.exports = { createKeySchema, updateKeySchema, getKeySchema };
