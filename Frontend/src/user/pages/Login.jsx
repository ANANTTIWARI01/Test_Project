import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthUser } from "../context/UserAuthProvider";
import instance from "../../../axiosConfig";

function UserLogin() {
  const navigate = useNavigate();
  const { setIsUserAuthenticated } = useAuthUser();
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
      await instance.post("/user/login", form, { withCredentials: true });
      setIsUserAuthenticated(true);
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed. Please try again.");
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-md shadow-md">
        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>
          <input
            type="email"
            placeholder="Enter email"
            name="email"
            value={form.email}
            onChange={handleChange}
            autoFocus
            autoComplete="email"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
          />
          <input
            type="password"
            placeholder="Enter password"
            name="password"
            value={form.password}
            onChange={handleChange}
            autoComplete="current-password"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
          />
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Login
          </button>
        </form>

        <div className="mt-4 text-center">
          <h1 className="text-sm text-gray-600">
            New User?{" "}
            <span className="text-blue-500 hover:underline">
              <Link to="/register">Register Here</Link>
            </span>
          </h1>
        </div>
      </div>
    </div>
  );
}

export default UserLogin;