import React, {useEffect, useState, useCallback} from 'react';
import {fetchQuestions} from '../utils/api';
import {shuffle, decodeHtml} from '../utils/helpers';
import QuestionCard from './QuestionCard';
import Timer from './Timer';
import Leaderboard from './Leaderboard';

export default function Quiz(){
  const [difficulty, setDifficulty] = useState('easy');
  const [questions, setQuestions] = useState([]);
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [reveal, setReveal] = useState(false);
  const [timerResetSignal, setTimerResetSignal] = useState(0);
  const [leaderboard, setLeaderboard] = useState(()=> JSON.parse(localStorage.getItem('trivia_scores') || '[]'));
  const [gameOver, setGameOver] = useState(false);
  const timePerQuestion = 10;

  

const startNewGame = useCallback(async () => {
    const data = await fetchQuestions(5, difficulty);
    const prepared = data.map(d => {
        const all = [...d.incorrect_answers.map(a => decodeHtml(a)), decodeHtml(d.correct_answer)];
        const shuffled = shuffle(all);
        const correctIndex = shuffled.findIndex(x => x === decodeHtml(d.correct_answer));
        return { question: decodeHtml(d.question), answers: shuffled, correctIndex };
    });
    setQuestions(prepared);
    setIdx(0);
    setScore(0);
    setGameOver(false);
    setReveal(false);
    setTimerResetSignal(s => s + 1);
}, [difficulty]);

  function handleAnswer(choiceIdx){
    if(reveal) return;
    setSelected(choiceIdx);
    setReveal(true);
    if(choiceIdx === questions[idx].correctIndex){
      setScore(s=>s+1);
    }
    setTimeout(()=> {
      if(idx+1 < questions.length){
        setIdx(i=>i+1);
        setSelected(null);
        setReveal(false);
        setTimerResetSignal(s=>s+1);
      }else{
        setGameOver(true);
      }
    }, 900);
  }

  function onTimeUp(){
    if(reveal) return;
    setReveal(true);
    setTimeout(()=> {
      if(idx+1 < questions.length){
        setIdx(i=>i+1);
        setReveal(false);
        setTimerResetSignal(s=>s+1);
      }else setGameOver(true);
    }, 900);
  }

  function saveScore(name){
    const rec = {name: name || 'Névtelen', score: `${score}/${questions.length}`, time: Date.now()};
    const newlb = [...leaderboard, rec].sort((a,b)=>{
      const aNum = parseInt(a.score.split('/')[0]);
      const bNum = parseInt(b.score.split('/')[0]);
      return bNum - aNum;
    });
    localStorage.setItem('trivia_scores', JSON.stringify(newlb));
    setLeaderboard(newlb);
  }

  const progressPercent = questions.length ? Math.round((idx / questions.length) * 100) : 0;
  useEffect(()=> {
    startNewGame();
  }, [difficulty, startNewGame]);

  return (
    <div>
      <div className="header">
        <div className="title">Trivia Battle</div>
        <div className="controls">
          <select value={difficulty} onChange={e=> setDifficulty(e.target.value)}>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
          <button className="btn small" onClick={startNewGame}>Új játék</button>
        </div>
      </div>

      <div className="card">
        {!gameOver && questions.length>0 && (
          <>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <div>Kérdés {idx+1}/{questions.length}</div>
              <div style={{display:'flex',gap:12,alignItems:'center'}}>
                <Timer seconds={timePerQuestion} active={!reveal} onTimeUp={onTimeUp} resetSignal={timerResetSignal} />
                <div>Pont: {score}</div>
              </div>
            </div>

            <div className="progress">
              <i style={{width:`${progressPercent}%`}}></i>
            </div>

            <QuestionCard q={questions[idx]} onAnswer={handleAnswer} selectedIndex={selected} reveal={reveal} />
          </>
        )}

        {gameOver && (
          <div>
            <h2>Vége! Eredmény: {score}/{questions.length}</h2>
            <form onSubmit={(e)=>{e.preventDefault(); saveScore(e.target.name.value); e.target.reset();}}>
              <input name="name" placeholder="Add meg a neved" />
              <button className="btn small" style={{marginLeft:8}}>Mentés</button>
            </form>
          </div>
        )}
      </div>

      <Leaderboard scores={leaderboard} />
    </div>
  );
}
