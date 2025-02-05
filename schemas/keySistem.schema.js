const Joi = require('joi');

// Definición de reglas para cada campo
const id = Joi.number().integer();
const on = Joi.boolean().default(false);
const createdAt = Joi.date();
const irrigation_id = Joi.number().integer().required();

// Esquema para crear un nuevo KeySistem
const createKeySistemSchema = Joi.object({
  on: on,
  irrigation_id: irrigation_id,
});

// Esquema para actualizar un KeySistem
const updateKeySistemSchema = Joi.object({
  on: on,
  irrigation_id: irrigation_id,
  createdAt: createdAt,
});

// Esquema para obtener un KeySistem por ID
const getKeySistemSchema = Joi.object({
  id: id.required(),
});

module.exports = { createKeySistemSchema, updateKeySistemSchema, getKeySistemSchema };
