import request from '@/utils/request'

export function getAllEvents(data) {
  return request({
    url: '/event/get_all?bypass=bypass',
    method: 'post',
    data
  })
}

export function getEventsCount() {
  return request({
    url: '/event/get_count?bypass=bypass',
    method: 'post'
  })
}