import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/account/login?bypass=bypass',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info?bypass=bypass',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
