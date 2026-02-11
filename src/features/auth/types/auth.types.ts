export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  id: number;
}

export interface UserResponse{
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

export interface AuthStore {
  user: UserResponse | null;
  setUser: (user: UserResponse | null) => void;
  clearUser: () => void;
}
