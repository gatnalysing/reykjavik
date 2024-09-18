// Instantiate the map
let map = L.map('map').setView([64.14664697028653, -21.933761620456423], 16);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Add the custom zoom level control
let zoomLabelControl = new L.Control.ZoomLabel().addTo(map);

// Create the button element
const button = L.DomUtil.create('a', 'menningarnott-button', map.getContainer());
button.href = 'https://styring.gatnalysing.is';
button.target = '_blank';
button.innerHTML = 'STÝRING';

// Set the button styles
button.style.position = 'absolute';
button.style.top = '10px';
button.style.right = '10px';
button.style.backgroundColor = '#4CAF50'; // Green background
button.style.color = 'white'; // White text
button.style.padding = '15px 25px'; // Padding
button.style.fontSize = '16px'; // Font size
button.style.fontWeight = 'bold'; // Bold text
button.style.border = 'none'; // No border
button.style.borderRadius = '8px'; // Rounded corners
button.style.textAlign = 'center'; // Center text
button.style.textDecoration = 'none'; // No underline
button.style.cursor = 'pointer'; // Pointer cursor on hover
button.style.zIndex = '1000'; // Ensure it is on top of the map

// Add hover effect
button.onmouseover = function() {
    button.style.backgroundColor = '#45a049'; // Darker green on hover
};

button.onmouseout = function() {
    button.style.backgroundColor = '#4CAF50'; // Revert to original green
};
