import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

const AddStockForm = ({ onClose, onStockAdded }) => {
  const [form, setForm] = useState({
    symbol: "",
    company_name: "",
    current_value: "",
    sector: "",
    market_cap: "",
    volatility: "MEDIUM",
    average_return: 0,
    stock_exchange: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    if (!form.symbol || !form.company_name || !form.current_value) {
      alert("Symbol, Company Name, and Current Value are required fields.");
    }
    if (
      isNaN(form.current_value) ||
      isNaN(form.market_cap) ||
      isNaN(form.average_return)
    ) {
      alert("Current Value, Market Cap, and Average Return must be numbers.");
    }
    if (
      form.current_value <= 0 ||
      form.market_cap <= 0 ||
      form.average_return < 0
    ) {
      alert(
        "Current Value, Market Cap must be positive numbers and Average Return cannot be negative."
      );
    }
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/admin/add-stock", form);
      alert("Stock added successfully!");
      onStockAdded(); // Refresh the stock list
      onClose(); // Close the modal
    } catch (err) {
      alert("Error adding stock: " + err.response?.data?.error);
    }
  };

  return (
    <Container>
      <h2 className="mb-4">Add New Stock</h2>
      <Form onSubmit={submit}>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="symbol">
              <Form.Label>Symbol</Form.Label>
              <Form.Control
                type="text"
                name="symbol"
                value={form.symbol}
                onChange={handleChange}
                placeholder="Enter stock symbol"
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="company_name">
              <Form.Label>Company Name</Form.Label>
              <Form.Control
                type="text"
                name="company_name"
                value={form.company_name}
                onChange={handleChange}
                placeholder="Enter company name"
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="current_value">
              <Form.Label>Current Value</Form.Label>
              <Form.Control
                type="number"
                name="current_value"
                value={form.current_value}
                onChange={handleChange}
                placeholder="Enter current value"
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="market_cap">
              <Form.Label>Market Cap</Form.Label>
              <Form.Control
                type="number"
                name="market_cap"
                value={form.market_cap}
                onChange={handleChange}
                placeholder="Enter market cap"
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="sector">
              <Form.Label>Sector</Form.Label>
              <Form.Control
                type="text"
                name="sector"
                value={form.sector}
                onChange={handleChange}
                placeholder="Enter sector"
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="volatility">
              <Form.Label>Volatility</Form.Label>
              <Form.Select
                name="volatility"
                value={form.volatility}
                onChange={handleChange}
              >
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="average_return">
              <Form.Label>Average Return (%)</Form.Label>
              <Form.Control
                type="number"
                name="average_return"
                value={form.average_return}
                onChange={handleChange}
                placeholder="Enter average return"
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="stock_exchange">
              <Form.Label>Stock Exchange</Form.Label>
              <Form.Control
                type="text"
                name="stock_exchange"
                value={form.stock_exchange}
                onChange={handleChange}
                placeholder="Enter stock exchange"
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <div className="d-flex justify-content-end">
          <Button variant="secondary" onClick={onClose} className="me-2">
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Add Stock
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default AddStockForm;
