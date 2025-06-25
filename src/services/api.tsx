import type { AuthRequest, AuthResponse } from "../types/Auth";
import type { ProfileResponse } from "../types/Profile";

const API_BASE = "http://localhost:8000";

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
  const profileUrl = `${API_BASE}/users/profile/`;
  let token = localStorage.getItem("accessToken");
  if (!token) throw new Error("Not authenticated");

  let response = await fetch(profileUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  // If access token expired, try to refresh it
  if (response.status === 401) {
    try {
      token = await refreshAccessToken();
      response = await fetch(profileUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (err) {
      throw new Error("Session expired. Please log in again.");
    }
  }

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
