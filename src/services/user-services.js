import axios from "axios"
class userServices {
  updateProfile({ method, data, url }) {
    return axios.request({ method, data, url, withCredentials: true })
  }
}

export const UserService = new userServices()
