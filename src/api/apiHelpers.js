import { getToken } from '@/utils/auth'

export default {
  handleApiUrl(endpoint, params) {
    let url = process.env.BASE_URL + endpoint
    let paramsString = '?bypass=bypass'
    if (params && params.length > 0) {
      params.forEach((p) => {
        paramsString += '&'
        paramsString += (p.key + '=' + p.value)
      })
    }
    return url + paramsString
  },
  baseHeader() {
    return {
      // 'Content-Type': 'application/x-www-form-urlencoded',
      // 'Accept' : 'application/json',
      'x-fur-admin-access-token': getToken()
    }
  }
}
