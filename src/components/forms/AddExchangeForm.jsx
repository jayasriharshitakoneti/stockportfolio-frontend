import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddExchangeForm = () => {
  const [form, setForm] = useState({
    name: "",
    country: "",
    timezone: "",
    opening_time: "",
    closing_time: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async () => {
    try {
      await axios.post("http://localhost:8080/admin/add-exchange", form);
      alert("Stock Exchange added!");
      navigate("/admin");
    } catch (err) {
      alert("Error: " + err.response?.data?.error);
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "auto" }}>
      <h2>Add Stock Exchange</h2>
      {Object.entries(form).map(([key, value]) => (
        <div key={key}>
          <label>{key.replace(/_/g, " ")}</label>
          <input
            type={
              key === "opening_time" || key === "closing_time" ? "time" : "text"
            }
            name={key}
            value={value}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
          />
        </div>
      ))}
      <button onClick={submit} style={{ padding: "10px 20px" }}>
        Add Exchange
      </button>
      <button
        onClick={() => {
          navigate("/admin");
        }}
      >
        Back
      </button>
    </div>
  );
};

export default AddExchangeForm;
