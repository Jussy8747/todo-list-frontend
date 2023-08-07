import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 'https://radiant-frangipane-073e2d.netlify.app',
    proxy: {
      '/users':{
        target:'https://todoappbackend-jz46.onrender.com',
        changeOrigin: true
      }
    }
  }
})
