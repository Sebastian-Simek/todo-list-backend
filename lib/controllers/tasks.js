const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const Task = require('../models/Task');


module.exports = Router()
  .post('/', authenticate, async (req, res, next) => {
    try {
      const newTask = await Task.insert({ ...req.body, userId: req.user.id });
      res.json(newTask);
    } catch (e) {
      next(e);
    }
  });
