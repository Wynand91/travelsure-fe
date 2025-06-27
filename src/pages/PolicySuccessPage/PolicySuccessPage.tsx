import { useLocation, useNavigate } from "react-router-dom";
import type { PolicyResponse } from "../../types/Policy";
import "./PolicySuccessPage.css";

export default function PolicySuccessPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { policy } = location.state as { policy: PolicyResponse };

  return (
    <div className="policy-success-container">
      <div className="text-center policy-info-container">
        <h1>Policy Successfully Created!</h1>
        <h2>You will receive an email shortly containing payment steps.</h2>
        <div className="policy-summary">
          <h2>Policy Summary:</h2>
          <p>
            <strong>Destination:</strong> {policy.destination}
          </p>
          <p>
            <strong>Type:</strong> {policy.policy_type}
          </p>
          <p>
            <strong>Start Date:</strong> {policy.start_date}
          </p>
          <p>
            <strong>End Date:</strong> {policy.end_date}
          </p>
        </div>
        <h2>Thank you for trusting TravelSure.</h2>
        <div className="back-button-wrapper">
          <button className="back-button" onClick={() => navigate("/policies")}>
            Back to My Policies
          </button>
        </div>
      </div>
    </div>
  );
}
