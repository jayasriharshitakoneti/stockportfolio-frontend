import React, { useState } from "react";
import axios from "axios";

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
      setMessage("✅ Trade executed!");
      onTrade(); // Refresh dashboard
    } catch (err) {
      setMessage(
        "❌ Failed: " + (err.response?.data?.error || "Unknown error")
      );
    }
  };

  return (
    <div style={styles.formBox}>
      <h4>Trade {symbol}</h4>
      <select
        name="portfolio_id"
        value={form.portfolio_id}
        onChange={handleChange}
      >
        {portfolios.map((p) => (
          <option key={p.portfolio_id} value={p.portfolio_id}>
            {p.portfolio_name}
          </option>
        ))}
      </select>
      <select
        name="buy_or_sell"
        value={form.buy_or_sell}
        onChange={handleChange}
      >
        <option value="BUY">Buy</option>
        <option value="SELL">Sell</option>
      </select>
      <input
        type="number"
        name="quantity"
        min="1"
        value={form.quantity}
        onChange={handleChange}
        placeholder="Quantity"
      />
      <select name="order_type" value={form.order_type} onChange={handleChange}>
        <option value="MARKET">Market</option>
        <option value="LIMIT">Limit</option>
        <option value="STOP">Stop</option>
        <option value="STOP_LIMIT">Stop-Limit</option>
      </select>
      <input
        name="transaction_mode"
        value={form.transaction_mode}
        onChange={handleChange}
        placeholder="Transaction Mode"
      />
      <button onClick={submit}>💸 Execute</button>
      {message && <p style={{ marginTop: "8px" }}>{message}</p>}
    </div>
  );
};

const styles = {
  formBox: {
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    marginTop: "10px",
    background: "#f9f9f9",
  },
};

export default TradeStockForm;
