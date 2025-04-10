import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Signup.css';
import { useAuth } from '../../contexts/AuthContext';

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [successMessage, setSuccessMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const { signup } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear specific error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = {...prev};
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      // Call signup from auth context but don't automatically login
      await signup({
        fullName: formData.fullName,
        username: formData.username,
        email: formData.email,
        password: formData.password
      });
      
      // Show success message
      setSuccessMessage('Account created successfully! Redirecting to login...');
      
      // Redirect to login page after a delay
      setTimeout(() => {
        navigate('/login', { 
          state: { 
            email: formData.email,
            message: 'Your account has been created successfully. Please log in.' 
          } 
        });
      }, 2000);
      
    } catch (err: any) {
      console.error('Signup error:', err);
      
      // Check if it's a database connection error
      if (err.response?.data?.isDbError) {
        setErrors({
          general: "Database connection error. Please try again later or contact support."
        });
        // Show detailed instructions for the developer
        console.error(
          "MongoDB Connection Error: Your IP address needs to be whitelisted in MongoDB Atlas.\n" +
          "1. Log in to MongoDB Atlas (https://cloud.mongodb.com)\n" +
          "2. Go to Network Access under Security\n" +
          "3. Click 'Add IP Address', then add your current IP or use '0.0.0.0/0' for all IPs\n" +
          "4. Click Confirm and wait for the changes to apply"
        );
        return;
      }
      
      // Handle different error types
      if (err.response?.data?.errors) {
        // Handle validation errors
        const validationErrors: {[key: string]: string} = {};
        err.response.data.errors.forEach((error: any) => {
          validationErrors[error.param] = error.msg;
        });
        setErrors(validationErrors);
      } else {
        // Handle generic error
        setErrors({
          general: err.response?.data?.error || 
            'Failed to create account. Please try again.'
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = () => {
    setIsLoading(true);
    // Implement Google signup logic here
    console.log('Google signup initiated');
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      navigate('/');
    }, 1500);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(prev => !prev);
  };

  return (
    <div className="auth-page signup-page">
      <div className="auth-container">
        <div className="auth-form-container">
          <div className="auth-header">
            <h1>Create an Account</h1>
            <p>Join thousands of developers building better software with CodeMend</p>
          
          {successMessage && <div className="auth-success">{successMessage}</div>}
          {errors.general && <div className="auth-error">{errors.general}</div>}
          
          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>
              <div className="input-container">
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={`input-field ${errors.fullName ? 'error' : ''}`}
                />
                <svg className="input-icon" viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" fill="none">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
              {errors.fullName && <div className="input-error">{errors.fullName}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="username">Username</label>
              <div className="input-container">
                <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="johndoe123"
                  value={formData.username}
                  onChange={handleChange}
                  className={`input-field ${errors.username ? 'error' : ''}`}
                />
                <svg className="input-icon" viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" fill="none">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
              {errors.username && <div className="input-error">{errors.username}</div>}
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <div className="input-container">
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  className={`input-field ${errors.email ? 'error' : ''}`}
                />
                <svg className="input-icon" viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" fill="none">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </div>
              {errors.email && <div className="input-error">{errors.email}</div>}
            </div>
            
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="input-container">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  className={`input-field ${errors.password ? 'error' : ''}`}
                />
                <span className="password-toggle" onClick={togglePasswordVisibility}>
                  {showPassword ? (
                    <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" fill="none">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" fill="none">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </span>
                <svg className="input-icon" viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" fill="none">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
              </div>
              {errors.password && <div className="input-error">{errors.password}</div>}
            </div>
            
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <div className="input-container">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`input-field ${errors.confirmPassword ? 'error' : ''}`}
                />
                <span className="password-toggle" onClick={toggleConfirmPasswordVisibility}>
                  {showConfirmPassword ? (
                    <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" fill="none">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" fill="none">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </span>
                <svg className="input-icon" viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" fill="none">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
              </div>
              {errors.confirmPassword && <div className="input-error">{errors.confirmPassword}</div>}
            </div>
            
            <div className="terms-agreement">
              <input type="checkbox" id="terms" required />
              <label htmlFor="terms">I agree to the <Link to="/terms">Terms of Service</Link> and <Link to="/privacy">Privacy Policy</Link></label>
            </div>
            
            <button 
              type="submit" 
              className={`auth-button primary-button ${isLoading ? 'loading' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? 
                <><span className="spinner"></span>Creating account...</> : 
                'Create Account'
              }
            </button>
          </form>
          
          <div className="auth-divider">
            <span>or</span>
          </div>
          
          <button 
            onClick={handleGoogleSignup} 
            className="google-auth-button"
            disabled={isLoading}
          >
            <svg viewBox="0 0 24 24" width="18" height="18">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Sign up with Google
          </button>
          
          <div className="auth-footer">
            <p>Already have an account? <Link to="/login" className="auth-link">Login</Link></p>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default Signup;
