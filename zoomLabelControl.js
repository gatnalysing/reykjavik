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
