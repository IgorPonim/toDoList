import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// The GitHub Pages project is hosted under /toDoList/.
export default defineConfig({
  base: '/toDoList/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['fox-svgrepo-com.svg'],
      manifest: {
        name: 'Список дел и покупок',
        short_name: 'Список дел',
        description: 'Личный список дел и покупок',
        lang: 'ru',
        start_url: './',
        scope: './',
        display: 'standalone',
        background_color: '#f5f1e8',
        theme_color: '#ff9500',
        icons: [
          {
            src: 'fox-svgrepo-com.svg',
            sizes: 'any',
            type: 'image/svg+xml',
            purpose: 'any maskable',
          },
        ],
      },
      workbox: {
        navigateFallback: 'index.html',
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
      },
    }),
  ],
})
