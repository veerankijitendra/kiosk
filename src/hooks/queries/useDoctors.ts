import { useQuery } from '@tanstack/react-query';
import { kioskService } from '../../services/kioskService';
import type { DoctorFilterType } from '../../types';

export function useDoctors(filter: DoctorFilterType) {
  return useQuery({
    queryKey: ['doctors'],
    queryFn: () => kioskService.getDoctors(filter),
  });
}
