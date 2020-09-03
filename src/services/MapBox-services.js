import axios from "axios"

class MapBoxServices {
  getRoute({ method, params, url }) {
    return axios.request({ method, params, url })
  }
}

export const MapboxService = new MapBoxServices()
