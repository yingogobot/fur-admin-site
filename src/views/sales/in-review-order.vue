<template>
  <div class="app-container">
    <div class="filter-container">
      <h2>筛选结果</h2>
      <el-date-picker
        v-model="listQuery.date"
        class="filter-item" style="margin-left: 15px;"
        type="monthrange"
        range-separator="至"
        start-placeholder="开始月份"
        end-placeholder="结束月份">
      </el-date-picker>
      <el-select v-model="listQuery.region_id" placeholder="分销大区" clearable style="width: 150px; margin-left: 15px;" class="filter-item" @change="getAreas(listQuery.region_id)">
        <el-option v-for="item in resalerRegions" :key="item.id" :label="item.title" :value="item.id" />
      </el-select>
      <el-select v-model="listQuery.area_id" placeholder="分销地区" clearable style="width: 150px; margin-left: 15px;" class="filter-item" @change="getResalers(listQuery.resaler_region_id, listQuery.area_id)">
        <el-option v-for="item in resalerAreas" :key="item.id" :label="item.title" :value="item.id" />
      </el-select>
      <el-select v-model="listQuery.resaler_id" placeholder="分销渠道" clearable style="width: 150px; margin-left: 15px;" class="filter-item">
        <el-option v-for="item in resalers" :key="item.id" :label="item.name" :value="item.id" />
      </el-select>
      <el-select v-model="listQuery.area_manager_atm" placeholder="地区经理" clearable style="width: 150px; margin-left: 15px;" class="filter-item">
        <el-option v-for="item in areaManager" :key="item.id" :label="item.name" :value="item.id" />
      </el-select>
      <el-select v-model="listQuery.region_manager_atm" placeholder="大区经理" clearable style="width: 150px; margin-left: 15px;" class="filter-item">
        <el-option v-for="item in regionManager" :key="item.id" :label="item.name" :value="item.id" />
      </el-select>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter" style="width: 100px; margin-left: 15px;">
        搜索
      </el-button>
    </div>

    <h2>需要审核的订单</h2>
    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="sales"
      :span-method="objectSpanMethod"
      border
      fit
      style="width: 100%;"
    >
      <el-table-column label="订单ID" prop="id" width="80px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="分销渠道" prop="sales_type" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column label="送货地址" prop="sales_type" width="200px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.address}}</span>
        </template>
      </el-table-column>
      <el-table-column label="联系方式" prop="sales_type" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.contact }} {{ row.phone}}</span>
        </template>
      </el-table-column>
      <el-table-column label="所属地区" prop="sales_type" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.area_title}}</span>
        </template>
      </el-table-column>
      <el-table-column label="订单归属地区经理" prop="sales_type" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.area_manager_atm_name}}</span>
        </template>
      </el-table-column>
      <el-table-column label="所属大区" prop="sales_type" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.region_title}}</span>
        </template>
      </el-table-column>
      <el-table-column label="订单归属大区经理" prop="sales_type" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.region_manager_atm_name}}</span>
        </template>
      </el-table-column>
      <el-table-column label="销售时间" prop="sales_type" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{moment(row.date).format('YYYY-MM-DD')}}</span>
        </template>
      </el-table-column>
      <el-table-column label="产品类型" width="100px" align="center">
        <template slot-scope="{row}">
          <el-tag class="tag" :color="row.tag_color">{{ row.product_type }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="产品细类" width="140px" align="center">
        <template slot-scope="{row}">
          <el-tag class="sub_type_tag" :color="row.sub_type_tag_color">{{ row.product_sub_type }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="产品名称" width="150px" align="center">
        <template slot-scope="{row}">
          <span class="link-type" @click="handleUpdate(row)">{{ row.product_title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="产品型号" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.size }}</span>
        </template>
      </el-table-column>
      <el-table-column label="销售数量" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.quantity }}</span>
        </template>
      </el-table-column>
      <el-table-column label="赠送数量" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.promotion_quantity }}</span>
        </template>
      </el-table-column>
      <el-table-column label="订单销售总价" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.order_total_price }}</span>
        </template>
      </el-table-column>
      <el-table-column label="手工改价" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.manual_discount }}</span>
        </template>
      </el-table-column>
      <el-table-column label="订单实收总价" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.order_total_revenue }}</span>
        </template>
      </el-table-column>
      <el-table-column label="全额付款" width="100px" align="center">
        <template slot-scope="{row}">
          <el-tag class="tag" :color="row.fully_paid === 0 ? '#e74c3c' : '#2ecc71'" >{{ row.fully_paid === 1 ? '是' : '否' }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="云仓订单编号" width="200px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.deliver_tracking_code }}</span>
        </template>
      </el-table-column>
       <el-table-column label="备注" width="250px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.note }}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="role === 7 || role === 1" label="审核订单" width="300px" align="center">
        <template slot-scope="scope">
          <el-button v-if="scope.row.fully_paid === 0" type="warning" plain @click="updateSalesPaidStuats(scope.row)">确认收款</el-button>
          <el-button type="info" plain @click="updateDeliveryCode(scope.row)">发货</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getAllSales" />
  </div>
</template>

<script>
import SalesAPI from '@/api/sales.js'
import ProductAPI from '@/api/product'
import ResalerAPI from '@/api/resaler'
import UserAPI from '@/api/user'

import waves from '@/directive/waves' // waves directive
import { roundToTwo } from '@/utils'
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
      sales: null,
      total: 0,
      listLoading: true,
      products: [],
      resalers: [],
      resalerRegions: [],
      resalerAreas: [],
      areaManager: [],
      regionManager: [],
      listQuery: {
        page: 1,
        limit: 10,
        product_type: undefined,
        product_sub_type: undefined,
        area_id: undefined,
        region_id: undefined,
        resaler_id: undefined,
        area_manager_atm: undefined,
        region_manager_atm: undefined,
      },
      dialogFormVisible: false,
      formType: 0,
      rowSpans: null,
    }
  },
  created() {
  },
  computed: {
    ...mapGetters([
      'id',
      'role'
    ])
  },
  beforeRouteEnter (to, from, next) {
    next(vm => { 
      vm.getAllSales()
      vm.getSalesCount()
      vm.getResalers()
      vm.getAreas()
      vm.getRegions()
      vm.getSalesAreaManager()
      vm.getSalesRegionManager()
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
          if (t.id === i.id) {
            found = true
            t.end++
            t.rowSpan++
            count = t.start + t.rowSpan
          }
        })

        if (!found) {
          let newT = {
            id: i.id,
            start: count,
            end: count+1,
            rowSpan: 1
          }
          count++
          g.push(newT)
        }
      });
      console.log(g)
      this.rowSpans = g;
    },
    getAllSales() {
      this.listLoading = true
      if (this.listQuery.date && this.listQuery.date.length > 1) {
        this.listQuery.start_date = moment(this.listQuery.date[0]).format('YYYY-MM-DD')
        this.listQuery.end_date = moment(this.listQuery.date[1]).format('YYYY-MM-DD')
      }
      console.log(this.listQuery)
      SalesAPI.getAllInReviewSales(this.listQuery)
        .then(response => {
          this.sales = response
          this.listLoading = false
          this.calculateRowSpan()
        })
        .catch(err => {
          console.log(err)
          this.$message({
            message: 'getAllSales 读取库存失败，请联系徐神检查',
            type: 'error'
          })
          this.listLoading = false
        })
    },
    getSalesCount() {
      SalesAPI.getAllInReviewSalesCount(this.listQuery)
        .then(response => {
          this.total = response.total
        })
    },
    getAreas(regionId) {
      console.log(regionId)
      ResalerAPI.getAllResalerAreas({region_id: regionId, page: 1 , limit: 10000})
        .then(response => {
          console.log(response)
          this.resalerAreas = response
        })
        .catch(err => {
        })
    },
    getRegions() {
      ResalerAPI.getAllResalerRegions({page: 1,limit: 10000})
        .then(response => {
          this.resalerRegions = response
        })
        .catch(err => {
        })
    },
    getSalesAreaManager() {
      UserAPI.getAccounts({role: [4, 5]})
        .then(response => {
          this.areaManager = response
        })
    },
    getSalesRegionManager() {
      UserAPI.getAccounts({role: [5]})
        .then(response => {
          this.regionManager = response
        })
    },
    getResalers(regionId, areaId) {
      ResalerAPI.getAllResalers({region_id: regionId, area_id: areaId})
        .then(response => {
          this.resalers = response
        })
    },
    readProductInfo(item) {
      this.products.forEach(p => {
        if (p.id === item.product.id) {
          item.product_id = p.id;
          item.size = p.size;
          item.cost = p.cost;
          item.price = p.price;
        }
      })
    },
    calculateTotalPrice(item) {
      item.total_price = roundToTwo((item.price - parseFloat(item.discount)) * parseFloat(item.discount_rate) * item.quantity)
      item.total_cost = roundToTwo(item.cost * item.quantity)
      item.total_profit = roundToTwo(item.total_price - item.total_cost)
      this.calculateOrderPrice()
    },
    calculateOrderPrice() {
      let total = 0
      let total_product_cost = 0
      // if (this.temp.products && this.temp.products.length > 0) {
        this.temp.products.forEach(p => {
          total = total + p.total_price;
          total_product_cost = total_product_cost + p.total_cost
        })
      // }
      // if (this.temp.selectedProducts && this.temp.selectedProducts.length > 0) {
        this.temp.selectedProducts.forEach(p => {
          total = total + p.total_price;
          total_product_cost = total_product_cost + p.total_cost
        })
      // }
      this.temp.order_total_price = roundToTwo( parseFloat(total) * parseFloat(this.temp.discount) + parseFloat(this.temp.shipping_cost) - parseFloat(this.temp.coupon) - parseFloat(this.temp.manual_discount));
      this.temp.order_total_profit = roundToTwo(parseFloat(this.temp.order_total_price) - parseFloat(total_product_cost) - parseFloat(this.temp.shipping_cost) - parseFloat(this.temp.other_cost));

    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex < 10 || (columnIndex >= 15 && columnIndex <= 23)) {
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
      this.listQuery.page = 1
      this.getAllSales()
      this.getSalesCount()
    },
    clearFullyPaid() {
      this.listQuery.fully_paid = undefined
    },
    updateSalesPaidStuats(item) {
      this.$confirm('确定订单编号' + item.id +'已经全额付款 >>总额：' + item.order_total_price + '<<?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.sendUpdateSalesPaidRequest(item.id)
        }).catch(() => {   
        });
    },
    sendUpdateSalesPaidRequest(salesId) {
      this.listLoading = true
      SalesAPI.updateSalesPaidStatus({ sales_id: salesId })
        .then(response => {
          this.listLoading = false
          this.$alert('订单修改成功', '成功', {
            confirmButtonText: '确定',
            callback: action => {
              this.page = 1
              this.getAllSales()
              this.getSalesCount()
            }
          });
        })
        .catch(err => {
          this.$message({
            message: '销售订单修改失败，请联系徐神检查',
            type: 'error'
          })
          this.listLoading = false
        })
    },
    updateDeliveryCode(item) {
       this.$prompt('请输入云仓发货编号', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(({ value }) => {
         this.$confirm('确定发货编号为' + value, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.sendUpdateSalesDeliveryRequest(item.id, value)
          }).catch(() => {   
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });       
        });
    },
    sendUpdateSalesDeliveryRequest(salesId, code) {
      this.listLoading = true
      SalesAPI.updateSalesDeliveryCode({ sales_id: salesId, delivery_code: code })
        .then(response => {
          this.listLoading = false
          this.$alert('订单修改成功', '成功', {
            confirmButtonText: '确定',
            callback: action => {
              this.page = 1
              this.getAllSales()
              this.getSalesCount()
            }
          });
        })
        .catch(err => {
          this.$message({
            message: '销售订单修改失败，请联系徐神检查',
            type: 'error'
          })
          this.listLoading = false
        })
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
</style>
