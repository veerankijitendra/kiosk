// src/providers/QueryProvider.tsx
import { QueryClient, QueryClientProvider, QueryCache } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { handleError } from '../utils/errorHandler';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 60 * 24, // 24 hours (formerly cacheTime)
      retry: 1, // Avoid infinite loops on 404s
      refetchOnWindowFocus: false, // Prevents aggressive refetching
    },
  },
  queryCache: new QueryCache({
    onError: handleError,
  }),
});

export const QueryProvider = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>
    {children}
    <ReactQueryDevtools initialIsOpen={false} position='bottom' />
  </QueryClientProvider>
);
