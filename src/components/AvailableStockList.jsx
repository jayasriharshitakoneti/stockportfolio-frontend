import React, { useEffect, useState } from "react";
import axios from "axios";
import { ListGroup, Button, Container } from "react-bootstrap";

const AvailableStockList = ({ onAdded }) => {
  const [stocks, setStocks] = useState([]);
  const user_id = localStorage.getItem("userId");

  useEffect(() => {
    const load = async () => {
      const res = await axios.get("http://localhost:8080/stock/all");
      setStocks(res.data);
    };
    load();
  }, []);

  const addToWatchlist = async (stock_id) => {
    try {
      await axios.post("http://localhost:8080/watchlist/add", {
        user_id,
        stock_id,
      });
      alert("✅ Added to watchlist!");
      onAdded();
    } catch (err) {
      alert("❌ Failed to add: " + (err.response?.data?.error || "Unknown"));
    }
  };

  return (
    <Container style={{ marginTop: "20px" }}>
      <h3>📘 Available Stocks</h3>
      <ListGroup>
        {stocks.map((s) => (
          <ListGroup.Item
            key={s.stock_id}
            className="d-flex justify-content-between align-items-center"
          >
            <span>
              <strong>{s.symbol}</strong> – {s.company_name} (${s.current_value}
              )
            </span>
            <Button
              variant="primary"
              onClick={() => addToWatchlist(s.stock_id)}
            >
              ➕ Add
            </Button>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

export default AvailableStockList;
