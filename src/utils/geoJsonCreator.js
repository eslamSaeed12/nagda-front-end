const geoJsonTypesAllowed = ["Point"]
const geoJson = require("geojson")

export function geoJsonCreator(data, type) {
  if (typeof type !== "string")
    throw Error("Not valid data type just string allowed")
  if (!geoJsonTypesAllowed.includes(type)) throw Error("not valid geojson type")

  // point
  return geoJson.parse(data, { Point: ["lat", "lon"] })
}

export function gjsonifyLine(routes) {
  return {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properites: {},
        geometry: {
          type: "MultiLineString",
          coordinates: [routes.coordinates],
        },
      },
    ],
  }
}
