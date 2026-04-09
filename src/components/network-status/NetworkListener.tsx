// NetworkListener.tsx
import { useEffect } from 'react';
import { useNetworkStore } from '../../store/useNetworkStore';
import { useQueryClient } from '@tanstack/react-query';
import { tokenKeys } from '../../hooks/queries/keys';

const ONLINE_CHECK_INTERWEL = 60 * 1000;

export const NetworkListener = () => {
  const setStatus = useNetworkStore((s) => s.setStatus);
  const markInitialized = useNetworkStore((s) => s.markInitialized);
  const queryClient = useQueryClient();

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

    const handleOnline = () => {
      queryClient.invalidateQueries({
        queryKey: tokenKeys.doctor,
      });
      checkNetworkQuality();
    };
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
