import React, { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';

function TrackingScreen({ onLogout }) {
  const [time, setTime] = useState(new Date());
  const [speed, setSpeed] = useState(1);
  const [shareUrl, setShareUrl] = useState('');
  const [quote, setQuote] = useState('');
  const clockRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(prevTime => {
        const newTime = new Date(prevTime.getTime() - 1000 * speed);
        return newTime;
      });
    }, 1000 / speed);

    return () => clearInterval(timer);
  }, [speed]);

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const response = await fetch('https://api.quotable.io/random');
        const data = await response.json();
        setQuote(data.content);
      } catch (error) {
        console.error('Error fetching quote:', error);
      }
    };

    fetchQuote();
    const quoteInterval = setInterval(fetchQuote, 5000);

    return () => clearInterval(quoteInterval);
  }, []);

  useEffect(() => {
    drawClock();
  }, [time]);

  const drawClock = () => {
    const canvas = clockRef.current;
    const ctx = canvas.getContext('2d');
    const radius = canvas.height / 2;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.arc(radius, radius, radius - 10, 0, 2 * Math.PI);
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.strokeStyle = '#333';
    ctx.stroke();

   
    for (let i = 0; i < 12; i++) {
      const angle = (i - 3) * (Math.PI * 2) / 12;
      ctx.beginPath();
      ctx.moveTo(radius + Math.cos(angle) * (radius - 20), radius + Math.sin(angle) * (radius - 20));
      ctx.lineTo(radius + Math.cos(angle) * (radius - 30), radius + Math.sin(angle) * (radius - 30));
      ctx.strokeStyle = '#333';
      ctx.lineWidth = 2;
      ctx.stroke();
    }

  
    drawHand(ctx, ((time.getHours() % 12) / 12) * 2 * Math.PI - Math.PI / 2, radius * 0.5, 6);
    drawHand(ctx, ((time.getMinutes() / 60) * 2 * Math.PI - Math.PI / 2), radius * 0.8, 4);
    drawHand(ctx, ((time.getSeconds() / 60) * 2 * Math.PI - Math.PI / 2), radius * 0.9, 2);
  };

  const drawHand = (ctx, pos, length, width) => {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = 'round';
    ctx.moveTo(150, 150);
    ctx.rotate(pos);
    ctx.lineTo(150, 150 - length);
    ctx.stroke();
    ctx.rotate(-pos);
  };

  const handleShare = () => {
    const uniqueId = uuidv4();
    const url = `${window.location.origin}/shared/${uniqueId}?speed=${speed}`;
    setShareUrl(url);
  };

  return (
    <div className="tracking-screen login-container">
      <div className="login-content">
        <h1>Tracking Screen</h1>
        <canvas ref={clockRef} width="300" height="300"></canvas>
        <div className="input-group">
          <label htmlFor="speed-slider">Clock Speed: {speed.toFixed(1)}x</label>
          <input
            id="speed-slider"
            type="range"
            min="0.1"
            max="5"
            step="0.1"
            value={speed}
            onChange={(e) => setSpeed(parseFloat(e.target.value))}
          />
        </div>
        <button className="sign-in-button" onClick={handleShare}>Share</button>
        {shareUrl && (
          <div className="input-group">
            <label>Share this URL:</label>
            <input type="text" value={shareUrl} readOnly />
          </div>
        )}
        <div className="quote">
          <p>{quote}</p>
        </div>
        <button className="logout-button" onClick={onLogout}>Logout</button>
      </div>
    </div>
  );
}

export default TrackingScreen;