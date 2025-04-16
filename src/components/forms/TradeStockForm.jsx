import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Alert, Container } from "react-bootstrap";

const TradeStockForm = ({ portfolios, stockId, symbol, onTrade }) => {
  const user_id = localStorage.getItem("userId");
  const [form, setForm] = useState({
    portfolio_id: portfolios?.[0]?.portfolio_id || "",
    buy_or_sell: "BUY",
    quantity: 1,
    order_type: "MARKET",
    transaction_mode: "Online",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async () => {
    try {
      await axios.post("http://localhost:8080/trade", {
        ...form,
        user_id,
        stock_id: stockId,
      });
      setMessage("Trade executed!");
      onTrade();
    } catch (err) {
      setMessage("Failed: " + (err.response?.data?.error || "Unknown error"));
    }
  };

  return (
    <Container style={styles.formBox}>
      <h4>Trade {symbol}</h4>
      <Form>
        <Form.Group className="mb-3" controlId="formPortfolio">
          <Form.Label>Portfolio</Form.Label>
          <Form.Select
            name="portfolio_id"
            value={form.portfolio_id}
            onChange={handleChange}
          >
            {portfolios.map((p) => (
              <option key={p.portfolio_id} value={p.portfolio_id}>
                {p.portfolio_name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBuyOrSell">
          <Form.Label>Action</Form.Label>
          <Form.Select
            name="buy_or_sell"
            value={form.buy_or_sell}
            onChange={handleChange}
          >
            <option value="BUY">Buy</option>
            <option value="SELL">Sell</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formQuantity">
          <Form.Label>Quantity</Form.Label>
          <Form.Control
            type="number"
            name="quantity"
            min="1"
            value={form.quantity}
            onChange={handleChange}
            placeholder="Enter quantity"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formOrderType">
          <Form.Label>Order Type</Form.Label>
          <Form.Select
            name="order_type"
            value={form.order_type}
            onChange={handleChange}
          >
            <option value="MARKET">Market</option>
            <option value="LIMIT">Limit</option>
            <option value="STOP">Stop</option>
            <option value="STOP_LIMIT">Stop-Limit</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formTransactionMode">
          <Form.Label>Transaction Mode</Form.Label>
          <Form.Control
            type="text"
            name="transaction_mode"
            value={form.transaction_mode}
            onChange={handleChange}
            placeholder="Enter transaction mode"
          />
        </Form.Group>

        <Button variant="primary" onClick={submit}>
          💸 Execute
        </Button>
      </Form>

      {message && (
        <Alert
          variant={message.startsWith("Trade executed!") ? "success" : "danger"}
          className="mt-3"
        >
          {message}
        </Alert>
      )}
    </Container>
  );
};

const styles = {
  formBox: {
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    marginTop: "10px",
    background: "#f9f9f9",
  },
};

export default TradeStockForm;
