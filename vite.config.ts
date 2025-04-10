import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: 'https://localhost:5173/milagros-marquina-jumi.github.io/portfolio-milagros-marquina',
})
