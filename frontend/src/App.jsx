import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Search from "./pages/Search";
import Watchlist from "./pages/Watchlist";
import MovieDetails from "./pages/MovieDetails";


// ================= AUTH CHECK =================
const isAuthenticated = () => {
  return localStorage.getItem("token");
};


// ================= PROTECTED ROUTE =================
function ProtectedRoute({ children }) {

  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  return children;
}


// ================= PUBLIC ROUTE (prevents login again) =================
function PublicRoute({ children }) {

  if (isAuthenticated()) {
    return <Navigate to="/" replace />;
  }

  return children;
}


// ================= APP =================
function App() {

  return (
    <BrowserRouter>

      <Routes>

        {/* ================= PUBLIC ROUTES ================= */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        <Route
          path="/signup"
          element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          }
        />


        {/* ================= PROTECTED ROUTES ================= */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path="/search"
          element={
            <ProtectedRoute>
              <Search />
            </ProtectedRoute>
          }
        />

        <Route
          path="/watchlist"
          element={
            <ProtectedRoute>
              <Watchlist />
            </ProtectedRoute>
          }
        />

        <Route
          path="/movie/:id"
          element={
            <ProtectedRoute>
              <MovieDetails />
            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;