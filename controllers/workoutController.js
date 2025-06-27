const { getWorkoutsByUser, addWorkout } = require("../models/workoutModel");

exports.getWorkouts = async (req, res) => {
  try {
    const workouts = await getWorkoutsByUser(req.user.id);
    res.json(workouts);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching workouts", error: err.message });
  }
};

exports.createWorkout = async (req, res) => {
  const { type, duration, calories } = req.body;

  try {
    const workout = await addWorkout(req.user.id, type, duration, calories);
    res.json(workout);
  } catch (err) {
    res.status(500).json({ msg: "Error creating workout", error: err.message });
  }
};
