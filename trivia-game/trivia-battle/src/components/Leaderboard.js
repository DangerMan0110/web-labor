import React from 'react';

export default function Leaderboard({scores}){
  return (
    <div className="card">
      <h3>Top 5 eredmény</h3>
      <ul className="leaderboard-list">
        {scores.slice(0,5).map((s, i)=> (
          <li key={i} className="leaderboard-item">
            <span>{i+1}. {s.name}</span>
            <span>{s.score}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
