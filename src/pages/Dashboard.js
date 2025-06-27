import React, { useEffect, useState } from 'react';
import axios from 'axios';
import WorkoutChart from '../components/WorkoutChart';

export default function Dashboard() {
  const [workouts, setWorkouts] = useState([]);
  const [type, setType] = useState('');
  const [duration, setDuration] = useState('');
  const [calories, setCalories] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        const res = await axios.get('https://fitness-tracker-backend.onrender.com/api/workouts', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setWorkouts(res.data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        alert("Session expired or unauthorized.");
        window.location.href = '/';
      }
    };

    fetchWorkouts();
  }, []);

  const handleAddWorkout = async () => {
    if (!type || !duration) {
      alert("Workout type and duration are required.");
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const res = await axios.post('https://fitness_tracker_backend.onrender.com/api/workouts', {
        type,
        duration,
        calories
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert("Workout added!");
      setType('');
      setDuration('');
      setCalories('');
      setWorkouts(prev => [res.data, ...prev]);
    } catch (err) {
      alert("Failed to add workout.");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="container">
      <h2>🏋️ Fitness Tracker Dashboard</h2>
      <button onClick={logout}>Logout</button>

      <h3>Add Workout</h3>
      <input placeholder="Workout Type" value={type} onChange={e => setType(e.target.value)} />
      <input placeholder="Duration (minutes)" value={duration} onChange={e => setDuration(e.target.value)} />
      <input placeholder="Calories Burned (optional)" value={calories} onChange={e => setCalories(e.target.value)} />
      <button onClick={handleAddWorkout}>Submit</button>

      <h3>Workout Chart</h3>
      <div className="chart-container">
        <WorkoutChart workouts={workouts} />
      </div>

      <h3>Workout History</h3>
      {loading ? <p>Loading workouts...</p> : (
        <ul>
          {workouts.map(w => (
            <li key={w.id}>
              {w.date} — {w.type} — {w.duration} min — {w.calories} cal
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
