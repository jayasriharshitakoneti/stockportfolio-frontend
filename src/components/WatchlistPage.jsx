import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  ListGroup,
  Button,
  Alert,
  Modal,
  Container,
} from "react-bootstrap";
import TradeStockForm from "./forms/TradeStockForm";
import AvailableStockList from "./AvailableStockList";
import { useNavigate } from "react-router-dom";

const WatchlistPage = () => {
  const [data, setData] = useState(null);
  const [showTradeModal, setShowTradeModal] = useState(false);
  const [selectedStock, setSelectedStock] = useState(null);
  const [selectedSymbol, setSelectedSymbol] = useState("");
  const userId = localStorage.getItem("userId");

  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/user/dashboard",
          {
            params: { userId },
          }
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };
    fetchData();
  }, [userId]);

  if (!data) return <p>Loading...</p>;

  const { watchlist, portfolios } = data;

  const handleTradeClick = (stock) => {
    setSelectedStock(stock);
    setSelectedSymbol(stock.symbol);
    setShowTradeModal(true);
  };

  const handleTradeClose = () => {
    setShowTradeModal(false);
    setSelectedStock(null);
    setSelectedSymbol("");
  };

  return (
    <Container className="mt-4">
      <h1 className="text-center mb-4">Your Watchlist</h1>
      <h2>Watchlist</h2>
      {watchlist.length ? (
        <ListGroup>
          {watchlist.map((stock) => (
            <ListGroup.Item
              key={stock.stock_id}
              className="d-flex justify-content-between align-items-center"
            >
              <span>
                <strong>{stock.symbol}</strong> - {stock.company_name} ($
                {stock.current_value})
              </span>
              <div>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleTradeClick(stock)}
                  className="me-2"
                >
                  Trade
                </Button>
                <Button
                  variant="danger"
                  size="sm"
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
                </Button>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      ) : (
        <Alert variant="info">No stocks in watchlist.</Alert>
      )}

      {/*Available Stocks */}
      <AvailableStockList onAdded={() => window.location.reload()} />

      {/* Trade Modal */}
      <Modal show={showTradeModal} onHide={handleTradeClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Trade {selectedSymbol}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedStock && (
            <TradeStockForm
              portfolios={portfolios}
              stockId={selectedStock.stock_id}
              symbol={selectedSymbol}
              onTrade={() => {
                handleTradeClose();
                alert("Trade successful!");
                navigate("/holdings"); // Redirect to HoldingsPage after trading
              }}
            />
          )}
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default WatchlistPage;
