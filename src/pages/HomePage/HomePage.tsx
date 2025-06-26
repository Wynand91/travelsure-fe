import { useEffect, useState } from "react";
import { getProfile } from "../../services/api";
import type { ProfileResponse } from "../../types/Profile";
import QuickMenuCarousel from "../../components/QuickMenuCarousel";
import "./HomePage.css";

export default function HomePage() {
  const [user, setUser] = useState<ProfileResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getProfile()
      .then((data) => setUser(data))
      .catch((err) => setError(err.message));
  }, []);

  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="homepage-container">
      <h1 className="homepage-greeting">Welcome, {user?.first_name}!</h1>
      <div className="carousel-wrapper">
        <QuickMenuCarousel />
      </div>
    </div>
  );
}
