import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Alert, Container } from "react-bootstrap";

const AddGoalForm = ({ onGoalAdded }) => {
  const user_id = localStorage.getItem("userId");
  const [goal_name, setGoalName] = useState("");
  const [target_amount, setTargetAmount] = useState("");
  const [target_date, setTargetDate] = useState("");
  const [message, setMessage] = useState("");

  const submitGoal = async (e) => {
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
      setMessage("Goal saved!");
      setGoalName("");
      setTargetAmount("");
      setTargetDate("");
      onGoalAdded();
    } catch (err) {
      setMessage(err.response?.data?.error || "Failed to save goal.");
    }
  };

  return (
    <Container style={{ marginTop: "20px" }}>
      <Form onSubmit={submitGoal}>
        <Form.Group className="mb-3" controlId="formGoalName">
          <Form.Label>Goal Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter goal name"
            value={goal_name}
            onChange={(e) => setGoalName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formTargetAmount">
          <Form.Label>Target Amount</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter target amount"
            value={target_amount}
            onChange={(e) => setTargetAmount(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formTargetDate">
          <Form.Label>Target Date</Form.Label>
          <Form.Control
            type="date"
            value={target_date}
            onChange={(e) => setTargetDate(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Save Goal
        </Button>
      </Form>
      {message && (
        <Alert
          variant={message.startsWith("Goal saved!") ? "success" : "danger"}
          className="mt-3"
        >
          {message}
        </Alert>
      )}
    </Container>
  );
};

export default AddGoalForm;
