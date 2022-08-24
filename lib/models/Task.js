const pool = require('../utils/pool');

module.exports = class Task {
  id;
  task_name;
  description;
  completed;

  constructor(row) {
    this.id = row.id;
    this.taskName = row.task_name;
    this.description = row.description;
    this.completed = row.completed;
  }
  static async insert ({ taskName, description, completed }) {
    const { rows } = await pool.query(
      `INSERT INTO tasks (task_name, description, completed) 
            VALUES ($1, $2, $3)
            RETURNING *`,
      [taskName, description, completed]
    );
    return new Task(rows[0]);
  }
 
};
