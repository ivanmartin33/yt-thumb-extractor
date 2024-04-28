<script setup lang="ts">
import { type VideoFront } from '@/server/types';

const props = withDefaults(defineProps<{
    video: VideoFront,
    showAvatar: boolean,
    showTitle: boolean,
    showDuration: boolean,
    showViews: boolean,
    showTimeSince: boolean,
    showMetadata: boolean,
    showProgress: boolean,
    progress: number,
    isDark: string,
    isTransparent: boolean
}>(),{
    showAvatar: true,
    showTitle: true,
    showDuration: true,
    showViews: true,
    showTimeSince: true,
    showMetadata: true,
    showProgress: true,
    progress: 37,
    isDark: 'light',
    isTransparent: false
});

const duration = computed(() => {
    const regex = /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/
    const match = props.video.duration.match(regex)
    if (match) {
        const hours = match[1] ? String(parseInt(match[1])).padStart(2, '0') : 0
        const minutes = match[2] ? String(parseInt(match[2])).padStart(2, '0') : 0
        const seconds = match[3] ? String(parseInt(match[3])).padStart(2, '0') : 0
        return `${hours ? hours + ':' : ''}${minutes ? minutes + ':' : ':00'}${seconds ? seconds + '' : '00'}`
    }
})

// function to adapt views display unit / k / M / B
const formatViews = (views: number) => {
    if (views < 1000) {
        return views
    } else if (views < 1000000) {
        return `${Math.floor(views / 1000)} k`
    } else if (views < 1000000000) {
        return `${Math.floor(views / 1000000)} M`
    } else {
        return `${Math.floor(views / 1000000000)} B`
    }
}

//function to convert date to minutes ago / hours ago / days ago / months ago / years ago
const timeSince = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    let interval = seconds / 31536000;

    if (interval > 1) {
        const years = Math.floor(interval)
        return years > 1 ? `Il y a ${years} ans` : `Il y a ${years} an`
    }
    interval = seconds / 2592000;
    if (interval > 1) {
        return "Il y a " + Math.floor(interval) + " mois";
    }
    interval = seconds / 604800;
    if (interval > 1) {
        const weeks = Math.floor(interval)
        return weeks > 1 ? `Il y a ${weeks} semaines` : `Il y a ${weeks} semaine`
    }
    interval = seconds / 86400;
    if (interval > 1) {
        const days = Math.floor(interval)
        return days > 1 ? `Il y a ${days} jours` : `Il y a ${days} jour`
    }
    interval = seconds / 3600;
    if (interval > 1) {
        const hours = Math.floor(interval)
        return hours > 1 ? `Il y a ${hours} heures` : `Il y a ${hours} heure`
    }
    interval = seconds / 60;
    if (interval > 1) {
        const minutes = Math.floor(interval)
        return minutes > 1 ? `Il y a ${minutes} minutes` : `Il y a ${minutes} minute`
    }
    return "Il y a " + Math.floor(seconds) + " secondes";
}

const imgThumb = ref<string | undefined>('')
const avatar = ref<string>()

onMounted(async () => {
    if (props.video.thumbnails.high.url) {
        imgThumb.value = await fetchThumbnail(props.video.thumbnails.maxres.url)
    }

    if (props.video.channelThumbnail.url) {
        avatar.value = await fetchThumbnail(props.video.channelThumbnail.url)
    }
})

watch(() => props.video, async (newVal) => {
    if (newVal) {
        if (newVal.thumbnails.high.url) {
        imgThumb.value = await fetchThumbnail(newVal.thumbnails.maxres.url)
    }

    if (newVal.channelThumbnail.url) {
        avatar.value = await fetchThumbnail(newVal.channelThumbnail.url)
    }
    }
}, { deep: true })

const fetchThumbnail = async (thumb_url: string) => {
    // fetch the thumbnail of the video from the server and set it to the imgThumb variable as a base64 string
    const res = await $fetch('/api/fetchThumb', {
        query: {
            url: thumb_url
        }
    })
    if (res) {
        return res.toString()
    }
}

</script>

<template>
    <div class="darkMode rounded-xl w-full py-4 px-8" :class="isTransparent ? 'noBg' : ''" :data-theme="isDark">
    <div class="flex flex-col gap-4 w-full md:min-h-sm  justify-center">
        <ShAspectRatio :ratio="16 / 9" class="rounded-xl overflow-hidden relative isolate">
            <img class="w-full h-full object-cover " :src="imgThumb"
                alt="video thumbnail" />
            <div
                v-if="showDuration && showMetadata"
                class="absolute bg-black text-xs text-white font-medium bg-op-60 bottom-0 right-0 py-0.5 px-1.25 m-2.25 rounded">
                {{ duration }}
            </div>

            <div v-if="showProgress" class="absolute bottom-0 w-full">
                <ShProgress :model-value="progress"  class="rounded-none h-1.25"/>
            </div>
        </ShAspectRatio>
        <div class="flex gap-4" v-if="showMetadata">
            <div v-if="avatar && showAvatar">
                <ShAvatar>
                    <ShAvatarImage :src="avatar" alt="channel avatar" />
                </ShAvatar>
            </div>
            <div class="flex flex-col">
                <div v-if="showTitle">
                    <h2 class="text-lg font-semibold">{{ props.video.title }}</h2>
                    <p class="text-sm text-gray-500">{{ props.video.channelTitle }}</p>
                </div>
                <div class="flex justify-start">
                    <div v-if="showViews" class="text-sm text-gray-500">{{ formatViews(parseInt(props.video.viewCount)) }} vues</div>
                    <div v-if="showTimeSince" class="text-sm text-gray-500 not-first:before:content-['•'] not-first:before:my-0 not-first:before:mx-4px">{{ timeSince(new
                        Date(props.video.publishedAt)) }}</div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<style scoped>

[data-theme="light"] {
    --font-color: #222222;
    --bg-color: #f6f3f0;
}

[data-theme="dark"] {
    --font-color: #f6f3f0;
    --bg-color: #050505;
}

.darkMode {
    @apply text-[var(--font-color)] bg-[var(--bg-color)];


}

.noBg {
        @apply bg-transparent;
    }
</style>