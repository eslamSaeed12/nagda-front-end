class MapboxUtils {
  checkForLayer(layers, pushedLayer) {
    return Boolean(layers.find(l => l.id === pushedLayer.id))
  }

  addRouteLayer(layers, layersSeetter, lineLayer) {
    layersSeetter([...layers, lineLayer])
  }

  addLayer(layers, layersSeetter, locationLayer) {
    layersSeetter([...layers, locationLayer])
  }
  flyTo(
    viewport,
    viewportSetter,
    duration,
    zoom,
    transitionInterpolator,
    d3Effect
  ) {
    return location =>
      viewportSetter({
        ...viewport,
        latitude: location.lat,
        longitude: location.lon,
        transitionDuration: duration,
        zoom,
        transitionInterpolator: new transitionInterpolator(),
        transitionEasing: d3Effect,
      })
  }

  deleteLayer(layer, layers, layersSetter) {
    const layerIndex = layers.indexOf(layers.find(l => l.id === layer.id))
    const newLayers = layers
    newLayers.splice(layerIndex, 1)
    layersSetter([...newLayers])
  }
}

export default new MapboxUtils()
