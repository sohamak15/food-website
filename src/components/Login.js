import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';

function Login({ onSignup, onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isPasswordValid = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!isEmailValid(email)) {
      setError('Please enter a valid email address');
      return;
    }

    if (!isPasswordValid(password)) {
      setError('Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character');
      return;
    }

    setIsLoading(true);

    try {
     
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Login submitted', { email, password });
      
      
      const userData = { name: email.split('@')[0], email: email };
      localStorage.setItem('user', JSON.stringify(userData));
      
      onLoginSuccess(); 
    } catch (error) {
      setError('Login failed: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    setIsLoading(true);
    setError('');
    try {
      console.log('Google Sign-In successful', credentialResponse);
      await new Promise(resolve => setTimeout(resolve, 1000)); 
      const userData = { name: 'Google User', email: 'google@example.com' }; 
      localStorage.setItem('user', JSON.stringify(userData));
      
      onLoginSuccess(); 
    } catch (error) {
      setError('Google Sign-In failed: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <h1>Login to your account</h1>
        <p>Please sign in to your account</p>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email Address</label>
            <input 
              type="email" 
              id="email" 
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <div className="password-input">
              <input 
                type={showPassword ? "text" : "password"} 
                id="password" 
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span 
                className="password-toggle" 
                onClick={() => setShowPassword(!showPassword)}
              >
                👁️
              </span>
            </div>
          </div>
          
          <div className="forgot-password">
            <a href="#" onClick={(e) => { e.preventDefault(); alert('Forgot password functionality not implemented'); }}>Forgot password?</a>
          </div>
          
          <button type="submit" className="sign-in-button" disabled={isLoading}>
            {isLoading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
        
        <div className="divider">Or sign in with</div>
        
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={(error) => {
            console.log('Login Failed', error);
            setError('Google Sign-In failed. Please try again.');
          }}
          disabled={isLoading}
        />
        
        <div className="register">
          Don't have an account? <button onClick={onSignup} disabled={isLoading}>Register</button>
        </div>
      </div>
    </div>
  );
}

export default Login;