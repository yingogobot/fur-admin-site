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
          <span>{{ row.per_product_discount_ratio == 1 ? "原价" : (row.per_product_discount_ratio == 0 ? "免费赠品" : Math.floor(row.per_product_discount_ratio * 100) 1/ 100 * 10 + "折") }}</span>
        </template>
      </el-table-column>
      <el-table-column label="单品总价" width="100px" align="center">
        <template slot-scope="{row}">
          <span>￥{{ row.total_price}}</span>
        </template>
      </el-table-column>
      <el-table-column label="订单总价" width="100px" align="center">
        <template slot-scope="{row}">
          <span>￥{{ row.order_total_revenue }}</span>
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
      <el-table-column v-if="role === 1" label="编辑订单" width="150px" align="center">
        <template slot-scope="scope">
          <el-button type="warning" plain @click="editSale(scope.row)">编辑</el-button>
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
    addMoreProduct() {
      this.temp.products.push({
        product_type: undefined,
        product_sub_type: undefined,
        product_id: '',
        quantity: undefined,
        cost: undefined,
        price: undefined,
        discount: 0,
        discount_rate: 1.0,
        note: undefined,
        key: this.temp.products.length + 1,
        total_price: 0
      });
    },
    removeProduct(itemIndex) {
      this.$delete(this.temp.products, itemIndex)
      this.calculateOrderPrice()
    },
    addAllProductBySubType(subType) {
      let id = 0
      let discount = 1
      if (subType === 1) { //小包冻干taobao
        id = process.env.PRODUCT_SUB_TYPE_ID.MINI_FD
        discount = 0.9
      } else if (subType === 2) { //大包冻干
        id = process.env.PRODUCT_SUB_TYPE_ID.LARGE_FD
      } else if (subType === 3) { //肉干
        id = process.env.PRODUCT_SUB_TYPE_ID.TREAT
      } else if (subType === 4) { //犬用鲜粮
        id = process.env.PRODUCT_SUB_TYPE_ID.DOG_FF
      } else if (subType === 5) { //猫用鲜粮
        id = process.env.PRODUCT_SUB_TYPE_ID.CAT_FF
      } else if (subType === 6) { //猫条
        id = process.env.PRODUCT_SUB_TYPE_ID.CAT_SIP
      }
      ProductAPI.getAllProductsBySubType(id)
        .then(response => {
          response.sub_type[0].products.forEach(p => {
            let pd = {
              product_type: response,
              product_sub_type: response.sub_type[0],
              product_id: p.id,
              product: p,
              quantity: 1,
              cost: p.cost,
              price: p.price,
              discount: 0,
              discount_rate: discount,
              note: undefined,
              key: this.temp.products.length + 1,
              total_price: 0
            }
            this.calculateTotalPrice(pd)
            this.temp.products.push(pd);
          })
          this.calculateOrderPrice()
        })
        .catch(err => {
          this.$message({
            message: '作弊工具出问题了，请联系徐神检查',
            type: 'error'
          })
        })
    },
    handleCreate() {
      this.dialogFormVisible = true
      this.formType = 1
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    clearFullyPaid() {
      this.listQuery.fully_paid = undefined
    },
    clearSpecialType() {
      this.listQuery.special_type = undefined
    },
    editSale(item) {
      let data = {
        id: item.id,
        sales_type: item.sales_type_id,
        order_total_price: item.order_total_price,
        order_total_profit: item.order_total_profit,
        coupon: item.coupon,
        discount: item.discount,
        manual_discount: item.manual_discount,
        shipping_cost: item.shipping_cost,
        other_cost: item.other_cost,
        member_id: item.member_id,
        sales_channel: {
          id: item.sales_channel_id,
          title: item.sales_channel_title
        },
        resaler: {
          id: item.resaler_id,
          name: item.resaler_name
        },
        event: {
          id: item.event_id,
          title: item.event_title
        },
        note: item.note,
        fully_paid: item.fully_paid === 1 ? true : false,
        special_type: item.special_type  === 1 ? true : false,
        date: item.date,
        member: {
          name: item.member_name,
          cellphone: item.member_cellphone,
          searchValue: item.member_cellphone + ' | ' + item.member_name
        },
        products: [],
        selectedProducts: [],
        deletedProducts:[]
      }
      this.sales.forEach(i => {
        if (i.id === item.id) {
          data.selectedProducts.push({
            sales_product_id: i.sales_product_id,
            title: i.product_title,
            product_type: {
              id: i.product_type_id,
              title: i.product_type
            },
            product_sub_type: {
              id: i.product_sub_type_id,
              title: i.product_sub_type
            },
            product_id: i.product_id,
            quantity: i.quantity,
            cost: i.per_item_cost_atm,
            price: i.per_item_price_atm,
            discount: i.per_product_discount,
            discount_rate: i.per_product_discount_ratio,
            product_note: i.product_note,
            key: i.product_id,
            total_price: i.total_price,
            total_cost: i.total_cost,
            total_profit: i.total_profit,
          })
        }
      })
      this.temp = data
      this.dialogFormVisible = true
      this.formType = 2
      this.calculateOrderPrice()
    },
    deleteSelectedProduct(itemIndex) {
      this.temp.deletedProducts.push(this.temp.selectedProducts[itemIndex])
      this.$delete(this.temp.selectedProducts, itemIndex)
      this.calculateOrderPrice()
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
    addSalesOrder() {
      this.$confirm('确定添加?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.sendAddSalesRequest()
      }).catch(() => {        
      });
    },
    sendAddSalesRequest() {
      let that = this
      if (!this.temp.sales_type) {
        this.$message({
          message: '入库类型必须填写',
          type: 'error'
        })
      } else if (this.temp.products.length === 0) {
        this.$message({
          message: '至少要有一个或以上的产品入库',
          type: 'error'
        })
      } else {
        let data = {
          sales_data: {
            type: this.temp.sales_type,
            coupon: this.temp.coupon,
            discount: this.temp.discount,
            manual_discount: this.temp.manual_discount,
            shipping_cost: this.temp.shipping_cost,
            other_cost: this.temp.other_cost,
            order_total_price: this.temp.order_total_price ? this.temp.order_total_price : 0,
            order_total_profit: this.temp.order_total_profit ? this.temp.order_total_profit : 0,
            sales_channel_id: this.temp.sales_channel ? this.temp.sales_channel.id : null,
            member_id: this.temp.member ? this.temp.member.id : null,
            resaler_id: this.temp.resaler ? this.temp.resaler.id : null,
            event_id: this.temp.event ? this.temp.event.id : null,
            fully_paid: this.temp.fully_paid ? 1 : 0,
            special_type: this.temp.special_type ? 1 : 0,
            added_by: this.id,
            date: moment(this.temp.date).format('YYYY-MM-DD'),
            note: this.temp.note
          },
          product_data: [],
        }
        this.temp.products.forEach(p => {
          let d = {
            product_id: p.product_id,
            quantity: p.quantity,
            per_item_cost_atm: p.cost,
            per_item_price_atm: p.price,
            per_product_discount: p.discount,
            per_product_discount_ratio: p.discount_rate,
            total_price: p.total_price,
            total_cost: p.total_cost,
            total_profit: p.total_profit,
            note: p.note,
          }
          data.product_data.push(d)
        })

        this.listLoading = true
        SalesAPI.addNewSalesRequest(data)
          .then(response => {
            that.listLoading = false
            this.$alert('库存添加成功', '成功', {
              confirmButtonText: '确定',
              callback: action => {
                this.page = 1
                this.getAllSales()
                this.dialogFormVisible = false
                this.setDataBackToDefault()
              }
            });
          })
          .catch(err => {
            that.$message({
              message: '添加库存失败，请联系徐神检查',
              type: 'error'
            })
            that.listLoading = false
          })
      }
    },
    updateSalesOrder() {
      this.$confirm('确定所有的修改?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.sendUpdateSalesRequest()
      }).catch(() => {        
      });
    },
    sendUpdateSalesRequest() {
      let that = this
      let data = {
        sales_data: {
          id: this.temp.id,
          type: this.temp.sales_type,
          coupon: this.temp.coupon,
          discount: this.temp.discount,
          manual_discount: this.temp.manual_discount,
          shipping_cost: this.temp.shipping_cost,
          other_cost: this.temp.other_cost,
          order_total_price: this.temp.order_total_price ? this.temp.order_total_price : 0,
          order_total_profit: this.temp.order_total_profit ? this.temp.order_total_profit : 0,
          sales_channel_id: this.temp.sales_channel.id,
          member_id: this.temp.member.id,
          resaler_id: this.temp.resaler.id,
          event_id: this.temp.event.id,
          fully_paid: this.temp.fully_paid ? 1 : 0,
          special_type: this.temp.special_type ? 1 : 0,
          added_by: this.id,
          date: moment(this.temp.date).format('YYYY-MM-DD'),
          note: this.temp.note
        },
        add_products: [],
        delete_products: []
      }
      that.temp.products.forEach(p => {
        if (p.product_id) {
          let d = {
            product_id: p.product_id,
            quantity: p.quantity,
            per_item_cost_atm: p.cost,
            per_item_price_atm: p.price,
            per_product_discount: p.discount,
            per_product_discount_ratio: p.discount_rate,
            total_price: p.total_price,
            total_cost: p.total_cost,
            total_profit: p.total_profit,
            note: p.note,
          }
          data.add_products.push(d)
        }
      })

      that.temp.deletedProducts.forEach(p => {
        data.delete_products.push(p.sales_product_id)
      })
      console.log(data)
      that.listLoading = true
      SalesAPI.updateSales(data)
        .then(response => {
          that.listLoading = false
          that.$alert('销售订单修改成功', '成功', {
            confirmButtonText: '确定',
            callback: action => {
              that.page = 1
              that.getAllSales()
              that.dialogFormVisible = false
              this.setDataBackToDefault()
            }
          });
        })
        .catch(err => {
          that.$message({
            message: '销售订单修改失败，请联系徐神检查',
            type: 'error'
          })
          that.listLoading = false
        })
    },
    setDataBackToDefault() {
      this.temp = {
        id: undefined,
        sales_type: undefined,
        products: [{
            product_type: '',
            product_sub_type: '',
            product_id: '',
            quantity: 0,
            cost: undefined,
            price: undefined,
            discount: 0,
            discount_rate: 1,
            note: undefined,
            key: 1,
            total_price: 0
          }
        ],
        selectedProducts:[],
        deletedProducts: [],
        order_total_price: 0,
        order_total_profit: 0,
        coupon: 0,
        discount: 1,
        manual_discount: 0,
        shipping_cost: 5,
        other_cost: 0,
        sales_channel: undefined,
        resaler_id: undefined,
        event_id: undefined,
        note: undefined,
        fully_paid: true,
        special_type: false,
        date: new Date()
      }
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
