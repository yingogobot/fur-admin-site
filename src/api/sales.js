import $ from './baseApi.js'

export default {
  getAllSales(data) {
    return new Promise((resolve, reject) => {
      $.post('sales/all', data)
        .then((results) => resolve(results))
        .catch((err) => reject(err))
    })
  },
  getAllSalesCount(data) {
    return new Promise((resolve, reject) => {
      $.post('sales/get_count', data)
        .then((results) => resolve(results))
        .catch((err) => reject(err))
    })
  },
  getAllSalesType() {
    return new Promise((resolve, reject) => {
      $.post('sales/sales_types')
        .then((results) => resolve(results))
        .catch((err) => reject(err))
    })
  }
}
