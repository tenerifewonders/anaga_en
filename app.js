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
        const name = feature.properties.name;

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
