// Purple Service Worker — caching + push notifications
const CACHE = 'purple-v3';
const ASSETS = ['/', '/index.html', '/widget.html', '/manifest.json', '/icon-192.png'];

self.addEventListener('install', e => {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).catch(()=>{}));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// Serve from cache, fall back to network
self.addEventListener('fetch', e => {
  if(e.request.method !== 'GET') return;
  if(e.request.url.includes('supabase')) return; // never cache API calls
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});

// Push notifications
self.addEventListener('push', e => {
  const data = e.data ? e.data.json() : {};
  const title = data.title || 'Purple';
  const body = data.body || 'A new question is waiting for your vote.';
  const url = data.url || 'https://purple-poll.com';
  e.waitUntil(
    self.registration.showNotification(title, {
      body,
      icon: '/icon-192.png',
      badge: '/icon-192.png',
      tag: 'purple-notification',
      renotify: true,
      data: { url },
      actions: [
        { action: 'vote', title: 'Vote Now →' },
        { action: 'dismiss', title: 'Later' }
      ]
    })
  );
});

// Notification click
self.addEventListener('notificationclick', e => {
  e.notification.close();
  if(e.action === 'dismiss') return;
  const url = e.notification.data?.url || 'https://purple-poll.com';
  e.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(cls => {
      const w = cls.find(c => c.url.includes('purple-poll.com'));
      if(w) return w.focus();
      return clients.openWindow(url);
    })
  );
});

// Daily reminder via periodic background sync
self.addEventListener('periodicsync', e => {
  if(e.tag === 'daily-reminder') {
    e.waitUntil(
      self.registration.showNotification('Purple — Today\'s Question', {
        body: 'New questions are waiting. What does America think?',
        icon: '/icon-192.png',
        tag: 'purple-daily',
        data: { url: 'https://purple-poll.com' }
      })
    );
  }
});
