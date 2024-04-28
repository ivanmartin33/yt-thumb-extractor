<script setup lang="ts">
import '@/assets/css/index.css'
import { type VideoFront } from '@/server/types';
import { domToPng } from 'modern-screenshot'

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

const { data, error } = await useFetch<VideoFront>('/api/video', {
  method: 'GET',
  query: {
    id: id
  },
})

const videoThumbRef = ref<HTMLDivElement | null>(null)

const getThumbnail = () => {

  if (!videoThumbRef.value) {
    return
  }
  domToPng(videoThumbRef.value).then(dataUrl => {
    const link = document.createElement('a')
    link.download = `thumbnail-${id.value}.png`
    link.href = dataUrl
    link.click()
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

</script>
<template>
  <div class="flex flex-col mx-auto gap-6 md:gap-8 py-4 md:py-8 px-4 max-w-4xl">
    <div class="w-full flex justify-between">
      <h1>Youtube Thumbnail Excavator</h1>
      <NavToggleDarkMode />
    </div>

    <div class="space-y-2">
      <label for="url">Youtube URL</label>
      <ShInput v-model="url" class="border-solid" />
    </div>
    <div v-if="data" class="flex flex-wrap-reverse md:flex-nowrap justify-center w-full gap-2">

      <div class="md:flex-basis-2/6 h-full">
        <NavFilters v-model:showMetadata="showMetadata" v-model:showAvatar="showAvatar" v-model:showTitle="showTitle"
          v-model:showDuration="showDuration" v-model:showViews="showViews" v-model:showTimeSince="showTimeSince"
          v-model:showProgress="showProgress" v-model:progress="progress" v-model:is-dark="isDark"
          v-model:is-transparent="isTransparent" />
      </div>

      <div class="flex flex-col gap-4 md:flex-basis-4/6">
        <div class="bg-iconic dark:bg-iconic-dark flex justify-center rounded-xl p-8 min-h-sm min-w-95dvw md:min-w-lg">
          <div ref="videoThumbRef" class="w-full h-full">
            <VideoCard :video="data" :show-avatar="showAvatar" :show-title="showTitle" :show-duration="showDuration"
              :show-views="showViews" :show-time-since="showTimeSince" :show-metadata="showMetadata"
              :show-progress="showProgress" :progress="progress[0]" :is-dark="isDark" :is-transparent="isTransparent" />
          </div>
        </div>

        <ShButton @click="getThumbnail" class="cursor-pointer w-fit self-end font-semibold" :size="'lg'">Download Thumbnail
        </ShButton>
      </div>

    </div>

  </div>
</template>
