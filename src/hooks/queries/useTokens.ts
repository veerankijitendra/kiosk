import { useQuery } from '@tanstack/react-query';
import { kioskService } from '../../services/kioskService';
import { type TokensResponseType } from '../../types';
import { tokenKeys } from './keys';

export function useTokens() {
  return useQuery({
    queryKey: tokenKeys.doctor,
    queryFn: () => kioskService.getTokens(),
    staleTime: Infinity,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    // staleTime: 1 * 60 * 1000,
  });
}

export function useCurrentTokens() {
  return useQuery({
    queryKey: tokenKeys.doctor,
    enabled: false,
    queryFn: () => kioskService.getTokens(),
    select: ({ data }: TokensResponseType) => {
      const id = data.buckets.current.at(0);
      return id ? [data.tokensById[id]] : [];
    },
  });
}

export function useCompletedTokens() {
  return useQuery({
    queryKey: tokenKeys.doctor,
    enabled: false,
    queryFn: () => kioskService.getTokens(),
    select: ({ data }: TokensResponseType) => {
      const id = data.buckets.lastCompleted.at(0);
      return id ? [data.tokensById[id]] : [];
    },
  });
}

export function useNextTokens() {
  return useQuery({
    queryKey: tokenKeys.doctor,
    enabled: false,
    queryFn: () => kioskService.getTokens(),
    select: ({ data }: TokensResponseType) => {
      return data?.buckets.general.map((id) => data.tokensById[id]) ?? [];
    },
  });
}

export function useEmergencyTokens() {
  return useQuery({
    queryKey: tokenKeys.doctor,
    enabled: false,
    queryFn: () => kioskService.getTokens(),
    select: ({ data }: TokensResponseType) => {
      return data?.buckets.emergency.map((id) => data.tokensById[id]) ?? [];
    },
  });
}
