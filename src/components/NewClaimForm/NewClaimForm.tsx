import type React from "react";
import { useEffect, useState } from "react";
import type { ClaimResponse } from "../../types/Claim";
import { createClaim } from "../../services/api";

interface ClaimFormProps {
  policy: string;
  onSuccess: (policy: ClaimResponse) => void;
}

export default function NewClaimForm({ policy, onSuccess }: ClaimFormProps) {
  const [description, setDescription] = useState("");
  const [amount_claimed, setAmountClaimed] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const data = await createClaim({
        policy,
        description,
        amount_claimed,
      });
      onSuccess(data);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="w-100">
      <form onSubmit={handleSubmit} className="list-group">
        <h2 className="mb-3 text-center">Claim details</h2>
        {error && <div className="alert alert-danger">{error}</div>}

        <div className="mb-3">
          <textarea
            className="form-control"
            placeholder="Short description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <input
            type="number"
            className="form-control"
            placeholder="Claim amount"
            value={amount_claimed}
            onChange={(e) => setAmountClaimed(parseFloat(e.target.value))}
            required
          />
        </div>

        <div className="d-flex justify-content-center py-2 px-4">
          <button className="btn btn-primary" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
