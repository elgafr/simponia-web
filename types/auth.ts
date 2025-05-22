export interface LoginCredentials {
  nim: string;
  password: string;
  rememberMe: boolean;
}

export interface LoginResponse {
  access_token: string;
  role: string;
  message: string;
}

export const ROLES = {
  ADMIN: '2',
  USER: '3'
} as const;

export const ROUTES = {
  ADMIN: '/dashboard-admin-community',
  USER: '/dashboard'
} as const; 