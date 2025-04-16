import React from "react";
import { useNavigate } from "react-router-dom";
import { Navbar, Nav, Button, Container, Dropdown } from "react-bootstrap";

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
          onClick={() => navigate("/dashboard")}
          style={{ cursor: "pointer" }}
        >
          KoRe
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {userId && (
              <>
                <Nav.Link onClick={() => navigate("/dashboard")}>
                  Dashboard
                </Nav.Link>
                <Nav.Link onClick={() => navigate("/holdings")}>
                  Holdings
                </Nav.Link>
                <Nav.Link onClick={() => navigate("/watchlist")}>
                  Watchlist
                </Nav.Link>
                <Nav.Link onClick={() => navigate("/funds")}>Funds</Nav.Link>
              </>
            )}
          </Nav>
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
                <Dropdown align="end">
                  <Dropdown.Toggle variant="outline-light" id="dropdown-basic">
                    Profile
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => navigate("/preferences")}>
                      Preferences
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => navigate("/goals")}>
                      Goals
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
