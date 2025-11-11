import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LeaderboardPage() {
  const navigate = useNavigate();
  const [scores, setScores] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('trivia_scores') || '[]');
    setScores(saved);
  }, []);

  return (
    <div>
      <button className="btn small" onClick={() => navigate('/')}>⬅ Vissza</button>
      <div className="card">
        <h2>Ponttábla</h2>
        <ul className="leaderboard-list">
          {scores.slice(0, 10).map((s, i) => (
            <li key={i} className="leaderboard-item">
              <span>{i + 1}. {s.name}</span>
              <span>{s.score}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
