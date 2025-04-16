import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Container, Button, Modal, Table } from "react-bootstrap";
import AddPortfolioForm from "./forms/AddPortfolioForm"; // Adjust the import path as needed

const HoldingsPage = () => {
  const [data, setData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const userId = localStorage.getItem("userId");

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/user/dashboard", {
        params: { userId },
      });
      setData(response.data);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [userId]);

  if (!data) return <p>Loading...</p>;

  const { portfolios, holdings } = data;

  return (
    <Container className="mt-4">
      <h1 className="text-center mb-4">Your Holdings</h1>
      <div className="d-flex justify-content-end mb-3">
        <Button variant="success" onClick={() => setShowModal(true)}>
          Add Portfolio
        </Button>
      </div>

      {portfolios.map((portfolio) => (
        <Card key={portfolio.portfolio_id} className="mb-3">
          <Card.Body>
            <Card.Title>{portfolio.portfolio_name}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              Created: {new Date(portfolio.created_date).toDateString()}
            </Card.Subtitle>
            <Card.Text>
              Total Profit/Loss:{" "}
              <strong>
                <span
                  className={
                    portfolio.profit < 0 ? "text-danger" : "text-success"
                  }
                >
                  ${Math.abs(portfolio.profit.toFixed(2))}
                </span>
              </strong>
            </Card.Text>
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>Stock Symbol</th>
                  <th>Company Name</th>
                  <th>Shares Owned</th>
                  <th>Avg Price</th>
                  <th>Current Value</th>
                  <th>Total Value</th>
                  <th>Profit/Loss</th>
                </tr>
              </thead>
              <tbody>
                {holdings
                  .filter((h) => h.portfolio_id === portfolio.portfolio_id)
                  .map((h) => (
                    <tr key={h.stock_id}>
                      <td>{h.symbol}</td>
                      <td>{h.company_name}</td>
                      <td>{h.shares_owned}</td>
                      <td>${h.stock_average_price}</td>
                      <td>${h.current_value}</td>
                      <td>${h.total_value}</td>
                      <td
                        className={
                          h.total_value -
                            h.shares_owned * h.stock_average_price <
                          0
                            ? "text-danger"
                            : "text-success"
                        }
                      >
                        $
                        {Math.abs(
                          h.total_value - h.shares_owned * h.stock_average_price
                        ).toFixed(2)}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      ))}

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Portfolio</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddPortfolioForm
            onAdded={() => {
              fetchData();
              setShowModal(false);
            }}
          />
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default HoldingsPage;
