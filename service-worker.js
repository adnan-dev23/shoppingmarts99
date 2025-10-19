// Define a name for the cache
const CACHE_NAME = 'shoppingmarts99-v1';

// List all the files and resources you want to cache for offline use
const urlsToCache = [
  '/',
  '/index.html',
  '/style.css',
  '/script.js',
  // Add your main image paths here so they work offline
  '/Images/perfumes/denver/1.jpg',
  '/Images/watches/led watch/1.jpg',
  // You can add other important images here
  '/icon-192x192.png', // Add your PWA icon path
  '/icon-512x512.png'  // Add your PWA icon path
];

// --- 1. Install the Service Worker and Cache Files ---
// This runs when the service worker is first installed.
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        // Add all the specified files to the cache
        return cache.addAll(urlsToCache);
      })
  );
});

// --- 2. Serve Cached Content (Fetch Event) ---
// This runs every time the browser tries to fetch a file (like a CSS file, image, or page).
self.addEventListener('fetch', event => {
  event.respondWith(
    // Check if the requested file is already in the cache
    caches.match(event.request)
      .then(response => {
        // If a cached version is found, return it
        if (response) {
          return response;
        }
        // If the file is not in the cache, try to fetch it from the network
        return fetch(event.request);
      })
  );
});

// --- 3. Clean Up Old Caches (Activate Event) ---
// This runs when the service worker is activated (e.g., after an update).
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME]; // The list of caches to keep
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          // If a cache is not on the whitelist, delete it
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});