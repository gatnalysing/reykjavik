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

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Add the custom zoom level control
let zoomLabelControl = new L.Control.ZoomLabel().addTo(map);

// Update the zoom label when the zoom level changes
map.on('zoomend', function() {
    zoomLabelControl.update();
});

// Fetching the CSV data and adding points to the map (assuming CSV is properly formatted)
fetch('data.csv')
    .then(response => response.text())
    .then(data => {
        const lines = data.split('\n').slice(1);  // Split by lines and ignore the header
        lines.forEach(line => {
            const [lat, lon, name, type, status, colour] = line.split(',');
            if (lat && lon) {
                L.circleMarker([parseFloat(lat), parseFloat(lon)], {
                    color: colour.trim(),
                    radius: 5
                }).bindPopup(`<b>${name.trim()}</b><br>Type: ${type.trim()}<br>Status: ${status.trim()}`).addTo(map);
            }
        });
    });
