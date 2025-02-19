const express = require('express');
const validatorHandler = require('../middlewares/validator.handler');
const { createUserSchema, updateUserSchema, getUserSchema } = require('../schemas/user.schema');
const UserService = require('../services/user.service');
const service = new UserService();
const router = express.Router();
const { checkRoles } = require('../middlewares/auth.handler');
const passport = require('passport');

router.get('/',
  passport.authenticate('jwt', { session: false }),
  checkRoles('user'),
  async (req, res) => {
  try {
    const users = await service.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.get('/check-email', async (req, res) => {
  try {
    const { email } = req.query; // Obtener el email desde la URL
    if (!email) {
      return res.status(400).json({ message: "El email es requerido" });
    }

    const existingUser = await service.findByEmail(email);
    res.json({ exists: !!existingUser }); // Devuelve un booleano en lugar del objeto completo
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// Ruta para crear un nuevo usuario
router.post('/',
  validatorHandler(createUserSchema, 'body'),
  async (req, res) => {
    const body = req.body;
    const newUser = await service.create(body);
    res.status(201).json(newUser);
  }
);


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

// Ruta para actualizar un usuario
router.patch('/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles('user'),
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'),
  async (req, res) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const updatedUser = await service.update(id, body);
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
  passport.authenticate('jwt', { session: false }),
  checkRoles('user'),
  validatorHandler(getUserSchema, 'params'),
  async (req, res) => {
    try {
      const { id } = req.params;
      const deletedUser = await service.delete(id);
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
