let initialZoom = map.getZoom();

function getInitialStyle() {
    if (initialZoom <= 14) {
        return {
            radius: 2,
            weight: 0
        };
    } else {
        return {
            radius: 5,
            weight: 1
        };
    }
}

fetch('data.csv')
  .then(response => response.text())
  .then(data => {
    const lines = data.split('\n').slice(1);
    lines.forEach(line => {
      const [lat, lon, name, type, status, colour] = line.split(',');
      if (lat && lon) {
        const marker = L.circleMarker([parseFloat(lat), parseFloat(lon)], {
          ...getInitialStyle(),
          color: colour.trim()
        }).bindPopup(`<b>${name.trim()}</b><br>Type: ${type.trim()}<br>Status: ${status.trim()}`).addTo(map);
        markers.push(marker);
      }
    });
  });
