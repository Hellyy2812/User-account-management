import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";
import "./styles.css";

function App(){
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />}           />
        <Route path="/register" element={<Register />}     />
        <Route path="/admin" element={<AdminDashboard />}  />
        <Route path="/user" element={<UserDashboard />}    />
      </Routes>
    </Router>
  );
}

export default App;
