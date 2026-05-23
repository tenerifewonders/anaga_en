// Crear mapa centrado en Anaga
const map = L.map('map', {
  zoomControl: true,
  minZoom: 10,
  maxZoom: 16
}).setView([28.526, -16.247], 13);

// Tiles locales
L.tileLayer('./tiles/{z}/{x}/{y}.png', {
  tileSize: 256,
  minZoom: 10,
  maxZoom: 16,
  attribution: 'Map data © OpenStreetMap contributors'
}).addTo(map);

// Cargar GeoJSON + generar lista de audios
fetch('./ANAGA.geojson')
  .then(res => res.json())
  .then(data => {
    const audioList = document.getElementById("audioList");

    L.geoJSON(data, {
      onEachFeature: (feature, layer) => {
        const name = feature.properties.name;
        const audio = feature.properties.audio; // Debe venir en el GeoJSON

        // Popup en el mapa
        layer.bindPopup(name);

        // Crear tarjeta de audio
        const track = document.createElement("div");
        track.className = "track";

        track.innerHTML = `
          <div class="track-title">${name}</div>
          <audio controls src="${audio}"></audio>
        `;

        audioList.appendChild(track);
      }
    }).addTo(map);
  });
