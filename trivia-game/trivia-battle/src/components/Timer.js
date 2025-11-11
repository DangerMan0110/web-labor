import React, {useEffect, useState} from 'react';

export default function Timer({seconds, onTimeUp, active, resetSignal}){
  const [time, setTime] = useState(seconds);

  useEffect(()=> setTime(seconds), [seconds, resetSignal]);

  useEffect(()=>{
    if(!active) return;
    if(time<=0){
      onTimeUp();
      return;
    }
    const t = setInterval(()=> setTime(prev=> prev-1), 1000);
    return ()=> clearInterval(t);
  }, [active, time, onTimeUp]);

  return <div className="timer">⏱ {time}s</div>;
}
