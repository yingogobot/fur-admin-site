import request from '@/utils/request'

export function getAllSalesChannel() {
  return request({
    url: '/sales_channel/get_all?bypass=bypass',
    method: 'post'
  })
}