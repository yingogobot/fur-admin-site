<template>
  <div v-if="role === 1 || role === 4 || role === 5 || role === 6" class="app-container">
    <div class="filter-container">
      <h2 style="display: inline-block;" >选择月份</h2>
      <el-date-picker
        v-model="listQuery.date"
        class="filter-item" style="margin-left: 15px;"
        type="monthrange"
        range-separator="至"
        start-placeholder="开始月份"
        end-placeholder="结束月份"
        @change="handleFilter">
      </el-date-picker>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter" style="width: 100px; margin-left: 15px;">
        搜索
      </el-button>
    </div>

    <div>
      <h2 style="color:red; display: inline-block;">{{name}} {{position}}</h2>
      <h2 style="display: inline-block;"> 所负责区域 {{moment(this.listQuery.date[0]).format('YYYY-MM-01')}} 至 {{moment(this.listQuery.date[1]).format('YYYY-MM-01')}} </h2>
      <h2 style="color:red; display: inline-block;">销售总额 {{totalSales}}</h2>
    </div>
    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="sales"
      :span-method="objectSpanMethod"
      border
      fit
      style="width: 100%;"
      v-if="role === 5" 
    >
      <el-table-column label="分销大区" prop="id" width="80px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.region_title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="大区经理" prop="sales_type" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.region_manager_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="大区本月总销售" prop="sales_type" width="150px" align="center">
        <template>
          <span>{{ totalSales ? totalSales : 0 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="本月提成总额" prop="sales_type" width="150px" align="center">
        <template>
          <span>{{ totalCommission ? totalCommission : 0}}</span>
        </template>
      </el-table-column>
      <el-table-column label="销售地区" prop="sales_type" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.area_title}}</span>
        </template>
      </el-table-column>
      <el-table-column label="地区经理" prop="sales_type" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.area_manager_name}}</span>
        </template>
      </el-table-column>
      <el-table-column label="地区本月总销售" prop="sales_type" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.area_total_sales ? row.area_total_sales : 0 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="提成比例" prop="sales_type" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.commission_rate ? (row.commission_rate * 100) + '%' : '无提成' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="提成金额" prop="sales_type" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.commission_value ? row.commission_value : 0}}</span>
        </template>
      </el-table-column>
      <el-table-column label="产品分类销售" prop="sales_type" width="350px" align="center">
        <template slot-scope="{row}">
          <el-popover
            placement="right"
            width="600"
            trigger="click">
            <el-table :data="row.products_sales">
              <el-table-column width="150" property="product_type_id" label="产品分类编号"></el-table-column>
              <el-table-column width="250" property="product_type_title" label="产品分类名称"></el-table-column>
              <el-table-column width="200" property="total_product_sales" label="产品分类销售额"></el-table-column>
            </el-table>
            <el-button slot="reference">查看分类销售额</el-button>
          </el-popover>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <div v-else class="app-container">
    <h2> 并没有权限查看 Please Get out! </h2>
    <img :src="errGif" width="400" height="400" alt="No Access">
  </div>
</template>

<script>
import errGif from '../../assets/images/no-access.jpg'

import SalesAPI from '@/api/sales.js'
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import { mapGetters } from 'vuex'
import moment from 'moment'

export default {
  name: 'ComplexTable',
  components: { Pagination },
  directives: { waves },
  filters: {},
  data() {
    return {
      tableKey: 0,
      listLoading: false,
      sales: null,
      totalSales: 0,
      totalCommission: 0,
      listQuery: {
        page: 1,
        limit: 100,
        date: []
      },
      rowSpans: null,
      errGif: errGif
    }
  },
  created() {
    this.listQuery.date = [new Date(), moment().add(1, 'months')]
  },
  computed: {
    ...mapGetters([
      'id',
      'role',
      'name',
      'position'
    ])
  },
  beforeRouteEnter (to, from, next) {
    next(vm => { 
      vm.getSales()
      next();
    }) 
  },
  methods: {
    calculateRowSpan() {
      let g = []
      let count = 0
      this.sales.forEach(i => {
        let found = false
        g.forEach(t => {
          if (t.region_id === i.region_id) {
            found = true
            t.end++
            t.rowSpan++
            count = t.start + t.rowSpan
          }
        })

        if (!found) {
          let newT = {
            region_id: i.region_id,
            start: count,
            end: count+1,
            rowSpan: 1
          }
          count++
          g.push(newT)
        }
      });
      this.rowSpans = g;
    },
    getSales() {
      if (this.role === 5 ) {
        this.listLoading = true
        if (this.listQuery.date && this.listQuery.date.length > 1) {
          this.listQuery.start_date = moment(this.listQuery.date[0]).format('YYYY-MM-01')
          this.listQuery.end_date = moment(this.listQuery.date[1]).format('YYYY-MM-01')
        }
        this.listQuery.region_manager_id = this.id
        SalesAPI.getRegionManagerRelatedSales(this.listQuery)
          .then(response => {
            
            this.listLoading = false

            let tempResult = []
            let totalSales = 0
            let totalCommission = 0
            response.forEach(s => {
              let found = false
              totalSales = totalSales + s.total_product_sales
              tempResult.forEach(r => {
                if (r.area_id === s.area_id) {
                  let p = {
                    product_type_id: s.product_type_id,
                    product_type_title: s.product_type_title,
                    total_product_sales: s.total_product_sales
                  }
                  r.products_sales.push(p)
                  found = true
                }
              })

              if (!found) {
                let t = {
                  region_id: s.region_id,
                  region_title: s.region_title,
                  region_manager_id: s.region_manager_id,
                  region_manager_name: s.region_manager_name,
                  area_id: s.area_id,
                  area_title: s.area_title,
                  area_manager_name: s.area_manager_name,
                  area_total_sales: s.area_total_sales,
                  products_sales: [
                    {
                      product_type_id: s.product_type_id,
                      product_type_title: s.product_type_title,
                      total_product_sales: s.total_product_sales
                    }
                  ]
                }
                t.commission_rate = s.area_manager_id === this.id ? 0.05 : 0.01
                t.commission_value = Math.floor(parseFloat(s.area_total_sales) * t.commission_rate * 100) / 100
                totalCommission = totalCommission + t.commission_value
                tempResult.push(t)
              }
            })
            this.sales = tempResult
            this.totalSales = parseFloat(totalSales).toFixed(2)
            this.totalCommission = parseFloat(totalCommission).toFixed(2)
            this.calculateRowSpan()
          })
          .catch(err => {
            console.log(err)
            this.$message({
              message: 'getSales 读取库存失败，请联系徐神检查',
              type: 'error'
            })
            this.listLoading = false
          })
      }
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex < 4 ) {
        let data = {
          rowspan: 0,
          colspan: 0
        };
        this.rowSpans.forEach(i => {
          if (rowIndex >= i.start && rowIndex < i.end && (rowIndex - i.start) % i.rowSpan === 0) {
            data = {
              rowspan: i.rowSpan,
              colspan: 1
            };
            return;
          }
        })

        return data;
      }
    },
    handleFilter() {
      this.getSales()
    }
  }
}
</script>

<style lang="scss" scoped>
  .tag {
    color: white;
    font-size: 12px;
    width: 70px;
  }
  .sub_type_tag {
    color: white;
    font-size: 12px;
    width: 100px;
  }
  .input-title {
    display: inline-block;
    width: 120px;
    line-height: 25px;
    font-size: 14px;
    margin-left: 10px;
  }
  .section-title {
    display: inline-block;
    width: 100px;
    vertical-align: top;
    margin-top: 0;
  }
  .section-title-large {
    vertical-align: top;
    margin-top: 30;
  }
  .middle-title {
    display: inline-block;
    vertical-align: top;
    margin-top: 0;
  }
  .block-title {
    vertical-align: top;
    margin-top: 0;
  }
  .input-title-long {
    width: 120px;
  }
  .input-title-short {
    width: 80px;
  }
  .input-title-extra-long {
    width: 150px;
  }
  .inventory-in-input {
    width: 120px; 
    margin-left: 10px;
  }
  .inventory-in-input-short {
    width: 80px; 
    margin-left: 10px;
  }
  .inventory-in-input-extra {
    width: 150px; 
    margin-left: 10px;
  }
  .inventory-in-input-line {
    width: 250px; 
  }
</style>
