'use client';

import { createContext, useContext, useState, useEffect } from 'react';

type UserContextType = {
  userRole: number | null;
  setUserRole: (role: number | null) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [userRole, setUserRole] = useState<number | null>(null);

  useEffect(() => {
    // Check localStorage on mount
    const storedRole = localStorage.getItem('userRole');
    if (storedRole) {
      setUserRole(Number(storedRole));
    }
  }, []);

  return (
    <UserContext.Provider value={{ userRole, setUserRole }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
} 