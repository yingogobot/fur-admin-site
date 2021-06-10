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

    <el-dialog title="价格修改申请" :visible.sync="priceChangeDialogFormVisible" width="80%">
      <el-form ref="dataForm"
        :model="temp" 
        label-position="left" 
        label-width="10px" 
        v-loading="listLoading"
        style="margin-left:20px;">
        <div>
          <div style="display: inline-block;">
            <h3 style="display: inline-block;"> 申请人 </h3>
            <el-input placeholder="申请人" v-model="this.name" :disabled="true" class="filter-item inventory-in-input-extra" />
          </div>
          <div style="display: inline-block; margin-left: 15px;">
            <h3 style="display: inline-block;"> 订单编号 </h3>
            <el-input placeholder="订单编号" :disabled="true" v-model="temp.sales_id" class="filter-item inventory-in-input-extra" />
          </div>
          <div style="display: inline-block; margin-left: 15px;">
            <h3 style="display: inline-block;"> 当前订单总价 </h3>
            <el-input placeholder="当前订单总价" :disabled="true"  v-model="temp.current_price" class="filter-item inventory-in-input-line" />
          </div>
        </div>
        <div style="margin-top: 20px;">
          <div style="display: block; ">
            <div style="display: inline-block;">
              <h3 style="display: inline-block;"> 修改订单总价 </h3>
              <el-input placeholder="修改订单总价" v-model="temp.new_price" class="filter-item inventory-in-input-extra" />
            </div>
          </div>
          <div style="display: block;">
              <h3 style="display: inline-block;"> 修改原因 </h3>
              <el-input
                type="textarea"
                placeholder="备注"
                v-model="temp.note" />
            </div>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dismissPriceChangeDialog()">
          取消
        </el-button>
        <el-button type="primary" :loading="listLoading" @click="confirmPriceChangeRequest(1)">
          提交价格修改需求
        </el-button>
      </div>
    </el-dialog>
    <el-dialog title="价格修改申请" :visible.sync="reviewPriceChangeDialogFormVisible" width="80%">
      <el-form ref="dataForm"
        :model="this.priceChangeData" 
        label-position="left" 
        label-width="10px" 
        v-loading="listLoading"
        style="margin-left:20px;">
        <div style="display: block;">
          <div style="display: inline-block;">
            <h3 style="display: inline-block;"> 订单编号 </h3>
            <el-input placeholder="订单编号" :disabled="true" v-model="this.priceChangeData.sales_id" class="filter-item inventory-in-input-extra" />
          </div>
          <div style="display: inline-block; margin-left: 15px;">
            <h3 style="display: inline-block;"> 申请人 </h3>
            <el-input placeholder="申请人" v-model="this.priceChangeData.requested_by" :disabled="true" class="filter-item inventory-in-input-extra" />
          </div>
        </div>
        <div style="display: block;">
          <div style="display: inline-block;">
            <h3 style="display: inline-block;"> 当前订单总价 </h3>
            <el-input placeholder="当前订单总价" :disabled="true"  v-model="this.priceChangeData.current_price" class="filter-item inventory-in-input-line" />
          </div>
          <div style="display: inline-block; margin-left: 15px;">
            <h3 style="display: inline-block;"> 修改后价格 </h3>
            <el-input placeholder="修改订单总价" :disabled="true" v-model="this.priceChangeData.new_price" class="filter-item inventory-in-input-extra" />
          </div>
        </div>
        <div style="display: block;">
          <h3 style="display: inline-block;"> 修改原因 </h3>
          <el-input
            type="textarea"
            placeholder="备注"
            :disabled="true"
            v-model="this.priceChangeData.price_change_note" />
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dismissPriceChangeDialog()">
          关闭页面
        </el-button>
        <el-button v-if="role === 5 || role === 1" type="primary" :loading="listLoading" @click="confirmPriceChangeRequest(2)">
          确认价格修改
        </el-button>
        <el-button v-if="id === this.priceChangeData.added_by" type="danger" plain @click="cancelPriceChanegRequest()">取消申请</el-button>
      </div>
    </el-dialog>

    <h2>需要审核的订单</h2>
    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="sales"
      :span-method="objectSpanMethod"
      border
      fit
      style="width: 100%;"
      :row-class-name="tableRowClassName"
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
      <el-table-column label="出库总量" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.quantity + row.promotion_quantity }}</span>
        </template>
      </el-table-column>
      <el-table-column label="订单销售总价" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.order_total_price }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column label="订单实收总价" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.order_total_revenue }}</span>
        </template>
      </el-table-column> -->
      <el-table-column label="订单添加人" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.added_by_name }}</span>
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
      <el-table-column label="审核订单" width="500px" align="center">
        <template slot-scope="{row}">
          <div v-if="row.new_price && row.new_price !== 0">
            <el-button type="primary" plain @click="showPriceChangeRequest(row)">改价申请中..</el-button>
          </div>
          <div v-else>
            <el-button v-if="id === row.added_by && row.fully_paid === 0" type="danger" plain @click="deleteOrder(row)">取消订单</el-button>
            <el-button v-if="id === row.added_by && row.fully_paid === 0" type="warning" plain @click="priceChangeRequest(row)">申请改价</el-button>
            <el-button v-if="(role === 7 || role === 5 || role === 1 && row.fully_paid === 0)" type="primary" plain @click="updateSalesPaidStuats(row)">确认收款</el-button>
            <el-button  v-if="role === 7 || role === 1 && row.fully_paid === 1" type="primary" plain @click="updateDeliveryCode(row)">发货</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getAllSales" />
  </div>
</template>

<script>
import SalesAPI from '@/api/sales.js'
import ResalerAPI from '@/api/resaler'
import UserAPI from '@/api/user'

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
      temp: {
        sales_id: undefined,
        current_price: undefined,
        new_price: undefined,
        note: undefined,
      },
      priceChangeData: {
        sales_id: undefined,
        new_price: undefined,
        requested_by: undefined,
        price_change_note: undefined
      },
      priceChangeDialogFormVisible: false,
      reviewPriceChangeDialogFormVisible: false,
      formType: 0,
      rowSpans: null,
    }
  },
  created() {
  },
  computed: {
    ...mapGetters([
      'id',
      'role',
      'name'
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
    tableRowClassName({row, rowIndex}) {
      let rowActualIndex = 0
      for (let i = 0; i < this.rowSpans.length; i++) {
        let rowSpan = this.rowSpans[i]
        if (rowIndex >= rowSpan.start && rowIndex < rowSpan.end) {
          rowActualIndex = i
        }
      }
      if (rowActualIndex % 2 === 0) {
        return 'blue-row';
      } else {
        return 'pink-row';
      }
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex < 10 || (columnIndex >= 16 && columnIndex <= 23)) {
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
      console.log(item)
       this.$prompt('请输入云仓发货编号', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(({ value }) => {
         this.$confirm('确定发货编号为' + value, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.sendUpdateSalesDeliveryRequest(item.id, item.inventory_id, value)
          }).catch(() => {   
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });       
        });
    },
    sendUpdateSalesDeliveryRequest(salesId, inventoryId, code) {
      this.listLoading = true
      let data = { 
        sales_id: salesId, 
        delivery_code: code,
        inventory_id: inventoryId
      }
      SalesAPI.updateSalesDeliveryCode(data)
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
    deleteOrder(item) {
      this.$confirm('是否确定删除本订单，删除后将无法恢复', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.sendDeleteOrderRequest(item.id, item.inventory_id)
      }).catch(() => {   
      });
    },
    sendDeleteOrderRequest(orderId, inventoryId) {
      this.listLoading = true
      SalesAPI.deleteSales({id: orderId, inventory_id: inventoryId})
        .then(response => {
          this.listLoading = false
          this.$alert('删除成功', '成功', {
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
            message: '订单修改失败，请联系徐神检查',
            type: 'error'
          })
          this.listLoading = false
        })
    },
    priceChangeRequest(item) {
      this.priceChangeDialogFormVisible = true
      this.temp.sales_id = item.id
      this.temp.current_price = item.order_total_price
    },
    dismissPriceChangeDialog() {
      this.priceChangeDialogFormVisible = false
      this.reviewPriceChangeDialogFormVisible = false
      this.priceChangeData = {
        sales_id: undefined,
        new_price: undefined,
        requested_by: undefined,
        price_change_note: undefined
      }
      this.temp = {
        sales_id: undefined,
        current_price: undefined,
        new_price: undefined,
        note: undefined,
      }
    },
    confirmPriceChangeRequest(type) {
      if (type === 1) { //确认提交
        if(!this.temp.new_price) {
          this.$message({
            message: '必须填写新价格',
            type: 'error'
          })
        } else if(!this.temp.note) {
          this.$message({
            message: '必须填写申请价格调整的理由',
            type: 'error'
          })
        } else {
          this.$confirm('确定要申请价格调整，新价格为：' + this.temp.new_price, {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.sendPriceChangeRequestRequest()
          }).catch(() => {   
          });
        }
      } else if (type === 2) { //确认修改
        this.$confirm('确定价格修改为：' + this.priceChangeData.new_price, {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.sendPriceChangeConfirmationRequest()
        }).catch(() => {   
        });
      }
    },
    sendPriceChangeRequestRequest() {
      this.listLoading = true
      SalesAPI.requestOrderPriceChange(this.temp)
        .then(response => {
          this.listLoading = false
          this.$alert('申请成功，请联系Mint确认', '成功', {
            confirmButtonText: '确定',
            callback: action => {
              this.page = 1
              this.dismissPriceChangeDialog()
              this.getAllSales()
              this.getSalesCount()
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
    sendPriceChangeConfirmationRequest() {
      this.listLoading = true
      SalesAPI.confirmOrderPriceChange(this.priceChangeData)
        .then(response => {
          this.listLoading = false
          this.$alert('价格修改成功', '成功', {
            confirmButtonText: '确定',
            callback: action => {
              this.page = 1
              this.dismissPriceChangeDialog()
              this.getAllSales()
              this.getSalesCount()
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
    showPriceChangeRequest(item) {
      this.priceChangeData = {
        sales_id: item.id,
        new_price: item.new_price,
        requested_by: item.added_by_name,
        added_by: item.added_by,
        price_change_note: item.price_change_note,
        current_price: item.order_total_price
      }
      this.reviewPriceChangeDialogFormVisible = true
    },
    cancelPriceChanegRequest() {
      this.$confirm('确定要取消本价格申请吗？', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.sendPriceChangeConfirmationRequest()
      }).catch(() => {   
      });
    },
    sendCancelPriceChanegRequest() {
      this.listLoading = true
      SalesAPI.cancelOrderPriceChange({sales_id: this.priceChangeData.sales_id})
        .then(response => {
          this.listLoading = false
          this.$alert('申请已取消', '成功', {
            confirmButtonText: '确定',
            callback: action => {
              this.page = 1
              this.dismissPriceChangeDialog()
              this.getAllSales()
              this.getSalesCount()
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
  }
}
</script>

<style lang="scss">
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
  .blue-row {
    background-color: bisque !important;
  }

  tr.pink-row {
    background-color: beige !important;
  }
</style>
