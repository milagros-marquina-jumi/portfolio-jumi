import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: process.env.NODE_ENV === 'production'
    ? '/portfolio-jumi/' // Para producción (GitHub Pages)
    : '/portfolio-jumi/', // Para desarrollo local, también usa /portfolio-jumi/
  build: {
    chunkSizeWarningLimit: 1000,
  },
})
