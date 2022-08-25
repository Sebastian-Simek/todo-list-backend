const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');
const Task = require('../models/Task');


module.exports = Router()
  .post('/', authenticate, async (req, res, next) => {
    try {
      const newTask = await Task.insert({ ...req.body, userId: req.user.id });
      res.json(newTask);
    } catch (e) {
      next(e);
    }
  })
  .get('/', authenticate, async (req, res, next) => {
    try {
      const tasks = await Task.getByUserId(req.user.id);
      res.json(tasks);
    } catch (error) {
      next(error);
    }
  })
  .put('/:id', authenticate, authorize, async (req, res, next) => {
    try {
      const updatedTask = await Task.updateByItemId(req.params.id, req.body);
      res.json(updatedTask);
    } catch (e) {
      next(e);
    }
  })
  .delete('/:id', authenticate, authorize, async (req, res, next) => { try {
    const oldTask = await Task.DeleteById(req.params.id);
    res.json(oldTask);
  } catch (e) {
    next(e);
  }
  });
