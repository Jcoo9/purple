// Purple Service Worker v11 — force cache refresh
const CACHE = 'purple-v11';
const ASSETS = ['/', '/index.html', '/widget.html', '/manifest.json', '/icon-192.png'];

self.addEventListener('install', e => {
  self.skipWaiting(); // Take over immediately
  e.waitUntil(
    caches.open(CACHE).then(c => {
      // Force fetch fresh copies, don't use cached versions
      return Promise.all(ASSETS.map(url => 
        fetch(url, {cache: 'no-store'}).then(r => c.put(url, r)).catch(()=>{})
      ));
    })
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => {
        console.log('Deleting old cache:', k);
        return caches.delete(k);
      }))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  if(e.request.method !== 'GET') return;
  if(e.request.url.includes('supabase')) return;
  if(e.request.url.includes('googleapis')) return;
  if(e.request.url.includes('googletagmanager')) return;
  // Always go to network for HTML files to get latest
  if(e.request.url.endsWith('.html') || e.request.url.endsWith('/')) {
    e.respondWith(fetch(e.request, {cache: 'no-store'}).catch(() => caches.match(e.request)));
    return;
  }
  e.respondWith(caches.match(e.request).then(cached => cached || fetch(e.request)));
});
