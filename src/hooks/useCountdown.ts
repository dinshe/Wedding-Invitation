import { useState, useEffect } from 'react';
import { weddingConfig } from '../config/wedding';

export interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
  totalMilliseconds: number;
}

export function useCountdown(targetDateIso: string = weddingConfig.date.isoString): CountdownTime {
  const calculateTimeLeft = (): CountdownTime => {
    const target = new Date(targetDateIso).getTime();
    const now = new Date().getTime();
    const diff = target - now;

    if (diff <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        isExpired: true,
        totalMilliseconds: 0,
      };
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return {
      days,
      hours,
      minutes,
      seconds,
      isExpired: false,
      totalMilliseconds: diff,
    };
  };

  const [timeLeft, setTimeLeft] = useState<CountdownTime>(calculateTimeLeft);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDateIso]);

  return timeLeft;
}

export default useCountdown;
