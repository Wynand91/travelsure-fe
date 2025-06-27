import type { AuthResponse } from "../../types/Auth";
import { useNavigate } from "react-router-dom";
import "./SignupPage.css";
import AuthForm from "../../components/AuthForm/AuthForm";

export default function SignupPage() {
  const navigate = useNavigate();

  const handleAuthSuccess = (auth: AuthResponse) => {
    // only for development - NEVER STORE TOKENS IN LOCAL STORAGE IN PROD ENVIRONMENT
    localStorage.setItem("accessToken", auth.auth_token);
    localStorage.setItem("refreshToken", auth.refresh_token);
    navigate("/home");
  };

  return (
    <div className="signup-container d-flex flex-column justify-content-center align-items-center min-vh-100">
      <h1 className="mb-4 text-center fw-bold signup-heading">TravelSure</h1>
      <div
        className="signup-form-wrapper"
        style={{ backgroundColor: "rgba(255, 255, 255, 0.6)" }}
      >
        <AuthForm onAuthSuccess={handleAuthSuccess} />
      </div>
    </div>
  );
}
