const MapboxDirectionApiUri = "https://api.mapbox.com/directions/v5/mapbox"
export default {
  getRoutes: ({ profile, origin, target }) => ({
    method: "GET",
    url: `${MapboxDirectionApiUri}/${profile}/${origin};${target}`,
    params: {
      annotations: "duration",
      continue_straight: true,
      geometries: "geojson",
      steps: true,
      banner_instructions: true,
      language: "ar",
      access_token: process.env.REACT_APP_MAPBOX_KEY,
    },
  }),
}
