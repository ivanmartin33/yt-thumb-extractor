import {type VideoCardProps} from "@/server/types" 
export const useMainStore = defineStore('main',() => {

  const defaultVideoCardProps: VideoCardProps = {
    showAvatar: true,
    showTitle: true,
    showDuration: true,
    showViews: true,
    showTimeSince: true,
    showMetadata: true,
    showProgress: true,
    progress: [37],
    isDark: 'light',
    isTransparent: false,
    padding: [50],
    cornerRadius: [50],
    globalDisabled: false
  }

  const store = ref<VideoCardProps>(defaultVideoCardProps)

  return {
    defaultVideoCardProps,
    store
  }
}, { persist: true })