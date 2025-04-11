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
    <>
      <form action="" onSubmit={handleSubmit}>
        <input
          name="name"
          type="text"
          placeholder="Enter your first name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border-2 mx-3 pl-3 my-5"
        />

        <input
          name="email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border-2 mx-3 pl-3 my-5"
        />
        <input
          name="password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border-2 mx-3 pl-3 my-5"
        />
        <button type="submit" className="cursor-pointer">
          Submit
        </button>
      </form>
      <div>
        <h1>
          Already Registered?
          <span className="cursor-pointer">
            <Link to={"/login"}>Login Here</Link>
          </span>
        </h1>
      </div>
    </>
  );
}

export default Register;