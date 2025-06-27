export interface PolicyRequest {
  destination: string;
  start_date: string;
  end_date: string;
  policy_type: string;
}

export interface PolicyResponse {
  id: string;
  destination: string;
  start_date: string;
  end_date: string;
  policy_type: string;
  status: string;
  is_active: boolean;
  paid: boolean;
  user: string;
}
