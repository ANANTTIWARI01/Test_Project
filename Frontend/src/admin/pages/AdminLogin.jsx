
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAdminAuth } from "../context/Auth";
import instance from "../../../axiosConfig";

function AdminLogin() {
  const navigate = useNavigate();
  const { setIsAuthenticated } = useAdminAuth();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await instance.post("/auth/login", form, { withCredentials: true });
      setIsAuthenticated(true);
      navigate("/admin/home");
    } catch (error) {
      console.log("Login error:", error);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter email"
          name="email"
          value={form.email}
          onChange={handleChange}
          autoFocus
          autoComplete="email"
        />
        <input
          type="password"
          placeholder="Enter password"
          name="password"
          value={form.password}
          onChange={handleChange}
          autoComplete="current-password"
        />
        <button type="submit">Login</button>
      </form>
      <Link to="/admin/register">Register</Link>
    </>
  );
}

export default AdminLogin;
