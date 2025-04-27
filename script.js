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
