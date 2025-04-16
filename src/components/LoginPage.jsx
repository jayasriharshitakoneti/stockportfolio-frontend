import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  const login = async () => {
    try {
      const response = await axios.post("http://localhost:8080/login", null, {
        params: { email, password },
      });

      const { userId, lastName, role } = response.data;
      setMessage(`Welcome, ${lastName}! Your User ID is ${userId}.`);

      localStorage.setItem("userId", userId);
      localStorage.setItem("role", role);

      if (role === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      setMessage(err.response?.data?.error || "Login failed.");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.heading}>Investor Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />
        <button onClick={login} style={styles.button}>
          Sign In
        </button>
        {message && <p style={styles.message}>{message}</p>}
      </div>
    </div>
  );
};

const styles = {
  page: {
    height: "100vh",
    width: "100vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(to right, #6a11cb, #2575fc)",
    fontFamily: "'Segoe UI', sans-serif",
  },
  card: {
    backgroundColor: "#fff",
    padding: "40px",
    borderRadius: "16px",
    boxShadow: "0 12px 24px rgba(0, 0, 0, 0.1)",
    width: "100%",
    maxWidth: "400px",
    textAlign: "center",
  },
  heading: {
    marginBottom: "25px",
    fontSize: "24px",
    color: "#333",
  },
  input: {
    width: "100%",
    padding: "12px 15px",
    margin: "10px 0",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "16px",
    outline: "none",
    backgroundColor: "#2c2c2c",
    color: "#fff",
  },
  button: {
    width: "100%",
    padding: "12px 15px",
    marginTop: "20px",
    backgroundColor: "#2575fc",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  message: {
    marginTop: "20px",
    fontSize: "14px",
    color: "#333",
  },
};

export default LoginPage;
