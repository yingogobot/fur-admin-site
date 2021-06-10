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
      <el-input v-model="listQuery.resaler_sales_id" placeholder="订单编号" style="width: 150px; margin-left: 15px;" class="filter-item"  />
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
      <el-select v-model="listQuery.product_type" placeholder="产品类型" clearable style="width: 150px; margin-left: 15px;" class="filter-item" @change="getSubType(listQuery.product_type)">
        <el-option v-for="item in productTypes" :key="item.id" :label="item.title" :value="item.id" />
      </el-select>
      <el-select v-model="listQuery.product_sub_type" placeholder="产品分类" clearable style="width: 150px; margin-left: 15px;" class="filter-item"  @change="getSelectedProducts(listQuery.product_sub_type)">
        <el-option v-for="item in productSubTypes" :key="item.id" :label="item.title" :value="item.id" />
      </el-select>
      <el-select v-model="listQuery.product" placeholder="产品" clearable style="width: 150px; margin-left: 15px;" class="filter-item">
        <el-option v-for="item in selectedProducts" :key="item.id" :label="item.title" :value="item.id" />
      </el-select>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter" style="width: 100px; margin-left: 15px;">
        搜索
      </el-button>

      <downloadexcel v-if="dataForExcel && dataForExcel.length > 0" :data="dataForExcel" class="downloadExcelBtn" :before-finish="finishDownload">
        导出数据到Excel
      </downloadexcel>
    </div>

    <h2>销售详情</h2>
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
      <el-table-column label="订单总价" width="100px" align="center">
        <template slot-scope="{row}">
          <span>￥{{ row.order_total_revenue }}</span>
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
      <el-table-column label="销售价格" width="100px" align="center">
        <template slot-scope="{row}">
          <span>￥{{ row.per_item_price_atm }}</span>
        </template>
      </el-table-column>
      <el-table-column label="单品折扣率" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.per_product_discount_ratio == 1 ? "原价" : (row.per_product_discount_ratio == 0 ? "免费赠品" : Math.floor(row.per_product_discount_ratio * 100) * 1/ 100 * 10 + "折") }}</span>
        </template>
      </el-table-column>
      <el-table-column label="单品总价" width="100px" align="center">
        <template slot-scope="{row}">
          <span>￥{{ row.total_price}}</span>
        </template>
      </el-table-column>
      <el-table-column label="支付公司" width="200px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.payment_company_title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="支付渠道" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.payment_channel_title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="全额付款" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.fully_paid === 1 ? '是' : '否' }}</span>
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
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getAllSales" />

  </div>
</template>

<script>
import SalesAPI from '@/api/sales.js'
import ProductAPI from '@/api/product'
import ResalerAPI from '@/api/resaler'
import MemberAPI from '@/api/member'
import UserAPI from '@/api/user'

import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import { mapGetters } from 'vuex'
import moment from 'moment'
import downloadexcel from "vue-json-excel";

export default {
  name: 'ComplexTable',
  components: { Pagination, downloadexcel },
  directives: { waves },
  filters: {},
  data() {
    return {
      tableKey: 0,
      sales: null,
      dataForExcel: null,
      total: 0,
      listLoading: true,
      productTypes: [],
      productSubTypes: [],
      products: [],
      resalers: [],
      resalerRegions: [],
      resalerAreas: [],
      areaManager: [],
      regionManager: [],
      selectedProducts: [],
      listQuery: {
        page: 1,
        limit: 10,
        resaler_sales_id: undefined,
        product_type: undefined,
        product_sub_type: undefined,
        area_id: undefined,
        region_id: undefined,
        resaler_id: undefined,
        area_manager_atm: undefined,
        region_manager_atm: undefined,
      },
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
      vm.getProductTypes()
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
      this.rowSpans = g;
    },
    getAllSales() {
      this.listLoading = true
      if (this.listQuery.date && this.listQuery.date.length > 1) {
        this.listQuery.start_date = moment(this.listQuery.date[0]).format('YYYY-MM-DD')
        this.listQuery.end_date = moment(this.listQuery.date[1]).format('YYYY-MM-DD')
      }
      console.log(this.listQuery)
      SalesAPI.getAllResalerSales(this.listQuery)
        .then(response => {
          this.sales = response
          this.listLoading = false
          this.calculateRowSpan()
          this.prepareExcelData()
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
      if (this.listQuery.date && this.listQuery.date.length > 1) {
        this.listQuery.start_date = moment(this.listQuery.date[0]).format('YYYY-MM-DD')
        this.listQuery.end_date = moment(this.listQuery.date[1]).format('YYYY-MM-DD')
      }
      SalesAPI.getAllResalerSalesCount(this.listQuery)
        .then(response => {
          this.total = response.total
        })
    },
    prepareExcelData() {
      this.dataForExcel = []
      this.sales.forEach(s => {
        let found = false
        this.dataForExcel.forEach(t => {
          if (t.id === s.id) {
            found = true
          }
        })

        if (!found) {
          let d = {
            id: s.id,
            region_title: s.region_title,
            region_manager_atm_name: s.region_manager_atm_name,
            area_title: s.area_title,
            area_manager_atm_name: s.area_manager_atm_name,
            resaler_name: s.name,
            order_total_price: s.order_total_price,
            order_total_profit: s.order_total_profit,
            deliver_tracking_code: s.deliver_tracking_code,
            note: s.note
          }
          this.dataForExcel.push(d)
        }
      })
    },
    getAreas(regionId) {
      console.log(regionId)
      ResalerAPI.getAllResalerAreas({region_id: regionId, page: 1 , limit: 10000})
        .then(response => {
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
    getProductTypes() {
      ProductAPI.getAllProductType()
        .then(response => {
          this.productTypes = response
        })
    },
    getSubType(item) {
      this.selectedProducts =[]
      this.listQuery.product = undefined
      this.listQuery.product_sub_type = undefined
      this.productSubTypes = item.product_type.sub_type

      if (item) {
        item.product_sub_type = undefined
        item.product_id = undefined
        item.cost = undefined
        item.size = undefined
        item.quantity = 0
        item.total_price = 0
        item.discount = 0
        item.discount_rate = 1
      }
    },
    getSelectedProducts(subType) {
      this.selectedProducts =[]
      this.listQuery.product = undefined

      if (subType) {
        ProductAPI.getProductBySubType({product_sub_type: subType})
            .then(response => {
              this.selectedProducts = response
            })
      }
    },
    getProductBySubType(subType, item) {
      this.products = subType.products
      if (item) {
        item.product_id = undefined
        item.cost = undefined
        item.size = undefined
        item.quantity = 0
        item.total_price = 0
        item.discount = 0
        item.discount_rate = 1
      }
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
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex < 7 || (columnIndex >= 16 && columnIndex <= 23)) {
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
    clearSpecialType() {
      this.listQuery.special_type = undefined
    },
    searchMember(query) {
      this.isSearchingMember = true
      if (query.length > 3) {
        MemberAPI.searchMemberByCellphone({cellphone: query})
          .then(response => {
            this.isSearchingMember = false
            this.members = response
            this.members.forEach(m => {
              m.searchValue = m.cellphone + ' | ' + m.name
            })
          })
          .catch(err => {
            this.$message({
              message: '搜索失败，请联系徐神检查',
              type: 'error'
            })
            this.isSearchingMember = false
          })
      }
    },
    selectMember(item) {
      this.temp.member_name = item.name
      this.temp.member_cellphone = item.cellphone
    },
    finishDownload(){
        alert('下载完成');
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
  .downloadExcelBtn {
    padding: 10px 20px;
    font-size: 14px;
    border-radius: 4px;
    color: #FFFFFF;
    background-color: #2c3e50;
    border-color: #2c3e50;
    width: 150px;
  }
</style>
