import $ from './baseApi.js'

export default {
  getAllMarketingOrder(data) {
    return new Promise((resolve, reject) => {
      $.post('order/get_all', data)
        .then((results) => resolve(results))
        .catch((err) => reject(err))
    })
  },
  getMarketingOrderCount() {
    return new Promise((resolve, reject) => {
      $.post('order/get_count')
        .then((results) => resolve(results))
        .catch((err) => reject(err))
    })
  },
  getMarketingOrderInReviewCount() {
    return new Promise((resolve, reject) => {
      $.post('order/get_in_review_count')
        .then((results) => resolve(results))
        .catch((err) => reject(err))
    })
  },
  addMarketingOrder(data) {
    return new Promise((resolve, reject) => {
      $.post('order/add', data)
        .then((results) => resolve(results))
        .catch((err) => reject(err))
    })
  },
  deleteMarketingOrder(orderId) {
    return new Promise((resolve, reject) => {
      let data = {id: orderId}
      $.post('order/delete', data)
        .then((results) => resolve(results))
        .catch((err) => reject(err))
    })
  },
  updateMarketingOrderDeliveryCode(data) {
    return new Promise((resolve, reject) => {
      $.post('order/update_delivery_code', data)
        .then((results) => resolve())
        .catch((err) => reject(err))
    })
  }
}