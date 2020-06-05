<template>
  <div class="app-container">
    <div v-loading.fullscreen.lock="fullscreenLoading">
      <h2 class="title">销售报告</h2>
      <bar-chart />
    </div>
    
  </div>
</template>

<script>
import BarChart from './components/BarChart'
import ReportAPI from '@/api/report'

export default {
  name: 'SalesReport',
  components: {
    BarChart
  },
  data() {
    return {
      salesData: undefined,
      fullscreenLoading: true
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => { 
      vm.getSalesReport()
      next();
    }) 
  },
  methods: {
    getSalesReport() {
      this.fullscreenLoading = true
      ReportAPI
    }
  }
}
</script>