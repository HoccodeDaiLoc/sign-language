import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/


export default defineConfig({
  plugins: [react()],
  server: {
    port: 3001, // Đặt cổng tùy chỉnh tại đây
    proxy: {
      '/api': {
        target: 'http://localhost:3000/v1/api',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});