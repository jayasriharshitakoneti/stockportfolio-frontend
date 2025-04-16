import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddMarketNewsForm = () => {
  const [form, setForm] = useState({
    stock_id: "",
    headline: "",
    news_source: "",
    impact_score: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const validate = () => {
    const score = parseInt(form.impact_score);

    if (
      !form.stock_id ||
      !form.headline ||
      !form.news_source ||
      !form.impact_score
    ) {
      return "All fields are required";
    }

    if (isNaN(score) || score < 0 || score > 100) {
      return "Impact score must be a number between 0 and 100";
    }

    return "";
  };

  const submit = async () => {
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      await axios.post("http://localhost:8080/admin/add-market-news", form);
      alert("Market news added!");
      navigate("/admin");
    } catch (err) {
      setError("Error: " + (err.response?.data?.error || "Server error"));
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "auto" }}>
      <h2>Add Market News</h2>
      {["stock_id", "headline", "news_source", "impact_score"].map((field) => (
        <div key={field}>
          <label>{field.replace(/_/g, " ")}</label>
          <input
            type={
              field === "impact_score" || field === "stock_id"
                ? "number"
                : "text"
            }
            name={field}
            value={form[field]}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
          />
        </div>
      ))}
      {error && (
        <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>
      )}
      <button onClick={submit} style={{ padding: "10px 20px" }}>
        Submit
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

export default AddMarketNewsForm;
