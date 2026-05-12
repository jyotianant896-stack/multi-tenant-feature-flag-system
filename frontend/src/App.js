import './App.css';

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Login from "./pages/Login";

import Dashboard from "./pages/Dashboard";

import SuperAdminDashboard from "./pages/SuperAdminDashboard";

import UserPage from "./pages/UserPage";


function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/super-admin"
          element={<SuperAdminDashboard />}
        />

        <Route
          path="/user"
          element={<UserPage />}
        />

      </Routes>

    </BrowserRouter>

  );
}

export default App;