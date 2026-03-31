import { useMutation } from '@tanstack/react-query';
import { kioskService } from '../../services/kioskService';
import type { CreateTokenPayload } from '../../types';
import { handleError } from '../../utils/errorHandler';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../utils/routeConstants';

export function useCreateToken() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: CreateTokenPayload) => kioskService.createToken(data),
    onSuccess: () => {
      navigate('/' + ROUTES.TOKEN);
    },
    onError: handleError,
  });
}
