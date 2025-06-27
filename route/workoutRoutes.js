const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const { getWorkouts, createWorkout } = require("../controllers/workoutController");

router.get("/", auth, getWorkouts);
router.post("/", auth, createWorkout);

module.exports = router;
