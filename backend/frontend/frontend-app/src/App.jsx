import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Home from "./components/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Booking from "./pages/Booking";
import Feedback from "./components/Feedback";

// NEW PAGES
import About from "./pages/About";
import Contact from "./pages/Contact";
import Partner from "./pages/Partner";

function NotFound() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        background: "#0f172a",
        color: "white",
      }}
    >
      <h1 style={{ fontSize: "70px", margin: 0 }}>
        404
      </h1>

      <h2>Page Not Found</h2>

      <button
        onClick={() => {
          window.location.href = "/";
        }}
        style={{
          marginTop: "20px",
          padding: "12px 25px",
          border: "none",
          borderRadius: "10px",
          background: "#2563eb",
          color: "white",
          cursor: "pointer",
          fontSize: "16px",
          fontWeight: "bold",
        }}
      >
        Go Home
      </button>
    </div>
  );
}

function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ROOT */}
        <Route
          path="/"
          element={<Navigate to="/login" replace />}
        />

        {/* LOGIN */}
        <Route
          path="/login"
          element={<Login />}
        />

        {/* REGISTER */}
        <Route
          path="/register"
          element={<Register />}
        />

        {/* HOME */}
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />

        {/* BOOKING */}
        <Route
          path="/booking"
          element={
            <PrivateRoute>
              <Booking />
            </PrivateRoute>
          }
        />

        {/* FEEDBACK */}
        <Route
          path="/feedback"
          element={<Feedback />}
        />

        {/* ABOUT */}
        <Route
          path="/about"
          element={<About />}
        />

        {/* CONTACT */}
        <Route
          path="/contact"
          element={<Contact />}
        />

        {/* PARTNER */}
        <Route
          path="/partner"
          element={<Partner />}
        />

        {/* 404 */}
        <Route
          path="*"
          element={<NotFound />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;