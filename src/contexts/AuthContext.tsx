import { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextData {
  token: string | null;
  userId: string | null;
  setAuthData: (newToken: string | null, newUserId: string | null) => void; 
}

const AuthContext = createContext<AuthContextData | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null); 

  const setAuthData = (newToken: string | null, newUserId: string | null) => {
    setToken(newToken);
    setUserId(newUserId);
  };

  return (
    <AuthContext.Provider value={{ token, userId, setAuthData }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};
