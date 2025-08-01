import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@/index.css';
import App from '@/App';
import ReactQueryProvider from '@/components/common/ReactQueryProvider';

createRoot(document.getElementById('root')!).render(
  <ReactQueryProvider>
    <App />
  </ReactQueryProvider>,
);
