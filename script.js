let map = L.map('map').setView([64.133, -21.898], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

fetch('data.csv')
  .then(response => response.text())
  .then(csvString => {
    let data = Papa.parse(csvString, { header: true, skipEmptyLines: true }).data;

    for (let item of data) {
      let circle = L.circleMarker([item.latitude, item.longitude], {
        color: item.colour,
        fillColor: item.colour,
        fillOpacity: 0.5,
        radius: 5
      }).addTo(map);
      circle.bindPopup(`<b>Name:</b> ${item.name}<br><b>Type:</b> ${item.type}<br><b>Status:</b> ${item.status}`);
    }

    // Force the map to adjust its size
    map.invalidateSize();
  });
