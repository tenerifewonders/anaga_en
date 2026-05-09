// Ruta base de tus audios en Supabase
const AUDIO_BASE = "https://xzymbvnljudyypdyuisf.supabase.co/storage/v1/object/public/audioguides/";

let puntos = [];
let indice = 0;

// Cargar puntos + audios
async function cargarPuntosAudio() {
  const res = await fetch('./ANAGA.geojson');
  const data = await res.json();

  return data.features.map((f, i) => ({
    titulo: f.properties.Name,
    audio: `${AUDIO_BASE}Anaga.${i + 1}.wav`
  }));
}

async function loadGuide() {
  puntos = await cargarPuntosAudio();  // ← AHORA SE CARGA ANTES DE USARLO

  document.getElementById("guide-title").textContent = "Anaga";
  document.getElementById("guide-description").textContent = "The Pirate Coast";
}

// Reproducir audio correcto
function seleccionarCapitulo(i) {
  indice = i;
  const player = document.getElementById("player");
  player.src = puntos[i].audio;
  player.play();
}

loadGuide();
