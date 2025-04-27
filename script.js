// Crear el mapa y centrarlo en Lima
const map = L.map('map').setView([-12.0464, -77.0428], 12); // Coordenadas de Lima Centro

// Añadir la capa del mapa de OpenStreetMap (Gratis)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Definir los límites de Lima Metropolitana
const limitesLima = [
  [-12.5, -77.2],  // Suroeste (más al sur y al oeste)
  [-11.7, -76.8]   // Noreste (más al norte y al este)
];

// Restringir la vista del mapa a Lima
map.setMaxBounds(limitesLima);
map.on('drag', function() {
  map.panInsideBounds(limitesLima, { animate: false });
});

// Desactivar el zoom muy alejado o muy cercano
map.setMinZoom(11);
map.setMaxZoom(18);


// Variable para almacenar todos los marcadores
let marcadores = [];

// Cargar lugares desde lugares.json
fetch('lugares.json')
  .then(response => response.json())
  .then(data => {
    data.forEach(lugar => {
      // Crear el marcador
      const marcador = L.marker([lugar.latitud, lugar.longitud]).addTo(map);

      // Crear el contenido del popup
      const popupContent = `
        <h3>${lugar.nombre}</h3>
        <img src="${lugar.foto}" alt="${lugar.nombre}" style="width:100%;height:auto;">
        <p>${lugar.descripcion}</p>
        <a href="${lugar.link}" target="_blank">Ver en Google Maps</a>
      `;

      // Asignar el popup al marcador
      marcador.bindPopup(popupContent);

      // Guardar el marcador y su tipo
      marcadores.push({
        marcador: marcador,
        tipo: lugar.tipo
      });
    });
  })
  .catch(error => console.error('Error cargando los lugares:', error));

// Función para filtrar por tipo
function filtrar(tipoSeleccionado) {
  marcadores.forEach(item => {
    if (tipoSeleccionado === 'todos' || item.tipo === tipoSeleccionado) {
      item.marcador.addTo(map);
    } else {
      map.removeLayer(item.marcador);
    }
  });
}
