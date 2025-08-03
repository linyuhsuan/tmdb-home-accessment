import App from '@/App';
import ReactQueryProvider from '@/components/common/ReactQueryProvider';
import '@/index.css';
import { createRoot } from 'react-dom/client';

createRoot(document.getElementById('root')!).render(
  <ReactQueryProvider>
    <App />
  </ReactQueryProvider>,
);
