import { useNavigate } from "react-router-dom";
import NewPolicyForm from "../../components/NewPolicyForm/NewPolicyForm";
import type { PolicyResponse } from "../../types/Policy";
import "./NewPolicyPage.css";

export default function NewPolicyPage() {
  const navigate = useNavigate();

  const handlePolicySuccess = (policy: PolicyResponse) => {
    navigate("/policies/success", { state: { policy } });
  };

  return (
    <div className="new-policy-container">
      <div className="policy-form-container">
        <h1 className="policy-list-heading">New Policy</h1>
        <div className="form-wrapper">
          <NewPolicyForm onSuccess={handlePolicySuccess} />
        </div>
      </div>
    </div>
  );
}
