import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

import "../styles/Auth.css";

function Signup() {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {

      await axios.post(
        "http://localhost:5000/api/auth/signup",
        {
          name: username,
          email,
          password
        }
      );

      toast.success("Signup successful 🎉 Please login!");

      navigate("/login");

    } catch (error) {

      toast.error(
        error.response?.data?.message || "Signup failed ❌"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">

      <form className="auth-form" onSubmit={handleSignup}>

        <h1>Signup</h1>

        <input
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Creating account..." : "Create Account"}
        </button>

        <p>
          Already have an account?{" "}
          <Link to="/login">
            Login
          </Link>
        </p>

      </form>

    </div>
  );
}

export default Signup;