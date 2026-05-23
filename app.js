const ROUTE_URL = "./ANAGA.geojson";

const player = document.getElementById("audio-player");
const tracksContainer = document.getElementById("audio-list");


// =========================
// MAP
// =========================

const map = L.map("map", {
  attributionControl: false
}).setView([28.535, -16.245], 12);


// LOCAL TILES
L.tileLayer("./tiles/{z}/{x}/{y}.png", {
  minZoom: 11,
  maxZoom: 14,
  tileSize: 256
}).addTo(map);


// =========================
// LOAD GUIDE
// =========================

async function loadGuide() {

  try {

    const response = await fetch(ROUTE_URL);

    if (!response.ok) {
      throw new Error("GeoJSON not found");
    }

    const data = await response.json();

    tracksContainer.innerHTML = "";

    // GEOJSON LAYER
    L.geoJSON(data, {

      onEachFeature: (feature, layer) => {

        const name =
          feature.properties.Name || "Point";

        const audioUrl =
          feature.properties.audio;

        // POPUP
        layer.bindPopup(name);

        // MAP CLICK
        layer.on("click", async () => {

          try {

            player.src = audioUrl;

            player.load();

            await player.play();

          } catch(err) {

            console.log(err);

          }

        });

      }

    }).addTo(map);


    // AUDIO LIST
    data.features.forEach((feature, index) => {

      const name =
        feature.properties.Name || `Track ${index}`;

      const audioUrl =
        feature.properties.audio;

      const li = document.createElement("li");

      li.className = "track-item";

      li.textContent = `${index}. ${name}`;

      li.addEventListener("click", async () => {

        try {

          // ACTIVE
          document
            .querySelectorAll(".track-item")
            .forEach(item => {
              item.classList.remove("active");
            });

          li.classList.add("active");

          // PLAY
          player.src = audioUrl;

          player.load();

          await player.play();

        } catch(err) {

          console.log(err);

        }

      });

      tracksContainer.appendChild(li);

    });

  } catch(error) {

    console.error(
      "Error loading audioguide:",
      error
    );

  }

}


// =========================
// GEOLOCATION
// =========================

map.locate({ setView: false });

map.on("locationfound", e => {

  L.circleMarker(e.latlng, {
    radius: 8,
    color: "#007bff",
    fillColor: "#3fa0ff",
    fillOpacity: 0.8
  }).addTo(map);

});


// =========================
// DOWNLOAD OFFLINE
// =========================

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
      "./style.css",
      "./icon-192.png",
      "./icon-512.png",
      "./hero.jpg"

    ];

    // AUDIOS
    data.features.forEach(feature => {

      if (feature.properties.audio) {

        urls.push(feature.properties.audio);

      }

    });

    // DOWNLOAD
    await cache.addAll(urls);

    document.getElementById(
      "download-status"
    ).innerHTML =
      "Offline content downloaded ✔";

  } catch(error) {

    console.error(error);

    document.getElementById(
      "download-status"
    ).innerHTML =
      "Download failed";

  }

}


// DOWNLOAD BUTTON
const downloadBtn =
  document.getElementById("download-btn");

if (downloadBtn) {

  downloadBtn.addEventListener(
    "click",
    downloadOfflineContent
  );

}


// =========================
// SERVICE WORKER
// =========================

if ("serviceWorker" in navigator) {

  window.addEventListener("load", async () => {

    try {

      await navigator
        .serviceWorker
        .register("./service-worker.js");

      console.log("SW registered");

    } catch(err) {

      console.log("SW error", err);

    }

  });

}


// =========================
// IOS INSTALL MESSAGE
// =========================

if (
  /iphone|ipad|ipod/i.test(navigator.userAgent)
  &&
  !window.navigator.standalone
) {

  document
    .getElementById("ios-msg")
    .style.display = "block";

}


// =========================
// INIT
// =========================

loadGuide();