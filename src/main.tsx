import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { QueryProvider } from './providers/QueryProvider.tsx';
import { Toaster } from 'react-hot-toast';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryProvider>
      <Toaster />
      <App />
    </QueryProvider>
  </StrictMode>,
);
