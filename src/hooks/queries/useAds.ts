import { useQuery } from '@tanstack/react-query';
import { adsKeys } from './keys';
import { kioskService } from '../../services/kioskService';

export const useAds = () => {
  return useQuery({
    queryKey: [...adsKeys.all],
    queryFn: () => kioskService.getAds(),
    staleTime: 1000 * 60 * 5,
  });
};
