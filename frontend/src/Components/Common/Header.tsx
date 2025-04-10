import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './Header.css';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeLink, setActiveLink] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Replace mock authentication with real auth
  const { isAuthenticated, logout } = useAuth();

  // Update active link based on the current path
  useEffect(() => {
    const path = location.pathname;
    if (path === '/') {
      setActiveLink('home');
    } else {
      setActiveLink(path.slice(1)); // Remove the leading slash
    }
  }, [location]);

  // Close mobile menu when window is resized to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [mobileMenuOpen]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Handle logout
  const handleLogout = () => {
    logout();
    // Close menu and redirect to home
    setMobileMenuOpen(false);
    navigate('/');
  };

  // Navigation items with paths
  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Review', path: '/review' },
    { name: 'Projects', path: '/projects' },
    { name: 'About', path: '/about' },
  ];

  return (
    <header className="header">
      <div className="header-container">
        {/* Logo */}
        <div className="logo">
          <Link to="/">
            <h1>Code<span className="highlight-mend">Mend</span></h1>
          </Link>
        </div>
        
        {/* Mobile menu toggle */}
        <button 
          className="mobile-menu-toggle" 
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          <div className={`hamburger ${mobileMenuOpen ? 'open' : ''}`}>
            <span></span>
          </div>
        </button>
        
        {/* Navigation */}
        <nav className={`navigation ${mobileMenuOpen ? 'open' : ''}`}>
          <ul>
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={activeLink === (item.path === '/' ? 'home' : item.path.slice(1)) ? 'active' : ''}
                  onClick={() => {
                    setActiveLink(item.path === '/' ? 'home' : item.path.slice(1));
                    setMobileMenuOpen(false);
                  }}
                >
                  {item.name}
                  {activeLink === (item.path === '/' ? 'home' : item.path.slice(1)) && <span className="underline" />}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* User controls */}
        <div className={`user-controls ${mobileMenuOpen ? 'open' : ''}`}>
          {isAuthenticated ? (
            <>
              {/* Profile Icon */}
              <Link to="/profile" className="icon-button" aria-label="Profile">
                <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" fill="none">
                  <circle cx="12" cy="8" r="5" />
                  <path d="M20 21v-2a7 7 0 0 0-14 0v2" />
                </svg>
              </Link>
              
              {/* Notifications Icon */}
              <Link to="/notifications" className="icon-button" aria-label="Notifications">
                <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" fill="none">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                  <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                </svg>
              </Link>
              
              {/* Settings Icon - Simplified */}
              <Link to="/settings" className="icon-button" aria-label="Settings">
                <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">strokeWidth="2"{'>'}
                  <circle cx="12" cy="12" r="3" />
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82 1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
                </svg>
              </Link>
              
              <button onClick={handleLogout} className="auth-button logout">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="auth-button login">Login</Link>
              <Link to="/signup" className="auth-button signup">Signup</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;