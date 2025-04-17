import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Alert, Container } from "react-bootstrap";

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

  const save = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/preferences", {
        user_id: localStorage.getItem("userId"),
        preferred_sector,
        preferred_risk_level,
        notification_enabled,
      });
      setMessage("Preferences saved!");
      onUpdate();
    } catch {
      setMessage("Failed to save.");
    }
  };

  return (
    <Container style={{ marginTop: "20px" }}>
      <h3>Update Preferences</h3>
      <Form onSubmit={save}>
        <Form.Group className="mb-3" controlId="formPreferredSector">
          <Form.Label>Preferred Sector</Form.Label>
          <Form.Control
            type="text"
            value={preferred_sector}
            onChange={(e) => setSector(e.target.value)}
            placeholder="Enter preferred sector"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formRiskLevel">
          <Form.Label>Risk Level</Form.Label>
          <Form.Select
            value={preferred_risk_level}
            onChange={(e) => setRisk(e.target.value)}
          >
            <option value="">-- Select Risk Level --</option>
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formNotifications">
          <Form.Check
            type="checkbox"
            label="Enable Notifications"
            checked={notification_enabled}
            onChange={(e) => setNotify(e.target.checked)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Save Preferences
        </Button>
      </Form>

      {message && (
        <Alert
          variant={
            message.startsWith("Preferences saved!") ? "success" : "danger"
          }
          className="mt-3"
        >
          {message}
        </Alert>
      )}
    </Container>
  );
};

export default PreferencesForm;
