import axios from "axios"
class faqServices {
  getFaqs({ method, url }) {
    return axios.request({ method, url })
  }
}

export const faqService = new faqServices()
