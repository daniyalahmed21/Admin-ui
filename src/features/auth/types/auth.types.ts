export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  id: number;
}

export interface UserResponse {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: "admin" | "manager" | "customer";
  tenant: string | null;
}

export interface AuthState {
  user: UserResponse | null;
  setUser: (user: UserResponse | null) => void;
  clearUser: () => void;
}


