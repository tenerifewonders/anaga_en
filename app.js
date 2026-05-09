const AUDIO_BASE = "https://xzymbvnljudyypdyuisf.supabase.co/storage/v1/object/public/audioguides/";

let audios = [];

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

  const lista = document.getElementById("audio-list");

  audios.forEach((item, i) => {
    const li = document.createElement("li");
    li.textContent = item.titulo;
    li.onclick = () => reproducir(i);
    lista.appendChild(li);
  });
}

function reproducir(i) {
  const player = document.getElementById("player");
  player.src = audios[i].audio;
  player.play();
}

loadGuide();
