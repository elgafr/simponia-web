'use client';

import { User, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useUser } from "@/context/UserContext";

export default function ProfileDropdown() {
  const router = useRouter();
  const { setUserRole } = useUser();

  const handleLogout = () => {
    // Clear user role from context and localStorage
    setUserRole(null);
    localStorage.removeItem('userRole');
    // Redirect to home page
    router.push('/');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="relative w-8 h-8 rounded-full bg-gray-900 text-white hover:bg-blue-800 transition-colors duration-300 data-[state=open]:bg-blue-800"
        >
          <User className="w-5 h-5 text-white" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40 bg-blue-900 border-blue-800">
        <DropdownMenuItem 
          onClick={() => router.push('/profile-super-admin')} 
          className="cursor-pointer text-white focus:bg-blue-950 focus:text-white hover:bg-blue-950 hover:text-white"
        >
          <User className="mr-2 h-4 w-4 text-white" />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-blue-800" />
        <DropdownMenuItem 
          onClick={handleLogout} 
          className="cursor-pointer text-white focus:bg-blue-950 focus:text-white hover:bg-blue-950 hover:text-white"
        >
          <LogOut className="mr-2 h-4 w-4 text-white" />
          <span>Log Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
} 