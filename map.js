// Initialize the map
var map = L.map('map').setView([64.129327, -21.8183472], 15);

// Create a tile layer using OpenStreetMap as the base layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: 'Map data &copy; OpenStreetMap contributors',
  maxZoom: 18,
}).addTo(map);

// Function to create a custom marker
function createCustomMarker() {
  return L.divIcon({
    className: 'custom-marker',
    iconSize: [15, 15]
  });
}

// Fetch CSV data and create markers
fetch('light_posts.csv')
  .then(response => response.text())
  .then(csvData => {
    var parsedData = Papa.parse(csvData, { header: true }).data;
    
    parsedData.forEach(row => {
      var lat = parseFloat(row.latitude);
      var lng = parseFloat(row.longitude);
      var marker = L.marker([lat, lng], { icon: createCustomMarker() }).addTo(map);

      // Customize the popup content based on your CSV columns
      var popupContent = '<strong>' + row.title + '</strong><br>' +
                         'Description: ' + row.description;
      marker.bindPopup(popupContent);
    });
  })
  .catch(error => console.error('Error fetching CSV data:', error));

// Update marker sizes when the zoom level changes
map.on('zoomend', function() {
  map.eachLayer(function(layer) {
    if (layer instanceof L.Marker) {
      layer.setIcon(createCustomMarker());
    }
  });
});
