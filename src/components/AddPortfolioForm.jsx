import React, { useState } from "react";
import axios from "axios";

const AddPortfolioForm = ({ onAdded }) => {
  const user_id = localStorage.getItem("userId");
  const [portfolio_name, setPortfolioName] = useState("");
  const [message, setMessage] = useState("");

  const submit = async () => {
    if (!portfolio_name) {
      setMessage("Portfolio name cannot be empty");
      return;
    }
    try {
      await axios.post("http://localhost:8080/portfolio", {
        user_id,
        portfolio_name,
      });
      setMessage("Portfolio created!");
      setPortfolioName("");
      onAdded();
    } catch (err) {
      setMessage(err.response?.data?.error || "Failed to create");
    }
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <h3>Add Portfolio</h3>
      <input
        type="text"
        placeholder="Portfolio Name"
        value={portfolio_name}
        onChange={(e) => setPortfolioName(e.target.value)}
      />
      <button onClick={submit}>Create</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AddPortfolioForm;
