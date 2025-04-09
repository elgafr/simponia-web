'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent } from 'react';
import { useUser } from '../../../../context/UserContext';

export default function LoginPage() {
  const router = useRouter();
  const { setUserRole } = useUser();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    // Set user role to 3 in both context and localStorage
    setUserRole(3);
    localStorage.setItem('userRole', '3');
    
    // Redirect to home page
    router.push('/');
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Dark Blue Background */}
      <div className="hidden md:flex md:w-1/2 bg-[#011029] text-white p-12 flex-col justify-center items-center">
        <div className="flex space-x-6 mb-8">
          <Image 
            src="/Source Code.svg" 
            alt="Code" 
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
            alt="Network" 
            width={48} 
            height={48}
            className="filter brightness-0 invert hover:scale-110 transition-transform duration-300" 
          />
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Showcase your project and skill;</h2>
          <p className="text-gray-300">Your Portfolio, Our Expertise</p>
        </div>
      </div>

      {/* Right Side - White Background */}
      <div className="w-full md:w-1/2 bg-white p-8 flex items-center justify-center">
        <div className="max-w-md w-full">
          <h1 className="text-2xl font-bold text-gray-900 mb-8">Log in to Simponia!</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="nim" className="block text-sm font-medium text-gray-700 mb-2">
                NIM / Username
              </label>
              <input
                type="text"
                id="nim"
                name="nim"
                placeholder="Input your NIM/Username"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Input your password"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                name="remember"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
                remember me!
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200"
            >
              Login
            </button>

            <div className="text-center">
              <Link 
                href="/forgot-password" 
                className="text-sm text-blue-600 hover:text-blue-800 transition-colors duration-200"
              >
                Forgot Password?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
