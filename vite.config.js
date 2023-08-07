import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 'https://radiant-frangipane-073e2d.netlify.app',
    proxy: {
      '/users':{
        target:'http://ec2-3-84-162-115.compute-1.amazonaws.com/',
        changeOrigin: true
      }
    }
  }
})
