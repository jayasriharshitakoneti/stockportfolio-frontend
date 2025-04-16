import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Form,
  Button,
  Alert,
  Container,
  Row,
  Col,
  Card,
} from "react-bootstrap";

const RegisterPage = () => {
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    secret: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const submit = async () => {
    if (!form.firstname || !form.lastname || !form.email || !form.secret) {
      setError("All fields are required");
      return;
    }

    try {
      await axios.post("http://localhost:8080/register", form);
      alert("Registered successfully!");
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.error || "Registration failed");
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <Card>
            <Card.Body>
              <h2 className="mb-4 text-center">Investor Registration</h2>
              <Form>
                <Form.Group className="mb-3" controlId="formFirstname">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="firstname"
                    value={form.firstname}
                    onChange={handleChange}
                    placeholder="Enter first name"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formLastname">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="lastname"
                    value={form.lastname}
                    onChange={handleChange}
                    placeholder="Enter last name"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Enter email"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formSecret">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="secret"
                    value={form.secret}
                    onChange={handleChange}
                    placeholder="Enter password"
                  />
                </Form.Group>

                {error && <Alert variant="danger">{error}</Alert>}

                <div className="d-grid">
                  <Button variant="primary" onClick={submit}>
                    Register
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterPage;
