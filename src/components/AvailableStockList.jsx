import React, { useEffect, useState } from "react";
import axios from "axios";

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
      alert("❌ Failed to add: " + err.response?.data?.error || "Unknown");
    }
  };

  return (
    <div style={styles.container}>
      <h3>📘 Available Stocks</h3>
      <ul>
        {stocks.map((s) => (
          <li key={s.stock_id} style={styles.item}>
            <span>
              <strong>{s.symbol}</strong> – {s.company_name} (${s.current_value}
              )
            </span>
            <button
              onClick={() => addToWatchlist(s.stock_id)}
              style={styles.button}
            >
              ➕ Add
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const styles = {
  container: { marginTop: "20px" },
  item: { display: "flex", justifyContent: "space-between", margin: "8px 0" },
  button: {
    background: "#3498db",
    color: "#fff",
    padding: "4px 8px",
    border: "none",
    borderRadius: "4px",
  },
};

export default AvailableStockList;
