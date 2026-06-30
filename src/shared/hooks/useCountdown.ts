import { useState, useEffect, useCallback, useRef } from 'react';

interface UseCountdownOptions {
  onComplete?: () => void;
  onTick?: (remaining: number) => void;
}

interface UseCountdownReturn {
  remaining: number;
  isRunning: boolean;
  start: (seconds: number) => void;
  stop: () => void;
  reset: () => void;
}

/** Hook for countdown timer */
export function useCountdown(options: UseCountdownOptions = {}): UseCountdownReturn {
  const [remaining, setRemaining] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const optionsRef = useRef(options);
  optionsRef.current = options;

  const stop = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsRunning(false);
  }, []);

  const start = useCallback((seconds: number) => {
    stop();
    setRemaining(seconds);
    setIsRunning(true);
  }, [stop]);

  const reset = useCallback(() => {
    stop();
    setRemaining(0);
  }, [stop]);

  useEffect(() => {
    if (!isRunning || remaining <= 0) {
      if (isRunning && remaining <= 0) {
        stop();
        optionsRef.current.onComplete?.();
      }
      return;
    }

    intervalRef.current = setInterval(() => {
      setRemaining(prev => {
        const next = prev - 1;
        optionsRef.current.onTick?.(next);
        return next;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, remaining, stop]);

  return { remaining, isRunning, start, stop, reset };
}
