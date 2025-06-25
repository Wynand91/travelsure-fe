import type { AuthResponse } from "../types/Auth";
import AuthForm from "../components/AuthForm";
import { useNavigate } from "react-router-dom";

export default function SignupPage() {
  const navigate = useNavigate();

  const handleAuthSuccess = (auth: AuthResponse) => {
    // only for development - NEVER STORE TOKENS IN LOCAL STORAGE IN PROD ENVIRONMENT
    localStorage.setItem("accessToken", auth.auth_token);
    localStorage.setItem("refreshToken", auth.refresh_token);
    navigate("/home");
  };

  return (
    <div className="container mt-5">
      <AuthForm onAuthSuccess={handleAuthSuccess} />
    </div>
  );
}
