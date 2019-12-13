import request from '@/utils/request'

export function fetchAllInventoryIn(data) {
  return request({
    url: '/inventory/all_in?bypass=bypass',
    method: 'post',
    data
  })
}

export function getAllInventoryInCount() {
  return request({
    url: '/inventory/count_all_in?bypass=bypass',
    method: 'post'
  })
}

export function getAllInventoryInTypes() {
  return request({
    url: '/inventory/all_in_types?bypass=bypass',
    method: 'post'
  })
}

export function fetchAllInventoryOut(data) {
  return request({
    url: '/inventory/all_out?bypass=bypass',
    method: 'post',
    data
  })
}

export function getAllInventoryOutCount() {
  return request({
    url: '/inventory/count_all_out?bypass=bypass',
    method: 'post'
  })
}

export function addNewInventoryIn(data) {
  return request({
    url: '/inventory/add?bypass=bypass',
    method: 'post',
    data
  })
}

export function addNewInventoryOut(data) {
  return request({
    url: '/inventory/add_out?bypass=bypass',
    method: 'post',
    data
  })
}

export function getAllResalers() {
  return request({
    url: '/inventory/all_resalers?bypass=bypass',
    method: 'post'
  })
}

export function getAllSalesChannel() {
  return request({
    url: '/inventory/all_sales_channel?bypass=bypass',
    method: 'post'
  })
}

export function getAllEvents() {
  return request({
    url: '/inventory/all_events?bypass=bypass',
    method: 'post'
  })
}

export function getAllInventoryOutTypes() {
  return request({
    url: '/inventory/all_out_types?bypass=bypass',
    method: 'post'
  })
}
