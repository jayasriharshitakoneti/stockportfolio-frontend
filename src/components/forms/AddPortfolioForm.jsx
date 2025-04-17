import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Alert, Container } from "react-bootstrap";

const AddPortfolioForm = ({ onAdded }) => {
  const user_id = localStorage.getItem("userId");
  const [portfolio_name, setPortfolioName] = useState("");
  const [message, setMessage] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    if (!portfolio_name) {
      setMessage("Portfolio name cannot be empty");
      return;
    }
    try {
      await axios.post("http://localhost:8080/portfolio", {
        user_id,
        portfolio_name,
      });
      alert("Portfolio created!");
      setPortfolioName("");
      onAdded();
    } catch (err) {
      const msg = err.response?.data?.error || "Failed to create";

      if (msg.toLowerCase().includes("duplicate")) {
        setMessage("You already have a portfolio with this name.");
      } else if (msg.toLowerCase().includes("foreign key")) {
        setMessage("Invalid user. Please log in again.");
      } else {
        setMessage("Error: " + msg);
      }
    }
  };

  return (
    <Container style={{ marginTop: "20px" }}>
      <Form onSubmit={submit}>
        <Form.Group className="mb-3" controlId="formPortfolioName">
          <Form.Label>Portfolio Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter portfolio name"
            value={portfolio_name}
            onChange={(e) => setPortfolioName(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Create
        </Button>
      </Form>
      {message && (
        <Alert
          variant={
            message.startsWith("Portfolio created!") ? "success" : "danger"
          }
          className="mt-3"
        >
          {message}
        </Alert>
      )}
    </Container>
  );
};

export default AddPortfolioForm;
