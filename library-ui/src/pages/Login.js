import React, { useState } from "react";
import axios from "axios";

function Login({ onLogin, onSwitch }) {

  const [userName, setUserName] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleLogin = async () => {

    try {

      const res = await axios.post(
        "https://api-gateways-api-dzh0dfebgwgkgqgq.centralindia-01.azurewebsites.net/auth/login",
        {
          userName,
          password
        }
      );

      // save JWT token
      localStorage.setItem(
        "token",
        res.data
      );

      alert("✅ Login Success");

      onLogin();

    } catch {

      alert("❌ Invalid Credentials");
    }
  };

  return (
    <div className="card">

      <h2>🔐 Login</h2>

      <input
        type="text"
        placeholder="Username"
        value={userName}
        onChange={(e) =>
          setUserName(e.target.value)
        }
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) =>
          setPassword(e.target.value)
        }
      />

      <button onClick={handleLogin}>
        Login
      </button>

      <p
        style={{
          cursor: "pointer",
          color: "cyan",
          marginTop: "15px"
        }}
        onClick={onSwitch}
      >
        Create new account
      </p>
       <p
        style={{
          cursor: "pointer",
          color: "cyan",
          marginTop: "15px"
        }}
        onClick={onSwitch}
      >
        Forgot password
      </p>

    </div>
  );
}

export default Login;