import React, { useState } from "react";
import FormGroup from "../components/FormGroup";
import "../styles/form.scss";
import { Link } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router";

const Login = () => {
  const { loading, handleLogin } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await handleLogin(null, email, password);
      navigate("/");
    } catch (err) {
      console.log(err.response?.data?.message);
      // show error to user
    }
  }

  return (
    <main className="form-page">
      <h1>Login</h1>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <FormGroup
            label="Email"
            placeholder="Enter your email"
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <FormGroup
            label="Password"
            placeholder="Enter your password"
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="button" type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
          <p>
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </form>
      </div>
    </main>
  );
};

export default Login;
