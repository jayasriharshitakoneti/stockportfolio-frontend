import React from "react";
import { Container, Card, ListGroup } from "react-bootstrap";

const HoldingsPage = ({ portfolios, holdings }) => {
  return (
    <Container className="mt-4">
      <h1 className="text-center mb-4">💼 Portfolios</h1>
      {portfolios?.map((p) => (
        <Card className="mb-4" key={p.portfolio_id}>
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
                    {h.stock_average_price}, Current Value: ${h.current_value} →{" "}
                    <strong>Total: ${h.total_value}</strong>,{" "}
                    <strong>
                      Profit/Loss: $
                      {h.total_value - h.shares_owned * h.stock_average_price}
                    </strong>
                  </ListGroup.Item>
                ))}
            </ListGroup>
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
};

export default HoldingsPage;
