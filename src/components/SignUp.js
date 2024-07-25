import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';

function Signup({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
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

    if (password !== confirmPassword) {
      setError("Passwords don't match!");
      return;
    }

    setIsLoading(true);

    try {
      
      await new Promise(resolve => setTimeout(resolve, 1000)); 
      console.log('Signup submitted', { email, password });
      alert('Signup successful');
      onLogin(); 
    } catch (error) {
      setError('Signup failed: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    setIsLoading(true);
    setError('');
    try {
      console.log('Google Sign-Up successful', credentialResponse);
      await new Promise(resolve => setTimeout(resolve, 1000)); 
      alert('Google Sign-Up successful');
      onLogin(); 
    } catch (error) {
      setError('Google Sign-Up failed: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-content">
        <h1>Create an account</h1>
        <p>Please fill in the details to sign up</p>
        
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

          <div className="input-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <div className="password-input">
              <input 
                type={showPassword ? "text" : "password"} 
                id="confirmPassword" 
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          </div>
          
          <button type="submit" className="sign-up-button" disabled={isLoading}>
            {isLoading ? 'Signing Up...' : 'Sign Up'}
          </button>
        </form>
        
        <div className="divider">Or sign up with</div>
        
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={(error) => {
            console.log('Login Failed', error);
            setError('Google Sign-Up failed. Please try again.');
          }}
          disabled={isLoading}
        />
        
        <div className="login-link">
          Already have an account? <button onClick={onLogin} disabled={isLoading}>Login</button>
        </div>
      </div>
    </div>
  );
}

export default Signup;