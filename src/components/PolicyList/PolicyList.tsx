import { useNavigate } from "react-router-dom";
import "./PolicyList.css";
import { useEffect, useState } from "react";
import type { PolicyResponse } from "../../types/Policy";
import { getPolicies } from "../../services/api";

export default function PolicyList() {
  const [policies, setPolicies] = useState<PolicyResponse[]>([]);
  const [selectedPolicy, setSelectedPolicy] = useState<PolicyResponse | null>(
    null
  );
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPolicies() {
      try {
        const res = await getPolicies();
        setPolicies(res);
      } catch (error) {
        console.error("Failed to fetch policies", error);
      }
    }

    fetchPolicies();
  }, []);

  return (
    <div className="list-container">
      {policies.length === 0 ? (
        <div className="no-policies-message">
          <p>No policies found.</p>
        </div>
      ) : (
        <ul className="list-group">
          {policies.map((policy) => (
            <li
              key={policy.id}
              className="list-item"
              onClick={() => setSelectedPolicy(policy)}
            >
              <div className="item-name">
                {policy.destination} — {policy.policy_type}
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Modal / Overlay */}
      {selectedPolicy && (
        <div
          className="policy-modal-overlay"
          onClick={() => setSelectedPolicy(null)}
        >
          <div className="policy-modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close-button"
              onClick={() => setSelectedPolicy(null)}
            >
              &times;
            </button>

            <h4>
              {selectedPolicy.destination} — {selectedPolicy.policy_type}
            </h4>
            <p>
              <strong>Start:</strong> {selectedPolicy.start_date}
            </p>
            <p>
              <strong>End:</strong> {selectedPolicy.end_date}
            </p>
            <p>
              <strong>Status:</strong> {selectedPolicy.status}
            </p>
            <p>
              <strong>Paid:</strong> {selectedPolicy.paid ? "Yes" : "No"}
            </p>

            <button
              className="modal-claim-button"
              onClick={() =>
                navigate("/claims/new", {
                  state: { policyId: selectedPolicy.id },
                })
              }
            >
              File a Claim
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
