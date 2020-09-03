import axios from "axios"

class AuthServices {
  login({ url, data, method }) {
    return axios.request({
      url,
      data,
      method,
      withCredentials: true,
      credentials: "same-origin",
      mode: "no-cors",
    })
  }

  jwtCoookieChecker({ url, data, method }) {
    return axios.request({
      url,
      data,
      method,
      withCredentials: true,
      credentials: "same-origin",
      mode: "no-cors",
    })
  }

  logout({ url, method }) {
    return axios.request({
      url,
      method,
      withCredentials: true,
    })
  }

  userConfirmation({ url, data, method }) {
    return axios.request({
      url,
      method,
      data,
      withCredentials: true,
    })
  }

  csrf_token(csrfForm) {
    return axios.request({
      ...csrfForm,
      withCredentials: true,
    })
  }
}

export const AuthServicesInstance = new AuthServices()
