const express = require('express');
const passport = require('passport');
const LocalStrategy = require('../utils/auth/strategies/local.strategy');

const router = express.Router();


router.post('/login',
  passport.authenticate('local',{ session: false }),
  async (req, res, next) => {
    try {
      res.json(req.user);
    } catch (error) {
      next(error);
    }
  });

module.exports = router;
