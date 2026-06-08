// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/eslint', '@nuxt/ui'],

  // Auto-import composables
  imports: {
    autoImport: true,
  },

  devtools: {
    enabled: false,
    // enabled: process.env.NODE_ENV !== 'production',
  },

  css: ['~/assets/css/main.css'],

  // Environment configuration
  runtimeConfig: {
    // Server-side only — used for SSR fetches inside Docker where backend is reachable by service name
    apiUrl: process.env.NUXT_API_URL || process.env.NUXT_PUBLIC_API_URL || 'http://localhost:3111',
    public: {
      apiUrl: process.env.NUXT_PUBLIC_API_URL || 'http://localhost:3111',
      frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000',
    },
  },

  vite: {
    optimizeDeps: {
      include: ['vue-draggable-plus', 'zod'],
    },
  },

  nitro: {
    noExternals: true,
  },

  routeRules: {
    '/': { prerender: process.env.NUXT_PRERENDER === 'true' },
  },

  compatibilityDate: '2025-01-15',

  eslint: {
    config: {
      stylistic: false,
    },
  },
});
