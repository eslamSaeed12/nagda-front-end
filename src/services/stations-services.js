import axios from "axios"

class StationsServices {
  getNearestPoint({ method, data, url }) {
    return axios.request({ method, data, url, withCredentials: true })
  }

  getAllPoints(confguration) {
    return axios.request(confguration)
  }
}

export const StationsService = new StationsServices()
