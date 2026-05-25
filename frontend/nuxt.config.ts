// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxt/eslint", "@nuxt/ui"],

  devtools: {
    enabled: true,
  },

  css: ["~/assets/css/main.css"],

  routeRules: {
    "/": { prerender: true },
  },

  compatibilityDate: "2025-01-15",

  eslint: {
    config: {
      stylistic: {
        commaDangle: "never",
        braceStyle: "1tbs",
      },
    },
  },

  // Environment configuration
  runtimeConfig: {
    public: {
      apiUrl: process.env.NUXT_PUBLIC_API_URL || "http://localhost:3001",
    },
  },

  // Auto-import composables
  imports: {
    autoImport: true,
  },
});
