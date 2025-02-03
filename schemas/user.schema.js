const Joi = require('joi');

// Definición de reglas para cada campo
const id = Joi.number().integer();
const email = Joi.string().email();
const password = Joi.string().min(8);
const names = Joi.string().max(100); // Ajusta el máximo según tus necesidades
const lastNames = Joi.string().max(100); // Ajusta el máximo según tus necesidades
const gender = Joi.string().valid('male', 'female', 'other'); // Valores permitidos para género
const phone = Joi.string().pattern(/^[0-9]{10}$/); // Asume un formato de 10 dígitos
const zip_code = Joi.string().pattern(/^[0-9]{5}$/); // Asume un formato de 5 dígitos
const hectares_to_irrigate = Joi.string().max(50); // Ajusta el máximo según tus necesidades
const birthdate = Joi.date().less('now'); // Fecha de nacimiento debe ser menor a la fecha actual
const recoveryToken = Joi.string(); // Token de recuperación
const role = Joi.string().min(5); // Rol del usuario

// Esquema para crear un usuario
const createUserSchema = Joi.object({
  email: email.required(),
  password: password.required(),
  names: names.required(),
  lastNames: lastNames.required(),
  gender: gender.required(),
  phone: phone.required(),
  zip_code: zip_code.required(),
  hectares_to_irrigate: hectares_to_irrigate.required(),
  birthdate: birthdate.required(),
  role: role.required(), // Si el rol es obligatorio
});

// Esquema para actualizar un usuario
const updateUserSchema = Joi.object({
  email: email,
  password: password,
  names: names,
  lastNames: lastNames,
  gender: gender,
  phone: phone,
  zip_code: zip_code,
  hectares_to_irrigate: hectares_to_irrigate,
  birthdate: birthdate,
  role: role,
  recoveryToken: recoveryToken, // Si el token de recuperación se puede actualizar
});

// Esquema para obtener un usuario por ID
const getUserSchema = Joi.object({
  id: id.required(),
});

module.exports = { createUserSchema, updateUserSchema, getUserSchema };
