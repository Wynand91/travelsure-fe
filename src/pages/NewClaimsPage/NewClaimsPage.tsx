import { useLocation, useNavigate } from "react-router-dom";
import NewClaimForm from "../../components/NewClaimForm/NewClaimForm";
import type { ClaimResponse } from "../../types/Claim";
import "./NewClaimsPage.css";

export default function NewClaimsPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const policyId = location.state?.policyId;

  const handleClaimSuccess = (claim: ClaimResponse) => {
    navigate("/claims/success", { state: { claim } });
  };

  return (
    <div className="new-claim-container">
      <div className="policy-form-container">
        <h1 className="policy-list-heading">Submit Claim</h1>
        <div className="form-wrapper">
          <NewClaimForm policy={policyId} onSuccess={handleClaimSuccess} />
        </div>
      </div>
    </div>
  );
}
