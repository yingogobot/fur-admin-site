import $ from './baseApi.js'

export default {
  getAllMembers(data) {
    return new Promise((resolve, reject) => {
      $.post('member/get_all', data)
        .then((results) => resolve(results))
        .catch((err) => reject(err))
    })
  },
  getMembersCount() {
    return new Promise((resolve, reject) => {
      $.post('member/get_count')
        .then((results) => resolve(results))
        .catch((err) => reject(err))
    })
  },
  addMember(data) {
    return new Promise((resolve, reject) => {
      $.post('member/add', data)
        .then((results) => resolve(results))
        .catch((err) => reject(err))
    })
  },
  searchMember(data) {
    return new Promise((resolve, reject) => {
      $.post('member/search', data)
        .then((results) => resolve(results))
        .catch((err) => reject(err))
    })
  },
  getMemberById(memberId) {
    return new Promise((resolve, reject) => {
      $.post('member/get_by_id', {member_id: memberId})
        .then((results) => resolve(results))
        .catch((err) => reject(err))
    })
  },
  updateMember(data) {
    return new Promise((resolve, reject) => {
      $.post('member/update', data)
        .then((results) => resolve(results))
        .catch((err) => reject(err))
    })
  }
}