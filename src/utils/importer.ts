export function getAssetsFile(url: string) {
  url = url.replace('@/assets/img/', '')
  return new URL(`../assets/img/${url}`, import.meta.url).href
}

export default {
  getAssetsFile
}
