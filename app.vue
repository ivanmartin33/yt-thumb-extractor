<script setup lang="ts">
import '@/assets/css/index.css'
import { type VideoFront } from '@/server/types';
import { domToPng } from 'modern-screenshot'
import slugify from 'slugify';


const { store } = storeToRefs(useMainStore())

const extractVideoId = (url: string) => {
  const regex = /(?:(?:https|http):\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|watch\?v=))([^&]*)/;
  const match = url.match(regex)

  if (match) {
    return match[1]
  }
  return null
}

const { public: pConfig } = useRuntimeConfig()

const url = ref(pConfig.defaultVideo)
const id = computed(() => extractVideoId(url.value))

const { data } = await useFetch<VideoFront>('/api/video', {
  method: 'GET',
  query: {
    id: id
  },
})



const videoThumbRef = ref<HTMLDivElement | null>(null)
const dataUrlClipboard = ref()
const { copy,copied } = useClipboard({source:dataUrlClipboard,copiedDuring:2500})

const getThumbnail = (toClipBoard: boolean) => {
  if (!videoThumbRef.value) {
    return
  }
  domToPng(videoThumbRef.value, {
    scale: 3,
  }).then(dataUrl => {
    const link = document.createElement('a')
    const slug = data.value ? slugify(data.value?.title, { lower: true }) : 'video'
    link.download = `thumbnail-${slug}-${id.value}.png`
    link.href = dataUrl

    if (toClipBoard) {
      copy(dataUrl)
    } else {
    link.click()
    }
  })
}

watch(() => data.value, (newVal) => {
    if( !store.value) return

    if(newVal != null){
      store.value.globalDisabled = false
    } else {
      store.value.globalDisabled = true
    }
})

</script>
<template>
  <div class="flex flex-col mx-auto gap-6 md:gap-8 py-4 md:py-8 px-4 max-w-4xl">
    
    <div class="w-full flex justify-between">
      <div class="flex gap-4 items-center">
        <img src="/apple-touch-icon.png" alt="icon" class="w-8 h-8" />
        <h1 class="text-lg md:text-2xl">Youtube Thumbnail Extractor</h1>
      </div>
      <NavToggleDarkMode />
    </div>

    <div class="space-y-2">
      <label for="url">Youtube URL</label>
      <ShInput v-model="url" class="border-solid" />
    </div>

    <div  class="flex flex-wrap-reverse md:flex-nowrap justify-center w-full gap-4">

      <div class="md:flex-basis-2/6 h-full">
        <NavFilters />
      </div>

      <div class="flex flex-col gap-4 md:flex-basis-4/6 select-none">
        <div class="bg-iconic dark:bg-iconic-dark flex justify-center rounded-xl p-4 md:p-8 min-w-95dvw md:min-w-lg border-solid border-1">
          <div ref="videoThumbRef" class="w-full h-full">
            <VideoCard v-if="data" :video="data"/>
              <VideoCardGhost v-else />
          </div>
        </div>

        <div class="flex gap-4 self-end">
          <ShButton @click="getThumbnail(true)" class="cursor-pointer w-fit font-semibold" >
            <span v-if="!copied">Copy</span>
            <span v-else>Copied!</span>
          </ShButton>
       
        <ShButton @click="getThumbnail(false)" class="cursor-pointer w-fit font-semibold">Download
        </ShButton>
      </div>
      </div>
    </div>
    <footer>
      <p class="text-center text-xs text-slate-7 dark:text-slate">Made with ❤️ by <a href="https://github.com/ivanmartin33" target="_blank" class="text-blue-500">IM.</a></p>
    </footer>
  </div>
</template>
