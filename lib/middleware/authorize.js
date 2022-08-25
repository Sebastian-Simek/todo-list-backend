const Task = require('../models/Task');


module.exports = async (req, res, next) => {
  try {
    const task = await Task.getById(req.params.id);
    if (req.user.id !== task.userId) {
      throw new Error('Not Your Item!');
    }
    next();
  } catch (e) {
    e.status = 403;
    next(e);
  }
};
