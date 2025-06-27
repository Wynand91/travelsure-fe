import "./ClaimsList.css";
import { useEffect, useState } from "react";
import type { ClaimResponse } from "../../types/Claim";
import { getClaims } from "../../services/api";

export default function ClaimsList() {
  const [claims, setClaims] = useState<ClaimResponse[]>([]);
  const [selectedClaim, setSelectedClaim] = useState<ClaimResponse | null>(
    null
  );

  useEffect(() => {
    async function fetchClaims() {
      try {
        const res = await getClaims();
        setClaims(res);
      } catch (error) {
        console.error("Failed to fetch claims", error);
      }
    }

    fetchClaims();
  }, []);

  return (
    <div className="list-container">
      {claims.length === 0 ? (
        <div className="no-policies-message">
          <p>No claims found.</p>
        </div>
      ) : (
        <ul className="list-group">
          {claims.map((claim) => (
            <li
              key={claim.id}
              className="list-item"
              onClick={() => setSelectedClaim(claim)}
            >
              <div className="item-name">
                <span>Claim for:</span>
                {claim.policy_detail.destination} —{" "}
                {claim.policy_detail.policy_type}
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Modal / Overlay */}
      {selectedClaim && (
        <div
          className="claim-modal-overlay"
          onClick={() => setSelectedClaim(null)}
        >
          <div className="claim-modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close-button"
              onClick={() => setSelectedClaim(null)}
            >
              &times;
            </button>

            <h4>
              {selectedClaim.policy_detail.destination} —{" "}
              {selectedClaim.policy_detail.policy_type}
            </h4>
            <p>
              <strong>Desciption:</strong> {selectedClaim.description}
            </p>
            <p>
              <strong>Claim date:</strong> {selectedClaim.claim_date}
            </p>
            <p>
              <strong>Amount Claimed: £</strong> {selectedClaim.amount_claimed}
            </p>
            <p>
              <strong>Status:</strong> {selectedClaim.status}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
