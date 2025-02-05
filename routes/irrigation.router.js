const express = require('express');
const validatorHandler = require('../middlewares/validator.handler');
const { createIrrigationSchema, updateIrrigationSchema, getIrrigationSchema } = require('../schemas/irrigation.schema');
const IrrigationService = require('../services/irrigation.service');
const service = new IrrigationService();
const router = express.Router();
const { checkRoles } = require('../middlewares/auth.handler');
const passport = require('passport');

router.get('/',
  passport.authenticate('jwt', { session: false }),
  checkRoles('user'),
  async (req, res) => {
    try {
      const Irrigations = await service.find();
      res.json(Irrigations);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  });

// Ruta para crear un nuevo riego
router.post('/',
  passport.authenticate('jwt', { session: false }),
  checkRoles('user'),
  validatorHandler(createIrrigationSchema, 'body'),
  async (req, res) => {
    const body = req.body;
    const newUser = await service.create(body);
    res.status(201).json(newUser);
  }
);


// Ruta para obtener un riego por id
router.get('/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles('user'),
  validatorHandler(getIrrigationSchema, 'params'), // Validación de los parámetros
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

// Ruta para actualizar un riego
router.patch('/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles('user', 'device'),
  validatorHandler(getIrrigationSchema, 'params'),
  validatorHandler(updateIrrigationSchema, 'body'),
  async (req, res) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const updatedIrrigation = await service.update(id, body);
      res.json({
        message: 'Irrigation updated',
        data: updatedIrrigation,
        id,
      });
    } catch (error) {
      res.status(404).json({
        message: error.message,
      });
    }
  }
);

// Ruta para eliminar un riego
router.delete('/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles('user'),
  validatorHandler(getIrrigationSchema, 'params'),
  async (req, res) => {
    try {
      const { id } = req.params;
      const deletedIrrigation = await service.delete(id);
      res.json({
        message: 'User Irrigation',
        data: deletedIrrigation,
      });
    } catch (error) {
      res.status(404).json({
        message: error.message,
      });
    }
  }
);

module.exports = router;
