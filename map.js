// Initialize the map
var map = L.map('map').setView([64.133, -21.898], 15);

// Create a tile layer using OpenStreetMap as the base layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: 'Map data &copy; OpenStreetMap contributors',
  maxZoom: 18,
}).addTo(map);

// Load the CSV file and generate circle markers
fetch('light_posts.csv')
  .then(response => response.text())
  .then(data => {
    var lightPosts = parseCSV(data);
    lightPosts.forEach(function(post) {
      var circle = L.circle([post.latitude, post.longitude], {
        color: post.colour, // Set the color based on the 'colour' column in the CSV
        fillColor: 'black', // Set the fill color to black
        fillOpacity: 0.8,
        radius: getMarkerRadius(map.getZoom()) // Calculate the radius based on the current zoom level
      }).addTo(map);

      circle.bindPopup(post.name);
    });
  });

// Parse CSV data into an array of objects
function parseCSV(csv) {
  var lines = csv.split('\n');
  var result = [];
  var headers = lines[0].split(',');

  for (var i = 1; i < lines.length; i++) {
    var obj = {};
    var currentLine = lines[i].split(',');

    for (var j = 0; j < headers.length; j++) {
      obj[headers[j].trim()] = currentLine[j].trim();
    }

    result.push(obj);
  }

  return result;
}

// Calculate the marker radius based on the current zoom level
function getMarkerRadius(zoom) {
  var baseRadius = 10; // Adjust this value to control the initial dot size
  var maxRadius = 100; // Adjust this value to set the maximum dot size
  var zoomThreshold = 16; // Adjust this value to set the zoom level where the dot size stops increasing

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
