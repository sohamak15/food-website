import React from 'react';

function SuccessfulLogin({ onLogout, onGoToTracking }) {
  const user = React.useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem('user'));
    } catch (error) {
      console.error('Error parsing user data:', error);
      return null;
    }
  }, []);

  const handleLogout = () => {
    try {
      localStorage.removeItem('user'); 
      onLogout(); 
    } catch (error) {
      console.error('Error during logout:', error);
      alert('Logout failed. Please try again.');
    }
  };

  return (
    <div className="successful-login-container">
      <div className="success-icon">✓</div>
      <h1>Login Successful!</h1>
      <p>Welcome back, you are now logged in.</p>
      
      {user && (
        <div className="user-info">
          <p>User: {user.name}</p>
          {user.email && <p>Email: {user.email}</p>}
        </div>
      )}
      
      <button 
        className="tracking-button"
        onClick={onGoToTracking}
      >
        Go to Tracking Screen
      </button>
      
      <button 
        className="logout-button"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
}

export default SuccessfulLogin;