import { useEffect, useState } from "react";

type TimerProps = {
  isRunning: boolean;
  reset: boolean;
};

const Timer = ({ isRunning, reset }: TimerProps) => {
  const [timeLeft, setTimeLeft] = useState(600);

  useEffect(() => {
    setTimeLeft(600);
  }, [reset]);

  useEffect(() => {
    if (!isRunning) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning]);

  const minutes = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;

  return (
    <div>
      <p className="my-7 text-gray-600 font-bold">
        {minutes}:{secs < 10 ? `0${secs}` : secs}
      </p>
    </div>
  );
};

export default Timer;
