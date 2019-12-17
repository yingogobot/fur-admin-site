import request from '@/utils/request'

export function fetchAllInventorys(data) {
  return request({
    url: '/inventory/all_inventorys?bypass=bypass',
    method: 'post',
    data
  })
}

export function getAllInventoryCount(typeId) {
  let data = {inventory_type: typeId}
  return request({
    url: '/inventory/count_inventorys?bypass=bypass',
    method: 'post',
    data
  })
}
export function getAllInventoryTpes(typeId) {
  let data = {inventory_type: typeId}
  return request({
    url: '/inventory/inventory_types?bypass=bypass',
    method: 'post',
    data
  })
}

export function addNewInventoryRequest(data) {
  return request({
    url: '/inventory/add?bypass=bypass',
    method: 'post',
    data
  })
}

export function getStorage() {
  return request({
    url: '/inventory/storage?bypass=bypass',
    method: 'post'
  })
}

export function getProductStorage(productId) {
  let data = {product_id: productId}
  return request({
    url: '/inventory/storage?bypass=bypass',
    method: 'post',
    data
  })
}