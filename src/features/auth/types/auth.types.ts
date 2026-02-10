export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  id: number;
}

export interface AuthError {
  statusCode: number;
  message: string;
}

export interface AuthUser {
  id: number;
  email: string;
}

export interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
}
