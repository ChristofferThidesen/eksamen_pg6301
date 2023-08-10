import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const ManagerLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/auth/manager/login", {
        username,
        password,
      });

      setMessage(response.data.message);

      if (response.data.message === "Login successful") {
        console.log(response.data);
        navigate("/managerPage"); // Replace with the desired manager dashboard route
      }
    } catch (error) {
      setMessage("Invalid credentials");
    }
  };

  return (
    <div>
      <h2>Manager Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <p>{message}</p>
      <Link to="/">
        <button>Back</button>
      </Link>
    </div>
  );
};

export default ManagerLogin;
