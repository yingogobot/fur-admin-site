import request from '@/utils/request'

export function getAllResalers() {
  return request({
    url: '/resaler/get_all?bypass=bypass',
    method: 'post'
  })
}