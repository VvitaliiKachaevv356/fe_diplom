import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/FE_diploma',
  server: {
    open: true,
  },
  build: {
    chunkSizeWarningLimit: 1000, // лимит для предупреждений о размерах чанков (default: 500)
  },
});
