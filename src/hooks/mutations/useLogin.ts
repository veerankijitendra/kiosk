import { notify } from '../../lib/toast';
import { authService } from '../../services/authService';

import { useMutation } from '@tanstack/react-query';

export const useLogin = () => {
  return useMutation({
    mutationFn: authService.login,
    onSuccess: (data) => {
      console.log('Logged in successfully', data);
    },
    onError: (error: unknown) => notify.error((error as { message: unknown })?.message as string),
  });
};
