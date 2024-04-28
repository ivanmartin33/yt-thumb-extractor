<script setup lang="ts">
import '@/assets/css/index.css'
import { type VideoFront } from '@/server/types';
import { domToPng } from 'modern-screenshot'
import slugify from 'slugify';

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

const {copy,copied} = useClipboard({source:dataUrlClipboard,copiedDuring:2500})

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


const showMetadata = ref(true)
const showAvatar = ref(true)
const showTitle = ref(true)
const showDuration = ref(true)
const showViews = ref(true)
const showTimeSince = ref(true)
const showProgress = ref(true)
const progress = ref([37])
const isDark = ref('light')
const isTransparent = ref(false)
const padding = ref([50])
const cornerRadius = ref([50])
const globalFiltersDisabled = ref(false)

watch(() => data.value, (newVal) => {
    if(newVal != null){
      globalFiltersDisabled.value = false
    } else {
      globalFiltersDisabled.value = true
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
        <NavFilters v-model:showMetadata="showMetadata" v-model:showAvatar="showAvatar" v-model:showTitle="showTitle"
          v-model:showDuration="showDuration" v-model:showViews="showViews" v-model:showTimeSince="showTimeSince"
          v-model:showProgress="showProgress" v-model:progress="progress" v-model:is-dark="isDark"
          v-model:is-transparent="isTransparent" v-model:padding="padding" v-model:corner-radius="cornerRadius" v-model:global-disabled="globalFiltersDisabled" />
      </div>

      <div class="flex flex-col gap-4 md:flex-basis-4/6">
        <div class="bg-iconic dark:bg-iconic-dark flex justify-center rounded-xl p-4 md:p-8 min-w-95dvw md:min-w-lg border-solid border-1">
          <div ref="videoThumbRef" class="w-full h-full">
            <VideoCard v-if="data" :video="data" :show-avatar="showAvatar" :show-title="showTitle" :show-duration="showDuration"
              :show-views="showViews" :show-time-since="showTimeSince" :show-metadata="showMetadata"
              :show-progress="showProgress" :progress="progress[0]" :is-dark="isDark" :is-transparent="isTransparent" :padding="padding[0]" :corner-radius="cornerRadius[0]"/>
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
