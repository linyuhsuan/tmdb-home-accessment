import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/tmdb-home-accessment/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
