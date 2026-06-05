import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate checking auth state on mount
    const savedUser = localStorage.getItem('simulated_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockUser = {
          uid: 'user_' + Math.random().toString(36).substr(2, 9),
          email: email,
          displayName: email.split('@')[0],
          photoURL: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`
        };
        setUser(mockUser);
        localStorage.setItem('simulated_user', JSON.stringify(mockUser));
        resolve(mockUser);
      }, 800);
    });
  };

  const loginWithGoogle = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockUser = {
          uid: 'user_' + Math.random().toString(36).substr(2, 9),
          email: 'coder@gmail.com',
          displayName: 'CodeMaster',
          photoURL: `https://api.dicebear.com/7.x/avataaars/svg?seed=coder@gmail.com`
        };
        setUser(mockUser);
        localStorage.setItem('simulated_user', JSON.stringify(mockUser));
        resolve(mockUser);
      }, 500);
    });
  };

  const logout = async () => {
    setUser(null);
    localStorage.removeItem('simulated_user');
  };

  const updateProfile = (updates) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem('simulated_user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, loginWithGoogle, logout, updateProfile }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
