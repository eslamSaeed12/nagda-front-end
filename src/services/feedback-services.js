import axios from "axios"

class feedbackServices {
  postFeedBack({ method, data, url }) {
    return axios.request({ method, data, url })
  }
}

export const FeedbackService = new feedbackServices()
