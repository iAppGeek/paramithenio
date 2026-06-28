import { initSupabase } from '@acme/core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.js';
import './i18n/index.js';
import './index.css';

initSupabase(
  (import.meta.env.VITE_SUPABASE_URL as string | undefined) ?? '',
  (import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined) ?? '',
);

const queryClient = new QueryClient();

const rootEl = document.getElementById('root');
if (!rootEl) throw new Error('Root element not found');

ReactDOM.createRoot(rootEl).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>,
);
