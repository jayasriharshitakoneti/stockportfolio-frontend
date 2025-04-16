import React, { useEffect, useState } from "react";
import SectorChart from "./charts/SectorChart";
import AddGoalForm from "./forms/AddGoalForm";
import EditableGoalCard from "./EditableGoalCard";
import PreferencesForm from "./forms/PreferencesForm";
import TradeStockForm from "./forms/TradeStockForm";
import AvailableStockList from "./AvailableStockList";
import AddPortfolioForm from "./AddPortfolioForm";
import NewsFeed from "./NewsFeed";

import axios from "axios";
import { Container, Card, Button, ListGroup, Alert } from "react-bootstrap";

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
    <Container className="mt-4">
      <h1 className="text-center mb-4">📊 Investor Dashboard</h1>

      {/* 🧑 Profile Section */}
      <Card className="mb-4">
        <Card.Body>
          <Card.Title>
            👤 Welcome, {userInfo.firstname} {userInfo.lastname}
          </Card.Title>
          <Card.Text>Email: {userInfo.email}</Card.Text>
          <Card.Text>
            KYC Status:{" "}
            <span
              style={{
                color: userInfo.is_kyc_done ? "green" : "crimson",
                fontWeight: "bold",
              }}
            >
              {userInfo.is_kyc_done ? "✅ Done" : "❌ Pending"}
            </span>
          </Card.Text>
          <Card.Text>
            💰 Available Funds:{" "}
            <strong>${parseFloat(userInfo.available_funds).toFixed(2)}</strong>
          </Card.Text>
        </Card.Body>
      </Card>

      {/* ⚙️ Preferences */}
      <Card className="mb-4">
        <Card.Body>
          <Card.Title>⚙️ Preferences</Card.Title>
          <Card.Text>
            Preferred Sector: {preferences?.preferred_sector || "N/A"}
          </Card.Text>
          <Card.Text>
            Risk Level: {preferences?.preferred_risk_level || "N/A"}
          </Card.Text>
          <Card.Text>
            Notifications:{" "}
            {preferences?.notification_enabled ? "🔔 Enabled" : "🔕 Disabled"}
          </Card.Text>
          <PreferencesForm
            current={preferences}
            onUpdate={() => window.location.reload()}
          />
        </Card.Body>
      </Card>

      {/* 🎯 Goals */}
      <Card className="mb-4">
        <Card.Body>
          <Card.Title>🎯 Investment Goals</Card.Title>
          {goals?.map((goal) => (
            <EditableGoalCard
              key={goal.goal_id}
              goal={goal}
              onGoalUpdated={() => window.location.reload()}
            />
          ))}
          <AddGoalForm onGoalAdded={() => window.location.reload()} />
        </Card.Body>
      </Card>

      {/* 📌 Watchlist */}
      <Card className="mb-4">
        <Card.Body>
          <Card.Title>📌 Watchlist</Card.Title>
          {watchlist?.length ? (
            <ListGroup>
              {watchlist.map((stock) => (
                <ListGroup.Item
                  key={stock.stock_id}
                  className="d-flex flex-column w-100 justify-content-between"
                >
                  <span>
                    <strong>{stock.symbol}</strong> – {stock.company_name} ($
                    {stock.current_value})
                  </span>
                  <div>
                    <Button
                      variant="danger"
                      size="sm"
                      className="me-2"
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
                          alert("❌ Failed to remove");
                        }
                      }}
                    >
                      ❌ Remove
                    </Button>
                    <TradeStockForm
                      className="d-inline-block w-100"
                      stockId={stock.stock_id}
                      symbol={stock.symbol}
                      portfolios={portfolios}
                      onTrade={() => window.location.reload()}
                    />
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          ) : (
            <Alert variant="info">No stocks in watchlist.</Alert>
          )}
        </Card.Body>
      </Card>

      {/* 💼 Portfolios */}
      <Card className="mb-4">
        <Card.Body>
          <Card.Title>💼 Portfolios</Card.Title>
          <AddPortfolioForm onAdded={() => window.location.reload()} />
          {portfolios?.map((p) => (
            <Card className="mt-3" key={p.portfolio_id}>
              <Card.Body>
                <Card.Title>{p.portfolio_name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  Created: {new Date(p.created_date).toDateString()}
                </Card.Subtitle>
                <Card.Text>
                  <strong>Total Profit/Loss:</strong> ${p.profit.toFixed(2)}
                </Card.Text>
                <ListGroup>
                  {holdings
                    .filter((h) => h.portfolio_id === p.portfolio_id)
                    .map((h) => (
                      <ListGroup.Item key={h.stock_id}>
                        {h.symbol} – {h.company_name}
                        <br />
                        Shares: {h.shares_owned}, Avg Price: $
                        {h.stock_average_price}, Current Value: $
                        {h.current_value} →{" "}
                        <strong>Total: ${h.total_value}</strong>,{" "}
                        <strong>
                          Profit/Loss: $
                          {h.total_value -
                            h.shares_owned * h.stock_average_price}
                        </strong>
                      </ListGroup.Item>
                    ))}
                </ListGroup>
              </Card.Body>
            </Card>
          ))}
        </Card.Body>
      </Card>

      {/* 📊 Sector Breakdown */}
      {holdings?.length > 0 && <SectorChart holdings={holdings} />}

      {/* 📘 Available Stocks */}
      <AvailableStockList onAdded={() => window.location.reload()} />
      <NewsFeed userId={userId} />
    </Container>
  );
};

export default DashboardPage;
