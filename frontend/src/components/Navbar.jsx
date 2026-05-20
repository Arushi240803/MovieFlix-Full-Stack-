import { Link, useNavigate } from "react-router-dom";

import "../styles/Navbar.css";

function Navbar() {

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <nav className="navbar">

      <h1
        className="logo"
        onClick={() => navigate("/")}
        style={{ cursor: "pointer" }}
      >
        MovieFlix
      </h1>

      <div className="nav-links">

        <Link to="/">Home</Link>

        <Link to="/search">Search</Link>

        <Link to="/watchlist">Watchlist</Link>

        {/* ================= AUTH SECTION ================= */}
        {token ? (
          <>
            <span className="user-name">
              👋 {user?.name || "User"}
            </span>

            <button
              onClick={logout}
              className="nav-btn"
            >
              Logout
            </button>
          </>
        ) : (
          <Link to="/login">
            Login
          </Link>
        )}

      </div>

    </nav>
  );
}

export default Navbar;