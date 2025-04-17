import React from "react";

const NoAccessPage = () => {
  return (
    <div style={styles.container}>
      <h1>Access Denied</h1>
      <p>You do not have permission to access this page.</p>
      <p>Please go back or log in with the appropriate role.</p>
    </div>
  );
};

const styles = {
  container: {
    padding: "50px",
    textAlign: "center",
    fontFamily: "Segoe UI, sans-serif",
  },
};

export default NoAccessPage;
