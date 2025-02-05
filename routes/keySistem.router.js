const express = require('express');
const validatorHandler = require('../middlewares/validator.handler');
const { createKeySistemSchema, updateKeySistemSchema, getKeySistemSchema } = require('../schemas/keySistem.schema');
const KeySistemService = require('../services/keySistem.service');
const service = new KeySistemService();
const router = express.Router();
const { checkRoles } = require('../middlewares/auth.handler');
const passport = require('passport');

router.get('/',
  passport.authenticate('jwt', { session: false }),
  checkRoles('user'),
  async (req, res) => {
    try {
      const keySistems = await service.find();
      res.json(keySistems);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  });

// Ruta para crear un nuevo KeySistem
router.post('/',
  passport.authenticate('jwt', { session: false }),
  checkRoles('user'),
  validatorHandler(createKeySistemSchema, 'body'),
  async (req, res) => {
    const body = req.body;
    try {
      const newKeySistem = await service.create(body);
      res.status(201).json(newKeySistem);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  });

// Ruta para obtener un KeySistem por id
router.get('/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles('user'),
  validatorHandler(getKeySistemSchema, 'params'), // Validación de los parámetros
  async (req, res) => {
    try {
      const { id } = req.params;
      const keySistem = await service.findOne(id);
      if (!keySistem) {
        return res.status(404).json({
          message: 'KeySistem not found',
        });
      }
      res.json(keySistem);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  });

// Ruta para actualizar un KeySistem
router.patch('/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles('user', 'device'),
  validatorHandler(getKeySistemSchema, 'params'),
  validatorHandler(updateKeySistemSchema, 'body'),
  async (req, res) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const updatedKeySistem = await service.update(id, body);
      if (!updatedKeySistem) {
        return res.status(404).json({
          message: 'KeySistem not found',
        });
      }
      res.json({
        message: 'KeySistem updated',
        data: updatedKeySistem,
        id,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  });

// Ruta para eliminar un KeySistem
router.delete('/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles('user'),
  validatorHandler(getKeySistemSchema, 'params'),
  async (req, res) => {
    try {
      const { id } = req.params;
      const deletedKeySistem = await service.delete(id);
      if (!deletedKeySistem) {
        return res.status(404).json({
          message: 'KeySistem not found',
        });
      }
      res.json({
        message: 'KeySistem deleted',
        data: deletedKeySistem,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  });

module.exports = router;
