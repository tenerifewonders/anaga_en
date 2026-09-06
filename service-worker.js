const CACHE_NAME = "anaga-en-v11";

// 1. Core App Shell (Lightweight - installs in <300ms)
const CORE_ASSETS = [
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

const TILE_URLS = [
  "./tiles/11/927/853.png",
  "./tiles/11/927/854.png",
  "./tiles/11/927/855.png",
  "./tiles/11/927/856.png",
  "./tiles/11/927/857.png",
  "./tiles/11/927/858.png",
  "./tiles/11/928/853.png",
  "./tiles/11/928/854.png",
  "./tiles/11/928/855.png",
  "./tiles/11/928/856.png",
  "./tiles/11/928/857.png",
  "./tiles/11/928/858.png",
  "./tiles/11/929/853.png",
  "./tiles/11/929/854.png",
  "./tiles/11/929/855.png",
  "./tiles/11/929/856.png",
  "./tiles/11/929/857.png",
  "./tiles/11/929/858.png",
  "./tiles/11/930/853.png",
  "./tiles/11/930/854.png",
  "./tiles/11/930/855.png",
  "./tiles/11/930/856.png",
  "./tiles/11/930/857.png",
  "./tiles/11/930/858.png",
  "./tiles/11/931/853.png",
  "./tiles/11/931/854.png",
  "./tiles/11/931/855.png",
  "./tiles/11/931/856.png",
  "./tiles/11/931/857.png",
  "./tiles/11/931/858.png",
  "./tiles/11/932/853.png",
  "./tiles/11/932/854.png",
  "./tiles/11/932/855.png",
  "./tiles/11/932/856.png",
  "./tiles/11/932/857.png",
  "./tiles/11/932/858.png",
  "./tiles/12/1854/1706.png",
  "./tiles/12/1854/1707.png",
  "./tiles/12/1854/1708.png",
  "./tiles/12/1854/1709.png",
  "./tiles/12/1854/1710.png",
  "./tiles/12/1854/1711.png",
  "./tiles/12/1854/1712.png",
  "./tiles/12/1854/1713.png",
  "./tiles/12/1854/1714.png",
  "./tiles/12/1854/1715.png",
  "./tiles/12/1854/1716.png",
  "./tiles/12/1855/1706.png",
  "./tiles/12/1855/1707.png",
  "./tiles/12/1855/1708.png",
  "./tiles/12/1855/1709.png",
  "./tiles/12/1855/1710.png",
  "./tiles/12/1855/1711.png",
  "./tiles/12/1855/1712.png",
  "./tiles/12/1855/1713.png",
  "./tiles/12/1855/1714.png",
  "./tiles/12/1855/1715.png",
  "./tiles/12/1855/1716.png",
  "./tiles/12/1856/1706.png",
  "./tiles/12/1856/1707.png",
  "./tiles/12/1856/1708.png",
  "./tiles/12/1856/1709.png",
  "./tiles/12/1856/1710.png",
  "./tiles/12/1856/1711.png",
  "./tiles/12/1856/1712.png",
  "./tiles/12/1856/1713.png",
  "./tiles/12/1856/1714.png",
  "./tiles/12/1856/1715.png",
  "./tiles/12/1856/1716.png",
  "./tiles/12/1857/1706.png",
  "./tiles/12/1857/1707.png",
  "./tiles/12/1857/1708.png",
  "./tiles/12/1857/1709.png",
  "./tiles/12/1857/1710.png",
  "./tiles/12/1857/1711.png",
  "./tiles/12/1857/1712.png",
  "./tiles/12/1857/1713.png",
  "./tiles/12/1857/1714.png",
  "./tiles/12/1857/1715.png",
  "./tiles/12/1857/1716.png",
  "./tiles/12/1858/1706.png",
  "./tiles/12/1858/1707.png",
  "./tiles/12/1858/1708.png",
  "./tiles/12/1858/1709.png",
  "./tiles/12/1858/1710.png",
  "./tiles/12/1858/1711.png",
  "./tiles/12/1858/1712.png",
  "./tiles/12/1858/1713.png",
  "./tiles/12/1858/1714.png",
  "./tiles/12/1858/1715.png",
  "./tiles/12/1858/1716.png",
  "./tiles/12/1859/1706.png",
  "./tiles/12/1859/1707.png",
  "./tiles/12/1859/1708.png",
  "./tiles/12/1859/1709.png",
  "./tiles/12/1859/1710.png",
  "./tiles/12/1859/1711.png",
  "./tiles/12/1859/1712.png",
  "./tiles/12/1859/1713.png",
  "./tiles/12/1859/1714.png",
  "./tiles/12/1859/1715.png",
  "./tiles/12/1859/1716.png",
  "./tiles/12/1860/1706.png",
  "./tiles/12/1860/1707.png",
  "./tiles/12/1860/1708.png",
  "./tiles/12/1860/1709.png",
  "./tiles/12/1860/1710.png",
  "./tiles/12/1860/1711.png",
  "./tiles/12/1860/1712.png",
  "./tiles/12/1860/1713.png",
  "./tiles/12/1860/1714.png",
  "./tiles/12/1860/1715.png",
  "./tiles/12/1860/1716.png",
  "./tiles/12/1861/1706.png",
  "./tiles/12/1861/1707.png",
  "./tiles/12/1861/1708.png",
  "./tiles/12/1861/1709.png",
  "./tiles/12/1861/1710.png",
  "./tiles/12/1861/1711.png",
  "./tiles/12/1861/1712.png",
  "./tiles/12/1861/1713.png",
  "./tiles/12/1861/1714.png",
  "./tiles/12/1861/1715.png",
  "./tiles/12/1861/1716.png",
  "./tiles/12/1862/1706.png",
  "./tiles/12/1862/1707.png",
  "./tiles/12/1862/1708.png",
  "./tiles/12/1862/1709.png",
  "./tiles/12/1862/1710.png",
  "./tiles/12/1862/1711.png",
  "./tiles/12/1862/1712.png",
  "./tiles/12/1862/1713.png",
  "./tiles/12/1862/1714.png",
  "./tiles/12/1862/1715.png",
  "./tiles/12/1862/1716.png",
  "./tiles/12/1863/1706.png",
  "./tiles/12/1863/1707.png",
  "./tiles/12/1863/1708.png",
  "./tiles/12/1863/1709.png",
  "./tiles/12/1863/1710.png",
  "./tiles/12/1863/1711.png",
  "./tiles/12/1863/1712.png",
  "./tiles/12/1863/1713.png",
  "./tiles/12/1863/1714.png",
  "./tiles/12/1863/1715.png",
  "./tiles/12/1863/1716.png",
  "./tiles/12/1864/1706.png",
  "./tiles/12/1864/1707.png",
  "./tiles/12/1864/1708.png",
  "./tiles/12/1864/1709.png",
  "./tiles/12/1864/1710.png",
  "./tiles/12/1864/1711.png",
  "./tiles/12/1864/1712.png",
  "./tiles/12/1864/1713.png",
  "./tiles/12/1864/1714.png",
  "./tiles/12/1864/1715.png",
  "./tiles/12/1864/1716.png",
  "./tiles/12/1865/1706.png",
  "./tiles/12/1865/1707.png",
  "./tiles/12/1865/1708.png",
  "./tiles/12/1865/1709.png",
  "./tiles/12/1865/1710.png",
  "./tiles/12/1865/1711.png",
  "./tiles/12/1865/1712.png",
  "./tiles/12/1865/1713.png",
  "./tiles/12/1865/1714.png",
  "./tiles/12/1865/1715.png",
  "./tiles/12/1865/1716.png",
  "./tiles/13/3723/3416.png",
  "./tiles/13/3723/3417.png",
  "./tiles/13/3723/3418.png",
  "./tiles/13/3723/3419.png",
  "./tiles/13/3723/3420.png",
  "./tiles/13/3724/3416.png",
  "./tiles/13/3724/3417.png",
  "./tiles/13/3724/3418.png",
  "./tiles/13/3724/3419.png",
  "./tiles/13/3724/3420.png",
  "./tiles/13/3725/3416.png",
  "./tiles/13/3725/3417.png",
  "./tiles/13/3725/3418.png",
  "./tiles/13/3725/3419.png",
  "./tiles/13/3725/3420.png",
  "./tiles/13/3726/3416.png",
  "./tiles/13/3726/3417.png",
  "./tiles/13/3726/3418.png",
  "./tiles/13/3726/3419.png",
  "./tiles/13/3726/3420.png",
  "./tiles/13/3727/3416.png",
  "./tiles/13/3727/3417.png",
  "./tiles/13/3727/3418.png",
  "./tiles/13/3727/3419.png",
  "./tiles/13/3727/3420.png",
  "./tiles/13/3728/3416.png",
  "./tiles/13/3728/3417.png",
  "./tiles/13/3728/3418.png",
  "./tiles/13/3728/3419.png",
  "./tiles/13/3728/3420.png",
  "./tiles/14/7447/6832.png",
  "./tiles/14/7447/6833.png",
  "./tiles/14/7447/6834.png",
  "./tiles/14/7447/6835.png",
  "./tiles/14/7447/6836.png",
  "./tiles/14/7447/6837.png",
  "./tiles/14/7447/6838.png",
  "./tiles/14/7447/6839.png",
  "./tiles/14/7447/6840.png",
  "./tiles/14/7448/6832.png",
  "./tiles/14/7448/6833.png",
  "./tiles/14/7448/6834.png",
  "./tiles/14/7448/6835.png",
  "./tiles/14/7448/6836.png",
  "./tiles/14/7448/6837.png",
  "./tiles/14/7448/6838.png",
  "./tiles/14/7448/6839.png",
  "./tiles/14/7448/6840.png",
  "./tiles/14/7449/6832.png",
  "./tiles/14/7449/6833.png",
  "./tiles/14/7449/6834.png",
  "./tiles/14/7449/6835.png",
  "./tiles/14/7449/6836.png",
  "./tiles/14/7449/6837.png",
  "./tiles/14/7449/6838.png",
  "./tiles/14/7449/6839.png",
  "./tiles/14/7449/6840.png",
  "./tiles/14/7450/6832.png",
  "./tiles/14/7450/6833.png",
  "./tiles/14/7450/6834.png",
  "./tiles/14/7450/6835.png",
  "./tiles/14/7450/6836.png",
  "./tiles/14/7450/6837.png",
  "./tiles/14/7450/6838.png",
  "./tiles/14/7450/6839.png",
  "./tiles/14/7450/6840.png",
  "./tiles/14/7451/6832.png",
  "./tiles/14/7451/6833.png",
  "./tiles/14/7451/6834.png",
  "./tiles/14/7451/6835.png",
  "./tiles/14/7451/6836.png",
  "./tiles/14/7451/6837.png",
  "./tiles/14/7451/6838.png",
  "./tiles/14/7451/6839.png",
  "./tiles/14/7451/6840.png",
  "./tiles/14/7452/6832.png",
  "./tiles/14/7452/6833.png",
  "./tiles/14/7452/6834.png",
  "./tiles/14/7452/6835.png",
  "./tiles/14/7452/6836.png",
  "./tiles/14/7452/6837.png",
  "./tiles/14/7452/6838.png",
  "./tiles/14/7452/6839.png",
  "./tiles/14/7452/6840.png",
  "./tiles/14/7453/6832.png",
  "./tiles/14/7453/6833.png",
  "./tiles/14/7453/6834.png",
  "./tiles/14/7453/6835.png",
  "./tiles/14/7453/6836.png",
  "./tiles/14/7453/6837.png",
  "./tiles/14/7453/6838.png",
  "./tiles/14/7453/6839.png",
  "./tiles/14/7453/6840.png",
  "./tiles/14/7454/6832.png",
  "./tiles/14/7454/6833.png",
  "./tiles/14/7454/6834.png",
  "./tiles/14/7454/6835.png",
  "./tiles/14/7454/6836.png",
  "./tiles/14/7454/6837.png",
  "./tiles/14/7454/6838.png",
  "./tiles/14/7454/6839.png",
  "./tiles/14/7454/6840.png",
  "./tiles/14/7455/6832.png",
  "./tiles/14/7455/6833.png",
  "./tiles/14/7455/6834.png",
  "./tiles/14/7455/6835.png",
  "./tiles/14/7455/6836.png",
  "./tiles/14/7455/6837.png",
  "./tiles/14/7455/6838.png",
  "./tiles/14/7455/6839.png",
  "./tiles/14/7455/6840.png",
  "./tiles/14/7456/6832.png",
  "./tiles/14/7456/6833.png",
  "./tiles/14/7456/6834.png",
  "./tiles/14/7456/6835.png",
  "./tiles/14/7456/6836.png",
  "./tiles/14/7456/6837.png",
  "./tiles/14/7456/6838.png",
  "./tiles/14/7456/6839.png",
  "./tiles/14/7456/6840.png"
];

// 1. INSTALL: Instant installation of core app shell
self.addEventListener("install", (e) => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("[SW] Pre-caching core app shell...");
      return cache.addAll(CORE_ASSETS).catch((err) => {
        console.warn("[SW] App shell pre-cache warning:", err);
      });
    })
  );
});

// 2. ACTIVATE: Clean old caches, claim clients & run parallel background pre-cache
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

  // Background caching of all audio files & map tiles (non-blocking)
  preCacheOfflineContent();
});

// Message listener for skip waiting
self.addEventListener("message", (e) => {
  if (e.data && e.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

// Fast parallel batch precaching function
async function preCacheOfflineContent() {
  try {
    const cache = await caches.open(CACHE_NAME);
    console.log("[SW] Starting background precache for tiles and audio...");

    // Helper for fast parallel batch fetch
    async function fetchBatch(urls, batchSize) {
      for (let i = 0; i < urls.length; i += batchSize) {
        const batch = urls.slice(i, i + batchSize);
        await Promise.all(
          batch.map(async (url) => {
            try {
              const req = url.endsWith(".mp3") ? new Request(url, { method: "GET" }) : url;
              const res = await fetch(req);
              if (res && res.status === 200) {
                await cache.put(url, res);
              }
            } catch (err) {
              // Silently ignore individual tile/audio network glitches
            }
          })
        );
      }
    }

    // Pre-cache all audio MP3 files (3 at a time)
    await fetchBatch(AUDIO_URLS, 3);
    // Pre-cache all map tile PNGs (15 at a time)
    await fetchBatch(TILE_URLS, 15);

    console.log("[SW] Background precache complete! Notifying app...");

    // Notify all open client tabs/windows
    const clientsList = await self.clients.matchAll();
    for (const client of clientsList) {
      client.postMessage({ type: "CACHE_COMPLETE" });
    }
  } catch (err) {
    console.warn("[SW] Background precache warning:", err);
  }
}

// 3. FETCH: Smart Cache-First for Assets/Tiles + HTTP Range Request Handler for Audios
self.addEventListener("fetch", (e) => {
  const url = e.request.url;

  // Audio Range Request Handler for HTML5 Audio (iOS & Android)
  if (url.endsWith(".mp3") || url.includes("supabase.co/storage/v1/object/public/")) {
    e.respondWith(handleAudioFetch(e.request));
    return;
  }

  // Cache-First strategy for Map Tiles & App Assets
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

// Helper: Handle HTTP Range Requests for cached audio files
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
