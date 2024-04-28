import {Channel, ChannelListResponse, VideoFront, VideoListResponse} from "@/server/types"
export default defineEventHandler(async (event) => {
  const { id } = getQuery(event)

  if (!id && typeof id !== 'string') {
    return createError('Invalid or Missing id')
  }

  const config = useRuntimeConfig()

  try {
    const res = await $fetch<VideoListResponse>('https://www.googleapis.com/youtube/v3/videos', {
      method: 'GET',
      query: {
        id,
        key: config.ytApiKey,
        part: "snippet,contentDetails,statistics"
      }
    })
    
    if (!res.items || res.items.length === 0) {
      return createError('No data found')
    }

    const item = res.items[0]

    let channelThumbnail = null;
    try{
      // get channel thumbnail

      const channelRes = await $fetch<Channel>('/api/channel', {
        method: 'GET',
        query: {
          id: item.snippet.channelId,
          key: config.ytApiKey,
          part: "snippet"
        }
      })

      if(!channelRes){
        return createError('No data found')
      }

      channelThumbnail = channelRes.snippet.thumbnails.default

    } catch (e: any) {
      return createError(e.message)
    }

    const video: VideoFront = {
      id: item.id,
      title: item.snippet.title,
      description: item.snippet.description,
      publishedAt: item.snippet.publishedAt,
      thumbnails: item.snippet.thumbnails,
      channelTitle: item.snippet.channelTitle,
      tags: item.snippet.tags,
      categoryId: item.snippet.categoryId,
      liveBroadcastContent: item.snippet.liveBroadcastContent,
      defaultLanguage: item.snippet.defaultLanguage,
      localized: item.snippet.localized,
      viewCount: item.statistics.viewCount,
      duration: item.contentDetails.duration,
      channelID: item.snippet.channelId,
      channelThumbnail: channelThumbnail
    }

    return video

  } catch (e: any) {
    return createError(e.message)
  }
})