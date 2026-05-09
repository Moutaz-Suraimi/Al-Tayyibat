const CACHE_NAME = 'tayebat-pwa-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/tayebat.png',
  '/favicon.jpg'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request).then(
          function(response) {
            // Check if we received a valid response
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // IMPORTANT: Clone the response. A response is a stream
            // and because we want the browser to consume the response
            // as well as the cache consuming the response, we need
            // to clone it so we have two streams.
            var responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(function(cache) {
                // Don't cache API requests or non-GET requests
                if (event.request.method === 'GET' && event.request.url.startsWith('http')) {
                  cache.put(event.request, responseToCache);
                }
              });

            return response;
          }
        );
      }).catch(() => {
        // If both cache and network fail, we can return a fallback
        // For navigation requests, we could return index.html
      })
  );
});
