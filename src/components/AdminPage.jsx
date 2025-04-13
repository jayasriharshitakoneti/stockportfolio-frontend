import React from "react";
import { useNavigate } from "react-router-dom";

const AdminPage = () => {
  const navigate = useNavigate();

  const goToAddStock = () => {
    navigate("/admin/add-stock");
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Admin Dashboard</h1>
      <p style={styles.text}>Welcome, Admin! Choose an action:</p>

      <button onClick={goToAddStock} style={styles.button}>
        Add New Stock
      </button>

      <button
        onClick={() => navigate("/admin/add-exchange")}
        style={styles.button}
      >
        Add Stock Exchange
      </button>
      <button
        onClick={() => navigate("/admin/update-kyc")}
        style={styles.button}
      >
        Update KYC Status
      </button>
      <button
        onClick={() => navigate("/admin/update-price-history")}
        style={styles.button}
      >
        Update Stock Price History
      </button>
      <button
        onClick={() => navigate("/admin/add-market-news")}
        style={styles.button}
      >
        Add Market News
      </button>
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    padding: "60px",
    fontFamily: "Segoe UI, sans-serif",
  },
  heading: {
    fontSize: "32px",
    marginBottom: "20px",
  },
  text: {
    fontSize: "18px",
    marginBottom: "30px",
  },
  button: {
    padding: "12px 24px",
    fontSize: "16px",
    backgroundColor: "#2575fc",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "background 0.3s ease",
  },
};

export default AdminPage;
