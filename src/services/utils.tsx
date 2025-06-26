import { jwtDecode } from "jwt-decode";

const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";

interface JwtPayload {
  exp: number; // expiry timestamp in seconds
  [key: string]: any;
}

export async function getValidAccessToken(): Promise<string> {
  const tokenFromStorage = localStorage.getItem(ACCESS_TOKEN_KEY);
  const refreshTokenFromStorage = localStorage.getItem(REFRESH_TOKEN_KEY);

  if (!tokenFromStorage || !refreshTokenFromStorage) {
    throw new Error("No token found");
  }

  let token = tokenFromStorage;
  const refreshToken = refreshTokenFromStorage;

  try {
    const decoded_jwt = jwtDecode<JwtPayload>(token);
    const now = Date.now() / 1000; // current time in seconds

    if (decoded_jwt.exp - now < 60) {
      // token is expired or will expire in 60s
      const newTokens = await refreshAccessToken(refreshToken);
      localStorage.setItem(ACCESS_TOKEN_KEY, newTokens.access);
      localStorage.setItem(REFRESH_TOKEN_KEY, newTokens.refresh);
      token = newTokens.access;
    }

    return token;
  } catch (err) {
    throw new Error("Invalid token");
  }
}

async function refreshAccessToken(refreshToken: string) {
  const response = await fetch("http://localhost:8000/token/refresh/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refresh: refreshToken }),
  });

  if (!response.ok) {
    throw new Error("Failed to refresh token");
  }

  return await response.json();
}
