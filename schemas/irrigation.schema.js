const Joi = require('joi');

// Definición de reglas para cada campo
const id = Joi.number().integer();
const user_id = Joi.number().integer().required();
const weather_id = Joi.number().integer().required();
const hectares_number = Joi.number().positive().required();
const location = Joi.string().max(255).required();
const nocturnal_irrigation = Joi.boolean().default(false);
const crop_type = Joi.string().max(100).required();
const icon = Joi.string().uri().allow(null);
const name = Joi.string().max(100).required();
const irrigation_frequency = Joi.string().max(50).required();
const irrigation_cycle = Joi.string().max(50).required();
const last_irrigation_cycle = Joi.date().required();
const createdAt = Joi.date().default(Date.now);

// Esquema para crear un riego
const createIrrigationSchema = Joi.object({
  user_id: user_id.required(),
  weather_id: weather_id.optional(),
  hectares_number: hectares_number.required(),
  location: location.required(),
  nocturnal_irrigation: nocturnal_irrigation.required(),
  crop_type: crop_type.required(),
  icon: icon.required(),
  name: name.required(),
  irrigation_frequency: irrigation_frequency.required(),
  irrigation_cycle: irrigation_cycle.required(),
  last_irrigation_cycle: last_irrigation_cycle.required(),
});

// Esquema para actualizar un riego
const updateIrrigationSchema = Joi.object({
  user_id: user_id.optional(),
  weather_id: weather_id.optional(),
  hectares_number: hectares_number.optional(),
  location: location.optional(),
  nocturnal_irrigation: nocturnal_irrigation.optional(),
  crop_type: crop_type.optional(),
  icon: icon.optional(),
  name: name.optional(),
  irrigation_frequency: irrigation_frequency.optional(),
  irrigation_cycle: irrigation_cycle.optional(),
  last_irrigation_cycle: last_irrigation_cycle.optional(),
});

// Esquema para obtener un riego por ID
const getIrrigationSchema = Joi.object({
  id: id.required(),
});

const getIrrigationsByIdSchema = Joi.object({
  id: id.required(),
});

module.exports = { createIrrigationSchema, updateIrrigationSchema, getIrrigationSchema, getIrrigationsByIdSchema };
