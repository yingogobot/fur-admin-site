import $ from './baseApi.js'

export default {
  getAllResalers(data) {
    return new Promise((resolve, reject) => {
      $.post('resaler/get_all', data)
        .then((results) => resolve(results))
        .catch((err) => reject(err))
    })
  },
  getResalersCount(data) {
    return new Promise((resolve, reject) => {
      $.post('resaler/get_count', data)
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
  },
  getAllResalerRegions(data) {
    return new Promise((resolve, reject) => {
      $.post('resaler/get_all_regions', data)
        .then((results) => resolve(results))
        .catch((err) => reject(err))
    })
  },
  getResalerRegionsCount() {
    return new Promise((resolve, reject) => {
      $.post('resaler/get_region_count')
        .then((results) => resolve(results))
        .catch((err) => reject(err))
    })
  },
  addResalerRegion(data) {
    return new Promise((resolve, reject) => {
      $.post('resaler/add_region', data)
        .then((results) => resolve(results))
        .catch((err) => reject(err))
    })
  },
  addResalerRegionManager(data) {
    return new Promise((resolve, reject) => {
      $.post('resaler/add_region_manager', data)
        .then((results) => resolve(results))
        .catch((err) => reject(err))
    })
  },
  removeResalerRegionManager(data) {
    return new Promise((resolve, reject) => {
      $.post('resaler/remove_region_manager', data)
        .then((results) => resolve(results))
        .catch((err) => reject(err))
    })
  },
  getAllResalerAreas(data) {
    return new Promise((resolve, reject) => {
      $.post('resaler/get_all_areas', data)
        .then((results) => resolve(results))
        .catch((err) => reject(err))
    })
  },
  getResalerAreasCount() {
    return new Promise((resolve, reject) => {
      $.post('resaler/get_area_count')
        .then((results) => resolve(results))
        .catch((err) => reject(err))
    })
  },
  addResalerArea(data) {
    return new Promise((resolve, reject) => {
      $.post('resaler/add_area', data)
        .then((results) => resolve(results))
        .catch((err) => reject(err))
    })
  },
  addResalerAreaManager(data) {
    return new Promise((resolve, reject) => {
      $.post('resaler/add_area_manager', data)
        .then((results) => resolve(results))
        .catch((err) => reject(err))
    })
  },
  removeResalerAreaManager(data) {
    return new Promise((resolve, reject) => {
      $.post('resaler/remove_area_manager', data)
        .then((results) => resolve(results))
        .catch((err) => reject(err))
    })
  },
  getResalerTypes() {
    return new Promise((resolve, reject) => {
      $.post('resaler/get_all_types')
        .then((results) => resolve(results))
        .catch((err) => reject(err))
    })
  },
}