const pool = require("../db");

const getWorkoutsByUser = async (userId) => {
  const result = await pool.query(
    "SELECT * FROM workouts WHERE user_id = $1 ORDER BY date DESC",
    [userId]
  );
  return result.rows;
};

const addWorkout = async (userId, type, duration, calories) => {
  const result = await pool.query(
    "INSERT INTO workouts (user_id, type, duration, calories) VALUES ($1, $2, $3, $4) RETURNING *",
    [userId, type, duration, calories]
  );
  return result.rows[0];
};

module.exports = { getWorkoutsByUser, addWorkout };
