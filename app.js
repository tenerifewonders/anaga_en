// Ruta base de tus audios en Supabase
const AUDIO_BASE = "https://xzymbvnljudyypdyuisf.supabase.co/storage/v1/object/public/audioguides/";

// Cargar puntos desde ANAGA.geojson
async function cargarPuntos() {
  const res = await fetch('ANAGA.geojson');
  const data = await res.json();

  return data.features.map((f, i) => ({
    titulo: f.properties.Name,
    audio: `${AUDIO_BASE}Anaga.${i + 1}.wav`
  }));
}

let puntos = [];
let indice = 0;

async function loadGuide() {
  try {
    puntos = await cargarPuntos();

    // Título y descripción
    document.getElementById("guide-title").textContent = "Anaga";
    document.getElementById("guide-description").textContent = "The Pirate Coast";

    const tracksContainer = document.getElementById("tracks");
    tracksContainer.innerHTML = "";

    puntos.forEach((p, i) => {
      const div = document.createElement("div");
      div.className = "track";

      div.innerHTML = `
        <div class="track-title">${p.titulo}</div>
        <audio id="audio-${i}" controls src="${p.audio}"></audio>
      `;

      tracksContainer.appendChild(div);
    });

  } catch (error) {
    console.error("Error cargando la audioguía:", error);
  }
}

// Seleccionar capítulo desde la lista del index
function seleccionarCapitulo(i) {
  indice = i;

  const audio = document.getElementById(`audio-${i}`);
  if (audio) {
    audio.scrollIntoView({ behavior: "smooth", block: "center" });
    audio.play();
  }
}

loadGuide();


