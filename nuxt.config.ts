export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: ['@pinia/nuxt', "@unocss/nuxt", "@vueuse/nuxt" ,'shadcn-nuxt'],

  runtimeConfig: {
    ytApiKey: process.env.NUXT_YT_API_KEY
  },

  shadcn:{
    componentDir: './components/ui'
  }
})
