import React, { useState } from "react";
import axios from "axios";

function Register({ onSwitch }) {

  const [userName, setUserName] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleRegister = async () => {

    try {

      await axios.post(
        "http://localhost:5291/api/auth/register",
        {
          userName,
          password
        }
      );

      alert("✅ Registration Successful");

      onSwitch();

    } catch {

      alert("❌ Registration Failed");
    }
  };

  return (
    <div className="card">

      <h2>📝 Register</h2>

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

      <button onClick={handleRegister}>
        Register
      </button>

      <p
        style={{
          cursor: "pointer",
          color: "cyan",
          marginTop: "15px"
        }}
        onClick={onSwitch}
      >
        Already have an account? Login
      </p>

    </div>
  );
}

export default Register;