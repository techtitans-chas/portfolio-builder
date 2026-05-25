// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/eslint', '@nuxt/ui'],

  // Auto-import composables
  imports: {
    autoImport: true,
  },

  devtools: {
    enabled: true,
  },

  css: ['~/assets/css/main.css'],

  // Environment configuration
  runtimeConfig: {
    public: {
      apiUrl: process.env.NUXT_PUBLIC_API_URL || 'http://localhost:3001',
    },
  },

  routeRules: {
    '/': { prerender: true },
  },

  compatibilityDate: '2025-01-15',

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'always-multiline',
        semi: true,
        braceStyle: '1tbs',
        arrowParens: false,
      },
    },
  },
});
