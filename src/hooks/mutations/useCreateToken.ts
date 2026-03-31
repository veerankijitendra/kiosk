import { useMutation } from '@tanstack/react-query';
import { kioskService } from '../../services/kioskService';
import type { CreateTokenPayload } from '../../types';
import { handleError } from '../../utils/errorHandler';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../utils/routeConstants';
import { navigateWithDirection } from '../../utils/commonFunctions';
import { useKioskStore } from '../../store/useKioskStore';

export function useCreateToken() {
  const navigate = useNavigate();
  const setToken = useKioskStore((state) => state.setToken);

  return useMutation({
    mutationFn: (data: CreateTokenPayload) => kioskService.createToken(data),
    onSuccess: (data) => {
      setToken(data?.data?.tokenNumber ?? '');
      navigateWithDirection(navigate, '/' + ROUTES.TOKEN, 1);
    },
    onError: handleError,
  });
}
