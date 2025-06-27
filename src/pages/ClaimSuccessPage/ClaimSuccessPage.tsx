import { useLocation, useNavigate } from "react-router-dom";
import "./ClaimSuccessPage.css";
import type { ClaimResponse } from "../../types/Claim";

export default function ClaimSuccessPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { claim } = location.state as { claim: ClaimResponse };

  return (
    <div className="claim-success-container">
      <div className="text-center claim-info-container">
        <h1>Claim Successfully Submitted!</h1>
        <h2>You will receive a claim confirmation email shortly.</h2>
        <div className="claim-summary">
          <h2>Claim Summary:</h2>
          <p>
            <strong>Reference:</strong> {claim.id}
          </p>
          <p>
            <strong>Description:</strong> {claim.description}
          </p>
          <p>
            <strong>Amount Claimed: </strong> £ {claim.amount_claimed}
          </p>
          <p>
            <strong>Status:</strong> {claim.status}
          </p>
        </div>
        <h2>Thank you for trusting TravelSure.</h2>
        <div className="back-button-wrapper">
          <button className="back-button" onClick={() => navigate("/claims")}>
            Back to My Claims
          </button>
        </div>
      </div>
    </div>
  );
}
