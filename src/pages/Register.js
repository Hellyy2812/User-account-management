import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'user' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.find((u) => u.email === form.email)) {
      setError('Email already exists');
      return;
    }
    users.push(form);
    localStorage.setItem('users', JSON.stringify(users));
    alert('Registered successfully');
    navigate('/login');
  };

  return (
    <div className="container-vert-center">
      <div className="card p-4" style={{ width: 400, background: '#fff0f5' }}>
        <h3 className="text-center" style={{ color: '#a84d6e' }}>Register</h3>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <input className="form-control mb-2" name="name" placeholder="Full name" value={form.name} onChange={handleChange} required />
          <input className="form-control mb-2" name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
          <input className="form-control mb-2" name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required />
          <button className="btn btn-primary w-100 mb-2">Register</button>
        </form>
      </div>
    </div>
  );
}