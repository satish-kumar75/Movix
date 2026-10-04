import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // In dev, forward TMDB calls to the deployed Vercel proxy (PROXY_TARGET in .env.local)
  // so they work on networks that block TMDB.
  const target = loadEnv(mode, '.', '').PROXY_TARGET

  return {
    plugins: [react()],
    server: {
      proxy: {
        '/api': { target, changeOrigin: true },
        '/tmdb-img': { target, changeOrigin: true },
      },
    },
  }
})
