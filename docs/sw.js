/* CySA+ Study Guide service worker
   - HTML/navigation: network-first (never serve stale app shells)
   - Hashed static assets: cache-first
*/
const STATIC_CACHE = "cysa-static-v1";

self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(caches.open(STATIC_CACHE));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(keys.filter((k) => k !== STATIC_CACHE).map((k) => caches.delete(k)));
      await self.clients.claim();
    })(),
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);

  // Network-first for HTML documents and navigations
  if (req.mode === "navigate" || req.destination === "document" || url.pathname.endsWith(".html") || url.pathname === "/") {
    event.respondWith(
      fetch(req).catch(() => caches.match(req)),
    );
    return;
  }

  // Cache-first for same-origin static assets (JS/CSS are content-hashed)
  if (url.origin === self.location.origin) {
    event.respondWith(
      caches.match(req).then(
        (cached) =>
          cached ||
          fetch(req).then((resp) => {
            if (resp.ok) {
              const clone = resp.clone();
              caches.open(STATIC_CACHE).then((c) => c.put(req, clone));
            }
            return resp;
          }),
      ),
    );
  }
});
