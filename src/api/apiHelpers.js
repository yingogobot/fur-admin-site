import { getToken } from '@/utils/auth'

export default {
  handleApiUrl(endpoint, params) {
    let url = process.env.VUE_APP_BASE_API + endpoint
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
      'content-type': 'application/x-www-form-urlencoded',
      'x-fur-admin-access-token': getToken()
    }
  }
}
