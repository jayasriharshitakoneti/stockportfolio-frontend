import React, { useState } from "react";
import axios from "axios";

const AddGoalForm = ({ onGoalAdded }) => {
  const user_id = localStorage.getItem("userId");
  const [goal_name, setGoalName] = useState("");
  const [target_amount, setTargetAmount] = useState("");
  const [target_date, setTargetDate] = useState("");
  const [message, setMessage] = useState("");

  const submitGoal = async () => {
    if (!goal_name || !target_amount || !target_date) {
      setMessage("All fields are required.");
      return;
    }

    try {
      await axios.post("http://localhost:8080/goal", {
        user_id,
        goal_name,
        target_amount,
        target_date,
      });
      setMessage("✅ Goal saved!");
      setGoalName("");
      setTargetAmount("");
      setTargetDate("");
      onGoalAdded(); // Refresh dashboard
    } catch (err) {
      setMessage(err.response?.data?.error || "Failed to save goal.");
    }
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <h3>Add / Update Goal</h3>
      <input
        type="text"
        placeholder="Goal name"
        value={goal_name}
        onChange={(e) => setGoalName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Target amount"
        value={target_amount}
        onChange={(e) => setTargetAmount(e.target.value)}
      />
      <input
        type="date"
        value={target_date}
        onChange={(e) => setTargetDate(e.target.value)}
      />
      <button onClick={submitGoal}>Save Goal</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AddGoalForm;
