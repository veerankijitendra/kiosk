import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import { socket } from '../lib/socket';
import { type TokenEvent } from '../types/socket';
import { tokenKeys } from './queries/keys';
import type { TokensResponseType } from '../types';

export default function useSocket(token?: string) {
  const queryClient = useQueryClient();

  const handleTokenCreated = (data: TokenEvent) => {
    queryClient.setQueryData(tokenKeys.doctor, (old: TokensResponseType) => {
      if (!old) return old!;

      const buckets = { ...old.data.buckets };

      if (data.status === 'WAITING') {
        buckets.general.push(data._id);
      }

      if (data.status === 'EMERGENCY') {
        buckets.emergency.push(data._id);
      }

      return {
        ...old,
        data: {
          tokensById: {
            ...old.data.tokensById,
            [data._id]: data,
          },
          buckets,
        },
      } satisfies TokensResponseType;
    });
  };

  const handleTokenUpdated = (data: TokenEvent) => {
    queryClient.setQueryData(tokenKeys.doctor, (old: TokensResponseType) => {
      if (!old) return old!;

      const buckets = { ...old.data.buckets };

      const remove = (id: string) => id != data._id;

      buckets.current = buckets.current.filter(remove);
      buckets.emergency = buckets.emergency.filter(remove);
      buckets.lastCompleted = buckets.lastCompleted.filter(remove);
      buckets.general = buckets.general.filter(remove);

      if (data.status === 'COMPLETED') {
        buckets.lastCompleted = [data._id];
      }

      if (data.status === 'CALLED') {
        buckets.current = [data._id];
      }

      return {
        ...old,
        data: {
          tokensById: {
            ...old.data.tokensById,
            [data._id]: data,
          },
          buckets,
        },
      } satisfies TokensResponseType;
    });
  };

  const handleTokenDeleted = (data: TokenEvent) => {
    console.log(data);
  };

  useEffect(() => {
    if (!token) return;
    socket.auth = { token };

    socket.connect();

    socket.on('connect', () => {
      queryClient.invalidateQueries({
        queryKey: tokenKeys.doctor,
      });
      console.log('✅ Connected:', socket.id);
    });

    socket.on('disconnect', (reason) => {
      console.log('❌ Disconnected:', reason);
    });

    socket.on('connect_error', (err) => {
      console.error('❌ Socket Connection Error:', err);
    });

    socket.on('kiosk:createToken', handleTokenCreated);
    socket.on('kiosk:deleteToken', handleTokenDeleted);
    socket.on('kiosk:update-token', handleTokenUpdated);

    return () => {
      socket.disconnect();
      socket.off('kiosk:createToken', handleTokenCreated);
      socket.off('kiosk:deleteToken', handleTokenDeleted);
      socket.off('kiosk:update-token', handleTokenUpdated);
    };
  }, [token]);

  return socket;
}
