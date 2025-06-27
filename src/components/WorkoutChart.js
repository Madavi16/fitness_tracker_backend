import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// 🔧 Register Chart.js modules
ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

export default function WorkoutChart({ workouts }) {
  const data = {
    labels: workouts.map(w => w.date),
    datasets: [
      {
        label: "Calories Burned",
        data: workouts.map(w => w.calories || 0),
        backgroundColor: "orange"
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Calories Burned per Workout" }
    }
  };

  return (
    <div style={{ maxWidth: "700px", marginTop: "20px" }}>
      <Bar data={data} options={options} />
    </div>
  );
}
