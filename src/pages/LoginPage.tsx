import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);

    try {
      const response = await fetch("http://localhost:8000/token/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      let data;

      try {
        data = await response.json();
      } catch {
        throw new Error("Invalid Server response");
      }

      if (!response.ok) {
        const message =
          data?.detail || data?.error || response.statusText || "Login failed";
        throw new Error(message);
      }

      const accessToken = data.access;
      const refreshToken = data.refresh;

      // only for development - NEVER STORE TOKENS IN LOCAL STORAGE IN PROD ENVIRONMENT
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      navigate("/home");
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <form onSubmit={handleLogin} className="p-4 border rounded bg-light">
          <h2 className="mb-3">Login</h2>
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
          <button className="btn btn-primary" type="submit">
            Login
          </button>
        </form>

        <p className="mt-3 text-center">
          or <a href="/signup">Create Account</a>
        </p>
      </div>
    </div>
  );
}
