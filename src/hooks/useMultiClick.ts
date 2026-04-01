import { useRef } from 'react';

export const useMultiClick = (count: number, callback: () => void) => {
  const clicks = useRef(0);
  const timer = useRef<NodeJS.Timeout | null>(null);

  return () => {
    clicks.current++;

    if (timer.current) clearTimeout(timer.current);

    timer.current = setTimeout(() => {
      clicks.current = 0;
    }, 2000);

    if (clicks.current === count) {
      callback();
      clicks.current = 0;
    }
  };
};
