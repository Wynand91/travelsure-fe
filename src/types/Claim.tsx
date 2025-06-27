import type { PolicyResponse } from "./Policy";

export interface ClaimResponse {
  id: string;
  policy_detail: PolicyResponse;
  description: string;
  claim_date: string;
  amount_claimed: string;
  status: string;
}

export interface ClaimRequest {
  policy: string;
  description: string;
  amount_claimed: number;
}
