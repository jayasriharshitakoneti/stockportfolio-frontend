import React, { useState } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import axios from "axios";

const EditableGoalCard = ({ goal }) => {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ ...goal });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const save = async (e) => {
    e.preventDefault();
    const user_id = localStorage.getItem("userId");
    if (!user_id) {
      alert("User not logged in");
      return;
    }

    try {
      await axios.put("http://localhost:8080/goal", {
        ...form,
        user_id, // ✅ required by backend
      });
      setEditing(false);
    } catch (err) {
      alert("Failed to update goal: " + err.response?.data?.error);
    }
  };

  const deleteGoal = async () => {
    if (!window.confirm("Are you sure you want to delete this goal?")) return;
    try {
      await axios.delete(`http://localhost:8080/goal/${goal.goal_id}`);
    } catch (err) {
      alert("Failed to delete goal: " + err.response?.data?.error);
    }
  };

  return (
    <div className="mb-3 border p-3 rounded bg-light">
      {editing ? (
        <Form onSubmit={save}>
          <Row>
            <Col md={6}>
              <Form.Label>Goal Name</Form.Label>
              <Form.Control
                name="goal_name"
                value={form.goal_name}
                className="mb-2"
                readOnly
                disabled
              />
            </Col>
            <Col md={3}>
              <Form.Label>Target Amount</Form.Label>
              <Form.Control
                name="target_amount"
                value={form.target_amount}
                type="number"
                onChange={handleChange}
                className="mb-2"
              />
            </Col>
            <Col md={3}>
              <Form.Label>Target Date</Form.Label>
              <Form.Control
                name="target_date"
                type="date"
                value={form.target_date}
                onChange={handleChange}
                className="mb-2"
              />
            </Col>
            <Col md={3}>
              <Button variant="success" type="submit" className="me-2">
                Save
              </Button>
              <Button variant="secondary" onClick={() => setEditing(false)}>
                Cancel
              </Button>
            </Col>
          </Row>
        </Form>
      ) : (
        <>
          <strong>{goal.goal_name}</strong> - Target: ${goal.target_amount} by{" "}
          {goal.target_date}
          <div className="mt-2">
            <Button
              variant="warning"
              size="sm"
              onClick={() => setEditing(true)}
              className="me-2"
            >
              Edit
            </Button>
            <Button variant="danger" size="sm" onClick={deleteGoal}>
              Delete
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default EditableGoalCard;
