import {VideoFront, ChannelListResponse} from "@/server/types"
export default defineEventHandler(async (event) => {
  const { id } = getQuery(event)

  if (!id && typeof id !== 'string') {
    return createError('Invalid or Missing id')
  }

  const config = useRuntimeConfig()

  try {
    const res = await $fetch<ChannelListResponse>('https://www.googleapis.com/youtube/v3/channels', {
      method: 'GET',
      query: {
        id,
        key: config.ytApiKey,
        part: "snippet"
      }
    })

    if (!res.items || res.items.length === 0) {
      return createError('No data found')
    }

    const item = res.items[0]

    return item

  } catch (e: any) {
    return createError(e.message)
  }
})