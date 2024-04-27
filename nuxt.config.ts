export default defineNuxtConfig({
  devtools: { enabled: true },

  runtimeConfig: {
    ytApiKey: process.env.NUXT_YT_API_KEY
  }
})
