import React, { useState } from "react";
import { Link } from "react-router-dom";
import instance from "../../../axiosConfig";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    if (!name || !email || !password) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      await instance.post(
        "/user/register",
        { name, email, password },
        { withCredentials: true }
      );
    } catch (error) {
      console.error("Error during registration:", error);
    }
  }
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-md shadow-md">
        <form action="" onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-2xl font-bold text-center text-gray-800">Register</h2>
          <input
            name="name"
            type="text"
            placeholder="Enter your first name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
          />

          <input
            name="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
          />
          <input
            name="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
          />
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Submit
          </button>
        </form>
        <div className="mt-4 text-center">
          <h1 className="text-sm text-gray-600">
            Already Registered?{" "}
            <span className="text-blue-500 hover:underline">
              <Link to={"/login"}>Login Here</Link>
            </span>
          </h1>
        </div>
      </div>
    </div>
  );
}

export default Register;