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
  },
  addEvent(data) {
    return new Promise((resolve, reject) => {
      $.post('event/add', data)
        .then((results) => resolve(results))
        .catch((err) => reject(err))
    })
  },
  deleteEvent(id) {
    return new Promise((resolve, reject) => {
      let data = {id: id}
      $.post('event/delete', data)
        .then((results) => resolve(results))
        .catch((err) => reject(err))
    })
  }
}