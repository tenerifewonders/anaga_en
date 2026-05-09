// Ruta base de tus audios en Supabase
const AUDIO_BASE = "https://xzymbvnljudyypdyuisf.supabase.co/storage/v1/object/public/audioguides/";

let audios = [];
let indice = 0;

// Cargar audios según número de puntos del GeoJSON
async function cargarAudios() {
  const res = await fetch('./ANAGA.geojson');
  const data = await res.json();

  return data.features.map((f, i) => ({
    titulo: f.properties.Name,
    audio: `${AUDIO_BASE}Anaga.${i + 1}.wav`
  }));
}

async function loadGuide() {
  audios = await cargarAudios();

  document.getElementById("guide-title").textContent = "Anaga";
  document.getElementById("guide-description").textContent = "The Pirate Coast";

  // Reproducir automáticamente el primer audio
  const player = document.getElementById("player");
  player.src = audios[0].audio;
}

loadGuide();
