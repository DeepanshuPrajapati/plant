import React, { createContext, useContext, useState } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  user: string | null;
  login: (username: string, email: string) => void;
  logout: () => void;
  verifyOTP: (otp: string) => boolean;
  resendOTP: () => void;
  pendingEmail: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<string | null>(null);
  const [pendingEmail, setPendingEmail] = useState<string | null>(null);
  const [currentOTP, setCurrentOTP] = useState<string | null>(null);

  const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const login = (username: string, email: string) => {
    const otp = generateOTP();
    setCurrentOTP(otp);
    setPendingEmail(email);
    // In a real application, you would send this OTP to the user's email
    console.log(`OTP for ${email}: ${otp}`); // For demo purposes only
  };

  const verifyOTP = (otp: string) => {
    if (otp === currentOTP) {
      setIsAuthenticated(true);
      setUser(pendingEmail?.split('@')[0] || 'User');
      setPendingEmail(null);
      setCurrentOTP(null);
      return true;
    }
    return false;
  };

  const resendOTP = () => {
    if (pendingEmail) {
      const newOTP = generateOTP();
      setCurrentOTP(newOTP);
      // In a real application, you would send this OTP to the user's email
      console.log(`New OTP for ${pendingEmail}: ${newOTP}`); // For demo purposes only
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setPendingEmail(null);
    setCurrentOTP(null);
  };

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      user, 
      login, 
      logout, 
      verifyOTP, 
      resendOTP,
      pendingEmail 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}