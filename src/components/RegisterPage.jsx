import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    secret: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const submit = async () => {
    if (!form.firstname || !form.lastname || !form.email || !form.secret) {
      setError("All fields are required");
      return;
    }

    try {
      console.log("Form data:", form); // Debugging line
      await axios.post("http://localhost:8080/register", form);
      alert("Registered successfully!");
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.error || "Registration failed");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto" }}>
      <h2>Investor Registration</h2>
      {["firstname", "lastname", "email", "secret"].map((field) => (
        <div key={field}>
          <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
          <input
            type={field === "secret" ? "password" : "text"}
            name={field}
            value={form[field]}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
          />
        </div>
      ))}
      {error && <div style={{ color: "red" }}>{error}</div>}
      <button onClick={submit} style={{ padding: "10px 20px" }}>
        Register
      </button>
    </div>
  );
};

export default RegisterPage;
