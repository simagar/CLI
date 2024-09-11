// https://nuxt.com/docs/api/configuration/nuxt-config
// @ts-ignore
export default defineNuxtConfig({
  modules: ["nuxt-swiper", "@pinia/nuxt", "@pinia-plugin-persistedstate/nuxt"],
  app: {
    head: {
      title: 'Sky Coach',
      titleTemplate: ' %s | SkyCoach',
      charset: 'UTF-8',
      viewport: 'width=device-width, initial-scale=1',
      htmlAttrs: {dir: "ltr", lang: "en"},
    },
  },
  devtools: {enabled: true},

  routeRules: {
    // Homepage pre-rendered at build time
    // '/game/**': {ssr: false},
    '/pro/**': {ssr: false},
    '/client/**': {ssr: false},
    // '/blog/**': {ssr: false}

  },
  pinia: {
// @ts-ignore

    autoImports: [
      ["defineStore", "definePiniaStore"], // import { defineStore as definePiniaStore } from 'pinia'
    ],
  },
  runtimeConfig: {
    // Private keys are only available on the server

    // Public keys that are exposed to the client
    public: {
      // apiBaseUrl: 'https://api.skycoach.simagar.com/api/v1/',
      // socketUrl: 'https://api.skycoach.simagar.com/',
      socketUrl: 'https://skycoachapi.oregonserver.com/',
      apiBaseUrl: 'https://skycoachapi.oregonserver.com/api/v1/',
    },
  },
  css: [
    "@/assets/css/tailwind.css",
    "@/assets/css/main.css",
    "@/assets/css/font.css",
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

});
