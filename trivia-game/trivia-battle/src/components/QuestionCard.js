import React from 'react';

export default function QuestionCard({q, onAnswer, selectedIndex, reveal}){
  const {question, answers} = q;
  if (!question || !answers) return null;
  return (
    <div>
      <div style={{fontSize:18, fontWeight:700}} dangerouslySetInnerHTML={{__html: question}} />
      <div className="options">
        {answers.map((a, idx)=> {
          let cls = "option";
          if(reveal){
            if(idx === q.correctIndex) cls += " correct";
            else if(selectedIndex === idx && idx !== q.correctIndex) cls += " wrong";
          }

          return (
            <div key={idx} className={cls} onClick={()=> !reveal && onAnswer(idx)}
                 dangerouslySetInnerHTML={{__html: a}} />
          );
        })}
      </div>
    </div>
  );
}
