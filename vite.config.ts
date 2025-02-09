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
      '/userdata/comments': {
        target: 'https://lexter-server.onrender.com/api',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/userdata\/comments/, '/comments'),
      },
      '/userdata/questions': {
        target: 'https://lexter-server.onrender.com/api',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/userdata\/questions/, '/questions'),
      },

      '/userdata/tags': {
        target: 'https://lexter-server.onrender.com/api',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/userdata\/questions/, '/tags'),
      },
      '/userdata/votes': {
        target: 'https://lexter-server.onrender.com/api',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/userdata\/votes/, '/votes'),
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
          }
        }
      }
    },
    chunkSizeWarningLimit: 1000, // Adjust the chunk size warning limit if necessary
  }
})