import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/users/register', { // change URL accordingly
        username,
        email,
        password
      });
      alert("Registration successful!");
      navigate('/');
    } catch (err) {
      console.error(err.response || err.message || err);
      alert("Registration failed: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="container">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />
        <input
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          type="email"
          required
        />
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button type="submit">Register</button>
      </form>
      <p>Already have an account? <Link to="/">Login</Link></p>
    </div>
  );
}
