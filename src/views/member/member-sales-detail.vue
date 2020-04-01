<template>
  <div class="app-container">
    <div>
      <h2 class="title">会员消费详情</h2>
      <div v-if="this.member" style="margin-bottom: 30px;" >
        <div style="display: inline-block; margin-right: 30px; font-size: 24px" >
          会员id：{{this.member.id}}
        </div>
        <div style="display: inline-block; margin-right: 30px; font-size: 24px" >
          会员名称：{{this.member.name}}
        </div>
      </div>
    </div>
    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="sales"
      :span-method="objectSpanMethod"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column label="销售订单ID" prop="id" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.sales_id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="销售渠道" prop="cellphone" width="200px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="下单日期" prop="cellphone" width="200px" align="center">
        <template slot-scope="{row}">
          <span>{{moment(row.sales_date).format('YYYY-MM-DD')}}</span>
        </template>
      </el-table-column>
       <el-table-column label="订单优惠" prop="wechat_account" width="200px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.coupon }}</span>
        </template>
      </el-table-column>
      <el-table-column label="订单折扣" prop="wechat_account" width="200px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.discount }}</span>
        </template>
      </el-table-column>
      <el-table-column label="手动改价" prop="wechat_account" width="200px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.manual_discount }}</span>
        </template>
      </el-table-column>
      <el-table-column label="运费成本" prop="wechat_account" width="200px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.shipping_cost }}</span>
        </template>
      </el-table-column>
      <el-table-column label="其他成本" prop="wechat_account" width="200px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.other_cost }}</span>
        </template>
      </el-table-column>
      <el-table-column label="订单总价" prop="cellphone" width="200px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.order_total_price }}</span>
        </template>
      </el-table-column>
      <el-table-column label="订单总利润" prop="cellphone" width="200px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.order_total_profit }}</span>
        </template>
      </el-table-column>
      <el-table-column label="产品类型" width="150px" align="center">
        <template slot-scope="{row}">
          <el-tag class="tag" :color="row.product_type_tag_color">{{ row.product_type_title }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="产品细类" width="150px" align="center">
        <template slot-scope="{row}">
          <el-tag class="sub_type_tag" :color="row.product_sub_type_tag_color">{{ row.product_sub_type_title }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="产品名称" prop="wechat_account" width="200px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.product_title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="销售时产品价格" prop="wechat_account" width="200px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.per_item_price_atm }}</span>
        </template>
      </el-table-column>
      <el-table-column label="销售时产品成本" prop="wechat_account" width="200px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.per_item_cost_atm }}</span>
        </template>
      </el-table-column>
      <el-table-column label="数量" prop="wechat_account" width="200px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.quantity }}</span>
        </template>
      </el-table-column>
      <el-table-column label="产品优惠" prop="wechat_account" width="200px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.per_product_discount }}</span>
        </template>
      </el-table-column>
      <el-table-column label="产品折扣" prop="wechat_account" width="200px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.per_product_discount_ratio }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import SalesAPI from '@/api/sales'
import MemberAPI from '@/api/member'

import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import { mapGetters } from 'vuex'
import moment from 'moment'

export default {
  name: 'ComplexTable',
  components: { Pagination },
  filters: {},
  data() {
    return {
      tableKey: 0,
      member: null,
      sales: null,
      total: 0,
      listLoading: true,
      rowSpans: null,
    }
  },
  created() {
   
  },
  computed: {
    ...mapGetters([
      'id'
    ])
  },
  beforeRouteEnter (to, from, next) {
    next(vm => { 
      vm.getMemberInfo()
      vm.getSalesDetail()
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
          if (t.sales_id === i.sales_id) {
            found = true
            t.end++
            t.rowSpan++
            count = t.start + t.rowSpan
          }
        })

        if (!found) {
          let newT = {
            sales_id: i.sales_id,
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
    getSalesDetail() {
      this.listLoading = true
      SalesAPI.getSalesDetailForMember(this.$route.params.id)
        .then(response => {
          this.sales = response
          this.listLoading = false
          this.calculateRowSpan()
        })
        .catch(err => {
          this.$message({
            message: '读取库存失败，请联系徐神检查',
            type: 'error'
          })
          this.listLoading = false
        })
    },
    getMemberInfo() {
      this.listLoading = true
      MemberAPI.getMemberById(this.$route.params.id)
        .then(response => {
          this.member = response
        })
        .catch(err => {
          this.$message({
            message: '读取库存失败，请联系徐神检查',
            type: 'error'
          })
        })
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex <= 9 ) {
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
    }
  }
}
</script>

<style lang="scss" scoped>
  .title {
    display: inline-block;
  }

  .create-button {
    margin-left: 50px !important;
  }

  .tag {
    color: white;
    font-size: 14px;
    width: 100px;
  }

  .sub_type_tag {
    color: white;
    font-size: 14px;
    width: 120px;
  }
  .input-title {
    display: inline-block;
    width: 150px;
    line-height: 25px;
    font-size: 14px;
    margin-left: 10px;
  }
</style>
