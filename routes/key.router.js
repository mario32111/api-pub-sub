const express = require('express');
const validatorHandler = require('../middlewares/validator.handler');
const { createKeySchema, updateKeySchema, getKeySchema } = require('../schemas/key.schema');
const KeyService = require('../services/key.service');
const service = new KeyService();
const router = express.Router();
const { checkRoles } = require('../middlewares/auth.handler');
const passport = require('passport');

router.get('/',
  passport.authenticate('jwt', { session: false }),
  checkRoles('user'),
  async (req, res) => {
    try {
      const keys = await service.find();
      res.json(keys);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  });

// Ruta para crear un nuevo Key
router.post('/',
  passport.authenticate('jwt', { session: false }),
  checkRoles('user'),
  validatorHandler(createKeySchema, 'body'),
  async (req, res) => {
    const body = req.body;
    try {
      const newKey = await service.create(body);
      res.status(201).json(newKey);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  });

// Ruta para obtener un Key por id
router.get('/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles('user'),
  validatorHandler(getKeySchema, 'params'), // Validación de los parámetros
  async (req, res) => {
    try {
      const { id } = req.params;
      const key = await service.findOne(id);
      if (!key) {
        return res.status(404).json({
          message: 'Key not found',
        });
      }
      res.json(key);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  });

// Ruta para actualizar un Key
router.patch('/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles('user', 'device'),
  validatorHandler(getKeySchema, 'params'),
  validatorHandler(updateKeySchema, 'body'),
  async (req, res) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const updatedKey = await service.update(id, body);
      if (!updatedKey) {
        return res.status(404).json({
          message: 'Key not found',
        });
      }
      res.json({
        message: 'Key updated',
        data: updatedKey,
        id,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  });

// Ruta para eliminar un Key
router.delete('/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles('user'),
  validatorHandler(getKeySchema, 'params'),
  async (req, res) => {
    try {
      const { id } = req.params;
      const deletedKey = await service.delete(id);
      if (!deletedKey) {
        return res.status(404).json({
          message: 'Key not found',
        });
      }
      res.json({
        message: 'Key deleted',
        data: deletedKey,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  });

module.exports = router;
