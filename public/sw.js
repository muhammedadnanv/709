const CACHE_NAME = 'splex-cache-v2';
const DYNAMIC_CACHE = 'splex-dynamic-v2';

const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/offline.html',
  '/icon-192x192.png',
  '/icon-512x512.png'
];

// Enhanced install event with precaching
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
      .then(() => self.skipWaiting())
  );
});

// Improved activate event with cache cleanup
self.addEventListener('activate', (event) => {
  event.waitUntil(
    Promise.all([
      self.clients.claim(),
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((cacheName) => 
              cacheName !== CACHE_NAME && 
              cacheName !== DYNAMIC_CACHE
            )
            .map((cacheName) => caches.delete(cacheName))
        );
      })
    ])
  );
});

// Enhanced fetch event with network-first strategy
self.addEventListener('fetch', (event) => {
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .catch(() => {
          return caches.match('/offline.html');
        })
    );
    return;
  }

  // Network first, falling back to cache
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Cache successful responses
        if (response.status === 200) {
          const responseClone = response.clone();
          caches.open(DYNAMIC_CACHE)
            .then((cache) => {
              cache.put(event.request, responseClone);
            });
        }
        return response;
      })
      .catch(async () => {
        const cachedResponse = await caches.match(event.request);
        return cachedResponse || new Response('Offline content not available');
      })
  );
});

// Background sync for offline actions
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-cards') {
    event.waitUntil(syncCards());
  }
});

// Push notification handling
self.addEventListener('push', (event) => {
  const options = {
    body: event.data?.text() || 'New update available',
    icon: '/icon-192x192.png',
    badge: '/icon-192x192.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'open',
        title: 'Open App'
      },
      {
        action: 'close',
        title: 'Close'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('Splex Digital Card Creator', options)
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  if (event.action === 'open') {
    event.waitUntil(clients.openWindow('/'));
  }
});

// Helper function for syncing cards
async function syncCards() {
  try {
    const offlineData = await getOfflineData();
    if (offlineData && offlineData.length > 0) {
      await Promise.all(offlineData.map(data => syncItem(data)));
      await clearOfflineData();
    }
  } catch (error) {
    console.error('Error syncing data:', error);
  }
}

// Helper functions for offline data management
async function getOfflineData() {
  const cache = await caches.open(DYNAMIC_CACHE);
  const keys = await cache.keys();
  const offlineData = [];
  
  for (const key of keys) {
    if (key.url.includes('/api/')) {
      const response = await cache.match(key);
      const data = await response.json();
      offlineData.push(data);
    }
  }
  
  return offlineData;
}

async function syncItem(data) {
  const response = await fetch('/api/sync', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  
  if (!response.ok) {
    throw new Error('Sync failed');
  }
  
  return response.json();
}

async function clearOfflineData() {
  const cache = await caches.open(DYNAMIC_CACHE);
  const keys = await cache.keys();
  
  return Promise.all(
    keys.map(key => {
      if (key.url.includes('/api/')) {
        return cache.delete(key);
      }
    })
  );
}