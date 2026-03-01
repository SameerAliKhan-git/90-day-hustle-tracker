import { useState, useEffect } from 'react';
import { getTimeRemaining, TimeRemaining } from '../utils/dateUtils';

// Static initial value to avoid SSR/client hydration mismatch
const INITIAL: TimeRemaining = {
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
  totalMs: 0,
  percentComplete: 0,
};

export function useCountdown() {
  const [time, setTime] = useState<TimeRemaining>(INITIAL);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // First tick immediately after mount
    setTime(getTimeRemaining());
    setMounted(true);

    const timer = setInterval(() => {
      setTime(getTimeRemaining());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return { ...time, mounted };
}
