import $ from './baseApi.js'

export default {
  addProduct(data) {
    return new Promise((resolve, reject) => {
      $.post('product/add', data)
        .then((results) => resolve(results))
        .catch((err) => reject(err))
    })
  },
  getAllProducts(data) {
    return new Promise((resolve, reject) => {
      $.post('product/get_all_products', data)
        .then((results) => resolve(results))
        .catch((err) => reject(err))
    })
  },
  getAllProductCount(data) {
    return new Promise((resolve, reject) => {
      $.post('product/get_all_products_count', data)
        .then((results) => resolve(results))
        .catch((err) => reject(err))
    })
  },
  getAllProductsBySubType(subType) {
    return new Promise((resolve, reject) => {
      $.post('product/get_all_products_by_sub_type', { sub_type: subType })
        .then((results) => resolve(results))
        .catch((err) => reject(err))
    })
  },
  getAllProductType(storageType) {
    return new Promise((resolve, reject) => {
      $.post('product/get_all_product_type', { storage_type: storageType })
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
  getAllProductSubType(data) {
    return new Promise((resolve, reject) => {
      $.post('product/get_all_product_sub_type', data)
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
  },
  addProductSubType(data) {
    return new Promise((resolve, reject) => {
      $.post('product/add_product_sub_type', data)
        .then((results) => resolve(results))
        .catch((err) => reject(err))
    })
  },
  getTestingProductsByType(type) {
    return new Promise((resolve, reject) => {
      $.post('product/get_testing_product_by_type', { type: type })
        .then((results) => resolve(results))
        .catch((err) => reject(err))
    })
  }
}
