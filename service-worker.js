const CACHE_NAME = 'mindvault-cache-v1';
const urlsToCache = [
  '/mindvault/',
  '/mindvault/index.html',
  '/mindvault/static/js/main.js',
  '/mindvault/static/css/main.css',
  '/mindvault/manifest.json',
  '/mindvault/logo192.png',
  '/mindvault/logo512.png',
];

self.addEventListener('install', (event) => {
  console.log('[ServiceWorker] Installing...');
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('activate', (event) => {
  console.log('[ServiceWorker] Activated');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('[ServiceWorker] Removing old cache', key);
            return caches.delete(key);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', (event) => {
  console.log('[ServiceWorker] Fetching', event.request.url);
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    }).catch(() => {
      return caches.match('/mindvault/index.html'); // fallback for routes
    })
  );
});
