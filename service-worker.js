const CACHE_NAME = "anaga-cache-v13";

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
  self
