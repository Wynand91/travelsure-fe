import "./ClaimsList.css";

export default function ClaimsList() {
  const items = [
    { id: 1, name: "Claim for Travel Cover - Europe", status: "Pending" },
    { id: 2, name: "Claim for Medical Plan - Global", status: "denied" },
    { id: 3, name: "Claim for Trip Protection - USA", status: "denied" },
    { id: 4, name: "Claim for Adventure Pack - Africa", status: "Paid" },
  ];

  return (
    <div className="list-container">
      <ul className="list-group">
        {items.map((item) => (
          <li key={item.id} className="list-item">
            <span className="item-name">{item.name}</span>
            <span className="item-status">{item.status}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
