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
  SUPERADMIN: '1',
  ADMINCOM: '2',
  USER: '3'
} as const;

export const ROUTES = {
  SUPERADMIN: '/dashboard-super-admin',
  ADMINCOM: '/dashboard-admin-community',
  USER: '/dashboard'
} as const;
