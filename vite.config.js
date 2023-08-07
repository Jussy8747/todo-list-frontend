import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 'https://todoapp-frontend-iryf.onrender.com/',
    proxy: {
      '/users':{
        target:'https://todoappbackend-jz46.onrender.com',
        changeOrigin: true
      }
    }
  }
})
