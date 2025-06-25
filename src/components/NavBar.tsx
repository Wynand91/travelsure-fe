import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container-fluid px-4">
        <Link className="navbar-brand fw-bold" to="/home">
          TravelSure
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          aria-label="Toggle navigation"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className={`collapse navbar-collapse justify-content-end dropdown-collapse ${
            isCollapsed ? "" : "show"
          }`}
        >
          <ul className="navbar-nav align-items-center gap-2">
            <li className="nav-item">
              <Link className="btn btn-outline-light" to="/policies">
                My Policies
              </Link>
            </li>
            <li className="nav-item">
              <Link className="btn btn-outline-light" to="/claims">
                Claims
              </Link>
            </li>
            <li className="nav-item">
              <button className="btn btn-danger" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
