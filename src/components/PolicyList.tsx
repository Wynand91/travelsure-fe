import { useNavigate } from "react-router-dom";
import "./PolicyList.css";

export default function PolicyList() {
  const navigate = useNavigate();

  const items = [
    { id: 1, name: "Travel Cover - Europe" },
    { id: 2, name: "Medical Plan - Global" },
    { id: 3, name: "Trip Protection - USA" },
    { id: 4, name: "Adventure Pack - Africa" },
  ];

  return (
    <div className="list-container">
      <ul className="list-group">
        {items.map((item) => (
          <li key={item.id} className="list-item">
            <span className="item-name">{item.name}</span>
            <button
              className="claim-button"
              onClick={() => navigate("/claims/new")}
            >
              File Claim
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
