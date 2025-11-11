import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="card center" style={{flexDirection: 'column', gap: '12px'}}>
      <h1>🎮 Trivia Battle</h1>
      <p>Válaszolj gyorsan és szerezz minél több pontot!</p>
      <div style={{display: 'flex', gap: '10px', marginTop: '12px'}}>
        <button className="btn" onClick={() => navigate('/quiz')}>Játék indítása</button>
        <button className="btn" onClick={() => navigate('/leaderboard')}>Ponttábla</button>
      </div>
    </div>
  );
}
