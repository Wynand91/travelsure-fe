import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./LoginPage.css";
import { loginUser } from "../../services/api";

export default function LoginPage({ onLogin }: { onLogin: () => void }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);

    try {
      const data = await loginUser(username, password);
      const accessToken = data.access;
      const refreshToken = data.refresh;

      // only for development - NEVER STORE TOKENS IN LOCAL STORAGE IN PROD ENVIRONMENT
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      onLogin();
      navigate("/home");
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    }
  };

  return (
    <div className="login-container d-flex flex-column justify-content-center align-items-center min-vh-100">
      <h1 className="mb-4 text-center fw-bold login-heading">TravelSure</h1>
      <div
        className="login-box p-4 rounded shadow"
        style={{ backgroundColor: "rgba(255, 255, 255, 0.6)" }}
      >
        <form
          onSubmit={handleLogin}
          className="login-form p-4 border rounded shadow-sm bg-light"
        >
          <h2 className="mb-3 text-center">Login</h2>
          {error && <div className="alert alert-danger">{error}</div>}
          <input
            className="form-control mb-2"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="form-control mb-3"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="d-flex justify-content-center">
            <button className="btn btn-primary" type="submit">
              Login
            </button>
          </div>
          <p className="mt-3 text-center mb-0" style={{ fontSize: "0.95rem" }}>
            Don't have an account?{" "}
            <a
              href="/signup"
              className="text-primary fw-semibold text-decoration-none"
            >
              Create one
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
