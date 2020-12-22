<template>
  <div>
  `  <el-row :gutter="40" class="panel-group">
      <el-col :xs="12" :sm="12" :lg="4" class="card-panel-col">
        <div class="card-panel" @click="handleSetLineChartData('newVisitis')">
          <div class="card-panel-text"> 当前月份 </div>
          <div class="card-panel-num">{{moment().format('YYYY-MM')}}</div>
        </div>
      </el-col>

      <el-col :xs="12" :sm="12" :lg="4" class="card-panel-col">
        <div class="card-panel" @click="handleSetLineChartData('shoppings')">
          <div class="card-panel-text"> 本月销售目标 </div>
          <div class="card-panel-num">
            <count-to :start-val="0" :end-val="0" :duration="3600" class="card-panel-num" />
          </div>
        </div>
      </el-col>

      <el-col :xs="12" :sm="12" :lg="4" class="card-panel-col">
        <div class="card-panel" @click="handleSetLineChartData('messages')">
          <div class="card-panel-text"> 本月总销量 </div>
          <div class="card-panel-num">
            <count-to :start-val="0" :end-val="0" :duration="3000" class="card-panel-num" />
          </div>
        </div>
      </el-col>

      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel" @click="handleSetLineChartData('purchases')">
          <div class="card-panel-text"> 新建订单 (尚未开通) </div>
          <div class="card-panel-button">
            <el-button type="primary" plain @click="handleCreate">新建分销订单</el-button>
            <!-- <el-button type="warning" plain @click="">直销订单</el-button> -->
          </div>
        </div>
      </el-col>

      <el-col :xs="12" :sm="12" :lg="4" class="card-panel-col">
        <div class="card-panel" @click="goToSalesInReviewPage('shoppings')">
          <div class="card-panel-text"> 尚未审核的订单 </div>
          <div class="card-panel-num">
            <count-to :start-val="0" :end-val="this.inReivewSalesCount" :duration="1200" class="card-panel-num" />
          </div>
        </div>
      </el-col>
    </el-row>
    <el-dialog title="添加新销售" :visible.sync="dialogFormVisible" width="80%">
      <el-form ref="dataForm"
        :model="temp" 
        label-position="left" 
        label-width="10px" 
        style="margin-left:20px;">
        <div style="display: inline-block;">
          <div style="display: inline-block; margin-bottom: 40px;">
            <h3 style="display: inline-block;"> 分销大区 </h3>
            <el-form-item prop="type" style="display: inline-block;  margin-left: 10px;">
              <el-select v-model="temp.region" value-key="id" placeholder="选择分销大区"
                @change="getAreas()"
                @clear="getAreas()"
              >
                <el-option v-for="item in resalerRegions" :key="item.id" :label="item.title" :value="item" />
              </el-select>
            </el-form-item>
            <div> 大区经理： {{ temp.region ? temp.region.manager_name : ""}} </div>
          </div>
          <div style="display: inline-block; margin-left: 15px;">
            <h3 style="display: inline-block;"> 分销地区 </h3>
            <el-form-item prop="type" style="display: inline-block; margin-left: 10px;">
              <el-select v-model="temp.area" value-key="id" placeholder="选择分销地区"
                @change="getResalers()"
                @clear="clearResaler()"
              >
                <el-option v-for="item in resalerAreas" :key="item.id" :label="item.title" :value="item" />
              </el-select>
            </el-form-item>
            <div> 地区经理： {{ temp.area ? temp.area.area_manager_name : ""}} </div>
          </div>
          <div style="display: inline-block; margin-left: 15px;">
            <h3 style="display: inline-block;"> 分销渠道 </h3>
            <el-form-item prop="type" style="display: inline-block;">
              <el-select v-model="temp.resaler" value-key="id" placeholder="选择分销渠道">
                <el-option v-for="item in resalers" :key="item.id" :label="item.name" :value="item" />
              </el-select>
            </el-form-item>
             <div> 联系人： {{ temp.resaler ? temp.resaler.contact + " " + temp.resaler.phone : ""}} </div>
          </div>
        </div>
        <div>
          <h3 style="display: inline-block; width: 100px; vertical-align: top; margin-top: 0;"> 添加销售产品 </h3>

          <div style="margin-bottom: 20px"> 
            作弊工具：
            <el-button type="info" @click="addAllProductBySubType(1)">
              添加小冻干套装
            </el-button>
            <el-button type="info" @click="addAllProductBySubType(2)">
              添加大冻干套装
            </el-button>
            <el-button type="info" @click="addAllProductBySubType(3)">
              添加肉干套装
            </el-button>
            <el-button type="info" @click="addAllProductBySubType(4)">
              添加狗鲜粮套装
            </el-button>
            <el-button type="info" @click="addAllProductBySubType(5)">
              添加猫鲜粮套装
            </el-button>
            <el-button type="info" @click="addAllProductBySubType(5)">
              添加猫条套装
            </el-button>
          </div>
          <div style="display: inline-block;">
            <div style=" margin-bottom: 5px;">
              <div class="input-title input-title-extra-long">产品类型</div>
              <div class="input-title input-title-extra-long">产品分类</div>
              <div class="input-title input-title-extra-long">产品名称</div>
              <div class="input-title input-title-short">零售价</div>
              <div class="input-title input-title-short">数量</div>
              <div class="input-title input-title">产品折扣</div>
              <div class="input-title input-title">产品折扣</div>
              <div class="input-title input-title-extra-long">总价</div>
              <div class="input-title input-title-extra-long">备注</div>
            </div>
            <el-form-item v-for="(p, index) in temp.products" 
              label="" :key="p.id" prop="product" style="margin-bottom: 10px;">
              <el-select v-model="p.product_type" value-key="id" placeholder="产品类型" 
                clearable style="width: 150px;" class="filter-item" 
                @change="getSubType(p)"
                @clear="getSubType(p)">
                <el-option v-for="item in productTypes" :key="item.id" :label="item.title" :value="item" />
              </el-select>
              <el-select v-if="temp.products[index].product_type" v-model="p.product_sub_type" value-key="id" class="filter-item inventory-in-input-extra" 
                placeholder="产品分类" clearable 
                @change="getProductBySubType(p.product_sub_type, p)" 
                @clear="getProductBySubType(p.product_sub_type, p)">
                <el-option  v-for="item in temp.products[index].product_type.sub_type" :key="item.id" :label="item.title" :value="item" />
              </el-select>
              <el-select v-if="temp.products[index].product_sub_type" v-model="p.product" value-key="id" class="filter-item inventory-in-input-extra" 
                placeholder="产品名称" clearable 
                @change="readProductInfo(p)"
                @clear="readProductInfo(p)">
                <el-option v-for="item in temp.products[index].product_sub_type.products" :key="item.id" :label="item.title" :value="item" />
              </el-select>
              <el-input placeholder="零售价" v-model="p.price" :disabled="true" class="filter-item inventory-in-input-short" />
              <el-input v-model="p.quantity" placeholder="数量" class="filter-item inventory-in-input-short" clearable @change="calculateTotalPrice(p)" />
              <el-input v-model="p.discount_rate" placeholder="折扣率" class="filter-item inventory-in-input" clearable @change="calculateTotalPrice(p)"  />
              <el-input v-model="p.total_price" placeholder="总价" class="filter-item inventory-in-input-extra" clearable :disabled="true"/>
              <el-input v-model="p.note" placeholder="备注" class="filter-item inventory-in-input-extra" clearable/>
              <el-button style="margin-left: 10px;" type="danger" icon="el-icon-delete" @click="removeProduct(index)" />
            </el-form-item>

            <el-form-item>
              <el-button style="width: 150px;" type="primary" plain @click="addMoreProduct">添加产品</el-button>
              <div> 产品折扣为0-1，例如：9折，则填写0.9</div>
            </el-form-item>
          </div>
          <div style="width: 150px; margin-bottom: 20px;">
            <h3 class="middle-title"> 订单人工改价 </h3>
            <el-input v-model="temp.manual_discount" placeholder="人工改价" class="filter-item" clearable @change="calculateOrderPrice()" />
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
          </div>
          <div style=" margin-bottom: 20px; ">
            <h3 class="section-title"> 订单日期 </h3>
            <el-date-picker
              v-model="temp.date"
              align="right"
              type="date"
              placeholder="选择日期"
              :picker-options="pickerOptions">
            </el-date-picker>
          </div>
          <div>
            <h3 class="section-title"> 备注 </h3>
            <el-input
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4}"
              placeholder="备注"
              v-model="temp.note"
              style="width: 70%" />
          </div>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="addSalesOrder()">
          提交新的销售订单
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import CountTo from 'vue-count-to'
import SalesAPI from '@/api/sales.js'
import ProductAPI from '@/api/product'
import ResalerAPI from '@/api/resaler'
import { roundToTwo } from '@/utils'
import moment from 'moment'
import { mapGetters } from 'vuex'

export default {
  components: {
    CountTo
  },
  data() {
    return {
      inReivewSalesCount: 0,
      listQuery: {
        page: 1,
        limit: 10,
      },
      productTypes: [],
      productSubTypes: [],
      selectedProducts: [],
      products: [],
      resalerRegions: [],
      resalerAreas: [],
      resalers: [],
      dialogFormVisible: false,
      temp: {
        id: undefined, //this should only exist when editing
        region: undefined,
        area: undefined,
        products: [{
            product_type: undefined,
            product_sub_type: undefined,
            product_id: '',
            quantity: 0,
            cost: undefined,
            price: undefined,
            discount_rate: undefined,
            note: undefined,
            key: 1,
            total_price: 0,
            note: undefined,
          }
        ],
        order_total_price: 0,
        order_total_profit: 0,
        resaler: undefined,
        note: undefined,
        date: undefined,
        manual_discount: 0
      },
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            picker.$emit('pick', new Date());
          }
        }, {
          text: '昨天',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24);
            picker.$emit('pick', date);
          }
        }, {
          text: '一周前',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', date);
          }
        }]
      },
    }
  },
  computed: {
    ...mapGetters([
      'id'
    ])
  },
  created() {
    this.getInReivewSalesCount()
    this.getProductTypes()
    this.getRegions()
    this.temp.date = new Date()
  },
  methods: {
    handleSetLineChartData(type) {
      this.$emit('handleSetLineChartData', type)
    },
    goToSalesInReviewPage() {
      this.$router.push({ path: 'sales/in-review-sales-order' })
    },
    getInReivewSalesCount() {
      SalesAPI.getAllInReviewSalesCount(this.listQuery)
        .then(response => {
          this.inReivewSalesCount = response.total
        })
    },
    handleCreate() {
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
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
        item.discount_rate = undefined
      }
    },
    getRegions() {
      ResalerAPI.getAllResalerRegions(this.listQuery)
        .then(response => {
          this.resalerRegions = response
        })
        .catch(err => {
        })
    },
    clearResalerRegion() {
      this.temp.region = undefined
      this.temp.area = undefined
      this.temp.resaler = undefined
      this.resalerRegions = []
      this.resalerAreas = []
      this.resalers = []
    },
    getAreas() {
      this.temp.area = undefined
      this.temp.resaler = undefined
      this.resalerAreas = []
      this.resalers = []
      ResalerAPI.getAllResalerAreas({ page: 1,limit: 10000, region_id: this.temp.region.id })
        .then(response => {
          this.resalerAreas = response
        })
        .catch(err => {
        })
    },
    clearResalerArea() {
      this.temp.area = undefined
      this.temp.resaler = undefined
      this.resalerAreas = []
      this.resalers = []
    },
    getResalers() {
      this.temp.resaler = undefined
      this.resalers = []
      ResalerAPI.getAllResalers({area_id: this.temp.area.id})
        .then(response => {
          this.resalers = response
        })
    },
    clearResaler() {
      this.temp.resaler = undefined
      this.resalers = []
    },
    addMoreProduct() {
      this.temp.products.push({
        product_type: undefined,
        product_sub_type: undefined,
        product_id: '',
        quantity: undefined,
        cost: undefined,
        price: undefined,
        discount_rate: undefined,
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
      if (subType === 1) { //小包冻干taobao
        id = process.env.PRODUCT_SUB_TYPE_ID.MINI_FD
      } else if (subType === 2) { //大包冻干
        id = process.env.PRODUCT_SUB_TYPE_ID.LARGE_FD
      } else if (subType === 3) { //肉干
        id = process.env.PRODUCT_SUB_TYPE_ID.TREAT
      } else if (subType === 4) { //犬用鲜粮
        id = process.env.PRODUCT_SUB_TYPE_ID.DOG_FF
      } else if (subType === 5) { //猫用鲜粮
        id = process.env.PRODUCT_SUB_TYPE_ID.CAT_FF
      } else if (subType === 6) { //小包冻干Kokowan
        id = process.env.PRODUCT_SUB_TYPE_ID.MINI_FD
      }
      ProductAPI.getAllProductsBySubType(id)
        .then(response => {
          response.sub_type[0].products.forEach(p => {
            if (subType !== 6 || (subType === 6 && p.id != 19)) { //小包冻干Kokowan
              let pd = {
                product_type: response,
                product_sub_type: response.sub_type[0],
                product_id: p.id,
                product: p,
                quantity: 1,
                cost: p.cost,
                price: p.price,
                discount_rate: p.resaler_discount,
                note: undefined,
                key: this.temp.products.length + 1,
                total_price: 0
              }
              this.calculateTotalPrice(pd)
              this.temp.products.push(pd);
            }
          })
          this.calculateOrderPrice()
        })
        .catch(err => {
          console.log(err)
          this.$message({
            message: '作弊工具出问题了，请联系徐神检查',
            type: 'error'
          })
        })
    },
    readProductInfo(item) {
      this.products.forEach(p => {
        if (p.id === item.product.id) {
          item.product_id = p.id;
          item.size = p.size;
          item.cost = p.cost;
          item.price = p.price;
          item.discount_rate = p.resaler_discount;
        }
      })
    },
    calculateTotalPrice(item) {
      item.total_price = roundToTwo((item.price) * parseFloat(item.discount_rate) * item.quantity)
      item.total_cost = roundToTwo(item.cost * item.quantity)
      item.total_profit = roundToTwo(item.total_price - item.total_cost)
      this.calculateOrderPrice()
    },
    calculateOrderPrice() {
      let total = 0
      let total_product_cost = 0
      this.temp.products.forEach(p => {
        total = total + p.total_price;
        total_product_cost = total_product_cost + p.total_cost
      })
      this.temp.order_total_price = roundToTwo(parseFloat(total) - parseFloat(this.temp.manual_discount));
      this.temp.order_total_profit = roundToTwo(parseFloat(this.temp.order_total_price) - parseFloat(total_product_cost));
    },
    addSalesOrder() {
      this.$confirm('确定添加?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.sendAddSalesRequest()
      }).catch((err) => {  
        console.log(err)      
      });
    },
    sendAddSalesRequest() {
      let that = this
      if (this.temp.products.length === 0) {
        this.$message({
          message: '至少要有一个或以上的产品入库',
          type: 'error'
        })
      } else {
        let data = {
          sales_data: {
            manual_discount: this.temp.manual_discount,
            order_total_price: this.temp.order_total_price ? this.temp.order_total_price : 0,
            order_total_profit: this.temp.order_total_profit ? this.temp.order_total_profit : 0,
            resaler_id: this.temp.resaler ? this.temp.resaler.id : null,
            area_manager_atm: this.temp.area.manager_id,
            region_manager_atm: this.temp.region.manager_id,
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
            per_product_discount_ratio: p.discount_rate,
            total_price: p.total_price,
            total_cost: p.total_cost,
            total_profit: p.total_profit,
            note: p.note,
          }
          data.product_data.push(d)
        })

        this.listLoading = true
        SalesAPI.addNewResalerSalesRequest(data)
          .then(response => {
            that.listLoading = false
            this.$alert('下单成功', '成功', {
              confirmButtonText: '确定',
              callback: action => {
                this.dialogFormVisible = false
                this.getInReivewSalesCount()
              }
            });
          })
          .catch(err => {
            that.$message({
              message: '下单失败，请联系徐神检查',
              type: 'error'
            })
            that.listLoading = false
          })
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.panel-group {
  margin-top: 18px;

  .card-panel-col {
    margin-bottom: 32px;
  }

  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);

    .card-panel-text {
      line-height: 18px;
      color: rgba(0, 0, 0, 0.45);
      font-size: 16px;
      text-align: center;
      margin-top: 20px;
      font-weight: bold;
    }

    .card-panel-num {
      text-align: center;
      font-size: 30px;
      line-height: 50px;
    }

    .card-panel-button {
      margin-top: 10px;
      text-align: center;
    }
  } 
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

@media (max-width:550px) {
  .card-panel-description {
    display: none;
  }

  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;

    .svg-icon {
      display: block;
      margin: 14px auto !important;
      float: none !important;
    }
  }
}
</style>
