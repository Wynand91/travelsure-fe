import type React from "react";
import { useEffect, useState } from "react";
import { createPolicy } from "../../services/api";
import type { PolicyResponse } from "../../types/Policy";
import { getDestinations, getPolicyTypes } from "./NewPolicyUtil";

interface PolicyFormProps {
  onSuccess: (policy: PolicyResponse) => void;
}

export default function NewPolicyForm({ onSuccess }: PolicyFormProps) {
  const [destination, setDestination] = useState("");
  const [start_date, setStartDate] = useState("");
  const [end_date, setEndDate] = useState("");
  const [policy_type, setPolicyType] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [destOptions, setDestOptions] = useState<string[]>([]);
  const [typeOptions, setTypeOptions] = useState<string[]>([]);

  useEffect(() => {
    async function fetchOptions() {
      try {
        const destResp = await getDestinations();
        const typeResp = await getPolicyTypes();
        setDestOptions(destResp.destinations);
        setTypeOptions(typeResp.policy_types);
      } catch (err) {
        console.error("Failed to fetch policy options", err);
      }
    }

    fetchOptions();
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const data = await createPolicy({
        destination,
        start_date,
        end_date,
        policy_type,
      });
      onSuccess(data);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="w-100">
      <form onSubmit={handleSubmit} className="list-group">
        <h2 className="mb-3 text-center">Policy details</h2>
        {error && <div className="alert alert-danger">{error}</div>}

        <div className="mb-3">
          <select
            className="form-control"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            required
          >
            <option value="">Select Destination</option>
            {destOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <input
            type="date"
            className="form-control"
            placeholder="Start date"
            value={start_date}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <input
            type="date"
            className="form-control"
            placeholder="End date"
            value={end_date}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <select
            className="form-control"
            value={policy_type}
            onChange={(e) => setPolicyType(e.target.value)}
            required
          >
            <option value="">Select Policy Type</option>
            {typeOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
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
