const CACHE_NAME = "anaga-cache-v5";

const PRECACHE = [
  "./",
  "./index.html",
  "./styles.css",
  "./app.js",
  "./manifest.json",
  "./ANAGA.geojson"
];

self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(PRECACHE)));
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", event => {
  const url = new URL(event.request.url);

  // Cachear audios de Supabase
  if (url.href.includes("supabase.co/storage")) {
    event.respondWith(
      caches.match(event.request).then(cached =>
        cached ||
        fetch(event.request).then(res => {
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, res.clone()));
          return res;
        })
      )
    );
    return;
  }

  // JSON y GEOJSON → network first
  if (url.pathname.endsWith(".json") || url.pathname.endsWith(".geojson")) {
    event.respondWith(
      fetch(event.request)
        .then(res => {
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, res.clone()));
          return res;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  // Assets → cache first
  event.respondWith(
    caches.match(event.request).then(cached =>
      cached ||
      fetch(event.request).then(res => {
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, res.clone()));
        return res;
      })
    )
  );
});
