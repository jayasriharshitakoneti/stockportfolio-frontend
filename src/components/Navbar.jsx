import React from "react";
import { useNavigate } from "react-router-dom";
import { Navbar, Nav, Button, Container } from "react-bootstrap";

const AppNavbar = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const role = localStorage.getItem("role");

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand
          onClick={() => navigate("/")}
          style={{ cursor: "pointer" }}
        >
          KoRe
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {!userId ? (
              <>
                <Button
                  variant="outline-light"
                  className="me-2"
                  onClick={() => navigate("/")}
                >
                  Login
                </Button>
                <Button
                  variant="outline-light"
                  onClick={() => navigate("/register")}
                >
                  Register
                </Button>
              </>
            ) : (
              <>
                {role === "admin" && (
                  <Button
                    variant="outline-light"
                    className="me-2"
                    onClick={() => navigate("/admin")}
                  >
                    Admin Dashboard
                  </Button>
                )}
                {role === "investor" && (
                  <Button
                    variant="outline-light"
                    className="me-2"
                    onClick={() => navigate("/dashboard")}
                  >
                    Investor Dashboard
                  </Button>
                )}
                <Button variant="danger" onClick={logout}>
                  Logout
                </Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
