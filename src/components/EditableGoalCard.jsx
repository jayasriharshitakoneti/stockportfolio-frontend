import React, { useState } from "react";
import axios from "axios";

const EditableGoalCard = ({ goal, onGoalUpdated }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    goal_name: goal.goal_name,
    target_amount: goal.target_amount,
    target_date: goal.target_date,
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const save = async () => {
    try {
      await axios.post("http://localhost:8080/goal", {
        user_id: localStorage.getItem("userId"),
        ...form,
      });
      setMessage("Goal updated!");
      setIsEditing(false);
      onGoalUpdated();
    } catch (err) {
      setMessage("Update failed.");
    }
  };

  const remove = async () => {
    if (!window.confirm("Are you sure you want to delete this goal?")) return;
    try {
      await axios.delete(`http://localhost:8080/goal/${goal.goal_id}`);
      onGoalUpdated();
    } catch {
      setMessage("Delete failed.");
    }
  };

  return (
    <div style={styles.card}>
      {isEditing ? (
        <>
          <input
            name="goal_name"
            value={form.goal_name}
            onChange={handleChange}
          />
          <input
            name="target_amount"
            type="number"
            value={form.target_amount}
            onChange={handleChange}
          />
          <input
            name="target_date"
            type="date"
            value={form.target_date}
            onChange={handleChange}
          />
          <button onClick={save}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </>
      ) : (
        <>
          <strong>{goal.goal_name}</strong> - Target: ${goal.target_amount} by{" "}
          {goal.target_date}
          <br />
          <br />
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={remove}>Delete</button>
        </>
      )}
      {message && <p style={{ fontSize: "13px" }}>{message}</p>}
    </div>
  );
};

const styles = {
  card: {
    background: "#f7f9fa",
    padding: "12px",
    borderLeft: "4px solid #2980b9",
    borderRadius: "6px",
    marginTop: "10px",
  },
};

export default EditableGoalCard;
