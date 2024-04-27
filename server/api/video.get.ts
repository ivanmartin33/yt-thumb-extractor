export default defineEventHandler(async (event) => {
  const { id } = getQuery(event)

  if (!id) {
    return createError('Missing id')
  }

  const config = useRuntimeConfig()

  try {
    const res = $fetch('https://www.googleapis.com/youtube/v3/videos', {
      method: 'GET',
      query: {
        id,
        key: config.ytApiKey,
        part: "snippet"
      }
    })

    return res

  } catch (e: any) {
    return createError(e.message)
  }
})