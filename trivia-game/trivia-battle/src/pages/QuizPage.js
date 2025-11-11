import React from 'react';
import Quiz from '../components/Quiz';
import { useNavigate } from 'react-router-dom';

export default function QuizPage() {
  const navigate = useNavigate();

  return (
    <div>
      <button className="btn small" onClick={() => navigate('/')}>⬅ Vissza</button>
      <Quiz />
    </div>
  );
}
