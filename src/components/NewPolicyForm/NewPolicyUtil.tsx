import { getValidAccessToken } from "../../services/utils";

const API_BASE = "http://localhost:8000";

interface DestResponse {
  destinations: [];
}

interface TypeResponse {
  policy_types: [];
}

export async function getDestinations(): Promise<DestResponse> {
  const desteUrl = `${API_BASE}/policy/destinations/`;
  const token = await getValidAccessToken();
  if (!token) throw new Error("Not authenticated");

  let response = await fetch(desteUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch destinations");
  }

  return await response.json();
}

export async function getPolicyTypes(): Promise<TypeResponse> {
  const policyTypeUrl = `${API_BASE}/policy/policy_types/`;
  const token = await getValidAccessToken();
  if (!token) throw new Error("Not authenticated");

  let response = await fetch(policyTypeUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch policy types");
  }

  return await response.json();
}
