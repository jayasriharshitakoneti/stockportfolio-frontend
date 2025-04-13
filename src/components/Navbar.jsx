import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const role = localStorage.getItem("role");

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.left}>
        <span style={styles.logo}>KoRe</span>
      </div>

      <div style={styles.right}>
        {!userId ? (
          <>
            <button style={styles.button} onClick={() => navigate("/")}>
              Login
            </button>
            <button style={styles.button} onClick={() => navigate("/register")}>
              Register
            </button>
          </>
        ) : (
          <>
            {role === "admin" && (
              <button style={styles.button} onClick={() => navigate("/admin")}>
                Admin Dashboard
              </button>
            )}
            {role === "investor" && (
              <button
                style={styles.button}
                onClick={() => navigate("/dashboard")}
              >
                Investor Dashboard
              </button>
            )}
            <button style={styles.button} onClick={logout}>
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    background: "#333",
    color: "#fff",
    padding: "10px 20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  left: {
    fontSize: "20px",
    fontWeight: "bold",
  },
  right: {
    display: "flex",
    gap: "10px",
  },
  logo: {
    fontSize: "18px",
  },
  button: {
    background: "#2575fc",
    border: "none",
    color: "#fff",
    padding: "8px 12px",
    borderRadius: "6px",
    cursor: "pointer",
  },
};

export default Navbar;
