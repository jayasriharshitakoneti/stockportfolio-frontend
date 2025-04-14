import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import LoginPage from "./components/login/LoginPage";
import AdminPage from "./components/AdminPage";
import AddStockForm from "./components/forms/AddStockForm";
import AddExchangeForm from "./components/forms/AddExchangeForm";
import UpdateKYCForm from "./components/forms/UpdateKYCForm";
import UpdateStockPriceForm from "./components/forms/UpdateStockPriceForm";
import AddMarketNewsForm from "./components/forms/AddMarketNewsForm";
import RegisterPage from "./components/RegisterPage";
import PrivateRoute from "./components/PrivateRoute";
import DashboardPage from "./components/Dashboard";

// const InvestorDashboard = () => <div>Investor Dashboard Placeholder</div>;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Investor-only route */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute allowedRoles={["INVESTOR"]}>
              <DashboardPage />
            </PrivateRoute>
          }
        />
        {/* Admin-only routes */}
        <Route
          path="/admin"
          element={
            <PrivateRoute allowedRoles={["ADMIN"]}>
              <AdminPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/add-stock"
          element={
            <PrivateRoute allowedRoles={["ADMIN"]}>
              <AddStockForm />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/add-exchange"
          element={
            <PrivateRoute allowedRoles={["ADMIN"]}>
              <AddExchangeForm />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/update-kyc"
          element={
            <PrivateRoute allowedRoles={["ADMIN"]}>
              <UpdateKYCForm />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/update-price-history"
          element={
            <PrivateRoute allowedRoles={["ADMIN"]}>
              <UpdateStockPriceForm />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/add-market-news"
          element={
            <PrivateRoute allowedRoles={["ADMIN"]}>
              <AddMarketNewsForm />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
