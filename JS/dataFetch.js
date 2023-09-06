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

function processCSVData(data) {
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
}

// First, fetch the layers.csv to decide which files to fetch
fetch('DATA/layers.csv')
  .then(response => response.text())
  .then(data => {
      const lines = data.split('\n').slice(1);  // Skipping the header row
      lines.forEach(line => {
          const [read, fileName] = line.split(',');
          // If read flag is 1, then fetch the corresponding csv
          if (read.trim() === '1') {
              fetch(`DATA/${fileName.trim()}.csv`)
                  .then(response => response.text())
                  .then(processCSVData);
          }
      });
  });
