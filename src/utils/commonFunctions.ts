import { type NavigateFunction } from 'react-router-dom';

export function debounce(fn: () => void, delay: number) {
  let timer: ReturnType<typeof setTimeout>;
  return () => {
    clearTimeout(timer);
    timer = setTimeout(fn, delay);
  };
}

// src/utils/navigation.ts

export const navigateWithDirection = (
  navigate: NavigateFunction,
  path: string,
  direction: 1 | -1,
) => {
  navigate(path, {
    state: { direction },
  });
};
