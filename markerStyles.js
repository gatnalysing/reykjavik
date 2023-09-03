let markers = [];  // Store all circle markers

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

map.on('zoomend', function() {
  zoomLabelControl.update();
  adjustMarkerStyle();
});
