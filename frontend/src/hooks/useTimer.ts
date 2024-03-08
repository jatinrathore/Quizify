import { useState, useEffect } from "react";

interface TimerHook {
  minutes: number;
  seconds: number;
  timerRunning: boolean;
  startTimer: () => void;
  stopTimer: () => void;
  resetTimer: () => void;
}

const useTimer = (initialMinutes: number = 0): TimerHook => {
  const [minutes, setMinutes] = useState<number>(initialMinutes);
  const [seconds, setSeconds] = useState<number>(0);
  const [timerRunning, setTimerRunning] = useState<boolean>(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (timerRunning) {
      timer = setInterval(() => {
        if (minutes === 0 && seconds === 0) {
          clearInterval(timer);
          setTimerRunning(false);
        } else if (seconds === 0) {
          setMinutes((prevMinutes) => prevMinutes - 1);
          setSeconds(59);
        } else {
          setSeconds((prevSeconds) => prevSeconds - 1);
        }
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [timerRunning, minutes, seconds]);

  const startTimer = (): void => {
    setTimerRunning(true);
  };

  const stopTimer = (): void => {
    setTimerRunning(false);
  };

  const resetTimer = (): void => {
    setMinutes(initialMinutes);
    setSeconds(0);
    setTimerRunning(false);
  };

  return {
    minutes,
    seconds,
    timerRunning,
    startTimer,
    stopTimer,
    resetTimer,
  };
};

export default useTimer;
