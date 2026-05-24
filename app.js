// -----------------------------
// 1) INICIALIZAR MAPA
// -----------------------------
const map = L.map('map').setView([28.525, -16.254], 13);

L.tileLayer('./tiles/{z}/{x}/{y}.png', {
  maxZoom: 18,
  minZoom: 10,
  errorTileUrl: './tiles/empty.png'
}).addTo(map);

// Diccionarios para vincular puntos ↔ audios
const markers = {};
const audioElements = {};
let activeMarker = null;


// -----------------------------
// 2) CARGAR GEOJSON (PUNTOS)
// -----------------------------
fetch('./ANAGA.geojson')
  .then(res => res.json())
  .then(data => {
    L.geoJSON(data, {
      onEachFeature: (feature, layer) => {
        console.log("Feature properties:", feature.properties);

        // AJUSTA AQUÍ SI HACE FALTA
        const name =
          feature.properties.name ||
          feature.properties.title ||
          feature.properties.Nombre ||
          feature.properties.nombre;

        if (!name) {
          console.warn("⚠ Sin nombre en feature:", feature.properties);
          return;
        }

        // Guardar marker por nombre
        markers[name] = layer;

        // Popup con el nombre
        layer.bindPopup(name);

        // 👉 Al pulsar el marker → reproducir audio + activar color
        layer.on("click", () => {
          const audio = audioElements[name];
          if (audio) {
            audio.play();

            // Quitar color del marker anterior
            if (activeMarker && activeMarker._icon) {
              activeMarker._icon.classList.remove("marker-active");
            }

            // Activar color en este marker
            if (layer._icon) {
              layer._icon.classList.add("marker-active");
            }

            activeMarker = layer;
          } else {
            console.warn("⚠ No hay audio para:", name);
          }
        });
      }
    }).addTo(map);
  })
  .catch(err => console.error("Error cargando ANAGA.geojson:", err));


// -----------------------------
// 3) CARGAR AUDIOS (route.json)
// -----------------------------
const ROUTE_URL = "./route.json";

async function loadGuide() {
  try {
    const response = await fetch(ROUTE_URL);
    const tracks = await response.json();

    console.log("Tracks cargados:", tracks);

    document.getElementById("guide-title").textContent = "Anaga";
    document.getElementById("guide-description").textContent = "The Pirate Coast";

    const tracksContainer = document.getElementById("tracks");
    tracksContainer.innerHTML = "";

    tracks.forEach(track => {
      const title = track.title;
      const audioUrl = track.audio_url;

      const div = document.createElement("div");
      div.className = "track";

      div.innerHTML = `
        <div class="track-title">${title}</div>
        <audio controls src="${audioUrl}"></audio>
      `;

      const audio = div.querySelector("audio");

      // Guardar audio por nombre
      audioElements[title] = audio;

      // 👉 Al pulsar el audio → centrar marker + abrir popup + activar color
      div.addEventListener("click", () => {
        const marker = markers[title];
        if (marker) {
          map.setView(marker.getLatLng(), 15, { animate: true });
          marker.openPopup();

          // Quitar color del anterior
          if (activeMarker && activeMarker._icon) {
            activeMarker._icon.classList.remove("marker-active");
          }

          // Activar color en este
          if (marker._icon) {
            marker._icon.classList.add("marker-active");
          }

          activeMarker = marker;

          // Reproducir audio
          audio.play();
        } else {
          console.warn("⚠ No hay marker para:", title);
        }
      });

      // 👉 Cuando el audio se pausa o termina → quitar color
      audio.addEventListener("pause", () => {
        if (activeMarker && activeMarker._icon) {
          activeMarker._icon.classList.remove("marker-active");
        }
      });

      audio.addEventListener("ended", () => {
        if (activeMarker && activeMarker._icon) {
          activeMarker._icon.classList.remove("marker-active");
        }
      });

      tracksContainer.appendChild(div);
    });

  } catch (error) {
    console.error("Error cargando la audioguía:", error);
  }
}

loadGuide();
