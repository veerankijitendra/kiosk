import { useQuery } from '@tanstack/react-query';
import { kioskService } from '../../services/kioskService';

export function useDepartment() {
  return useQuery({
    queryKey: ['departments'],
    queryFn: () => kioskService.getDepartments(),
    staleTime: 1000 * 60 * 5,
  });
}
