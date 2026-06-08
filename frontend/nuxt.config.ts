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
    // Overridden at runtime by NUXT_API_URL env var
    apiUrl: 'http://localhost:3111',
    public: {
      // Overridden at runtime by NUXT_PUBLIC_API_URL and FRONTEND_URL env vars
      apiUrl: 'http://localhost:3111',
      frontendUrl: 'http://localhost:3000',
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
