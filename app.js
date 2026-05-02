// URL del route.json en tu Netlify o Supabase
const ROUTE_URL = "./route.json";

async function loadGuide() {
  try {
    const response = await fetch(ROUTE_URL);
    const tracks = await response.json();

    // Título y descripción (puedes personalizarlo aquí)
    document.getElementById("guide-title").textContent = "Anaga";
    document.getElementById("guide-description").textContent = "The Pirate Coast";

    const tracksContainer = document.getElementById("tracks");
    tracksContainer.innerHTML = "";

    tracks.forEach(track => {
      const div = document.createElement("div");
      div.className = "track";

      div.innerHTML = `
        <div class="track-title">${track.title}</div>
        <audio controls src="${track.audio_url}"></audio>
      `;

      tracksContainer.appendChild(div);
    });

  } catch (error) {
    console.error("Error cargando la audioguía:", error);
  }
}

loadGuide();
