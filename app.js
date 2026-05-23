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

// Cargar GeoJSON
fetch('./ANAGA.geojson')
  .then(res => res.json())
  .then(data => {
    L.geoJSON(data, {
      onEachFeature: (feature, layer) => {
        if (feature.properties && feature.properties.name) {
          layer.bindPopup(feature.properties.name);
        }
      }
    }).addTo(map);
  });
