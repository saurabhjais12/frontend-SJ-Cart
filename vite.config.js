import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',  // allow external connections
    allowedHosts: ['frontend-sj-cart-4.onrender.com'], // add your Render domain here
    port: process.env.PORT ? Number(process.env.PORT) : 5173,
  },
})
