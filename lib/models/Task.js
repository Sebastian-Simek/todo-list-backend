const pool = require('../utils/pool');

module.exports = class Task {
  id;
  userId;
  taskName;
  description;
  completed;

  constructor(row) {
    this.id = row.id;
    this.userId = row.user_id;
    this.taskName = row.task_name;
    this.description = row.description;
    this.completed = row.completed;
  }
  static async insert ({ taskName, description, userId }) {
    const { rows } = await pool.query(
      `INSERT INTO tasks (task_name, description, user_id) 
            VALUES ($1, $2, $3)
            RETURNING *`,
      [taskName, description, userId]
    );
    return new Task(rows[0]);
  }
 
};
