import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { ROLES, ROUTES } from '@/types/auth';

// Daftar rute yang bisa diakses tanpa login
const publicRoutes = ['/', '/auth/login', '/auth/login-admin'];

// Daftar ekstensi file yang diizinkan tanpa login
const publicFileExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.svg', '.ico', '.webp'];

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token');
  const userRole = request.cookies.get('userRole')?.value;
  const pathname = request.nextUrl.pathname;

  // Cek apakah path adalah file publik
  const isPublicFile = publicFileExtensions.some(ext => pathname.toLowerCase().endsWith(ext));
  if (isPublicFile) {
    return NextResponse.next();
  }

  // Jika mencoba akses rute public, izinkan akses
  if (publicRoutes.some(route => pathname === route)) {
    return NextResponse.next();
  }

  // Jika tidak ada token dan mencoba akses rute protected
  if (!token) {
    const response = NextResponse.redirect(new URL('/auth/login', request.url));
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <script>
            localStorage.removeItem('token');
            localStorage.removeItem('userRole');
          </script>
        </head>
        <body>
          <script>
            window.location.href = '/auth/login';
          </script>
        </body>
      </html>
    `;
    return new NextResponse(html, {
      status: 200,
      headers: {
        'Content-Type': 'text/html',
      },
    });
  }

  // Jika ada token, cek role untuk akses rute
  if (token) {
    // Cek jika URL mengandung 'admin-community'
    if (pathname.includes('admin-community')) {
      if (userRole !== ROLES.ADMINCOM && userRole !== ROLES.SUPERADMIN) {
        const response = NextResponse.redirect(new URL('/auth/login', request.url));
        const html = `
          <!DOCTYPE html>
          <html>
            <head>
              <script>
                localStorage.removeItem('token');
                localStorage.removeItem('userRole');
              </script>
            </head>
            <body>
              <script>
                window.location.href = '/auth/login';
              </script>
            </body>
          </html>
        `;
        return new NextResponse(html, {
          status: 200,
          headers: {
            'Content-Type': 'text/html',
          },
        });
      }
    }

    // Rute yang bisa diakses user, admin community, dan super admin
    if (pathname.startsWith('/dashboard') || 
        pathname.startsWith('/portfolio') || 
        pathname.startsWith('/showcase') || 
        pathname.startsWith('/profile') ||
        pathname.startsWith('/faq')) {
      if (userRole !== ROLES.USER && userRole !== ROLES.ADMINCOM && userRole !== ROLES.SUPERADMIN) {
        const response = NextResponse.redirect(new URL('/auth/login', request.url));
        const html = `
          <!DOCTYPE html>
          <html>
            <head>
              <script>
                localStorage.removeItem('token');
                localStorage.removeItem('userRole');
              </script>
            </head>
            <body>
              <script>
                window.location.href = '/auth/login';
              </script>
            </body>
          </html>
        `;
        return new NextResponse(html, {
          status: 200,
          headers: {
            'Content-Type': 'text/html',
          },
        });
      }
    }

    // Rute yang hanya bisa diakses super admin
    if (pathname.includes('super-admin')) {
      if (userRole !== ROLES.SUPERADMIN) {
        const response = NextResponse.redirect(new URL('/auth/login', request.url));
        const html = `
          <!DOCTYPE html>
          <html>
            <head>
              <script>
                localStorage.removeItem('token');
                localStorage.removeItem('userRole');
              </script>
            </head>
            <body>
              <script>
                window.location.href = '/auth/login';
              </script>
            </body>
          </html>
        `;
        return new NextResponse(html, {
          status: 200,
          headers: {
            'Content-Type': 'text/html',
          },
        });
      }
    }
  }

  return NextResponse.next();
}

// Konfigurasi path yang akan dijalankan middleware
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