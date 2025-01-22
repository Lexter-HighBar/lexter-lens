import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://rails-server-staging-dl6kl.ondigitalocean.app/external',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
      '/userdata': {
        target: 'https://lens-server-staging-te9hf.ondigitalocean.app/api',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/userdata/, '/comments'),
      },
    },
  },
})
