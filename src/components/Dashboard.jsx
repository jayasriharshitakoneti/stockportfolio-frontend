import React, { useEffect, useState } from "react";
import SectorChart from "./charts/SectorChart";
import NewsFeed from "./NewsFeed";

import axios from "axios";
import { Container, Card } from "react-bootstrap";

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

  const { userInfo, holdings } = data;

  return (
    <Container className="mt-4">
      <h1 className="text-center mb-4">Investor Dashboard</h1>

      {/*Profile Section */}
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
              {userInfo.is_kyc_done ? "Done" : "Pending"}
            </span>
          </Card.Text>
          <Card.Text>
            Available Funds:{" "}
            <strong>${parseFloat(userInfo.available_funds).toFixed(2)}</strong>
          </Card.Text>
        </Card.Body>
      </Card>

      {/*Sector Breakdown */}
      {holdings?.length > 0 && <SectorChart holdings={holdings} />}

      {/*Available Stocks */}
      {/* <AvailableStockList onAdded={() => window.location.reload()} /> */}
      <NewsFeed userId={userId} />
    </Container>
  );
};

export default DashboardPage;
