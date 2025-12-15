import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import UsersList from "./pages/Users/UsersList";
import UserForm from "./pages/Users/UserForm";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import AppNavbar from "./components/AppNavbar";

function App() {
  return (
    <>
      <AppNavbar />

      <Routes>
        
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/users"
          element={
            <ProtectedRoute>
              <UsersList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/users/create"
          element={
            <ProtectedRoute role="Admin">
              <UserForm />
            </ProtectedRoute>
          }
        />

        <Route
          path="/users/edit/:id"
          element={
            <ProtectedRoute role="Admin">
              <UserForm />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </>
  );
}

export default App;
