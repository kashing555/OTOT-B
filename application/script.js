import "bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"
import axios from "axios"
import prettyBytes from "pretty-bytes"
import setupEditors from "./setupEditor"

const form = document.querySelector("[data-form]")
const { requestEditor, updateResponseEditor } = setupEditors()

axios.interceptors.request.use(request => {
  request.customData = request.customData || {}
  request.customData.startTime = new Date().getTime()
  return request
})

axios.interceptors.response.use(updateEndTime, e => {
  return Promise.reject(updateEndTime(e.response))
})

function updateEndTime(response) {
  response.customData = response.customData || {}
  response.customData.time =
    new Date().getTime() - response.config.customData.startTime
  return response
}

function updateResponseDetails(response) {
  document.querySelector("[data-status]").textContent = response.status
  document.querySelector("[data-time]").textContent = response.customData.time
  document.querySelector("[data-size]").textContent = prettyBytes(
    JSON.stringify(response.data).length +
      JSON.stringify(response.headers).length
  )
  document.querySelector("[message]").textContent = response.data.message
}

form.addEventListener("submit", e => {
  e.preventDefault()
  let data
  try {
    data = JSON.parse(requestEditor.state.doc.toString() || null)
  } catch (e) {
    alert("JSON data is malformed")
    return
  }

  axios({
    url: document.querySelector("[data-url]").value,
    method: document.querySelector("[data-method]").value,
    data,
  })
    .catch(e => e)
    .then(response => {
      document
        .querySelector("[data-response-section]")
        .classList.remove("d-none")
      updateResponseDetails(response)
      updateResponseEditor(response.data.data)
      console.log(response)
      console.log('redis')
    })
})

