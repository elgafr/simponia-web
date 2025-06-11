'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FormEvent, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { ROLES, ROUTES } from '@/types/auth';

export default function LoginPage() {
  const { login, error, isLoading } = useAuth();
  const router = useRouter();
  const [formErrors, setFormErrors] = useState<{
    nim?: string;
    password?: string;
  }>({});

  const validateForm = (formData: FormData) => {
    const errors: { nim?: string; password?: string } = {};
    const nim = formData.get('nim') as string;
    const password = formData.get('password') as string;

    if (!nim) {
      errors.nim = 'NIM harus diisi';
    }
    if (!password) {
      errors.password = 'Password harus diisi';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    const formData = new FormData(e.target as HTMLFormElement);
    
    if (!validateForm(formData)) {
      return;
    }

    const credentials = {
      nim: formData.get('nim') as string,
      password: formData.get('password') as string,
      rememberMe: formData.get('remember') === 'on',
    };

    try {
      // Set studentMode to false before login
      localStorage.setItem('studentMode', 'false');
      const response = await login(credentials);
      
      // Store rememberMe preference
      if (credentials.rememberMe) {
        localStorage.setItem('rememberMe', 'true');
      } else {
        localStorage.removeItem('rememberMe');
      }
      
      // Check user role and redirect accordingly
      if (response?.role === ROLES.USER) {
        // For role 3 (regular user), redirect to /dashboard
        router.push(ROUTES.USER);
      } else if (response?.role === ROLES.ADMINCOM) {
        // For role 2 (admin community), redirect to admin community dashboard
        router.push(ROUTES.ADMINCOM);
      } else if (response?.role === ROLES.SUPERADMIN) {
        // For role 1 (super admin), redirect to super admin dashboard
        router.push(ROUTES.USER);
      }
    } catch (err) {
      // Error handling sudah dihandle di useAuth hook
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Small Logo in Top Left */}
      <div className="absolute top-4 left-4 z-50">
        <Link href="/">
          <div className="relative w-[120px] h-[40px]">
            <Image
              src="/logo simponia.svg"
              alt="Simponia Logo"
              fill
              priority
              sizes="120px"
              className="object-contain"
              quality={100}
            />
          </div>
        </Link>
      </div>

      {/* Left Side - Dark Blue Background */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-b from-[#001B45] via-[#001233] to-[#001B45] text-white p-12 flex-col justify-center items-center">
      
        <div className="flex space-x-6 mb-8">
          <Image 
            src="/Source Code.svg" 
            alt="Kode" 
            width={48} 
            height={48}
            className="filter brightness-0 invert hover:scale-110 transition-transform duration-300" 
          />
          <Image 
            src="/Game Controller.svg" 
            alt="Game" 
            width={48} 
            height={48}
            className="filter brightness-0 invert hover:scale-110 transition-transform duration-300" 
          />
          <Image 
            src="/Slice.svg" 
            alt="Data" 
            width={48} 
            height={48}
            className="filter brightness-0 invert hover:scale-110 transition-transform duration-300" 
          />
          <Image 
            src="/Network.svg" 
            alt="Jaringan" 
            width={48} 
            height={48}
            className="filter brightness-0 invert hover:scale-110 transition-transform duration-300" 
          />
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Tampilkan proyek dan keahlian Anda</h2>
          <p className="text-gray-300">Portofolio Anda, Keahlian Kami</p>
        </div>
      </div>

      {/* Right Side - White Background */}
      <div className="w-full md:w-1/2 bg-white p-8 flex items-center justify-center">
        <div className="max-w-md w-full">
          <div className="flex justify-center mb-8 md:hidden">
            <Link href="/">
              <div className="relative w-[150px] h-[50px]">
                <Image
                  src="/logo simponia.svg"
                  alt="Simponia Logo"
                  fill
                  priority
                  sizes="150px"
                  className="object-contain"
                  quality={100}
                />
              </div>
            </Link>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Selamat Datang Kembali!</h1>
          
          {error && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-md">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700 font-medium">
                    {error === 'Invalid credentials' 
                      ? 'NIM atau kata sandi salah. Silakan coba lagi.'
                      : error === 'Network error'
                      ? 'Terjadi kesalahan jaringan. Silakan coba lagi.'
                      : 'Terjadi kesalahan. Silakan coba lagi.'}
                  </p>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="nim" className="block text-sm font-medium text-gray-700 mb-2">
                NIM 
              </label>
              <input
                type="text"
                id="nim"
                name="nim"
                placeholder="Masukkan NIM Anda"
                className={`w-full px-4 py-2 border text-black ${
                  formErrors.nim ? 'border-red-500' : 'border-gray-300'
                } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {formErrors.nim && (
                <p className="mt-1 text-sm text-red-600">{formErrors.nim}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Kata Sandi
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Masukkan kata sandi Anda"
                className={`w-full px-4 py-2 border text-black ${
                  formErrors.password ? 'border-red-500' : 'border-gray-300'
                } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {formErrors.password && (
                <p className="mt-1 text-sm text-red-600">{formErrors.password}</p>
              )}
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                name="remember"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
                Ingat saya
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-[#001B45] text-white py-3 px-4 rounded-md hover:bg-[#002B65] transition-colors duration-200 font-medium ${
                isLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? 'Memuat...' : 'Masuk'}
            </button>

            <div className="text-center">
              <Link 
                href="/forgot-password" 
                className="text-sm text-blue-600 hover:text-blue-800 transition-colors duration-200"
              >
                Lupa Kata Sandi?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
