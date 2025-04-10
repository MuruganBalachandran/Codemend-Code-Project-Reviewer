import React, { useEffect } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './ProtectedRoute.css';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading, checkAuthStatus } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Check authentication status on mount
  useEffect(() => {
    const verifyAuthentication = async () => {
      if (!isAuthenticated) {
        const isAuth = await checkAuthStatus();
        if (!isAuth && !isPublicRoute) {
          // Navigate with state to preserve the attempted URL
          navigate('/login', { state: { from: location.pathname } });
        }
      }
    };

    verifyAuthentication();
  }, [isAuthenticated, location]);

  // Home and About pages are public
  const isPublicRoute = location.pathname === '/' || location.pathname === '/about';

  // Show loading state while checking auth
  if (isLoading) {
    return (
      <div className="auth-loading">
        <div className="spinner"></div>
        <p>Verifying authentication...</p>
      </div>
    );
  }

  if (!isAuthenticated && !isPublicRoute) {
    return (
      <div className="protected-route-container">
        {/* Render the page content behind the overlay */}
        <div className="protected-route-content">
          {children}
        </div>

        {/* Overlay with lock */}
        <div className="protected-route-overlay">
          <div className="protected-route-message">
            <div className="protected-route-lock">
              <svg viewBox="0 0 24 24" width="64" height="64" stroke="currentColor" fill="none" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
            </div>
            <h2>This content is locked</h2>
            <p>Please login or signup to continue</p>
            <div className="protected-route-buttons">
              <a href="/login" className="protected-route-button login">Login</a>
              <a href="/signup" className="protected-route-button signup">Signup</a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
