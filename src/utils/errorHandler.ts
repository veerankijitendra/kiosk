import { notify } from '../lib/toast';

import axios from 'axios';
export function handleError(error: unknown): string {
  let message = 'Something went wrong';
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as { message?: string } | undefined;
    message = data?.message || error.message || 'Request failed';
  } else if (error instanceof Error) {
    message = error.message;
  }

  notify.error(message);
  return message;
}
