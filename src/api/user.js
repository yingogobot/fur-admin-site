import $ from './baseApi.js'

export default {
  login(data) {
    return new Promise((resolve, reject) => {
      $.post('account/login', data)
        .then((results) => resolve(results))
        .catch((err) => reject(err))
    })
  }
}
