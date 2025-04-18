import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import axios from "axios";

const AddExchangeForm = ({ onClose, onExchangeAdded }) => {
  const [form, setForm] = useState({
    name: "",
    country: "",
    timezone: "",
    opening_time: "",
    closing_time: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setMessage("");
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/admin/add-exchange", form);
      setMessage("Stock Exchange added!");
      onExchangeAdded(); // Refresh the exchange list
      onClose(); // Close the modal
    } catch (err) {
      const msg = err.response?.data?.error || "Failed to create";

      if (msg.toLowerCase().includes("duplicate")) {
        setMessage("You already have a stock exchange with this name.");
      } else if (msg.toLowerCase().includes("check constraint")) {
        setMessage("Closing time must be after opening time.");
      } else {
        setMessage("Error: " + msg);
      }
    }
  };

  return (
    <Form onSubmit={submit}>
      <Form.Group className="mb-3" controlId="formExchangeName">
        <Form.Label>Exchange Name</Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Enter exchange name"
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formCountry">
        <Form.Label>Country</Form.Label>
        <Form.Control
          type="text"
          name="country"
          value={form.country}
          onChange={handleChange}
          placeholder="Enter country"
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formTimezone">
        <Form.Label>Timezone</Form.Label>
        <Form.Control
          type="text"
          name="timezone"
          value={form.timezone}
          onChange={handleChange}
          placeholder="Enter timezone"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formOpeningTime">
        <Form.Label>Opening Time</Form.Label>
        <Form.Control
          type="time"
          name="opening_time"
          value={form.opening_time}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formClosingTime">
        <Form.Label>Closing Time</Form.Label>
        <Form.Control
          type="time"
          name="closing_time"
          value={form.closing_time}
          onChange={handleChange}
          required
        />
      </Form.Group>

      {message && (
        <Alert
          variant={
            message.startsWith("Stock Exchange added!") ? "success" : "danger"
          }
        >
          {message}
        </Alert>
      )}

      <div className="d-flex justify-content-end">
        <Button variant="secondary" onClick={onClose} className="me-2">
          Cancel
        </Button>
        <Button variant="primary" type="submit">
          Add Exchange
        </Button>
      </div>
    </Form>
  );
};

export default AddExchangeForm;
