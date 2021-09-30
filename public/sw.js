const STATIC_CACHE_NAME = 's-app-1'
const urlsToCache = [
  'index.html', 
  'offline.html',
  '/images/default.jpeg',
  '/images/photo.jpeg',
  '/icons/icon-192x192.png'
]

const self = this

self.addEventListener('install', async () => {
  const cache = await caches.open(STATIC_CACHE_NAME)
  await cache.addAll(urlsToCache)
})


self.addEventListener('fetch', event => {
  const { request } = event
  event.respondWith(cachedFirst(request))
})


self.addEventListener('activate', async () => {
  const cachedNames = await caches.keys()
  await Promise.all(
    cachedNames
      .filter(name => name !== STATIC_CACHE_NAME)
      .map(name => caches.delete(name))
  )
})


const cachedFirst = async request => {
  try {
    const cached = await caches.match(request)
    return cached ?? await fetch(request)
  }
  catch(e) {
    console.log(e)
    return await caches.match('offline.html')
  }
}

