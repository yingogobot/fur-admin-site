import VueResource from 'vue-resource'
import Vue from 'vue'
import ApiHelper from './apiHelpers.js'

Vue.use(VueResource)

export default {
  get(endpoint, params) {
    return new Promise((resolve, reject) => {
      let url = ApiHelper.handleApiUrl(endpoint, params)
      let header = { headers: ApiHelper.baseHeader() }
      Vue.http.get(url, header)
        .then((response) => resolve(response.body.results))
        .catch((err) => {
          console.log(endpoint + ' error' + JSON.stringify(err))
          console.log(err)
          reject(err)
        })
    })
  },
  post(endpoint, data) {
    return new Promise((resolve, reject) => {
      let url = ApiHelper.handleApiUrl(endpoint)
      let header = { headers: ApiHelper.baseHeader() }
      Vue.http.post(url, data, header)
        .then((response) => resolve(response.body.results))
        .catch((err) => {
          console.log(endpoint + ' error' + JSON.stringify(err))
          console.log(err)
          reject(err)
        })
    })
  },
  postWithFile(endpoint, data) {
    return new Promise((resolve, reject) => {
      let url = ApiHelper.handleApiUrl(endpoint)
      let header = { headers: ApiHelper.baseHeader() }
      header.headers['content-type'] = 'multipart/form-data'
      Vue.http.post(url, data, header)
        .then((response) => {
          console.log(response)
          resolve(response.body.results)
        })
        .catch((err) => {
          console.log(endpoint + ' error' + JSON.stringify(err))
          console.log(err)
          reject(err)
        })
    })
  }
}
