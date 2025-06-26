import { useNavigate } from "react-router-dom";
import PolicyList from "../../components/PolicyList";
import "./PolicyPage.css";

export default function PolicyPage() {
  const navigate = useNavigate();

  return (
    <div className="policy-container">
      <div className="policy-list-container">
        <h1 className="policy-list-heading">My Policies</h1>
        <div className="new-policy-button-wrapper">
          <button
            className="new-policy-button"
            onClick={() => navigate("/policies/new")}
          >
            Take Out New Policy
          </button>
        </div>
        <div className="">
          <PolicyList />
        </div>
      </div>
    </div>
  );
}
