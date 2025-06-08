import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router';
import Auth0ProviderWithNavigate from './auth/Auth0ProviderWithNavigate';
import './index.css';
import AppRoutes from './routes/AppRoutes';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <Auth0ProviderWithNavigate>
        <AppRoutes />
      </Auth0ProviderWithNavigate>
    </Router>
  </StrictMode>,
);
