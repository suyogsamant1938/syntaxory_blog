import { useState } from 'react';
import { FiMail, FiLock, FiUser, FiGithub } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import './LoginRegister.css';

const LoginRegister = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // TODO: Implement Supabase authentication
    console.log(isLogin ? 'Logging in...' : 'Registering...', formData);
    
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  const handleSocialLogin = (provider) => {
    // TODO: Implement social login with Supabase
    console.log(`Logging in with ${provider}`);
  };

  return (
    <div className="auth-container">
      <div className="auth-card glass">
        {/* Header */}
        <div className="auth-header">
          <h2 className="auth-title gradient-text">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="auth-subtitle">
            {isLogin 
              ? 'Sign in to continue your journey' 
              : 'Join our community of developers'}
          </p>
        </div>

        {/* Social Login */}
        <div className="social-login">
          <button 
            className="social-btn"
            onClick={() => handleSocialLogin('google')}
          >
            <FcGoogle />
            <span>Continue with Google</span>
          </button>
          <button 
            className="social-btn"
            onClick={() => handleSocialLogin('github')}
          >
            <FiGithub />
            <span>Continue with GitHub</span>
          </button>
        </div>

        {/* Divider */}
        <div className="auth-divider">
          <span>or</span>
        </div>

        {/* Form */}
        <form className="auth-form" onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="form-group">
              <label htmlFor="name" className="form-label">
                <FiUser />
                <span>Full Name</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="form-input"
                placeholder="John Doe"
                required={!isLogin}
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email" className="form-label">
              <FiMail />
              <span>Email Address</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-input"
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              <FiLock />
              <span>Password</span>
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="form-input"
              placeholder="••••••••"
              required
            />
          </div>

          {!isLogin && (
            <div className="form-group">
              <label htmlFor="confirmPassword" className="form-label">
                <FiLock />
                <span>Confirm Password</span>
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="form-input"
                placeholder="••••••••"
                required={!isLogin}
              />
            </div>
          )}

          {isLogin && (
            <div className="form-footer">
              <a href="#" className="forgot-link">Forgot password?</a>
            </div>
          )}

          <button 
            type="submit" 
            className="btn btn-primary btn-full"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="loading-spinner"></span>
            ) : (
              <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
            )}
          </button>
        </form>

        {/* Toggle */}
        <div className="auth-toggle">
          <span>
            {isLogin ? "Don't have an account?" : 'Already have an account?'}
          </span>
          <button 
            className="toggle-btn"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? 'Sign Up' : 'Sign In'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginRegister;
