import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const admin = JSON.parse(localStorage.getItem('loggedInUser'));
    if (!admin || admin.role !== 'admin') navigate('/login');
    setUsers(JSON.parse(localStorage.getItem('users')) || []);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    navigate('/login');
  };

  const handleDelete = (email) => {
    const filtered = users.filter(u => u.email !== email);
    setUsers(filtered);
    localStorage.setItem('users', JSON.stringify(filtered));
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center">
        <h3>Admin Dashboard</h3>
        <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
      </div>
      <table className="table mt-3">
        <thead><tr><th>Name</th><th>Email</th><th>Role</th><th></th></tr></thead>
        <tbody>
          {users.length === 0 ? (
            <tr><td colSpan="4">No users</td></tr>
          ) : (
            users.map((u, i) => (
              <tr key={i}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.role}</td>
                <td><button className="btn btn-danger btn-sm" onClick={() => handleDelete(u.email)}>Delete</button></td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}