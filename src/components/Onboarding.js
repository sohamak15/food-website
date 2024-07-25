import React, { useState } from 'react';

const screens = [
  {
    title: "We serve incomparable delicacies",
    description: "All the best restaurants with their top menu waiting for you, they can't wait for your order!!",
    background: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
  },
  {
    title: "Fast and reliable delivery",
    description: "Our delivery partners ensure your food arrives hot and fresh, right at your doorstep!",
    background: "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
  },
  {
    title: "Easy ordering process",
    description: "Browse menus, customize your order, and pay securely - all with just a few taps!",
    background: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
  }
];

function Onboarding({ onComplete }) {
  const [currentScreen, setCurrentScreen] = useState(0);

  const nextScreen = () => {
    if (currentScreen === screens.length - 1) {
      onComplete();
    } else {
      setCurrentScreen(currentScreen + 1);
    }
  };

  const screen = screens[currentScreen];

  return (
    <div className="onboarding-container" style={{backgroundImage: `url(${screen.background})`}}>
      <div className="content">
        <div className="orange-box">
          <h1>{screen.title}</h1>
          <p>{screen.description}</p>
          <div className="dots">
            {screens.map((_, index) => (
              <span key={index} className={`dot ${index === currentScreen ? 'active' : ''}`}></span>
            ))}
          </div>
          <div className="buttons">
            <button className="skip" onClick={onComplete}>Skip</button>
            <button className="next" onClick={nextScreen}>
              {currentScreen === screens.length - 1 ? 'Get Started →' : 'Next →'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Onboarding;