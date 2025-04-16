import React, { useEffect, useState } from "react";
import SectorChart from "./SectorChart";
import AddGoalForm from "./AddGoalForm";
import EditableGoalCard from "./EditableGoalCard";
import PreferencesForm from "./PreferencesForm";
import TradeStockForm from "./TradeStockForm";
import AvailableStockList from "./AvailableStockList";
import AddPortfolioForm from "./AddPortfolioForm";
import NewsFeed from "./NewsFeed";

import axios from "axios";

const DashboardPage = () => {
  const [data, setData] = useState(null);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const loadDashboard = async () => {
      const response = await axios.get("http://localhost:8080/user/dashboard", {
        params: { userId },
      });
      setData(response.data);
    };
    loadDashboard();
  }, []);

  if (!data) return <p style={{ padding: "30px" }}>Loading...</p>;

  const { userInfo, preferences, goals, portfolios, holdings, watchlist } =
    data;

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Investor Dashboard</h1>
      {/*Profile Section */}
      <section style={styles.card}>
        <h2>
          Welcome, {userInfo.firstname} {userInfo.lastname}
        </h2>
        <p>Email: {userInfo.email}</p>
        <p>
          KYC Status:{" "}
          <span style={styles.kyc(userInfo.is_kyc_done)}>
            {userInfo.is_kyc_done ? "Done" : "Pending"}
          </span>
        </p>
      </section>
      {/*Preferences */}
      <section style={styles.card}>
        <h2>Preferences</h2>
        <p>Preferred Sector: {preferences?.preferred_sector || "N/A"}</p>
        <p>Risk Level: {preferences?.preferred_risk_level || "N/A"}</p>
        <p>
          Notifications:{" "}
          {preferences?.notification_enabled ? "Enabled" : "Disabled"}
        </p>
        <PreferencesForm
          current={preferences}
          onUpdate={() => window.location.reload()}
        />
      </section>

      {/*Goals */}
      <section style={styles.card}>
        <h2>Investment Goals</h2>
        {goals?.map((goal) => (
          <EditableGoalCard
            key={goal.goal_id}
            goal={goal}
            onGoalUpdated={() => window.location.reload()}
          />
        ))}
        <AddGoalForm onGoalAdded={() => window.location.reload()} />
      </section>

      <section style={styles.card}>
        <h2>Watchlist</h2>
        {watchlist?.length ? (
          <ul>
            {watchlist.map((stock) => (
              <li key={stock.stock_id}>
                <strong>{stock.symbol}</strong> – {stock.company_name} ($
                {stock.current_value})
                <button
                  style={styles.removeBtn}
                  onClick={async () => {
                    try {
                      await axios.post(
                        "http://localhost:8080/watchlist/remove",
                        {
                          user_id: userId,
                          stock_id: stock.stock_id,
                        }
                      );
                      window.location.reload();
                    } catch {
                      alert("Failed to remove");
                    }
                  }}
                >
                  Remove
                </button>
                <TradeStockForm
                  stockId={stock.stock_id}
                  symbol={stock.symbol}
                  portfolios={portfolios}
                  onTrade={() => window.location.reload()}
                />
              </li>
            ))}
          </ul>
        ) : (
          <p>No stocks in watchlist.</p>
        )}
      </section>

      {/*Portfolios */}
      <section style={styles.card}>
        <h2>Portfolios</h2>
        <AddPortfolioForm onAdded={() => window.location.reload()} />

        {portfolios?.map((p) => (
          <div key={p.portfolio_id} style={styles.subCard}>
            <strong>{p.portfolio_name}</strong> (ID: {p.portfolio_id}) –
            Created: {new Date(p.created_date).toDateString()}
            <ul>
              {holdings
                .filter((h) => h.portfolio_id === p.portfolio_id)
                .map((h) => (
                  <li key={h.stock_id}>
                    {h.symbol} – {h.company_name}
                    <br />
                    Shares: {h.shares_owned}, Avg Price: $
                    {h.stock_average_price}, Current Value: ${h.current_value} →{" "}
                    <strong>Total: ${h.total_value}</strong>
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </section>
      {console.log(holdings)}
      {/*Sector Breakdown */}
      {holdings?.length > 0 && <SectorChart holdings={holdings} />}
      <AvailableStockList onAdded={() => window.location.reload()} />
      <NewsFeed userId={userId} />
    </div>
  );
};

const styles = {
  removeBtn: {
    marginLeft: "10px",
    background: "#e74c3c",
    color: "white",
    border: "none",
    padding: "5px 10px",
    borderRadius: "6px",
    cursor: "pointer",
  },
  container: {
    maxWidth: "1000px",
    margin: "0 auto",
    padding: "40px",
    fontFamily: "Segoe UI, sans-serif",
    color: "#2c3e50",
  },
  heading: {
    marginBottom: "30px",
    fontSize: "32px",
    textAlign: "center",
    color: "#34495e",
  },
  card: {
    background: "#fff",
    padding: "20px 25px",
    borderRadius: "10px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    marginBottom: "30px",
  },
  subCard: {
    padding: "10px 15px",
    margin: "10px 0",
    background: "#f7f9fa",
    borderRadius: "8px",
    borderLeft: "4px solid #3498db",
  },
  kyc: (done) => ({
    color: done ? "green" : "crimson",
    fontWeight: "bold",
  }),
};

export default DashboardPage;
