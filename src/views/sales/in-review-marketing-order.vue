<template>
  <div class="app-container">
    <div class="filter-container">
      <h2>筛选结果</h2>
      <el-date-picker
        v-model="listQuery.date"
        class="filter-item" style=""
        type="monthrange"
        range-separator="至"
        start-placeholder="开始月份"
        end-placeholder="结束月份">
      </el-date-picker>
      <el-input v-model="listQuery.id" placeholder="订单编号" clearable style="width: 150px; margin-left: 15px;" class="filter-item"/>
      <el-select v-model="listQuery.deparmtent" placeholder="申请部门" clearable style="width: 150px; margin-left: 15px;" class="filter-item" @change="getAreas(listQuery.region_id)">
        <el-option v-for="item in departments" :key="item.id" :label="item.name" :value="item.id" />
      </el-select>
      <el-input v-model="listQuery.client_name" placeholder="客户姓名" clearable style="width: 150px; margin-left: 15px;" class="filter-item"/>
      <el-input v-model="listQuery.shipping_address" placeholder="邮寄地址" clearable style="width: 150px; margin-left: 15px;" class="filter-item "/>
      <el-input v-model="listQuery.contact" placeholder="联系方式" clearable style="width: 150px; margin-left: 15px;" class="filter-item"/>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter" style="width: 100px; margin-left: 15px;">
        搜索
      </el-button>
    </div>

    <h2>需要审核的订单</h2>
    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="orders"
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
      <el-table-column label="申请部门 - 申请人" prop="sales_type" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.department}} - {{ row.added_by_name}}</span>
        </template>
      </el-table-column>
      <el-table-column label="客户姓名" prop="sales_type" width="200px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.client_name}}</span>
        </template>
      </el-table-column>
      <el-table-column label="收件地址" prop="sales_type" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.shipping_address }}</span>
        </template>
      </el-table-column>
      <el-table-column label="联系方式" prop="sales_type" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.contact}}</span>
        </template>
      </el-table-column>
      <el-table-column label="申请时间" prop="sales_type" width="100px" align="center">
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
      <el-table-column label="数量" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.quantity }}</span>
        </template>
      </el-table-column>
      <el-table-column label="产品备注" width="250px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.product_note }}</span>
        </template>
      </el-table-column>
      <el-table-column label="仓库发货编号" width="200px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.tracking_code }}</span>
        </template>
      </el-table-column>
      <el-table-column label="备注" width="250px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.note }}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="role === 7 || role === 1 || role === 8 || role === 9 || role === 10" label="审核订单" width="300px" align="center">
        <template slot-scope="{row}">
          <el-button v-if="id === row.added_by_id" type="danger" plain @click="deleteOrder(row)">取消订单</el-button>
          <el-button v-if="role === 7 || role === 1" type="primary" plain @click="updateDeliveryCode(row)">发货</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getAllInReviewMarketingOrders" />
  </div>
</template>

<script>
import OrderAPI from '@/api/order.js'
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
      orders: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10,
        id: undefined,
        department: undefined,
        client_name: undefined,
        shipping_address: undefined,
        contact: undefined,
        is_delivered: 0
      },
      formType: 0,
      rowSpans: null,
      departments: [
        {
          id: 1,
          name: '运营部'
        },
        {
          id: 2,
          name: '市场部'
        },
        {
          id: 3,
          name: '销售部'
        },
        {
          id: 4,
          name: '设计部'
        },
        {
          id: 5,
          name: '产品部'
        }
      ]
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
      vm.getAllInReviewMarketingOrders()
      vm.getAllInReviewMarketingOrdersCount()
      next();
    }) 
  },
  methods: {
    calculateRowSpan() {
      let g = []
      let count = 0
      this.orders.forEach(i => {
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
    getAllInReviewMarketingOrders() {
      this.listLoading = true
      if (this.listQuery.date && this.listQuery.date.length > 1) {
        this.listQuery.start_date = moment(this.listQuery.date[0]).format('YYYY-MM-DD')
        this.listQuery.end_date = moment(this.listQuery.date[1]).format('YYYY-MM-DD')
      }
      console.log(this.listQuery)
      OrderAPI.getAllMarketingOrder(this.listQuery)
        .then(response => {
          this.orders = response
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
    getAllInReviewMarketingOrdersCount() {
      OrderAPI.getMarketingOrderInReviewCount(this.listQuery)
        .then(response => {
          console.log(response)
          this.total = response.total
        })
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex < 6 || columnIndex >= 12 ) {
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
      this.getAllInReviewMarketingOrders()
      this.getAllInReviewMarketingOrdersCount()
    },
    clearFullyPaid() {
      this.listQuery.fully_paid = undefined
    },
    deleteOrder(item) {
      this.$confirm('是否确定删除本订单', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.sendDeleteOrderRequest(item.id)
      }).catch(() => {   
      });
    },
    sendDeleteOrderRequest(orderId) {
      this.listLoading = true
      OrderAPI.deleteMarketingOrder(orderId)
        .then(response => {
          this.listLoading = false
          this.$alert('删除成功', '成功', {
            confirmButtonText: '确定',
            callback: action => {
              this.page = 1
              this.getAllInReviewMarketingOrders()
              this.getAllInReviewMarketingOrdersCount()
            }
          });
        })
        .catch(err => {
          this.$message({
            message: '订单修改失败，请联系徐神检查',
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
    sendUpdateSalesDeliveryRequest(orderId, code) {
      this.listLoading = true
      OrderAPI.updateMarketingOrderDeliveryCode({ order_id: orderId, delivery_code: code })
        .then(response => {
          this.listLoading = false
          this.$alert('订单修改成功', '成功', {
            confirmButtonText: '确定',
            callback: action => {
              this.page = 1
              this.getAllInReviewMarketingOrders()
              this.getAllInReviewMarketingOrdersCount()
            }
          });
        })
        .catch(err => {
          this.$message({
            message: '订单修改失败，请联系徐神检查',
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
