import React, { useState } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Onboarding from './components/Onboarding';
import Login from './components/Login';
import Signup from './components/SignUp';
import SuccessfulLogin from './components/LoginSuc';
import TrackingScreen from './components/TrackingScreen';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('onboarding');

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
      <div className="App">
        {currentPage === 'onboarding' && (
          <Onboarding onComplete={() => handlePageChange('login')} />
        )}
        {currentPage === 'login' && (
          <Login 
            onSignup={() => handlePageChange('signup')} 
            onLoginSuccess={() => handlePageChange('loginSuc')}
          />
        )}
        {currentPage === 'signup' && (
          <Signup onLogin={() => handlePageChange('login')} />
        )}
        {currentPage === 'loginSuc' && (
          <SuccessfulLogin 
            onLogout={() => handlePageChange('login')}
            onGoToTracking={() => handlePageChange('tracking')}
          />
        )}
        {currentPage === 'tracking' && (
          <TrackingScreen onLogout={() => handlePageChange('login')} />
        )}
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;