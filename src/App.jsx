import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import { Navigate } from "react-router-dom";

import LoginPage from "./components/login/LoginPage";
import AdminPage from "./components/AdminPage";
import AddStockForm from "./components/forms/AddStockForm";
import AddExchangeForm from "./components/forms/AddExchangeForm";
// import UpdateKYCForm from "./components/forms/UpdateKYCForm";
import UpdateStockPriceForm from "./components/forms/UpdateStockPriceForm";
import AddMarketNewsForm from "./components/forms/AddMarketNewsForm";
import RegisterPage from "./components/RegisterPage";
import PrivateRoute from "./components/PrivateRoute";
import DashboardPage from "./components/Dashboard";

const App = () => {
  const ProtectedRoute = ({ children }) => {
    const userId = localStorage.getItem("userId");
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
        {/* <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/holdings" element={<HoldingsPage />} />
        <Route path="/watchlist" element={<WatchlistPage />} />
        <Route path="/funds" element={<FundsPage />} />
        <Route path="/preferences" element={<PreferencesPage />} />
        <Route path="/goals" element={<GoalsPage />} /> */}

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
