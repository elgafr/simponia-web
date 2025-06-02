'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { LoginCredentials, LoginResponse, ROLES, ROUTES } from '@/types/auth';

const publicRoutes = ['/', '/auth/login'];

export const useAuth = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const login = async (credentials: LoginCredentials) => {
    if (!mounted) return;
    
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

      // Only set localStorage and cookies after successful login
      if (mounted) {
        localStorage.setItem('token', data.access_token);
        localStorage.setItem('userRole', data.role);
        document.cookie = `token=${data.access_token}; path=/`;
        document.cookie = `userRole=${data.role}; path=/`;

        const callbackUrl = searchParams.get('callbackUrl');
        if (callbackUrl) {
          router.push(callbackUrl);
        } else {
          if (data.role === ROLES.ADMIN) {
            router.push(ROUTES.ADMIN);
          } else if (data.role === ROLES.USER) {
            router.push(ROUTES.USER);
          }
        }
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

  return { login, logout, error, isLoading, mounted };
}; 