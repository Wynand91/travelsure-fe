import ClaimsList from "../../components/ClaimsList/ClaimsList";
import "./ClaimsPage.css";

export default function ClaimsPage() {
  return (
    <div className="claims-container">
      <div className="claims-list-container">
        <h1 className="claims-list-heading">My Claims</h1>
        <div className="">
          <ClaimsList />
        </div>
      </div>
    </div>
  );
}
