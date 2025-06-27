import { jwtDecode } from "jwt-decode";

const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";

interface JwtPayload {
  exp: number;
  [key: string]: any;
}

export async function getValidAccessToken(): Promise<string> {
  const tokenFromStorage = localStorage.getItem(ACCESS_TOKEN_KEY);
  const refreshTokenFromStorage = localStorage.getItem(REFRESH_TOKEN_KEY);

  if (!tokenFromStorage || !refreshTokenFromStorage) {
    redirectToLogin();
    throw new Error("No token found");
  }

  let token = tokenFromStorage;
  const refreshToken = refreshTokenFromStorage;

  try {
    const decoded_jwt = jwtDecode<JwtPayload>(token);
    const now = Date.now() / 1000;

    if (decoded_jwt.exp - now < 60) {
      // Token is about to expire or already expired
      const newTokens = await refreshAccessToken(refreshToken);
      localStorage.setItem(ACCESS_TOKEN_KEY, newTokens.access);
      token = newTokens.access;
    }

    return token;
  } catch (err) {
    redirectToLogin();
    throw new Error("Invalid or expired token");
  }
}

async function refreshAccessToken(refreshToken: string) {
  console.log("refreshing access token....");
  const response = await fetch("http://localhost:8000/token/refresh/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refresh: refreshToken }),
  });

  if (!response.ok) {
    throw new Error("Failed to refresh token");
  }

  const data = await response.json();
  return data;
}

function redirectToLogin() {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  window.location.href = "/";
}
