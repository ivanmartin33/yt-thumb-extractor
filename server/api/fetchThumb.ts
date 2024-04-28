export default defineEventHandler(async (event) => {
  const { url } = getQuery(event)

  if (!url && typeof url !== 'string') {
    return createError('Invalid or Missing id')
  }

  const config = useRuntimeConfig()

  try {
    const res = await $fetch(url as string, { responseType: "arrayBuffer" })
   // convert to base64
    const buffer = res as ArrayBuffer
    const base64 = btoa(new Uint8Array(buffer).reduce((data, byte) => data + String.fromCharCode(byte), ''))

    return 'data:image/jpg;base64,' + base64
  } catch (e: any) {
    return createError(e.message)
  }
})