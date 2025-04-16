import React from "react";
import { Container, ListGroup, Button, Alert, Row, Col } from "react-bootstrap";
import TradeStockForm from "./forms/TradeStockForm";

const WatchlistPage = ({ watchlist, portfolios, userId, onRemove }) => {
  return (
    <Container className="mt-4">
      <h1 className="text-center mb-4">📌 Watchlist</h1>
      {watchlist?.length ? (
        <ListGroup>
          {watchlist.map((stock) => (
            <ListGroup.Item key={stock.stock_id}>
              <Row className="align-items-center">
                <Col md={6}>
                  <strong>{stock.symbol}</strong> – {stock.company_name} ($
                  {stock.current_value})
                </Col>
                <Col md={6} className="d-flex justify-content-end">
                  <Button
                    variant="danger"
                    size="sm"
                    className="me-2"
                    onClick={() => onRemove(stock.stock_id)}
                  >
                    ❌ Remove
                  </Button>
                  <TradeStockForm
                    stockId={stock.stock_id}
                    symbol={stock.symbol}
                    portfolios={portfolios}
                    onTrade={() => window.location.reload()}
                  />
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
      ) : (
        <Alert variant="info">No stocks in watchlist.</Alert>
      )}
    </Container>
  );
};

export default WatchlistPage;
