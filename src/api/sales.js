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
  },
  addNewSalesRequest(data) {
    return new Promise((resolve, reject) => {
      $.post('sales/add', data)
        .then((results) => resolve(results))
        .catch((err) => reject(err))
    })
  },
  updateSales(data) {
    return new Promise((resolve, reject) => {
      $.post('sales/update_sales', data)
        .then((results) => resolve())
        .catch((err) => reject(err))
    })
  }
}
