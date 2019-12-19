import $ from './baseApi.js'

export default {
  getAllEvents(data) {
    return new Promise((resolve, reject) => {
      $.post('event/get_all', data)
        .then((results) => resolve(results))
        .catch((err) => reject(err))
    })
  },
  getEventsCount() {
    return new Promise((resolve, reject) => {
      $.post('event/get_count')
        .then((results) => resolve(results))
        .catch((err) => reject(err))
    })
  }
}