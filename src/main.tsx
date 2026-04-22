import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { QueryProvider } from './providers/QueryProvider.tsx';
import { Toaster } from 'react-hot-toast';
import ResizeProvider from './providers/ResizeProvider.tsx';
import IdleProvider from './providers/IdleProvider.tsx';
import { BrowserRouter } from 'react-router-dom';
import { registerSW } from 'virtual:pwa-register';

registerSW({ immediate: true });

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <QueryProvider>
        <Toaster />
        <IdleProvider>
          <ResizeProvider>
            <App />
          </ResizeProvider>
        </IdleProvider>
      </QueryProvider>
    </BrowserRouter>
  </StrictMode>,
);
