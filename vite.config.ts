import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { VitePWA } from 'vite-plugin-pwa';
import basicSSL from '@vitejs/plugin-basic-ssl';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/pyoraparkit-kartalla/',
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
      manifest: {
        name: 'Pyöräparkit kartalla',
        short_name: 'Pyöräparkit kartalla',
        orientation: 'portrait',
        icons: [
          {
            src: '/pyoraparkit-kartalla/web-app-manifest-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'maskable',
          },
          {
            src: '/pyoraparkit-kartalla/web-app-manifest-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: '/pyoraparkit-kartalla/web-app-manifest-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: '/pyoraparkit-kartalla/web-app-manifest-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
        theme_color: '#aceb98',
        background_color: '#aceb98',
        display: 'standalone',
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/.\.tile\.openstreetmap\.org\/\d+\/\d+\/\d+.png/i,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'osm-cache',
              expiration: {
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
      },
    }),
    process.env.LOCAL_SSL ? basicSSL() : undefined,
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
