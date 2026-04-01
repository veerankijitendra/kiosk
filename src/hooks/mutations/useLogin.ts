import { authService } from '../../services/authService';

import { useMutation } from '@tanstack/react-query';
import { handleError } from '../../utils/errorHandler';

export const useLogin = () => {
  return useMutation({
    mutationFn: authService.login,
    onError: handleError,
  });
};
