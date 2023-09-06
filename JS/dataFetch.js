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
    const lines = data.split('\n');
    const header = lines[0].split(','); // Extract the header
    lines.slice(1).forEach(line => {
        const values = line.split(',');
        if (values[0] && values[1]) { // Check for latitude and longitude
            const popupContent = header.reduce((content, columnName, index) => {
                // Skip lat, lon, and colour for the popup
                if(columnName.trim() !== 'latitude' && columnName.trim() !== 'longitude' && columnName.trim() !== 'colour') {
                    content += `<b>${columnName.trim()}:</b> ${values[index].trim()}<br>`;
                }
                return content;
            }, '');
            
            const marker = L.circleMarker([parseFloat(values[0]), parseFloat(values[1])], {
                ...getInitialStyle(),
                color: values[header.indexOf('colour')].trim() // Assumes 'colour' is always present
            }).bindPopup(popupContent).addTo(map);

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
