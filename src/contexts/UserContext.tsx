
import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'seeker' | 'owner' | null;

interface UserContextType {
  isLoggedIn: boolean;
  userRole: UserRole;
  userName: string | null;
  login: (email: string, password: string, role: UserRole, name: string) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [userName, setUserName] = useState<string | null>(null);

  // Load user data from localStorage on component mount
  useEffect(() => {
    const storedIsLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const storedUserRole = localStorage.getItem('userRole') as UserRole;
    const storedUserName = localStorage.getItem('userName');

    if (storedIsLoggedIn && storedUserRole) {
      setIsLoggedIn(storedIsLoggedIn);
      setUserRole(storedUserRole);
      setUserName(storedUserName);
    }
  }, []);

  const login = (email: string, password: string, role: UserRole, name: string) => {
    // In a real app, this would validate credentials with a backend
    setIsLoggedIn(true);
    setUserRole(role);
    setUserName(name);

    // Store auth state in localStorage
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userRole', role || '');
    localStorage.setItem('userName', name);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserRole(null);
    setUserName(null);

    // Clear auth state from localStorage
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userName');
  };

  return (
    <UserContext.Provider value={{ isLoggedIn, userRole, userName, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
