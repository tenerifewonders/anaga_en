const CACHE_NAME = "anaga-en-v7";

const ASSETS = [
"./",
  "./index.html",
  "./ANAGA.geojson",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png",
  "./EN-ANAGA.html",
  "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css",
  "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
];

const AUDIO_URLS = [
"https://xzymbvnljudyypdyuisf.supabase.co/storage/v1/object/public/anaga_en/Anaga.0.mp3",
  "https://xzymbvnljudyypdyuisf.supabase.co/storage/v1/object/public/anaga_en/Anaga.1.mp3",
  "https://xzymbvnljudyypdyuisf.supabase.co/storage/v1/object/public/anaga_en/Anaga.2.mp3",
  "https://xzymbvnljudyypdyuisf.supabase.co/storage/v1/object/public/anaga_en/Anaga.3.mp3",
  "https://xzymbvnljudyypdyuisf.supabase.co/storage/v1/object/public/anaga_en/Anaga.4.mp3",
  "https://xzymbvnljudyypdyuisf.supabase.co/storage/v1/object/public/anaga_en/Anaga.5.mp3",
  "https://xzymbvnljudyypdyuisf.supabase.co/storage/v1/object/public/anaga_en/Anaga.6.mp3",
  "https://xzymbvnljudyypdyuisf.supabase.co/storage/v1/object/public/anaga_en/Anaga.7.mp3",
  "https://xzymbvnljudyypdyuisf.supabase.co/storage/v1/object/public/anaga_en/Anaga.8.mp3",
  "https://xzymbvnljudyypdyuisf.supabase.co/storage/v1/object/public/anaga_en/Anaga.9.mp3"
];

// 1. INSTALL: Pre-cache core app shell
self.addEventListener("install", (e) => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      console.log("[SW] Pre-caching core assets...");
      await cache.addAll(ASSETS).catch(err => console.warn("[SW] Asset pre-cache warning:", err));
      
      // Pre-fetch all audio files with clean GET requests
      for (const url of AUDIO_URLS) {
        try {
          const req = new Request(url, { method: "GET" });
          const res = await fetch(req);
          if (res && res.status === 200) {
            await cache.put(url, res);
          }
        } catch (err) {
          console.warn("[SW] Audio pre-cache warning for:", url, err);
        }
      }
    })
  );
});

// 2. ACTIVATE: Clean old caches & claim clients immediately
self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      )
    ).then(() => self.clients.claim())
  );
});

// 3. FETCH: Standard Cache-First for Tiles/Assets + Range Request handler for MP3 Audios
self.addEventListener("fetch", (e) => {
  const url = e.request.url;

  // Intercept audio requests (MP3s) for Range Request offline playback
  if (url.endsWith(".mp3") || url.includes("supabase.co/storage/v1/object/public/")) {
    e.respondWith(handleAudioFetch(e.request));
    return;
  }

  // Standard Assets & Map Tiles: Cache First, falling back to Network
  e.respondWith(
    caches.match(e.request).then((cachedRes) => {
      if (cachedRes) return cachedRes;
      return fetch(e.request).then((netRes) => {
        if (netRes && netRes.status === 200) {
          const resToCache = netRes.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(e.request, resToCache));
        }
        return netRes;
      }).catch(() => {
        if (e.request.mode === "navigate") {
          return caches.match("./index.html");
        }
      });
    })
  );
});

// Helper: Handle HTTP Range Requests for cached audio files (iOS Safari & Android Chrome)
async function handleAudioFetch(request) {
  const cache = await caches.open(CACHE_NAME);
  let response = await cache.match(request.url);

  if (!response) {
    try {
      const cleanReq = new Request(request.url, { method: "GET" });
      const netRes = await fetch(cleanReq);
      if (netRes && netRes.status === 200) {
        await cache.put(request.url, netRes.clone());
        response = netRes;
      } else {
        return netRes;
      }
    } catch (err) {
      console.error("[SW] Audio offline & not cached:", request.url);
      return new Response("Audio offline not available", { status: 503 });
    }
  }

  const rangeHeader = request.headers.get("range");
  if (rangeHeader && response) {
    const arrayBuffer = await response.clone().arrayBuffer();
    const bytes = rangeHeader.replace(/bytes=/, "").split("-");
    const start = parseInt(bytes[0], 10) || 0;
    const end = bytes[1] ? parseInt(bytes[1], 10) : arrayBuffer.byteLength - 1;
    const chunk = arrayBuffer.slice(start, end + 1);

    return new Response(chunk, {
      status: 206,
      statusText: "Partial Content",
      headers: new Headers({
        "Content-Range": `bytes ${start}-${end}/${arrayBuffer.byteLength}`,
        "Content-Length": chunk.byteLength,
        "Content-Type": "audio/mpeg",
        "Accept-Ranges": "bytes"
      })
    });
  }

  return response;
}
