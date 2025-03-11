import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

const port = {
  host: true,
  port: 3002,
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: port,
  preview: port,
  resolve: {
    alias: [{ find: '@', replacement: '/src' }],
  },
})