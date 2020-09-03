
const metaCsrfElement = document.querySelector('meta[name="X-CSRF-TOKEN"]')

export default {
  token: metaCsrfElement.getAttribute("content"),
  el: metaCsrfElement,
}
