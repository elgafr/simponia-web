import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { ROLES, ROUTES } from '@/types/auth';

// Daftar rute yang bisa diakses tanpa login
const publicRoutes = ['/', '/auth/login'];

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token');
  const userRole = request.cookies.get('userRole')?.value;
  const pathname = request.nextUrl.pathname;

  // Jika mencoba akses rute public, izinkan akses
  if (publicRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // Jika tidak ada token dan mencoba akses rute protected
  if (!token) {
    // Redirect ke login dengan menyimpan URL asli untuk redirect setelah login
    const loginUrl = new URL('/auth/login', request.url);
    loginUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Jika ada token, cek role untuk akses rute
  if (token) {
    // Rute yang hanya bisa diakses admin
    if (pathname.startsWith('/dashboard-admin-community')) {
      if (userRole !== ROLES.ADMIN) {
        return NextResponse.redirect(new URL('/', request.url));
      }
    }

    // Rute yang hanya bisa diakses user
    if (pathname.startsWith('/dashboard') || 
        pathname.startsWith('/portfolio')) {
      if (userRole !== ROLES.USER) {
        return NextResponse.redirect(new URL('/', request.url));
      }
    }
  }

  return NextResponse.next();
}

// Konfigurasi rute yang perlu diproteksi
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
}; 