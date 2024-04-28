
export default defineNuxtConfig({

  devtools: { enabled: true },

  modules: ['@pinia/nuxt','@pinia-plugin-persistedstate/nuxt', "@unocss/nuxt", "@vueuse/nuxt" ,'shadcn-nuxt',],

  runtimeConfig: {
    ytApiKey: process.env.NUXT_YT_API_KEY,
    public: {
      defaultVideo: process.env.NUXT_PUBLIC_DEFAULT_VIDEO,
    }
  },

  shadcn:{
    prefix: 'Sh',
    componentDir: './components/ui'
  },

  app:{
    head: {
      title: "Youtube Thumbnail Extractor",
      meta: [
        {
          name: "description",
          content: "Extract Youtube Thumbnail from video URL"
        },
        {
          name: "author",
          content: "Ivant Martin"
        }
      ],
    
    }
  }
  
})