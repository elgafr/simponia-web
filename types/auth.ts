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
    ADMINCOM: '/dashboard-admin-community',
    SUPERADMIN: '/dashboard-super-admin',
    USER: '/dashboard'
  } as const; 