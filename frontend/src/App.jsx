import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import LoginPage from "./pages/Login/LoginPage";
import DashboardPage from "./pages/Dashboard/DashboardPage";

import AccountsPage from "./pages/Accounts/AccountsPage";
import NewAccountPage from "./pages/Accounts/NewAccountPage";
import EditAccountPage from "./pages/Accounts/EditAccountPage";

import TransactionsPage from "./pages/Transactions/TransactionsPage";
import NewTransactionPage from "./pages/Transactions/NewTransactionPage";
import EditTransactionPage from "./pages/Transactions/EditTransactionPage";

import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Navigate to="/login" replace />}
        />

        <Route
          path="/login"
          element={<LoginPage />}
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/accounts"
          element={
            <ProtectedRoute>
              <AccountsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/accounts/new"
          element={
            <ProtectedRoute>
              <NewAccountPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/accounts/:id/edit"
          element={
            <ProtectedRoute>
              <EditAccountPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/transactions"
          element={
            <ProtectedRoute>
              <TransactionsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/transactions/new"
          element={
            <ProtectedRoute>
              <NewTransactionPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/transactions/:id/edit"
          element={
            <ProtectedRoute>
              <EditTransactionPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;