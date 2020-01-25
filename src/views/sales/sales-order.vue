<template>
  <div class="app-container">
    <div class="filter-container">
      <h2>筛选结果</h2>
      <el-input v-model="listQuery.sales_id" placeholder="出库批次" style="width: 150px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-select v-model="listQuery.sales_type" placeholder="出库类型" clearable style="width: 150px; margin-left: 15px;" class="filter-item">
        <el-option v-for="item in salesTypes" :key="item.id" :label="item.title" :value="item.id" />
      </el-select>
      <el-select v-if="listQuery.sales_type === 1" v-model="listQuery.sales_channel_id" placeholder="销售渠道" clearable style="width: 150px; margin-left: 15px;" class="filter-item">
        <el-option v-for="item in salesChannel" :key="item.id" :label="item.title" :value="item.id" />
      </el-select>
      <el-select v-if="listQuery.sales_type === 2" v-model="listQuery.event_id" placeholder="活动类型" clearable style="width: 150px; margin-left: 15px;" class="filter-item">
        <el-option v-for="item in events" :key="item.id" :label="item.title" :value="item.id" />
      </el-select>
      <el-select v-if="listQuery.sales_type === 3" v-model="listQuery.resaler_id" placeholder="分销渠道" clearable style="width: 150px; margin-left: 15px;" class="filter-item">
        <el-option v-for="item in resalers" :key="item.id" :label="item.name" :value="item.id" />
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
      <el-button class="filter-item" style="width: 200px; margin-left: 10px;" type="success" icon="el-icon-edit" @click="handleCreate">
        添加新销售
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
      <el-table-column label="销售类型" prop="sales_type" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.sales_type }}</span>
        </template>
      </el-table-column>
      <el-table-column label="销售时间" prop="sales_type" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{moment(row.created_at).format('YYYY-MM-DD')}}</span>
        </template>
      </el-table-column>
      <el-table-column label="销售渠道" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.sales_channel || row.resaler_name || row.event_title }}</span>
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
      <el-table-column label="产品成本" width="100px" align="center">
        <template slot-scope="{row}">
          <span>￥{{ row.per_item_cost_atm }}</span>
        </template>
      </el-table-column>
      <el-table-column label="销售价格" width="100px" align="center">
        <template slot-scope="{row}">
          <span>￥{{ row.per_item_price_atm }}</span>
        </template>
      </el-table-column>
      <el-table-column label="单品优惠" width="100px" align="center">
        <template slot-scope="{row}">
          <span>￥{{ row.per_product_discount }}</span>
        </template>
      </el-table-column>
      <el-table-column label="单品折扣" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.per_product_discount_ratio * 100 }}%</span>
        </template>
      </el-table-column>
      <el-table-column label="单品总价" width="100px" align="center">
        <template slot-scope="{row}">
          <span>￥{{ row.total_price}}</span>
        </template>
      </el-table-column>
      <el-table-column label="运费成本" width="100px" align="center">
        <template slot-scope="{row}">
          <span>￥{{ row.shipping_cost }}</span>
        </template>
      </el-table-column>
      <el-table-column label="其他成本" width="100px" align="center">
        <template slot-scope="{row}">
          <span>￥{{ row.other_cost }}</span>
        </template>
      </el-table-column>
      <el-table-column label="订单优惠" width="100px" align="center">
        <template slot-scope="{row}">
          <span>￥{{ row.coupon }}</span>
        </template>
      </el-table-column>
      <el-table-column label="订单折扣" width="100px" align="center">
        <template slot-scope="{row}">
          <span>￥{{ row.discount }}</span>
        </template>
      </el-table-column>
      <el-table-column label="全额付款" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.fully_paid === 1 ? '是' : '否' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="特殊状态" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.special_type === 1 ? '是' : '否' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="录入人" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.added_by_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="查看订单详情" width="150px" align="center">
        <el-button type="primary" plain @click="addMoreProduct">详情</el-button>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getAllSales" />

    <el-dialog title="添加新销售" :visible.sync="dialogFormVisible" width="80%">
      <el-form ref="dataForm"
        :model="temp" 
        label-position="left" 
        label-width="10px" 
        style="margin-left:20px;">
        <div>
          <h3 style="display: inline-block; width: 100px;"> 销售类型 </h3>
          <el-form-item prop="type" style="display: inline-block;">
            <el-select v-model="temp.sales_type" placeholder="选择销售类型">
              <el-option v-for="item in salesTypes" :key="item.id" :label="item.title" :value="item.id" />
            </el-select>
          </el-form-item>
        </div>
        <div v-if="temp.sales_type === 1">
          <h3 style="display: inline-block; width: 100px;"> 直销渠道 </h3>
          <el-form-item prop="type" style="display: inline-block;">
            <el-select v-model="temp.sales_channel" placeholder="选择入库类型">
              <el-option v-for="item in salesChannel" :key="item.id" :label="item.title" :value="item.id" />
            </el-select>
          </el-form-item>
        </div>
        <div v-if="temp.sales_type === 2">
          <h3 style="display: inline-block; width: 100px;"> 活动名称 </h3>
          <el-form-item prop="type" style="display: inline-block;">
            <el-select v-model="temp.event" placeholder="选择入库类型">
              <el-option v-for="item in events" :key="item.id" :label="item.title" :value="item.id" />
            </el-select>
          </el-form-item>
        </div>
        <div v-if="temp.sales_type === 3">
          <h3 style="display: inline-block; width: 100px;"> 分销渠道 </h3>
          <el-form-item prop="type" style="display: inline-block;">
            <el-select v-model="temp.event" placeholder="选择入库类型">
              <el-option v-for="item in resalers" :key="item.id" :label="item.name" :value="item.id" />
            </el-select>
          </el-form-item>
        </div>
        <div>
          <h3 style="display: inline-block; width: 100px; vertical-align: top; margin-top: 0;"> 出库产品 </h3>
          <div style="display: inline-block;">
            <div style=" margin-bottom: 5px;">
              <div class="input-title input-title-extra-long">产品类型</div>
              <div class="input-title input-title-extra-long">产品分类</div>
              <div class="input-title input-title-extra-long">产品名称</div>
              <div class="input-title input-title-short">零售价</div>
              <div class="input-title input-title-short">数量</div>
              <div class="input-title input-title-short">产品优惠</div>
              <div class="input-title input-title-short">产品折扣</div>
              <div class="input-title input-title-extra-long">总价</div>
            </div>
            <el-form-item v-for="(item, index) in temp.products" 
              label="" :key="item.id" prop="product" style="margin-bottom: 10px;">
              <el-select v-model="item.product_type" placeholder="产品类型" 
                clearable style="width: 150px;" class="filter-item" 
                @change="getSubType(item.product_type, item)"
                @clear="getSubType(item.product_type, item)">
                <el-option v-for="item in productTypes" :key="item.id" :label="item.title" :value="item.id" />
              </el-select>
              <el-select v-model="item.product_sub_type" class="filter-item inventory-in-input-extra" placeholder="产品分类" 
                clearable @change="getProductBySubType(item.product_sub_type, item)" 
                @clear="getProductBySubType(item.product_sub_type, item)">
                <el-option v-for="item in productSubTypes" :key="item.id" :label="item.title" :value="item.id" />
              </el-select>
              <el-select v-model="item.product_id" class="filter-item inventory-in-input-extra" placeholder="产品名称" 
                clearable @change="readProductInfo(item)"
                @clear="readProductInfo(item)">
                <el-option v-for="item in products" :key="item.id" :label="item.title" :value="item.id" />
              </el-select>
              <el-input placeholder="零售价" v-model="item.price" :disabled="true" class="filter-item inventory-in-input-short" />
              <el-input v-model="item.quantity" placeholder="数量" class="filter-item inventory-in-input-short" clearable @change="calculateTotalPrice(item)" />
              <el-input v-model="item.discount" placeholder="产品优惠" class="filter-item inventory-in-input-short" clearable @change="calculateTotalPrice(item)"  />
              <el-input v-model="item.discount_rate" placeholder="折扣率" class="filter-item inventory-in-input-short" clearable @change="calculateTotalPrice(item)"  />
              <el-input v-model="item.total_price" placeholder="总价" class="filter-item inventory-in-input-extra" clearable :disabled="true"/>
              <el-button style="margin-left: 10px;" type="danger" icon="el-icon-delete" @click="removeProduct(index)" />
            </el-form-item>

            <el-form-item>
              <el-button style="width: 150px;" type="primary" plain @click="addMoreProduct">添加产品</el-button>
              <div> 产品折扣为0-1，例如：9折，则填写0.9</div>
              <div> 总价 =（零售价 * 产品折扣 - 产品优惠）* 数量</div>
            </el-form-item>
          </div>
          <div style=" margin-bottom: 20px; ">
            <h3 class="section-title"> 优惠信息 </h3>
            <div style="display: inline-block; width: 150px;">
              <h3 class="middle-title"> 订单优惠券 </h3>
              <el-input v-model="temp.coupon" placeholder="订单优惠券" class="filter-item" clearable @change="calculateOrderPrice()" />
            </div>
            <div style="margin-left: 10px; display: inline-block; width: 150px;">
              <h3 class="middle-title"> 订单折扣 </h3>
              <el-input v-model="temp.discount" placeholder="订单折扣" class="filter-item" clearable @change="calculateOrderPrice()" />
            </div>
            <div style="margin-left: 10px; display: inline-block; width: 150px;">
              <h3 class="middle-title"> 运费 </h3>
              <el-input v-model="temp.shipping_cost" placeholder="运费" class="filter-item" clearable @change="calculateOrderPrice()" />
            </div>
            <div style="margin-left: 10px; display: inline-block; width: 150px;">
              <h3 class="middle-title"> 其他费用 </h3>
              <el-input v-model="temp.other_cost" placeholder="其他费用" class="filter-item" clearable @change="calculateOrderPrice()" />
            </div>
          </div>
          <div style=" margin-bottom: 20px; ">
            <h3 class="section-title"> 汇总信息 </h3>
            <div style="display: inline-block; width: 150px;">
              <h3 class="middle-title"> 订单总价 </h3>
              <el-input v-model="temp.order_total_price" placeholder="订单总价" class="filter-item" clearable :disabled="true" />
            </div>
            <div style="margin-left: 10px; display: inline-block; width: 150px;">
              <h3 class="middle-title"> 订单总利润 </h3>
              <el-input v-model="temp.order_total_profit" placeholder="订单总利润" class="filter-item" clearable :disabled="true" />
            </div>
            <div style="margin-left: 10px; display: inline-block; width: 150px;">
              <h3 class="block-title"> 是否全额付款 </h3>
              <el-checkbox v-model="temp.fully_paid">全额付款</el-checkbox>
            </div>
            <div style="margin-left: 10px; display: inline-block; width: 150px;">
              <h3 class="block-title"> 特殊状态 </h3>
              <el-checkbox v-model="temp.special_type">特殊状态</el-checkbox>
            </div>
          </div>
          <div>
            <h3 class="section-title"> 出库备注 </h3>
            <el-input
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4}"
              placeholder="备注"
              v-model="temp.note"
              style="width: 70%" />
          </div>
          <!-- <div>
            <h3 class="section-title-large"> 上传合同或凭证 </h3>
            <el-upload
              class="upload-demo"
              drag
              action="https://jsonplaceholder.typicode.com/posts/"
              multiple>
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            </el-upload>
          </div> -->
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="addSalesOrder()">
          提交
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import SalesAPI from '@/api/sales.js'
import ProductAPI from '@/api/product'
import ResalerAPI from '@/api/resaler'
import EventAPI from '@/api/event'
import SalesChannelAPI from '@/api/sales-channel'

import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import { mapGetters } from 'vuex'

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
      salesTypes:[],
      productTypes: [],
      productSubTypes: [],
      selectedProducts: [],
      products: [],
      resalers: [],
      salesChannel: [],
      events: [],
      listQuery: {
        sales_id: undefined,
        sales_type: undefined,
        sales_channel_id: undefined,
        page: 1,
        limit: 10,
        product_type: undefined,
        product_sub_type: undefined,
        product: undefined,
        resaler_id: undefined,
        event_id: undefined
      },
      temp: {
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
        order_total_price: 0,
        order_total_profit: 0,
        coupon: 0,
        discount: 1,
        shipping_cost: 0,
        other_cost: 0,
        sales_channel: undefined,
        resaler_id: undefined,
        event_id: undefined,
        note: undefined,
        fully_paid: true,
        special_type: false
      },
      dialogFormVisible: false,
      rowSpans: null
    }
  },
  created() {
    this.getAllSales()
    this.getSalesCount()
    this.getProductTypes()
    this.getSalesTypes()
    this.getResalers()
    this.getSalesChannels()
    this.getEvents()
  },
  computed: {
    ...mapGetters([
      'id'
    ])
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
      SalesAPI.getAllSales(this.listQuery)
        .then(response => {
          this.sales = response.data
          this.listLoading = false
          this.calculateRowSpan()

          let g = []
          this.sales.forEach(i => {
            i.total_price = ((i.per_item_price_atm * i.per_product_discount_ratio) - i.per_product_discount) * i.quantity
            i.total_profit = i.total_price - (i.per_item_cost_atm * i.quantity)
            let found = false
            g.forEach(t => {
              if (t.id === i.id) {
                found = true
                t.order_total_price = t.order_total_price + i.total_price
                t.order_total_profit = t.order_total_profit + i.total_profit
              }
            })

            if (!found) {
              let t = {
                id: i.id,
                order_total_price: i.total_price,
                order_total_profit: i.total_profit
              }

              g.push(t)
            }
          })

          g.forEach(t => {
            this.sales.forEach(i => {
              if (t.id === i.id) {
                i.order_total_price = t.order_total_price - i.coupon - i.discount
                i.order_total_profit = t.order_total_profit - i.shipping_cost - i.other_cost
              }              
            })
          })
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
    getSalesTypes() {
      SalesAPI.getAllSalesType()
        .then(response => {
          console.log(response)
          this.salesTypes = response
        })
    },
    getSalesCount() {
      SalesAPI.getAllSalesCount(this.listQuery)
        .then(response => {
          console.log(response)
          this.total = response.total
        })
    },
    getProductTypes() {
      ProductAPI.getAllProductType()
        .then(response => {
          this.productTypes = response
        })
    },
    getSubType(productType, item) {
      this.selectedProducts =[]
      this.listQuery.product = undefined
      this.productSubTypes = []
      this.listQuery.product_sub_type = undefined

      if (productType) {
        ProductAPI.getProductSubType({product_type_id: productType})
          .then(response => {
            this.productSubTypes = response
          })
      }

      if (item) {
        item.product_sub_type = undefined
        item.product_id = undefined
        item.cost = undefined
        item.size = undefined
        item.quantity = 0
        item.total_price = 0
        item.discount = 0
        item.discount_ratio = 1
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
      if (subType) {
        ProductAPI.getProductBySubType({product_sub_type: subType})
          .then(response => {
            this.products = response
          })
      }

      if (item) {
        item.product_id = undefined
        item.cost = undefined
        item.size = undefined
        item.quantity = 0
        item.total_price = 0
        item.discount = 0
        item.discount_ratio = 1
      }
    },
    getResalers() {
      ResalerAPI.getAllResalers()
        .then(response => {
          this.resalers = response
        })
    },
    getEvents() {
      EventAPI.getAllEvents()
        .then(response => {
          this.events = response
        })
    },
    getSalesChannels() {
      SalesChannelAPI.getAllSalesChannels()
        .then(response => {
          this.salesChannel = response
        })
    },
    readProductInfo(item) {
      this.products.forEach(p => {
        if (p.id === item.product_id) {
          item.size = p.size;
          item.cost = p.cost;
          item.price = p.price;
        }
      })
    },
    calculateTotalPrice(item) {
      item.total_price = Math.round(((item.price * item.discount_rate) - item.discount) * item.quantity * 100) / 100
      this.calculateOrderPrice()
    },
    calculateOrderPrice() {
      let total = 0
      this.temp.products.forEach(p => {
        total = total + p.total_price;
      })
      this.temp.order_total_price = total * this.temp.discount - this.temp.coupon;
      this.temp.order_total_profit = total * this.temp.discount - this.temp.coupon - this.temp.shipping_cost - this.temp.other_cost;
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex < 4 || (columnIndex >= 14 && columnIndex < 22)) {
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
        product_type: '',
        product_sub_type: '',
        product_id: '',
        quantity: undefined,
        cost: undefined,
        price: undefined,
        discount: 0,
        discount_rate: 1,
        note: undefined,
        key: this.temp.products.length + 1,
        total_price: 0
      });
    },
    removeProduct(itemIndex) {
      this.$delete(this.temp.products, itemIndex)
    },
    handleCreate() {
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
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
          sales_order_data: {
            type: this.temp.sales_type,
            coupon: this.temp.coupon,
            discount: this.temp.discount,
            shipping_cost: this.temp.shipping_cost,
            other_cost: this.temp.other_cost,
            sales_channel_id: this.temp.sales_channel_id,
            resaler_id: this.temp.resaler_id,
            event_id: this.temp.event_id,
            fully_paid: this.temp.fully_paid ? 1 : 0,
            special_type: this.temp.special_type ? 1 : 0,
            added_by: this.id,
            note: this.temp.note
          },
          product_data: [],
        }

        console.log(data)

        this.temp.products.forEach(p => {
          let d = {
            product_id: p.product_id,
            quantity: p.quantity,
            cost: p.cost,
            price: p.price,
            discount: p.discount,
            discount_ratio: p.discount_rate
          }
          data.product_data.push(d)
        })

        this.listLoading = true
        addNewInventoryRequest(data)
          .then(response => {
            this.listLoading = false
            this.$alert('库存添加成功', '成功', {
              confirmButtonText: '确定',
              callback: action => {
                this.page = 1
                this.getInventoryOut()
                this.dialogFormVisible = false;
                this.temp = {
                  inventory_in_type: undefined,
                  products: [{
                      product_type: '',
                      product_sub_type: '',
                      product_id: '',
                      quantity: undefined,
                      cost: undefined,
                      size: '',
                      key: 1
                    }
                  ],
                  note: undefined,
                  ordered_by: undefined
                }
              }
            });
          })
          .catch(err => {
            this.$message({
              message: '添加库存失败，请联系徐神检查',
              type: 'error'
            })
            this.listLoading = false
          })
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
