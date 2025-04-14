import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
import { Container, Card, Form, Button, Alert } from "react-bootstrap";
import "./LoginPage.css"; // Import custom CSS

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    try {
      const response = await axios.post("http://localhost:8080/login", null, {
        params: { email, password },
      });

      const { userId, lastName, role } = response.data;
      setMessage(`Welcome, ${lastName}! Your User ID is ${userId}.`);

      localStorage.setItem("userId", userId);
      localStorage.setItem("role", role);

      if (role === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      setMessage(err.response?.data?.error || "Login failed.");
    }
  };

  return (
    <div className="login-page">
      <Container
        fluid
        className="d-flex justify-content-center align-items-center vh-100"
      >
        <Card className="login-card p-4 shadow-lg">
          <Card.Body>
            <Card.Title className="text-center mb-4">Login</Card.Title>
            <Form>
              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Control
                  type="email"
                  placeholder="Username"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formPassword">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Button variant="primary" className="w-100" onClick={login}>
                Login
              </Button>
            </Form>
            {message && (
              <Alert variant="info" className="mt-3">
                {message}
              </Alert>
            )}
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default LoginPage;
