import $ from './baseApi.js'

export default {
  getAllSalesChannel() {
    return new Promise((resolve, reject) => {
      $.post('sales_channel/get_all')
        .then((results) => resolve(results))
        .catch((err) => reject(err))
    })
  }
}