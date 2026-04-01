// NetworkListener.tsx
import { useEffect } from 'react';
import { useNetworkStore } from '../../store/useNetworkStore';

const ONLINE_CHECK_INTERWEL = 60 * 1000;

export const NetworkListener = () => {
  const setStatus = useNetworkStore((s) => s.setStatus);
  const markInitialized = useNetworkStore((s) => s.markInitialized);

  useEffect(() => {
    const checkNetworkQuality = async () => {
      const start = Date.now();

      try {
        await fetch('/ping', { cache: 'no-store' });

        const duration = Date.now() - start;

        if (duration > 2000) {
          setStatus('slow');
        } else {
          setStatus('online');
        }
      } catch {
        setStatus('offline');
      }
    };

    const handleOnline = () => checkNetworkQuality();
    const handleOffline = () => setStatus('offline');

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Initial check
    checkNetworkQuality();

    // Periodic check (VERY useful for kiosk)
    const interval = setInterval(checkNetworkQuality, ONLINE_CHECK_INTERWEL);

    markInitialized();

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      clearInterval(interval);
    };
  }, []);

  return null;
};
