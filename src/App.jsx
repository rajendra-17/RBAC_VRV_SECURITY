import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import PermissionPage from "./pages/PermissionPage";
import DashboardPage from "./pages/DashboardPage";
import RolePage from "./pages/RolePage";
import UserPage from "./pages/UserPage";
import NotFoundPage from "./components/NotFoundPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/users" element={<UserPage />} />
        <Route path="/roles" element={<RolePage />} />
        <Route path="/permissions" element={<PermissionPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
