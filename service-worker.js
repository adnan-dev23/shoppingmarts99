// Define a name and version for the cache
const CACHE_NAME = 'shoppingmarts99-v3'; // Increment version (e.g., v4) if you change cached files later

// List all the files and resources you want to cache for offline use
const urlsToCache = [
  '/', // Cache the root URL (important!)
  '/index.html',
  '/style.css',
  '/script.js',
  
  // Cache all images for listed products
  '/Images/perfumes/denver/1.jpg', 
  '/Images/perfumes/denver/2.jpg', 
  '/Images/perfumes/denver/3.jpg', 
  '/Images/perfumes/denver/4.jpg', 
  '/Images/watches/led watch/1.jpg',
  '/Images/watches/led watch/2.jpg',
  '/Images/watches/led watch/3.jpg',
  
  // Cache icons (adjust path if needed, ensure they exist)
  '/Images/icons/icon-192x192.png', 
  '/Images/icons/icon-512x512.png'  
];

// --- 1. Install the Service Worker and Cache Files ---
self.addEventListener('install', event => {
  console.log('[Service Worker] Install event triggered');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[Service Worker] Caching core assets:', urlsToCache);
        // Use addAll for efficiency, but catch errors for better debugging
        return cache.addAll(urlsToCache).catch(error => {
            console.error('[Service Worker] Failed to cache resources during install:', error);
            // Optionally, you could try caching individually here if addAll fails
        });
      })
      .then(() => {
        console.log('[Service Worker] Core assets cached successfully');
        // Force the waiting service worker to become the active service worker.
        return self.skipWaiting(); 
      })
  );
});

// --- 2. Serve Cached Content (Fetch Event) ---
self.addEventListener('fetch', event => {
  // We only want to handle GET requests for caching
  if (event.request.method !== 'GET') {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {
        // Cache hit - return response from cache
        if (cachedResponse) {
          // console.log('[Service Worker] Returning cached response for:', event.request.url);
          return cachedResponse;
        }

        // Not in cache - fetch from network
        // console.log('[Service Worker] Fetching from network:', event.request.url);
        return fetch(event.request).then(
          networkResponse => {
            // Check if we received a valid response
            if(!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
              return networkResponse; // Return invalid response as is
            }

            // IMPORTANT: Clone the response. A response is a stream
            // and because we want the browser to consume the response
            // as well as the cache consuming the response, we need
            // to clone it so we have two streams.
            var responseToCache = networkResponse.clone();

            // Cache the newly fetched resource
            caches.open(CACHE_NAME)
              .then(cache => {
                // console.log('[Service Worker] Caching new resource:', event.request.url);
                cache.put(event.request, responseToCache);
              });

            return networkResponse; // Return the original response to the browser
          }
        ).catch(error => {
            // Network request failed, maybe return a fallback offline page?
            console.error('[Service Worker] Fetch failed; returning offline fallback if available.', error);
            // Example: return caches.match('/offline.html'); 
            // For now, just let the browser handle the error
        });
      })
  );
});

// --- 3. Clean Up Old Caches (Activate Event) ---
self.addEventListener('activate', event => {
  console.log('[Service Worker] Activate event triggered');
  const cacheWhitelist = [CACHE_NAME]; // Only keep the current cache version
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          // If a cache is found and it's not in the whitelist, delete it
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            console.log('[Service Worker] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
        console.log('[Service Worker] Claiming clients');
        // Tell the active service worker to take control of the page immediately.
        return self.clients.claim(); 
    })
  );
});