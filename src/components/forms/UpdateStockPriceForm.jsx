import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UpdateStockPriceForm = () => {
  const [form, setForm] = useState({
    stock_id: "",
    opening_price: "",
    closing_price: "",
    highest_price: "",
    lowest_price: "",
    adjusted_close: "",
    volume: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const isNumeric = (value) => !isNaN(parseFloat(value)) && isFinite(value);

  const validate = () => {
    const prices = [
      "opening_price",
      "closing_price",
      "highest_price",
      "lowest_price",
      "adjusted_close",
    ];

    for (const key of prices) {
      if (!isNumeric(form[key])) {
        return `${key.replace(/_/g, " ")} must be a valid number`;
      }
    }

    if (!form.stock_id || !form.volume)
      return "Stock ID and volume are required";
    if (!isNumeric(form.volume)) return "Volume must be a valid number";

    const o = parseFloat(form.opening_price);
    const c = parseFloat(form.closing_price);
    const h = parseFloat(form.highest_price);
    const l = parseFloat(form.lowest_price);

    if (h < o || h < c || h < l)
      return "Highest price must be greater than or equal to opening, closing, and lowest prices";
    if (l > o || l > c || l > h)
      return "Lowest price must be less than or equal to opening, closing, and highest prices";

    return "";
  };

  const submit = async () => {
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      await axios.put("http://localhost:8080/admin/update-price-history", form);
      alert("Stock price history updated!");
      navigate("/admin");
    } catch (err) {
      setError("Error: " + (err.response?.data?.error || "Server error"));
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto" }}>
      <h2>Update Stock Price History</h2>
      {Object.entries(form).map(([key, value]) => (
        <div key={key}>
          <label>{key.replace(/_/g, " ")}</label>
          <input
            type={["stock_id", "volume"].includes(key) ? "number" : "text"}
            name={key}
            value={value}
            onChange={handleChange}
            style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
          />
        </div>
      ))}
      {error && (
        <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>
      )}
      <button onClick={submit} style={{ padding: "10px 20px" }}>
        Submit
      </button>
    </div>
  );
};

export default UpdateStockPriceForm;
