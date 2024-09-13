export let pwaConfig = {
  registerType: "autoUpdate",
  manifest: {
    id: "/",
    name: "prompt",
    short_name: "prompt",
    theme_color: "prompt",
    description: "",
    background_color: "prompt",
    dir: "rtl",
    lang: "fa",
    display: "standalone",
    start_url: "/",

    icons: [
      {
        src: "/pwa/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/pwa/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/pwa/favicon-16x16v2.png",
        sizes: "16x16",
        type: "image/png",
      },
      {
        src: "/pwa/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
      {
        src: "/pwa/favicon-32x32v2.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/pwa/favicon2.ico",
        sizes: "16x16",
        type: "image/ico",
      },
    ],
  },
  workbox: {
    cleanupOutdatedCaches: true,
    // this is for caching internals assets, by default it only supports js css html.
    // configure it to include or exclude some type of assets
    // globPatterns: ['**/*.{js,css,html,ico,png,svg}']
    clientsClaim: true,
    skipWaiting: true,
    runtimeCaching: [
      // this is used for caching third-party resources.
      // {
      //     urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
      //     handler: 'CacheFirst',
      //     options: {
      //         cacheName: 'google-fonts-cache',
      //         expiration: {
      //             maxEntries: 10,
      //             maxAgeSeconds: 60 * 60 * 24 * 365 // <== 365 days
      //         },
      //         cacheableResponse: {
      //             statuses: [0, 200]
      //         }
      //     }
      // },
    ],
  },
};
