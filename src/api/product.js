import $ from './baseApi.js'

export default {
  getAllProductType() {
    return new Promise((resolve, reject) => {
      $.post('product/get_all_product_type')
        .then((results) => resolve(results))
        .catch((err) => reject(err))
    })
  },
  getProductSubType(data) {
    return new Promise((resolve, reject) => {
      $.post('product/get_product_sub_type', data)
        .then((results) => resolve(results))
        .catch((err) => reject(err))
    })
  },
  getProductBySubType(data) {
    return new Promise((resolve, reject) => {
      $.post('product/get_product_by_sub_type', data)
        .then((results) => resolve(results))
        .catch((err) => reject(err))
    })
  }
}
