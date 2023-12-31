import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom"; // Import useNavigate and Link

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/auth/login", {
        username,
        password,
      });

      setMessage(response.data.message);

      if (response.data.message === "Login successful") {
        console.log(response.data);
        navigate("/employeePage");
      }
    } catch (error) {
      setMessage("Invalid credentials");
    }
  };

  return (
    <div>
      <h2>Login</h2>
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
      {/* Add a link to the admin login page */}
      <Link to="/managerLogin">
        <button>Manager Login</button>
      </Link>
    </div>
  );
};

export default Login;
