import axios from "axios"
import DomUtils from "./csrf-to-dom"

if (process.env.NODE_ENV !== "development") {
  axios.defaults.headers["CSRF-Token"] = DomUtils.token
  axios.defaults.common.headers["CSRF-Token"] = DomUtils.token
}
