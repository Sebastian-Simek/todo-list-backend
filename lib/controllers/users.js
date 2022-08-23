const { Router } = require('express');
const UserService = require('../services/userService');

module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      const newUser = await UserService.createUser(req.body);
      res.json(newUser);
    } catch (e) {
      next(e);
    }
  });
