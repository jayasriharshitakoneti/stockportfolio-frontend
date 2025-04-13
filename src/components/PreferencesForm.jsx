import React, { useState } from "react";
import axios from "axios";

const PreferencesForm = ({ current, onUpdate }) => {
  const [preferred_sector, setSector] = useState(
    current?.preferred_sector || ""
  );
  const [preferred_risk_level, setRisk] = useState(
    current?.preferred_risk_level || ""
  );
  const [notification_enabled, setNotify] = useState(
    current?.notification_enabled || false
  );
  const [message, setMessage] = useState("");

  const save = async () => {
    try {
      await axios.post("http://localhost:8080/preferences", {
        user_id: localStorage.getItem("userId"),
        preferred_sector,
        preferred_risk_level,
        notification_enabled,
      });
      setMessage("✅ Preferences saved!");
      onUpdate(); // Refresh data
    } catch {
      setMessage("❌ Failed to save.");
    }
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <h3>Update Preferences</h3>
      <input
        type="text"
        value={preferred_sector}
        onChange={(e) => setSector(e.target.value)}
        placeholder="Preferred Sector"
      />
      <select
        value={preferred_risk_level}
        onChange={(e) => setRisk(e.target.value)}
      >
        <option value="">-- Select Risk Level --</option>
        <option value="LOW">Low</option>
        <option value="MEDIUM">Medium</option>
        <option value="HIGH">High</option>
      </select>
      <label style={{ display: "block", margin: "10px 0" }}>
        <input
          type="checkbox"
          checked={notification_enabled}
          onChange={(e) => setNotify(e.target.checked)}
        />{" "}
        Enable Notifications
      </label>
      <button onClick={save}>💾 Save Preferences</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default PreferencesForm;
