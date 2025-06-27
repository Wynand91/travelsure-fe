import type { AuthRequest, AuthResponse } from "../types/Auth";
import type { ClaimRequest, ClaimResponse } from "../types/Claim";
import type { PolicyRequest, PolicyResponse } from "../types/Policy";
import type { ProfileResponse } from "../types/Profile";
import { getValidAccessToken } from "./utils";

const API_BASE = "http://localhost:8000";

export async function loginUser(username: string, password: string) {
  const response = await fetch(`${API_BASE}/token/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  let data;

  try {
    data = await response.json();
  } catch {
    throw new Error("Invalid Server response");
  }

  if (!response.ok) {
    const message =
      data?.detail || data?.error || response.statusText || "Login failed";
    throw new Error(message);
  }

  return data;
}

export async function registerUser(
  credentials: AuthRequest
): Promise<AuthResponse> {
  const response = await fetch(`${API_BASE}/users/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  let responseData;
  try {
    responseData = await response.json();
  } catch {
    throw new Error("Invalid JSON response from server");
  }

  if (!response.ok) {
    const errorMessage =
      responseData?.detail ||
      responseData?.error ||
      JSON.stringify(responseData) ||
      "Unknown error occurred";
    throw new Error(`Registration failed: ${errorMessage}`);
  }

  return responseData;
}

export async function getProfile(): Promise<ProfileResponse> {
  console.log("Making profile API call");
  const profileUrl = `${API_BASE}/users/profile/`;
  const token = await getValidAccessToken();
  if (!token) throw new Error("Not authenticated");

  let response = await fetch(profileUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch user profile");
  }

  return await response.json();
}

export async function refreshAccessToken(): Promise<string> {
  const refreshToken = localStorage.getItem("refreshToken");

  if (!refreshToken) throw new Error("No refresh token found");

  const response = await fetch(`${API_BASE}/token/refresh/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refresh: refreshToken }),
  });

  if (!response.ok) throw new Error("Failed to refresh token");

  const data = await response.json();
  // only for development - NEVER STORE TOKENS IN LOCAL STORAGE IN PROD ENVIRONMENT
  localStorage.setItem("accessToken", data.access);
  localStorage.setItem("refreshToken", data.refresh);
  return data.access;
}

export async function createPolicy(
  body: PolicyRequest
): Promise<PolicyResponse> {
  const token = await getValidAccessToken();
  const response = await fetch(`${API_BASE}/policy/`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  let responseData;
  try {
    responseData = await response.json();
  } catch {
    throw new Error("Invalid JSON response from server");
  }

  if (!response.ok) {
    const errorMessage =
      responseData?.detail ||
      responseData?.error ||
      JSON.stringify(responseData) ||
      "Unknown error occurred";
    throw new Error(`Policy creation failed: ${errorMessage}`);
  }

  return responseData;
}

export async function getPolicies(): Promise<PolicyResponse[]> {
  const token = await getValidAccessToken();
  const response = await fetch(`${API_BASE}/policy/`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  let responseData;
  try {
    responseData = await response.json();
  } catch {
    throw new Error("Invalid JSON response from server");
  }

  if (!response.ok) {
    const errorMessage =
      responseData?.detail ||
      responseData?.error ||
      JSON.stringify(responseData) ||
      "Unknown error occurred";
    throw new Error(`Policy fetch failed: ${errorMessage}`);
  }

  return responseData;
}

export async function createClaim(body: ClaimRequest): Promise<ClaimResponse> {
  const token = await getValidAccessToken();
  const response = await fetch(`${API_BASE}/claims/`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  let responseData;
  try {
    responseData = await response.json();
  } catch {
    throw new Error("Invalid JSON response from server");
  }

  if (!response.ok) {
    const errorMessage =
      responseData?.detail ||
      responseData?.error ||
      JSON.stringify(responseData) ||
      "Unknown error occurred";
    throw new Error(`Policy creation failed: ${errorMessage}`);
  }

  return responseData;
}

export async function getClaims(): Promise<ClaimResponse[]> {
  const token = await getValidAccessToken();
  const response = await fetch(`${API_BASE}/claims/`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  let responseData;
  try {
    responseData = await response.json();
  } catch {
    throw new Error("Invalid JSON response from server");
  }

  if (!response.ok) {
    const errorMessage =
      responseData?.detail ||
      responseData?.error ||
      JSON.stringify(responseData) ||
      "Unknown error occurred";
    throw new Error(`Claim fetch failed: ${errorMessage}`);
  }

  return responseData;
}
