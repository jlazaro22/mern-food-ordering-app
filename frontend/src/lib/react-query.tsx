import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export default function QueryClientProviderConfigured({ children }: Props) {
  const environment = import.meta.env.VITE_NODE_ENV as string;
  const isProduction = environment !== 'development' && environment !== 'test';

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: isProduction,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
