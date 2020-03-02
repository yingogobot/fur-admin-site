import $ from './baseApi.js'

export default {
  getAllProducts() {
    return new Promise((resolve, reject) => {
      $.post('product/get_all_products')
        .then((results) => resolve(results))
        .catch((err) => reject(err))
    })
  },
  getAllProductType() {
    return new Promise((resolve, reject) => {
      $.post('product/get_all_product_type')
        .then((results) => resolve(results))
        .catch((err) => reject(err))
    })
  },
  getAllProductTypeCount() {
    return new Promise((resolve, reject) => {
      $.post('product/get_all_product_type_count')
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
  getAllProductSubTypeCount() {
    return new Promise((resolve, reject) => {
      $.post('product/get_product_sub_type_count')
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
  },
  addProductType(data) {
    return new Promise((resolve, reject) => {
      $.post('product/add_product_type', data)
        .then((results) => resolve(results))
        .catch((err) => reject(err))
    })
  }
}
