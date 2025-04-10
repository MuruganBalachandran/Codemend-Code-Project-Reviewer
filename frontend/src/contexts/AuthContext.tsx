import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../services/api';

// Types
interface User {
  id: string;
  userId: string;
  name: string;
  username: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (userData: SignupData) => Promise<void>;
  logout: () => void;
  checkAuthStatus: () => Promise<boolean>;
}

interface SignupData {
  fullName: string;
  username: string;
  email: string;
  password: string;
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [isLoading, setIsLoading] = useState<boolean>(true); // Start with loading true
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(localStorage.getItem('isLoggedIn') === 'true');

  // Check if user is authenticated on mount and when token changes
  useEffect(() => {
    const verifyToken = async () => {
      // If we have a token in state, verify it
      if (token) {
        try {
          setIsLoading(true);
          
          // Set token in axios headers
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          
          // Get user data
          const response = await api.get('/api/auth/me');
          
          if (response.data && response.data.data) {
            // Set user data
            setUser(response.data.data);
            setIsAuthenticated(true);
            localStorage.setItem('isLoggedIn', 'true');
          } else {
            // Invalid response
            handleAuthFailure();
          }
        } catch (error) {
          console.error('Auth verification failed:', error);
          handleAuthFailure();
        } finally {
          setIsLoading(false);
        }
      } else {
        // No token, so definitely not authenticated
        handleAuthFailure();
        setIsLoading(false);
      }
    };

    // Helper function to handle auth failures
    const handleAuthFailure = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('isLoggedIn');
      setToken(null);
      setUser(null);
      setIsAuthenticated(false);
      delete api.defaults.headers.common['Authorization'];
    };

    verifyToken();
  }, [token]);

  // Login function
  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      
      const response = await api.post('/api/auth/login', { email, password });
      const { token: newToken } = response.data;
      
      if (!newToken) {
        throw new Error('No token received from server');
      }
      
      // Store token
      localStorage.setItem('token', newToken);
      localStorage.setItem('isLoggedIn', 'true');
      setToken(newToken);
      
      // Set auth header
      api.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
      
      // Get user data
      const userResponse = await api.get('/api/auth/me');
      setUser(userResponse.data.data);
      setIsAuthenticated(true);
      
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Signup function
  const signup = async (userData: SignupData) => {
    try {
      setIsLoading(true);
      
      // Call signup API but don't automatically log in user
      const response = await api.post('/api/auth/register', {
        fullName: userData.fullName,
        username: userData.username,
        email: userData.email,
        password: userData.password
      });
      
      // Don't set token or authenticate here - just return success
      return response.data;
      
    } catch (error) {
      console.error('Signup failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('isLoggedIn');
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
    delete api.defaults.headers.common['Authorization'];
  };

  // Check authentication status
  const checkAuthStatus = async (): Promise<boolean> => {
    if (!token) return false;
    
    try {
      const response = await api.get('/api/auth/me');
      return !!response.data.data;
    } catch (error) {
      localStorage.removeItem('token');
      localStorage.removeItem('isLoggedIn');
      setIsAuthenticated(false);
      return false;
    }
  };

  // Context value
  const contextValue: AuthContextType = {
    user,
    token,
    isLoading,
    isAuthenticated,
    login,
    signup,
    logout,
    checkAuthStatus
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for using auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
