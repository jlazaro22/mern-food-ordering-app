import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router';
import { Toaster } from 'sonner';
import Auth0ProviderWithNavigate from './auth/Auth0ProviderWithNavigate';
import './index.css';
import QueryClientProviderConfigured from './lib/react-query';
import AppRoutes from './routes/AppRoutes';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <QueryClientProviderConfigured>
        <Auth0ProviderWithNavigate>
          <AppRoutes />
          <Toaster visibleToasts={1} position='top-right' richColors />
        </Auth0ProviderWithNavigate>
      </QueryClientProviderConfigured>
    </Router>
  </StrictMode>,
);
