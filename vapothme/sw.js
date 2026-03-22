const CACHE = 'vapothme-v1';
const ASSETS = ['/', '/index.html', '/manifest.json'];
self.addEventListener('install', e => e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS))));
self.addEventListener('fetch', e => e.respondWith(caches.match(e.request).then(r => r || fetch(e.request))));
self.addEventListener('push', e => {
  const data = e.data?.json() || {title:'Vapothme', body:'Nouvelle notification'};
  e.waitUntil(self.registration.showNotification(data.title||'Vapothme', {body: data.body, icon: '/icon-192.png'}));
});
