// Custom control to display zoom level
L.Control.ZoomLabel = L.Control.extend({
  options: {
    position: 'topleft'
  },
  onAdd: function(map) {
    this._container = L.DomUtil.create('div', 'leaflet-control-zoomlabel');
    this.update();
    return this._container;
  },
  update: function() {
    if (this._map) {
      this._container.innerHTML = 'Zoom: ' + this._map.getZoom();
    }
  }
});

// Instantiate the map
let map = L.map('map').setView([64.133, -21.898], 13);
let markers = [];  // Store all circle markers

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Add the custom zoom level control
let zoomLabelControl = new L.Control.ZoomLabel().addTo(map);

// Function to adjust marker style based on zoom level
function adjustMarkerStyle() {
  const zoomLevel = map.getZoom();

  markers.forEach(marker => {
    if (zoomLevel <= 14) {
      marker.setStyle({
        radius: 2,
        weight: 0
      });
    } else {
      marker.setStyle({
        radius: 5,
        weight: 1
      });
    }
  });
}

// Update the zoom label and adjust marker style when zoom level changes
map.on('zoomend', function() {
  zoomLabelControl.update();
  adjustMarkerStyle();
});

// Fetching the CSV data and adding points to the map (assuming CSV is properly formatted)
fetch('data.csv')
  .then(response => response.text())
  .then(data => {
    const lines = data.split('\n').slice(1);  // Split by lines and ignore the header
    lines.forEach(line => {
      const [lat, lon, name, type, status, colour] = line.split(',');
      if (lat && lon) {
        const marker = L.circleMarker([parseFloat(lat), parseFloat(lon)], {
          color: colour.trim(),
          radius: 5
        }).bindPopup(`<b>${name.trim()}</b><br>Type: ${type.trim()}<br>Status: ${status.trim()}`).addTo(map);
        markers.push(marker);
      }
    });
    adjustMarkerStyle();  // Make dots appear according to zoom level

  });
