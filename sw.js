---
layout: none
permalink: /assets/js/dist/sw.min.js
---
// Unregister the old Chirpy PWA service worker and clear its caches.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((names) =>
      Promise.all(names.map((name) => caches.delete(name)))
    ).then(() => self.clients.matchAll()).then((clients) => {
      clients.forEach((client) => client.navigate(client.url));
    })
  );
  self.registration.unregister();
});
