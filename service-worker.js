const CACHE_NAME = "anaga-en-v1";

// Archivos base que deben estar siempre offline
const CORE_ASSETS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png",
  "./ANAGA.geojson",
  "./leaflet.css",
  "./leaflet.js"
];

// Instalar SW → cachea lo básico
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(CORE_ASSETS))
  );
  self.skipWaiting();
});

// Activar SW → limpiar versiones antiguas
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

// Estrategia de fetch:
// 1) Audios → cache dinámico
// 2) Tiles → cache dinámico
// 3) HTML/JS/CSS → network-first con fallback a cache
self.addEventListener("fetch", event => {
  const url = event.request.url;

  // 🔊 AUDIOS .wav (Supabase)
  if (url.endsWith(".wav")) {
    event.respondWith(
      caches.open("audio-cache").then(cache =>
        cache.match(event.request).then(resp => {
          return (
            resp ||
            fetch(event.request).then(networkResp => {
              cache.put(event.request, networkResp.clone());
              return networkResp;
            })
          );
        })
      )
    );
    return;
  }

  // 🗺️ TILES DEL MAPA
  if (url.includes("/tiles/")) {
    event.respondWith(
      caches.open("tiles-cache").then(cache =>
        cache.match(event.request).then(resp => {
          return (
            resp ||
            fetch(event.request).then(networkResp => {
              cache.put(event.request, networkResp.clone());
              return networkResp;
            })
          );
        })
      )
    );
    return;
  }

  // 📄 HTML / JS / CSS → network first
  event.respondWith(
    fetch(event.request)
      .then(resp => {
        const clone = resp.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        return resp;
      })
      .catch(() => caches.match(event.request))
  );
});
