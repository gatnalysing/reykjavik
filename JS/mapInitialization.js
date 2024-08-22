// Instantiate the map
let map = L.map('map').setView([64.14664697028653, -21.933761620456423], 16);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Add the custom zoom level control
let zoomLabelControl = new L.Control.ZoomLabel().addTo(map);
