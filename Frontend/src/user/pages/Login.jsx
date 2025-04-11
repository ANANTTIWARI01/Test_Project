import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthUser } from "../context/UserAuthProvider"; // Assuming a UserAuth context exists
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
// console.log(form);

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
          className="border-2 mx-3 my-5 pl-3"
        />
        <input
          type="password"
          placeholder="Enter password"
          name="password"
          value={form.password}
          onChange={handleChange}
          autoComplete="current-password"
          className="border-2 mx-3 my-5 pl-3"
        />
        <button type="submit" className="cursor-pointer">
          Login
        </button>
      </form>

      <div>
        <h1>
          New User?{" "}
          <span className="cursor-pointer">
            <Link to="/register">Register Here</Link>
          </span>
        </h1>
      </div>
    </>
  );
}

export default UserLogin;