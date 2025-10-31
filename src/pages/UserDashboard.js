import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function UserDashboard() {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const u = JSON.parse(localStorage.getItem('loggedInUser'));
    if (!u) return navigate('/login');
    setUser(u);
    setForm(u);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    navigate('/login');
  };

  const handleSave = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const updated = users.map(u => u.email === user.email ? form : u);
    localStorage.setItem('users', JSON.stringify(updated));
    localStorage.setItem('loggedInUser', JSON.stringify(form));
    setUser(form);
    setEditMode(false);
  };

  if (!user) return null;

  return (
    <div className="container mt-5">
      <div className="card p-4">
        <h3>Welcome, {user.name}</h3>
        <p>Email: {user.email}</p>
        {!editMode ? (
          <>
            <button className="btn btn-warning me-2" onClick={() => setEditMode(true)}>Edit</button>
            <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <form onSubmit={handleSave}>
            <input className="form-control mb-2" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <input className="form-control mb-2" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
            <button className="btn btn-primary me-2" type="submit">Save</button>
            <button className="btn btn-secondary" onClick={() => setEditMode(false)}>Cancel</button>
          </form>
        )}
      </div>
    </div>
  );
}