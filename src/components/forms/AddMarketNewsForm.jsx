import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import axios from "axios";

const AddMarketNewsForm = ({ onClose, onNewsAdded }) => {
  const [form, setForm] = useState({
    stock_id: "",
    headline: "",
    news_source: "",
    impact_score: "",
  });

  const [error, setError] = useState("");

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
      return "Impact score must be between 0 and 100";
    }

    return "";
  };

  const submit = async (e) => {
    e.preventDefault();
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      await axios.post("http://localhost:8080/admin/add-market-news", form);
      onNewsAdded();
      onClose();
    } catch (err) {
      setError("Error: " + (err.response?.data?.error || "Server error"));
    }
  };

  return (
    <Container>
      <h2 className="mb-4">Add Market News</h2>
      <Form onSubmit={submit}>
        <Form.Group className="mb-3">
          <Form.Label>Stock ID</Form.Label>
          <Form.Control
            type="number"
            name="stock_id"
            value={form.stock_id}
            onChange={handleChange}
            placeholder="Enter stock ID"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Headline</Form.Label>
          <Form.Control
            type="text"
            name="headline"
            value={form.headline}
            onChange={handleChange}
            placeholder="Enter headline"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>News Source</Form.Label>
          <Form.Control
            type="text"
            name="news_source"
            value={form.news_source}
            onChange={handleChange}
            placeholder="Enter source"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Impact Score</Form.Label>
          <Form.Control
            type="number"
            name="impact_score"
            value={form.impact_score}
            onChange={handleChange}
            placeholder="0-100"
            required
          />
        </Form.Group>

        {error && (
          <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>
        )}

        <div className="d-flex justify-content-end">
          <Button variant="secondary" onClick={onClose} className="me-2">
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default AddMarketNewsForm;
