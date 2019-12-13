import request from '@/utils/request'

export function getAllProductType() {
  return request({
    url: '/product/get_all_product_type?bypass=bypass',
    method: 'post'
  })
}

export function getProductSubType(data) {
  return request({
    url: '/product/get_product_sub_type?bypass=bypass',
    method: 'post',
    data
  })
}

export function getProductBySubType(data) {
  return request({
    url: '/product/get_product_by_sub_type?bypass=bypass',
    method: 'post',
    data
  })
}
