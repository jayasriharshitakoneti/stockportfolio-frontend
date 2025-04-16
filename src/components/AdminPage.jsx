import React, { useState, useEffect } from "react";
import { Tabs, Tab, Table, Button, Container, Modal } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AddStockForm from "./forms/AddStockForm";
import AddExchangeForm from "./forms/AddExchangeForm";

const AdminPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("kyc");
  const [users, setUsers] = useState([]);
  const [stocks, setStocks] = useState([]);
  const [showAddStockModal, setShowAddStockModal] = useState(false);
  const [showPriceModal, setShowPriceModal] = useState(false);
  const [selectedStock, setSelectedStock] = useState(null);
  const [newPrice, setNewPrice] = useState("");
  const [showAddExchangeModal, setShowAddExchangeModal] = useState(false);
  const [stockExchanges, setStockExchanges] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:8080/admin/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };
    fetchUsers();
  }, [users]);

  // Fetch stock data
  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const response = await axios.get("http://localhost:8080/admin/stocks");
        setStocks(response.data);
      } catch (error) {
        console.error("Failed to fetch stocks:", error);
      }
    };
    fetchStocks();
  }, [stocks]);

  useEffect(() => {
    const fetchStockExchanges = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/admin/stock-exchanges"
        );
        setStockExchanges(response.data);
      } catch (error) {
        console.error("Failed to fetch stock exchanges:", error);
      }
    };
    fetchStockExchanges();
  }, [stockExchanges]);

  const approveKYC = async (user_id) => {
    try {
      await axios.post("http://localhost:8080/admin/approve-kyc", { user_id });
    } catch (error) {
      console.error("Failed to approve KYC:", error);
    }
  };

  const revokeKYC = async (user_id) => {
    try {
      await axios.post("http://localhost:8080/admin/revoke-kyc", { user_id });
    } catch (error) {
      console.error("Failed to revoke KYC:", error);
    }
  };

  return (
    <Container className="mt-4">
      <h1 className="text-center mb-4">Admin Dashboard</h1>
      <Tabs
        activeKey={activeTab}
        onSelect={(tab) => setActiveTab(tab)}
        className="mb-3"
      >
        {/* KYC Tab */}
        <Tab eventKey="kyc" title="KYC">
          <h3>KYC Management</h3>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>User ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>KYC Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.user_id}>
                  <td>{user.user_id}</td>
                  <td>
                    {user.firstname} {user.lastname}
                  </td>
                  <td>{user.email}</td>
                  <td>
                    {user.is_kyc_done ? (
                      <span style={{ color: "green" }}>Done</span>
                    ) : (
                      <span style={{ color: "red" }}>Pending</span>
                    )}
                  </td>
                  <td>
                    {user.is_kyc_done ? (
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => revokeKYC(user.user_id)}
                      >
                        Revoke
                      </Button>
                    ) : (
                      <Button
                        variant="success"
                        size="sm"
                        onClick={() => approveKYC(user.user_id)}
                      >
                        Approve
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Tab>

        {/* Stock Exchanges Tab */}
        <Tab eventKey="stock-exchanges" title="Stock Exchanges">
          <h3>Manage Stock Exchanges</h3>
          <Button
            variant="primary"
            onClick={() => setShowAddExchangeModal(true)}
            className="mb-3"
          >
            Add Stock Exchange
          </Button>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Country</th>
                <th>Opening Time</th>
                <th>Closing Time</th>
                <th>Timezone</th>
              </tr>
            </thead>
            <tbody>
              {stockExchanges.map((exchange) => (
                <tr key={exchange.stock_exchange_id}>
                  <td>{exchange.stock_exchange_id}</td>
                  <td>{exchange.stock_exchange_name}</td>
                  <td>{exchange.country}</td>
                  <td>{exchange.opening_time}</td>
                  <td>{exchange.closing_time}</td>
                  <td>{exchange.timezone}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Tab>

        {/* Stocks Tab */}
        <Tab eventKey="stocks" title="Stocks">
          <h3>Manage Stocks</h3>
          <Button
            variant="primary"
            className="mb-3"
            onClick={() => setShowAddStockModal(true)}
          >
            Add New Stock
          </Button>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Stock ID</th>
                <th>Symbol</th>
                <th>Company Name</th>
                <th>Current Price</th>
                <th>Market Cap</th>
                <th>Volatility</th>
                <th>Exchange</th>
                <th>Sector</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {stocks.map((stock) => (
                <tr key={stock.stock_id}>
                  <td>{stock.stock_id}</td>
                  <td>{stock.symbol}</td>
                  <td>{stock.company_name}</td>
                  <td>${stock.current_value.toFixed(2)}</td>
                  <td>${stock.market_cap.toFixed(2)}</td>
                  <td>{stock.volatility}</td>
                  <td>{stock.exchange_name}</td>
                  <td>{stock.sector}</td>
                  <td>
                    <Button
                      variant="warning"
                      size="sm"
                      className="me-2"
                      onClick={() => {
                        setSelectedStock(stock);
                        setNewPrice(stock.current_value); // preload with current
                        setShowPriceModal(true);
                      }}
                    >
                      Update Price
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Tab>

        {/* Market News Tab */}
        <Tab eventKey="market-news" title="Market News">
          <h3>Manage Market News</h3>
          <Button
            variant="primary"
            onClick={() => navigate("/admin/add-market-news")}
          >
            Add Market News
          </Button>
        </Tab>
      </Tabs>

      {/* Add Stock Modal */}
      <Modal
        show={showAddStockModal}
        onHide={() => setShowAddStockModal(false)}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Add New Stock</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddStockForm
            onClose={() => setShowAddStockModal(false)} // Close modal after submission
            onStockAdded={() => {
              setShowAddStockModal(false);
              axios
                .get("http://localhost:8080/admin/stocks")
                .then((response) => {
                  setStocks(response.data);
                });
            }}
          />
        </Modal.Body>
      </Modal>

      <Modal
        show={showPriceModal}
        onHide={() => setShowPriceModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Stock Price</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            <strong>{selectedStock?.symbol}</strong> –{" "}
            {selectedStock?.company_name}
          </p>
          <input
            type="number"
            className="form-control mb-3"
            value={newPrice}
            onChange={(e) => setNewPrice(e.target.value)}
          />
          <Button
            variant="primary"
            onClick={async () => {
              try {
                await axios.post(
                  "http://localhost:8080/admin/stocks/update-price",
                  {
                    stock_id: selectedStock.stock_id,
                    new_price: parseFloat(newPrice),
                  }
                );
                alert("Stock price updated successfully!");
                setShowPriceModal(false);
                // Refresh stocks
                const response = await axios.get(
                  "http://localhost:8080/admin/stocks"
                );
                setStocks(response.data);
              } catch (err) {
                alert(err.response?.data?.error || "Failed to update price.");
              }
            }}
          >
            Save
          </Button>
        </Modal.Body>
      </Modal>

      {/* Add Exchange Modal */}
      <Modal
        show={showAddExchangeModal}
        onHide={() => setShowAddExchangeModal(false)}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Stock Exchange</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddExchangeForm
            onClose={() => setShowAddExchangeModal(false)}
            onExchangeAdded={() => {
              try {
                axios
                  .get("http://localhost:8080/admin/stock-exchanges")
                  .then((response) => {
                    setStockExchanges(response.data);
                  });
                setShowAddExchangeModal(false);
                alert("Stock Exchange added successfully!");
              } catch (error) {
                console.error("Failed to refresh exchanges:", error);
              }
            }}
          />
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default AdminPage;
