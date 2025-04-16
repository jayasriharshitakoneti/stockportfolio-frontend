import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Alert, Container } from "react-bootstrap";

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
      setMessage("" + (err.response?.data?.error || "Failed to create"));
    }
  };

  return (
    <Container style={{ marginTop: "20px" }}>
      <Form>
        <Form.Group className="mb-3" controlId="formPortfolioName">
          <Form.Label>Portfolio Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter portfolio name"
            value={portfolio_name}
            onChange={(e) => setPortfolioName(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" onClick={submit}>
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
