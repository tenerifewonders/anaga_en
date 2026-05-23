const ROUTE_URL = "./ANAGA.geojson";

const player = document.getElementById("audio-player");
const tracksContainer = document.getElementById("audio-list");


// LOAD GUIDE
async function loadGuide() {

  try {

    const response = await fetch(ROUTE_URL);

    if (!response.ok) {
      throw new Error("GeoJSON not found");
    }

    const data = await response.json();

    tracksContainer.innerHTML = "";

    data.features.forEach((feature, index) => {

      const name =
        feature.properties.Name || `Track ${index + 1}`;

      const audioUrl =
        feature.properties.audio;

      // CREATE ITEM
      const li = document.createElement("li");

      li.className = "track-item";

      li.textContent = `${index}. ${name}`;

      // CLICK
      li.addEventListener("click", async () => {

        try {

          // ACTIVE STYLE
          document
            .querySelectorAll(".track-item")
            .forEach(item => {
              item.style.background = "";
            });

          li.style.background = "#f0f0f0";

          // SET AUDIO
          player.src = audioUrl;

          // PRELOAD
          player.load();

          // PLAY
          await player.play();

        } catch(err) {

          console.log("Audio playback error", err);

        }

      });

      tracksContainer.appendChild(li);

    });

  } catch(error) {

    console.error(
      "Error loading audioguide:",
      error
    );

    tracksContainer.innerHTML = `
      <li>
        Failed to load audioguide
      </li>
    `;

  }

}


// DOWNLOAD OFFLINE
async function downloadOfflineContent() {

  try {

    const cache = await caches.open("anaga-v1");

    const response = await fetch(ROUTE_URL);

    const data = await response.json();

    const urls = [

      "./",
      "./index.html",
      "./manifest.json",
      "./ANAGA.geojson",
      "./EN-ANAGA.html",
      "./leaflet.js",
      "./leaflet.css",
      "./icon-192.png",
      "./icon-512.png"

    ];

    // ADD AUDIOS
    data.features.forEach(feature => {

      if (feature.properties.audio) {

        urls.push(feature.properties.audio);

      }

    });

    // CACHE ALL
    await cache.addAll(urls);

    console.log("Offline content downloaded");

    alert("Offline content downloaded ✔");

  } catch(error) {

    console.error(
      "Offline download failed:",
      error
    );

    alert("Offline download failed");

  }

}


// BUTTON
const downloadBtn =
  document.getElementById("download-btn");

if (downloadBtn) {

  downloadBtn.addEventListener(
    "click",
    downloadOfflineContent
  );

}


// INIT
loadGuide();