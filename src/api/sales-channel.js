import $ from './baseApi.js'

export default {
  getAllSalesChannels() {
    return new Promise((resolve, reject) => {
      $.post('sales_channel/get_all')
        .then((results) => resolve(results))
        .catch((err) => reject(err))
    })
  },
  getSalesChannelsCount() {
    return new Promise((resolve, reject) => {
      $.post('sales_channel/get_count')
        .then((results) => resolve(results))
        .catch((err) => reject(err))
    })
  },
  addSalesChannel(data) {
    return new Promise((resolve, reject) => {
      $.post('sales_channel/add', data)
        .then((results) => resolve(results))
        .catch((err) => reject(err))
    })
  },
  deleteSalesChannel(id) {
    return new Promise((resolve, reject) => {
      let data = {id: id}
      $.post('sales_channel/delete', data)
        .then((results) => resolve(results))
        .catch((err) => reject(err))
    })
  }
}