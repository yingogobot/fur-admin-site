import $ from './baseApi.js'

export default {
  fetchAllInventorys(data) {
    return new Promise((resolve, reject) => {
      $.post('inventory/all_inventorys', data)
        .then((results) => resolve(results))
        .catch((err) => reject(err))
    })
  },
  getAllInventoryCount(data) {
    return new Promise((resolve, reject) => {
      $.post('inventory/count_inventorys', data)
        .then((results) => resolve(results))
        .catch((err) => reject(err))
    })
  },
  getAllInventoryTpes(typeId) {
    return new Promise((resolve, reject) => {
      let data = {inventory_type: typeId}
      $.post('inventory/inventory_types', data)
        .then((results) => resolve(results))
        .catch((err) => reject(err))
    })
  },
  addNewInventoryRequest(data) {
    return new Promise((resolve, reject) => {
      $.post('inventory/add', data)
        .then((results) => resolve(results))
        .catch((err) => reject(err))
    })
  },
  getStorage() {
    return new Promise((resolve, reject) => {
      $.post('inventory/storage')
        .then((results) => resolve(results))
        .catch((err) => reject(err))
    })
  },
  getProductStorage(productId) {
    return new Promise((resolve, reject) => {
      let data = {product_id: productId}
      $.post('inventory/storage', data)
        .then((results) => resolve(results))
        .catch((err) => reject(err))
    })
  }
}
