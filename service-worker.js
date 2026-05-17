const CACHE_NAME = "anaga-cache-v14";

const ASSETS = [
  "./",
  "./index.html",
  "./app.js",
  "./ANAGA.geojson",
  "./manifest.json",
  "./styles.css"
];

// Instalar SW y cachear archivos base
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

// Activar SW y limpiar versiones antiguas
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// Interceptar peticiones
self.addEventListener("fetch", event => {
  const url = new URL(event.request.url);

  // 1) Cachear audios de Supabase cuando se reproducen
  if (url.href.includes("supabase.co/storage")) {
    event.respondWith(
      caches.match(event.request).then(cached => {
        return (
          cached ||
          fetch(event.request).then(networkResponse => {
            caches.open(CACHE_NAME).then(cache =>
              cache.put(event.request, networkResponse.clone())
            );
            return networkResponse;
          })
        );
      })
    );
    return;
  }

  // 2) Cachear JSON/GeoJSON con estrategia network-first
  if (url.pathname.endsWith(".json") || url.pathname.endsWith(".geojson")) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          caches.open(CACHE_NAME).then(cache =>
            cache.put(event.request, response.clone())
          );
          return response;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  // 3) Cache-first para assets estáticos
  event.respondWith(
    caches.match(event.request).then(cached => {
      return (
        cached ||
        fetch(event.request).then(networkResponse => {
          return networkResponse;
        })
      );
    })
  );
});
