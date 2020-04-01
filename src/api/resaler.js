import $ from './baseApi.js'

export default {
  getAllResalers(data) {
    return new Promise((resolve, reject) => {
      $.post('resaler/get_all', data)
        .then((results) => resolve(results))
        .catch((err) => reject(err))
    })
  },
  getResalersCount() {
    return new Promise((resolve, reject) => {
      $.post('resaler/get_count')
        .then((results) => resolve(results))
        .catch((err) => reject(err))
    })
  },
  addResaler(data) {
    return new Promise((resolve, reject) => {
      $.post('resaler/add', data)
        .then((results) => resolve(results))
        .catch((err) => reject(err))
    })
  },
  deleteResaler(id) {
    return new Promise((resolve, reject) => {
      let data = {id: id}
      $.post('resaler/delete', data)
        .then((results) => resolve(results))
        .catch((err) => reject(err))
    })
  }
}