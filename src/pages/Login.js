import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const admin = { email: 'admin@example.com', password: 'admin123', role: 'admin', name: 'Admin' };

    if (form.email === admin.email && form.password === admin.password) {
      localStorage.setItem('loggedInUser', JSON.stringify(admin));
      navigate('/admin');
      return;
    }

    const user = users.find((u) => u.email === form.email && u.password === form.password);
    if (user) {
      localStorage.setItem('loggedInUser', JSON.stringify(user));
      navigate('/user');
    } else setError('Invalid credentials');
  };

  return (
    <div className="container-vert-center">
      <div className="card p-4" style={{ width: 360, background: '#fff0f5' }}>
        <h3 className="text-center" style={{ color: '#a84d6e' }}>Login</h3>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <input className="form-control mb-2" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
          <input className="form-control mb-2" name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required />
          <button className="btn btn-primary w-100 mb-2">Login</button>
        </form>
        <p className="text-center">No account? <Link to="/register">Register</Link></p>
        <div className="p-2" style={{ background: '#fff8fb', borderRadius: 8, fontSize: 13 }}>
          <strong>Use this for demo:</strong><br />
          Admin → admin@example.com / admin123<br />
          User → helly@email.com / pass123
        </div>
      </div>
    </div>
  );
}