import $ from './baseApi.js'

export default {
  getAllResalers() {
    return new Promise((resolve, reject) => {
      $.post('resaler/get_all')
        .then((results) => resolve(results))
        .catch((err) => reject(err))
    })
  }
}