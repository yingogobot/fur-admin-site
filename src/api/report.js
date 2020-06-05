import $ from './baseApi.js'

export default {
  getWholeSales(data) {
    return new Promise((resolve, reject) => {
      $.post('report/get_whole_sales', data)
        .then((results) => resolve(results))
        .catch((err) => reject(err))
    })
  }
}