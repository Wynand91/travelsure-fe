import { useState } from "react";
import type { AuthResponse } from "../types/Auth";
import { registerUser } from "../services/api";

interface AuthFormProps {
  onAuthSuccess: (auth: AuthResponse) => void;
}

export default function AuthForm({ onAuthSuccess }: AuthFormProps) {
  const [username, setUsername] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [showPasswordRules, setShowPasswordRules] = useState(false);

  const passwordRules = [
    {
      label: "At least 8 characters",
      test: (pw: string) => pw.length >= 8,
    },
    {
      label: "At least one uppercase letter",
      test: (pw: string) => /[A-Z]/.test(pw),
    },
    {
      label: "At least one lowercase letter",
      test: (pw: string) => /[a-z]/.test(pw),
    },
  ];

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const data = await registerUser({
        username,
        password,
        first_name,
        last_name,
      });
      onAuthSuccess(data);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <form
          onSubmit={handleSubmit}
          className="p-4 border rounded shadow-sm bg-light"
        >
          <h2 className="mb-3">Create Account</h2>

          {error && <div className="alert alert-danger">{error}</div>}

          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">First Name</label>
            <input
              className="form-control"
              value={first_name}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Last Name</label>
            <input
              className="form-control"
              value={last_name}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setShowPasswordRules(true);
              }}
              onFocus={() => setShowPasswordRules(true)}
              onBlur={() => {
                if (!password) setShowPasswordRules(false); // hide if empty
              }}
              required
            />
          </div>
          {/* Password Rules */}
          {showPasswordRules && (
            <ul className="list-unstyled mt-2">
              {passwordRules.map((rule, index) => {
                const passed = rule.test(password);
                return (
                  <li
                    key={index}
                    className={`d-flex align-items-center ${
                      passed ? "text-success" : "text-muted"
                    }`}
                  >
                    <span className="me-2">{passed ? "\u2705" : "\u274C"}</span>
                    <span>{rule.label}</span>
                  </li>
                );
              })}
            </ul>
          )}

          <button className="btn btn-primary" type="submit">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
