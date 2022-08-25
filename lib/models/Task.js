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
 
  static async getById(id) {
    const { rows } = await pool.query(
      `SELECT * FROM tasks
        WHERE id = $1`,
      [id]
    );
    if (!rows[0]) {
      return null;
    }
    return new Task(rows[0]);
  }

  static async getByUserId(id) {
    const { rows } = await pool.query(
      `SELECT * FROM tasks
        WHERE user_id = $1`,
      [id]
    );
    if (!rows[0]) {
      return null;
    }
    return rows.map((row) => new Task(row));
  }

  static async updateByItemId(id, attrs) {
    const task = await Task.getById(id);
    if(!task) return null;
    const { taskName, description, completed } = { ...task, ...attrs };
    const { rows } = await pool.query(
      `UPDATE tasks
      SET task_name=$2, description=$3, completed=$4
      WHERE id=$1
      RETURNING *`,
      [id, taskName, description, completed]
    );
    return new Task(rows[0]);
  }

  static async DeleteById(id) {
    const { rows } = await pool.query(
      `DELETE FROM tasks WHERE id=$1
      RETURNING *`,
      [id]
    );
    return new Task(rows[0]);
  }
};
