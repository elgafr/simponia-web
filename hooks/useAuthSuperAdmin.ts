import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { LoginCredentials, LoginResponse, ROLES, ROUTES } from '@/types/auth';

const publicRoutes = ['/', '/auth/login-admin'];

export const useAuthSuperAdmin = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (credentials: LoginCredentials) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const data: LoginResponse = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login gagal');
      }

      // Simpan token dan role
      localStorage.setItem('token', data.access_token);
      localStorage.setItem('userRole', data.role);
      document.cookie = `token=${data.access_token}; path=/`;
      document.cookie = `userRole=${data.role}; path=/`;

      // Hanya izinkan SUPERADMIN (role = '1')
      if (data.role !== ROLES.SUPERADMIN) {
        throw new Error('Akses ditolak. Hanya Super Admin yang dapat login.');
      }

      // Redirect ke halaman Super Admin
      const callbackUrl = searchParams.get('callbackUrl');
      if (callbackUrl) {
        router.push(callbackUrl);
      } else {
        router.push(ROUTES.SUPERADMIN);
      }

      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Login gagal';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    // Hapus token dan role
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    document.cookie = 'userRole=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    
    // Redirect ke home page
    router.push('/');
  };

  return { login, logout, error, isLoading };
};