import React, { useEffect } from 'react';
import { debounce } from '../utils/commonFunctions';

function setRootFont() {
  const baseHeight = 1920;
  const elementHeight = window.innerHeight;

  const scale = elementHeight / baseHeight;

  const min = 10;
  const max = 18;

  const fontSize = Math.max(min, Math.min(max, 16 * scale));

  document.documentElement.style.fontSize = `${fontSize}px`;
}

const ResizeProvider = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    const handler = debounce(setRootFont, 200);
    handler();

    window.addEventListener('resize', handler);

    return () => window.removeEventListener('resize', handler);
  }, []);
  return <>{children} </>;
};

export default ResizeProvider;
