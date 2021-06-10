import $ from './baseApi.js'

export default {
  getAllSales(data) {
    return new Promise((resolve, reject) => {
      $.post('sales/all', data)
        .then((results) => resolve(results))
        .catch((err) => reject(err))
    })
  },
  getAllSalesCount(data) {
    return new Promise((resolve, reject) => {
      $.post('sales/get_count', data)
        .then((results) => resolve(results))
        .catch((err) => reject(err))
    })
  },
  getAllDirectSales(data) {
    return new Promise((resolve, reject) => {
      $.post('sales/all_direct_sales', data)
        .then((results) => resolve(results))
        .catch((err) => reject(err))
    })
  },
  getAllDirectSalesCount(data) {
    return new Promise((resolve, reject) => {
      $.post('sales/get_direct_sales_count', data)
        .then((results) => resolve(results))
        .catch((err) => reject(err))
    })
  },
  getAllResalerSales(data) {
    return new Promise((resolve, reject) => {
      $.post('sales/all_resaler_sales', data)
        .then((results) => resolve(results))
        .catch((err) => reject(err))
    })
  },
  getAllResalerSalesCount(data) {
    return new Promise((resolve, reject) => {
      $.post('sales/get_resaler_sales_count', data)
        .then((results) => resolve(results))
        .catch((err) => reject(err))
    })
  },
  getAllInReviewSales(data) {
    return new Promise((resolve, reject) => {
      $.post('sales/all_in_review_sales', data)
        .then((results) => resolve(results))
        .catch((err) => reject(err))
    })
  },
  getAllInReviewSalesCount(data) {
    return new Promise((resolve, reject) => {
      $.post('sales/get_all_in_review_sales_count', data)
        .then((results) => resolve(results))
        .catch((err) => reject(err))
    })
  },
  getAllSalesType() {
    return new Promise((resolve, reject) => {
      $.post('sales/sales_types')
        .then((results) => resolve(results))
        .catch((err) => reject(err))
    })
  },
  addNewSalesRequest(data) {
    return new Promise((resolve, reject) => {
      $.post('sales/add', data)
        .then((results) => resolve(results))
        .catch((err) => reject(err))
    })
  },
  updateSales(data) {
    return new Promise((resolve, reject) => {
      $.post('sales/update_sales', data)
        .then((results) => resolve())
        .catch((err) => reject(err))
    })
  },
  deleteSales(data) {
    return new Promise((resolve, reject) => {
      $.post('sales/delete_sales', data)
        .then((results) => resolve())
        .catch((err) => reject(err))
    })
  },
  getSalesDetailForMember(memberId) {
    return new Promise((resolve, reject) => {
      $.post('sales/get_sales_detail', {member_id: memberId})
        .then((results) => resolve(results))
        .catch((err) => reject(err))
    })
  },
  updateSalesPaidStatus(data) {
    return new Promise((resolve, reject) => {
      $.post('sales/sales_is_paid', data)
        .then((results) => resolve())
        .catch((err) => reject(err))
    })
  },
  updateSalesDeliveryCode(data) {
    return new Promise((resolve, reject) => {
      $.post('sales/update_delivery_code', data)
        .then((results) => resolve())
        .catch((err) => reject(err))
    })
  },
  addNewResalerSalesRequest(data) {
    return new Promise((resolve, reject) => {
      $.post('sales/add_resaler_sales', data)
        .then((results) => resolve(results))
        .catch((err) => reject(err))
    })
  },
  getGeneralSalesReport(data) {
    return new Promise((resolve, reject) => {
      $.post('sales/general_sales_report', data)
        .then((results) => resolve(results))
        .catch((err) => reject(err))
    })
  },
  getRegionManagerRelatedSales(data) {
    return new Promise((resolve, reject) => {
      $.post('sales/get_region_manager_related_sales', data)
        .then((results) => resolve(results))
        .catch((err) => reject(err))
    })
  },
  requestOrderPriceChange(data) {
    return new Promise((resolve, reject) => {
      $.post('sales/request_order_price_change', data)
        .then((results) => resolve(results))
        .catch((err) => reject(err))
    })
  },
  confirmOrderPriceChange(data) {
    return new Promise((resolve, reject) => {
      $.post('sales/confirm_order_price_change', data)
        .then((results) => resolve(results))
        .catch((err) => reject(err))
    })
  },
  cancelOrderPriceChange(data) {
    return new Promise((resolve, reject) => {
      $.post('sales/cancel_order_price_change', data)
        .then((results) => resolve(results))
        .catch((err) => reject(err))
    })
  }
}
