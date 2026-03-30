import { toast } from 'react-hot-toast';

export const notify = {
  success: (msg: string) => toast.success(msg),
  error: (msg: string) => toast.error(msg || 'Something went wrong'),
  loading: (msg: string) => toast.loading(msg),
  dismiss: () => toast.dismiss(),
  promise: (
    promise: Promise<unknown>,
    messages: { loading: string; success: string; error: string },
  ) => {
    return toast.promise(promise, messages);
  },
};
