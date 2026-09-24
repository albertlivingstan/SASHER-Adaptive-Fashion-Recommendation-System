import React, { createContext, useContext, useState, useEffect } from 'react';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  provider: 'google';
  savedPreferences: string[];
  recommendationHistoryCount: number;
  lastLogin: string;
}

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isSignInModalOpen: boolean;
  openSignInModal: () => void;
  closeSignInModal: () => void;
  signInWithGoogle: (customEmail?: string, customName?: string) => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = 'sasher_auth_user_v1';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSignInModalOpen, setIsSignInModalOpen] = useState<boolean>(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Failed to load auth user from storage', e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const signInWithGoogle = async (customEmail?: string, customName?: string): Promise<void> => {
    setIsLoading(true);
    // Simulate brief authentication handshake
    await new Promise((resolve) => setTimeout(resolve, 600));

    const email = customEmail || 'albert87g@gmail.com';
    const name = customName || email.split('@')[0].replace('.', ' ').replace(/^./, (c) => c.toUpperCase());

    const newUser: UserProfile = {
      id: `google_${Date.now()}`,
      name: name.includes('Albert') ? 'Albert G.' : name,
      email: email,
      avatarUrl: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80`,
      provider: 'google',
      savedPreferences: ['Outerwear', 'Tailoring', 'Minimalist Aesthetics'],
      recommendationHistoryCount: 42,
      lastLogin: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setUser(newUser);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
    } catch (e) {
      console.error('Failed to persist auth user', e);
    }
    setIsLoading(false);
    setIsSignInModalOpen(false);
  };

  const signOut = () => {
    setUser(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.error('Failed to clear auth user', e);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        isSignInModalOpen,
        openSignInModal: () => setIsSignInModalOpen(true),
        closeSignInModal: () => setIsSignInModalOpen(false),
        signInWithGoogle,
        signOut
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
