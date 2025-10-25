const CACHE_NAME = 'shoppingmarts99-v10'; // Version updated for latest image paths
const urlsToCache = [
  '/',
  '/index.html',
  '/style.css',
  '/script.js',
  // Perfume Images
  '/Images/perfumes/denver/1.jpg', '/Images/perfumes/denver/2.jpg', '/Images/perfumes/denver/3.jpg', '/Images/perfumes/denver/4.jpg',
  // LED Watch Images
  '/Images/watches/led watch/1.jpg', '/Images/watches/led watch/2.jpg', '/Images/watches/led watch/3.jpg',
  // Voguish Watch Images
  '/Images/watches/Voguish Men Waches/1.jpg', '/Images/watches/Voguish Men Waches/2.jpg',
  // Backpack Images (All Colors)
  '/Images/Backpacks/Travel-College-Bags/gray-1.jpg', '/Images/Backpacks/Travel-College-Bags/gray-2.jpg', '/Images/Backpacks/Travel-College-Bags/gray-3.jpg', '/Images/Backpacks/Travel-College-Bags/gray-4.jpg',
  '/Images/Backpacks/Travel-College-Bags/blue-1.jpg', '/Images/Backpacks/Travel-College-Bags/blue-2.jpg', '/Images/Backpacks/Travel-College-Bags/blue-3.jpg', '/Images/Backpacks/Travel-College-Bags/blue-4.jpg',
  '/Images/Backpacks/Travel-College-Bags/red-1.jpg', '/Images/Backpacks/Travel-College-Bags/red-2.jpg', '/Images/Backpacks/Travel-College-Bags/red-3.jpg', '/Images/Backpacks/Travel-College-Bags/red-4.jpg',
  // Icons
  '/Images/icons/icon-192x192.png',
  '/Images/icons/icon-512x512.png'
];

self.addEventListener('install', event => {
  console.log('[SW] Install');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[SW] Caching core assets');
        return cache.addAll(urlsToCache).catch(err => console.error('[SW] Failed to cache during install:', err));
      })
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') { return; }
  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {
        if (cachedResponse) { return cachedResponse; }
        return fetch(event.request).then(
          networkResponse => {
            if(!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') { return networkResponse; }
            var responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then(cache => { cache.put(event.request, responseToCache); });
            return networkResponse;
          }
        ).catch(error => { console.error('[SW] Fetch failed:', error); });
      })
  );
});

self.addEventListener('activate', event => {
  console.log('[SW] Activate');
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            console.log('[SW] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});