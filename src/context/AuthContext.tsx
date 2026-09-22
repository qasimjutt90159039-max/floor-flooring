import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, pass?: string) => Promise<{ success: boolean; message?: string }>;
  register: (name: string, email: string, phone: string, role?: 'customer' | 'contractor') => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  isAdmin: boolean;
  isContractor: boolean;
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem('fff_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem('fff_token') || null;
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('fff_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('fff_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('fff_user');
    }
  }, [user]);

  useEffect(() => {
    if (token) {
      localStorage.setItem('fff_token', token);
    } else {
      localStorage.removeItem('fff_token');
    }
  }, [token]);

  useEffect(() => {
    localStorage.setItem('fff_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const login = async (email: string, password = ''): Promise<{ success: boolean; message?: string }> => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (data.success && data.user) {
        setUser(data.user);
        setToken(data.token);
        return { success: true };
      }
      return { success: false, message: data.message || 'Login failed' };
    } catch {
      // Local fallback for offline / preview
      if (email.toLowerCase().includes('admin')) {
        const adminUser: User = {
          id: 'usr-admin',
          name: 'Showroom Admin',
          email: 'admin@firstfloorfloorings.pk',
          phone: '0321-35304261',
          role: 'admin',
        };
        setUser(adminUser);
        setToken('admin-token');
        return { success: true };
      }
      if (email.toLowerCase().includes('contractor') || email.toLowerCase().includes('architect')) {
        const contractorUser: User = {
          id: 'usr-contractor',
          name: 'Studio Linea (Trade Partner)',
          email,
          phone: '0300-3456789',
          role: 'contractor',
          companyName: 'Studio Linea Architects'
        };
        setUser(contractorUser);
        setToken('contractor-token');
        return { success: true };
      }
      const custUser: User = {
        id: `usr-${Date.now()}`,
        name: email.split('@')[0],
        email,
        phone: '0321-0000000',
        role: 'customer',
      };
      setUser(custUser);
      setToken('customer-token');
      return { success: true };
    }
  };

  const register = async (name: string, email: string, phone: string, role: 'customer' | 'contractor' = 'customer'): Promise<{ success: boolean; message?: string }> => {
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, role }),
      });
      const data = await res.json();
      if (data.success && data.user) {
        setUser(data.user);
        setToken(data.token);
        return { success: true };
      }
      return { success: false, message: data.message || 'Registration failed' };
    } catch {
      const newUser: User = {
        id: `usr-${Date.now()}`,
        name,
        email,
        phone,
        role,
      };
      setUser(newUser);
      setToken('token');
      return { success: true };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist(prev =>
      prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
    );
  };

  const removeFromWishlist = (productId: string) => {
    setWishlist(prev => prev.filter(id => id !== productId));
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        register,
        logout,
        isAdmin: user?.role === 'admin',
        isContractor: user?.role === 'contractor',
        wishlist,
        toggleWishlist,
        removeFromWishlist,
        isInWishlist,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
