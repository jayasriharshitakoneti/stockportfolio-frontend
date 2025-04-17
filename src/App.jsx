import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import { Navigate } from "react-router-dom";

import LoginPage from "./components/login/LoginPage";
import AdminPage from "./components/AdminPage";
import AddStockForm from "./components/forms/AddStockForm";
import AddExchangeForm from "./components/forms/AddExchangeForm";
import UpdateStockPriceForm from "./components/forms/UpdateStockPriceForm";
import AddMarketNewsForm from "./components/forms/AddMarketNewsForm";
import RegisterPage from "./components/RegisterPage";
import PrivateRoute from "./components/PrivateRoute";
import DashboardPage from "./components/Dashboard";
import FundsPage from "./components/FundsPage";
import HoldingsPage from "./components/HoldingsPage";
import WatchlistPage from "./components/WatchlistPage";
import PreferencesPage from "./components/PreferencesPage";
import GoalsPage from "./components/GoalsPage";
import NoAccessPage from "./components/NoAccessPage";

const App = () => {
  const ProtectedRoute = ({ children }) => {
    const userId = localStorage.getItem("userId");
    const role = localStorage.getItem("role");
    if (role === "ADMIN") {
      return userId ? <Navigate to="/admin" /> : children;
    }
    return userId ? <Navigate to="/dashboard" /> : children;
  };
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <LoginPage />
            </ProtectedRoute>
          }
        />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/no-access" element={<NoAccessPage />} />

        {/* Investor-only route */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute allowedRoles={["INVESTOR"]}>
              <DashboardPage />
            </PrivateRoute>
          }
        />
        {/* Investor-only route */}
        <Route
          path="/holdings"
          element={
            <PrivateRoute allowedRoles={["INVESTOR"]}>
              <HoldingsPage />
            </PrivateRoute>
          }
        />
        {/* Investor-only route */}
        <Route
          path="/watchlist"
          element={
            <PrivateRoute allowedRoles={["INVESTOR"]}>
              <WatchlistPage />
            </PrivateRoute>
          }
        />
        {/* Investor-only route */}
        <Route
          path="/funds"
          element={
            <PrivateRoute allowedRoles={["INVESTOR"]}>
              <FundsPage />
            </PrivateRoute>
          }
        />
        {/* Investor-only route */}
        <Route
          path="/preferences"
          element={
            <PrivateRoute allowedRoles={["INVESTOR"]}>
              <PreferencesPage />
            </PrivateRoute>
          }
        />
        {/* Investor-only route */}
        <Route
          path="/goals"
          element={
            <PrivateRoute allowedRoles={["INVESTOR"]}>
              <GoalsPage />
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
  );
};

export default App;
