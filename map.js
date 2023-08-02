// Initialize the map
var map = L.map('map').setView([64.133, -21.898], 15);

// Create a tile layer using OpenStreetMap as the base layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: 'Map data &copy; OpenStreetMap contributors',
  maxZoom: 18,
}).addTo(map);

// Fetch the data from the Adafruit IO API
fetch('https://io.adafruit.com/api/v2/davidjrb/feeds/hitastig/data?limit=1')
  .then(response => response.json())
  .then(data => {
    // Assuming the latest value is in the first array element
    var latestData = data[0];
    var temperature = parseFloat(latestData.value);
    var circle = L.circle([64.129327, -21.8183472], {
      color: 'black',
      fillColor: 'black',
      fillOpacity: 0.8,
      radius: getMarkerRadius(map.getZoom())
    }).addTo(map);

    circle.bindPopup('hitastig<br>Temperature: ' + temperature.toFixed(2) + '°C');
  });

// Calculate the marker radius based on the current zoom level
function getMarkerRadius(zoom) {
  var baseRadius = 10;
  var maxRadius = 100;
  var zoomThreshold = 16;

  var adjustedRadius = baseRadius * Math.pow(2, zoomThreshold - zoom);
  return Math.min(adjustedRadius, maxRadius);
}

// Update marker sizes when the zoom level changes
map.on('zoomend', function() {
  map.eachLayer(function(layer) {
    if (layer instanceof L.Circle) {
      layer.setRadius(getMarkerRadius(map.getZoom()));
    }
  });
});
