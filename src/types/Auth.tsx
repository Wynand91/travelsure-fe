export interface AuthRequest {
  username: string;
  password: string;
  first_name: string;
  last_name: string;
}

export interface AuthResponse {
  id: string;
  username: string;
  first_name: string;
  last_name: string;
  auth_token: string;
  refresh_token: string;
}

export interface AuthTokenPayload {
  refresh: string;
  access: string;
}
