const express = require('express');
const validatorHandler = require('./../middlewares/validator.handler');
const UsersService = require('./../services/users.service');
const { createUserSchema, updateUserSchema, getUserSchema } = require('./../schemas/user.schema');

const service = new UsersService();
const router = express.Router();

// Ruta para obtener una lista de usuarios, con parámetros limit y offset
router.get('/', async (req, res) => {
  try {
    const users = await service.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// Ruta para obtener un usuario por id
router.get('/:id',
  validatorHandler(getUserSchema, 'params'), // Validación de los parámetros
  async (req, res) => {
    try {
      const { id } = req.params;
      const user = await service.findOne(id);
      res.status(201).json(user);
    } catch (error) {
      res.status(404).json({
        message: error.message,
      });
    }
  }
);

// Ruta para crear un nuevo usuario
router.post('/',
  validatorHandler(createUserSchema, 'body'), // Validación del cuerpo
  async (req, res) => {
    try {
      const body = req.body;
      const newUser = {
        id: faker.datatype.uuid(),
        name: body.name || faker.person.fullName(),
        email: body.email || faker.internet.email(),
        avatar: body.avatar || faker.image.avatar(),
      };
      const createdUser = await service.create(newUser); // Asume que `create` es un método asíncrono en el servicio
      res.status(201).json({
        message: 'User created',
        data: createdUser,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
);

// Ruta para actualizar un usuario
router.patch('/:id',
  validatorHandler(getUserSchema, 'params'), // Validación de los parámetros
  validatorHandler(updateUserSchema, 'body'), // Validación del cuerpo
  async (req, res) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const updatedUser = await service.update(id, body); // Asume que `update` es un método asíncrono en el servicio
      res.json({
        message: 'User updated',
        data: updatedUser,
        id,
      });
    } catch (error) {
      res.status(404).json({
        message: error.message,
      });
    }
  }
);

// Ruta para eliminar un usuario
router.delete('/:id',
  validatorHandler(getUserSchema, 'params'), // Validación de los parámetros
  async (req, res) => {
    try {
      const { id } = req.params;
      const deletedUser = await service.delete(id); // Asume que `delete` es un método asíncrono en el servicio
      res.json({
        message: 'User deleted',
        data: deletedUser,
      });
    } catch (error) {
      res.status(404).json({
        message: error.message,
      });
    }
  }
);

module.exports = router;
