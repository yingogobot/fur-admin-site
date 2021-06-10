<template>
  <div>
    <el-row :gutter="40" class="panel-group">
      <el-col :xs="12" :sm="12" :lg="4" class="card-panel-col">
        <div class="card-panel" @click="handleSetLineChartData('newVisitis')">
          <div class="card-panel-text"> 当前月份 </div>
          <div class="card-panel-num">{{moment().format('YYYY-MM')}}</div>
        </div>
      </el-col>

      <!-- <el-col :xs="12" :sm="12" :lg="4" class="card-panel-col">
        <div class="card-panel" @click="handleSetLineChartData('shoppings')">
          <div class="card-panel-text"> 本月库存盘点状态 </div>
          <div class="card-panel-small">
           （功能尚未开放）
          </div>
        </div>
      </el-col> -->
      <el-col :xs="12" :sm="12" :lg="8" class="card-panel-col">
        <div class="card-panel" @click="handleSetLineChartData('purchases')">
          <div class="card-panel-text"> 新建订单 </div>
          <div class="card-panel-button">
            <el-button v-if="canCreateSalesOrder()" type="primary" plain @click="handleCreateSalesOrder">新建分销订单</el-button>
            <el-button v-if="canCreateMarketingOrder()" type="warning" plain @click="handleCreateMarketingOrder">新建市场推广订单</el-button>
          </div>
        </div>
      </el-col>

      <el-col :xs="12" :sm="12" :lg="4" class="card-panel-col">
        <div v-if="canCreateSalesOrder()" class="card-panel" @click="goToSalesInReviewPage()">
          <div class="card-panel-text"> 未审核<span style="color:red">销售订单</span> </div>
          <div class="card-panel-num">
            <count-to :start-val="0" :end-val="this.inReivewSalesCount" :duration="1200" class="card-panel-num" />
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="4" class="card-panel-col">
        <div v-if="canCreateSalesOrder()" class="card-panel" @click="goToMarketingOrderInReviewPage()">
          <div class="card-panel-text"> 未审核<span style="color:blue">推广订单</span> </div>
          <div class="card-panel-num">
            <count-to :start-val="0" :end-val="this.inReivewMarketingOrderCount" :duration="1200" class="card-panel-num" />
          </div>
        </div>
      </el-col>
    </el-row>
    <el-dialog title="添加新销售" :visible.sync="dialogFormVisible" width="80%">
      <el-form ref="dataForm"
        :model="temp" 
        label-position="left" 
        label-width="10px" 
        v-loading="listLoading"
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
            <el-button class="cheat-button" type="info" @click="addAllProductBySubType(1)">
              添加小冻干套装
            </el-button>
            <el-button class="cheat-button" type="info" @click="addAllProductBySubType(2)">
              添加大冻干套装
            </el-button>
            <el-button class="cheat-button" type="info" @click="addAllProductBySubType(3)">
              添加肉干套装
            </el-button>
            <el-button class="cheat-button" type="info" @click="addAllProductBySubType(4)">
              添加狗鲜粮套装
            </el-button>
            <el-button class="cheat-button" type="info" @click="addAllProductBySubType(5)">
              添加猫鲜粮套装
            </el-button>
            <el-button class="cheat-button" type="info" @click="addAllProductBySubType(6)">
              添加猫条套装
            </el-button>
            <el-button class="cheat-button" type="info" @click="addAllProductBySubType(7)">
              添加主粮罐套装
            </el-button>
            <el-button class="cheat-button" type="info" @click="addAllProductBySubType(8)">
              添加dundun酱套装
            </el-button>
          </div>
          <div style="display: inline-block;">
            <div style=" margin-bottom: 5px;">
              <div class="input-title input-title-extra-long">产品类型</div>
              <div class="input-title input-title-extra-long">产品分类</div>
              <div class="input-title input-title-extra-long">产品名称</div>
              <div class="input-title input-title-short">零售价</div>
              <div class="input-title input-title-short">剩余库存</div>
              <div class="input-title input-title-short">销售数量</div>
              <div class="input-title input-title-short">赠送数量</div>
              <div class="input-title input-title">产品折扣</div>
              <div class="input-title input-title-extra-long">总价</div>
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
              <el-input v-if="p.in_storage_quantity && p.in_storage_quantity.length > 0" v-model="p.in_storage_quantity[1]" placeholder="库存数量" class="filter-item inventory-in-input-short" :disabled="true"/>
              <el-input v-model="p.quantity" placeholder="销售数量" class="filter-item inventory-in-input-short" @change="calculateTotalPrice(p, 2)" />
              <el-input v-model="p.promotion_quantity" placeholder="赠送数量" class="filter-item inventory-in-input-short" @change="calculateTotalPrice(p, 2)" />
              <el-input v-model="p.discount_rate" placeholder="折扣率" class="filter-item inventory-in-input" clearable @change="calculateTotalPrice(p, 2)"  />
              <el-input v-model="p.total_price" placeholder="总价" class="filter-item inventory-in-input-extra" clearable :disabled="true"/>
              <el-button style="margin-left: 10px;" type="danger" icon="el-icon-delete" @click="removeProduct(index)" />
            </el-form-item>

            <el-form-item>
              <el-button style="width: 150px;" type="primary" plain @click="addMoreProduct">添加产品</el-button>
              <div> 产品折扣为0-1，例如：9折，则填写0.9</div>
            </el-form-item>
          </div>
          <div style=" margin-bottom: 20px; ">
            <h3 class="section-title"> 汇总信息 </h3>
            <div style="display: inline-block; width: 150px;">
              <h3 class="middle-title"> 订单销售总价 </h3>
              <el-input v-model="temp.order_total_price" placeholder="订单总价" class="filter-item" clearable :disabled="true" />
            </div>
            <div style="display: inline-block; width: 150px;">
              <h3 class="middle-title"> 订单实收总价 </h3>
              <el-input v-model="temp.order_total_revenue" placeholder="订单总价" class="filter-item" clearable :disabled="true" />
            </div>
            <div style="margin-left: 10px; display: inline-block; width: 150px;">
              <h3 class="middle-title"> 订单总利润 </h3>
              <el-input v-model="temp.order_total_profit" placeholder="订单总利润" class="filter-item" clearable :disabled="true" />
            </div>
          </div>
          <div style="margin-bottom: 20px;">
            <div style="display: inline-block;">
              <h3 class="section-title"> 支付公司 </h3>
              <el-select v-model="temp.payment_company" value-key="id" class="filter-item" 
                  placeholder="支付公司" clearable style="width: 400px;">
                  <el-option v-for="item in paymentCompany" :key="item.id" :label="item.title" :value="item" />
                </el-select>
            </div>
            <div v-if="temp.payment_company" style="display: inline-block; margin-left: 20px">
              <h3 class="section-title"> 支付方式 </h3>
              <el-select v-model="temp.payment_channel" value-key="id" class="filter-item" 
                  placeholder="支付方式" clearable style="width: 300px;">
                  <el-option v-for="item in temp.payment_company.paymentChannel" :key="item.id" :label="item.title" :value="item" />
                </el-select>
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
        <el-button @click="dismissAddOrderDialog()">
          取消
        </el-button>
        <el-button type="primary" :loading="listLoading" @click="addSalesOrder()">
          提交新的销售订单
        </el-button>
      </div>
    </el-dialog>
    <el-dialog title="添加新市场订单" :visible.sync="marketingOrderDialogFormVisible" width="80%">
      <el-form ref="dataForm"
        :model="marketingOrderTemp" 
        label-position="left" 
        label-width="10px" 
        v-loading="listLoading"
        style="margin-left:20px;">
        <div>
          <div style="display: inline-block; margin-bottom: 20px;">
            <h3 style="display: inline-block;"> 申请部门 </h3>
            <el-select v-model="marketingOrderTemp.department" value-key="id" class="filter-item" 
                placeholder="申请部门" clearable style="width: 150px; margin-left:20px;">
                <el-option v-for="item in this.departments" :key="item.id" :label="item.name" :value="item" />
              </el-select>
          </div>
          <div style="display: inline-block; margin-left: 20px;">
            <h3 style="display: inline-block;"> 申请人 </h3>
            <el-input placeholder="申请人" v-model="this.name" :disabled="true" class="filter-item inventory-in-input-extra" />
          </div>
        </div>
        <div style="display: inline-block; margin-bottom: 40px;">
          <el-radio v-model="uploadType" label="1">单个上传</el-radio>
          <el-radio v-model="uploadType" label="2">批量上传</el-radio>
        </div>
        <div v-if="uploadType=== '2'">
          <div style="display: block;  margin-left: 20px; margin-bottom: 40px;">
            <h3 style="display: inline-block;"> 批量上传Excel </h3>
            <input type="file" @change="onReadExcelFileChange" ref="fileInput"/>
            <el-button @click="clearExcelFileInput()">
              清除文件
            </el-button>
          </div>
          <div>
             <el-table :data="bulkInputData" border :span-method="objectSpanMethod" height="250" style="width: 100%">
              <el-table-column prop="name" label="客户姓名" width="180" />
              <el-table-column prop="address" label="客户地址" width="180"/>
              <el-table-column prop="contact" label="联系方式" />
              <el-table-column prop="product_name" label="产品名称" width="180" />
              <el-table-column prop="quantity" label="产品数量" width="180"/>
              <el-table-column prop="note" label="备注" />
            </el-table>
          </div>
        </div>
        <div v-if="uploadType=== '1'">
          <div style="display: inline-block; margin-bottom: 40px;">
            <div style="display: inline-block;">
              <h3 style="display: inline-block;"> 客户姓名 </h3>
              <el-input placeholder="客户姓名" v-model="marketingOrderTemp.client_name" class="filter-item inventory-in-input-extra" />
            </div>
            <div style="display: inline-block; margin-left: 15px;">
              <h3 style="display: inline-block;"> 寄送地址 </h3>
              <el-input placeholder="寄送地址" v-model="marketingOrderTemp.shipping_address" class="filter-item inventory-in-input-line" />
            </div>
            <div style="display: inline-block; margin-left: 15px;">
              <h3 style="display: inline-block;"> 联系电话 </h3>
              <el-input placeholder="联系电话" v-model="marketingOrderTemp.contact" class="filter-item inventory-in-input-extra" />
            </div>
          </div>
          <div>
            <h3 style="display: inline-block; width: 100px; vertical-align: top; margin-top: 0;"> 添加产品 </h3>
            <div style="margin-bottom: 20px"> 
              作弊工具：
              <el-button type="info" @click="addSaleTestingProducts(1)">
                添加销售样品套装
              </el-button>
              <el-button type="info" @click="addSaleTestingProducts(2)">
                添加主粮罐套装
              </el-button>
            </div>
            <div style="display: inline-block;">
              <div style=" margin-bottom: 5px;">
                <div class="input-title input-title-extra-long">产品类型</div>
                <div class="input-title input-title-extra-long">产品分类</div>
                <div class="input-title input-title-extra-long">产品名称</div>
                <div class="input-title input-title-short">剩余库存</div>
                <div class="input-title input-title-short">数量</div>
                <div class="input-title input-title-extra-long">备注</div>
              </div>
              <el-form-item v-for="(p, index) in marketingOrderTemp.products" 
                label="" :key="p.id" prop="product" style="margin-bottom: 10px;">
                <el-select v-model="p.product_type" value-key="id" placeholder="产品类型" 
                  clearable style="width: 150px;" class="filter-item" 
                  @change="getSubType(p)"
                  @clear="getSubType(p)">
                  <el-option v-for="item in productTypes" :key="item.id" :label="item.title" :value="item" />
                </el-select>
                <el-select v-if="marketingOrderTemp.products[index].product_type" v-model="p.product_sub_type" value-key="id" class="filter-item inventory-in-input-extra" 
                  placeholder="产品分类" clearable 
                  @change="getProductBySubType(p.product_sub_type, p)" 
                  @clear="getProductBySubType(p.product_sub_type, p)">
                  <el-option  v-for="item in marketingOrderTemp.products[index].product_type.sub_type" :key="item.id" :label="item.title" :value="item" />
                </el-select>
                <el-select v-if="marketingOrderTemp.products[index].product_sub_type" v-model="p.product" value-key="id" class="filter-item inventory-in-input-extra" 
                  placeholder="产品名称" clearable 
                  @change="readProductInfo(p)"
                  @clear="readProductInfo(p)">
                  <el-option v-for="item in marketingOrderTemp.products[index].product_sub_type.products" :key="item.id" :label="item.title" :value="item" />
                </el-select>
                <el-input v-if="p.in_storage_quantity && p.in_storage_quantity.length > 0" v-model="p.in_storage_quantity[0]" placeholder="库存数量" class="filter-item inventory-in-input-short" :disabled="true"/>
                <el-input v-model="p.quantity" placeholder="销售数量" class="filter-item inventory-in-input-short" @change="calculateTotalPrice(p, 1)" />
                <el-input v-model="p.note" placeholder="备注" class="filter-item inventory-in-input-extra" clearable/>
                <el-button style="margin-left: 10px;" type="danger" icon="el-icon-delete" @click="removeMarketingOrderProduct(index)" />
              </el-form-item>
              <el-form-item>
                <el-button style="width: 150px;" type="primary" plain @click="addMoreMarketingOrderProduct">添加产品</el-button>
              </el-form-item>
            </div>
            <div style=" margin-bottom: 20px; ">
              <h3 class="section-title"> 订单日期 </h3>
              <el-date-picker
                v-model="marketingOrderTemp.date"
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
                v-model="marketingOrderTemp.note"
                style="width: 70%" />
            </div>
          </div>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dismissAddOrderDialog()">
          取消
        </el-button>
        <el-button type="primary" :loading="listLoading" @click="addMarketingOrder()">
          提交新的市场订单
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import readXlsxFile from 'read-excel-file'
import CountTo from 'vue-count-to'
import SalesAPI from '@/api/sales.js'
import ProductAPI from '@/api/product'
import ResalerAPI from '@/api/resaler'
import OrderAPI from '@/api/order'

import { roundToTwo, roundToOne } from '@/utils'
import moment from 'moment'
import { mapGetters } from 'vuex'

export default {
  components: {
    CountTo
  },
  data() {
    return {
      inReivewSalesCount: 0,
      inReivewMarketingOrderCount: 0,
      listQuery: {
        page: 1,
        limit: 10,
      },
      listLoading: false,
      bulkInputData: [],
      rowSpans: null,
      uploadType: "1",
      productTypes: [],
      productSubTypes: [],
      selectedProducts: [],
      products: [],
      resalerRegions: [],
      resalerAreas: [],
      resalers: [],
      dialogFormVisible: false,
      marketingOrderDialogFormVisible: false,
      temp: {
        id: undefined, //this should only exist when editing
        region: undefined,
        area: undefined,
        products: [
        ],
        order_total_price: 0,
        order_total_profit: 0,
        order_total_revenue: 0,
        resaler: undefined,
        note: undefined,
        date: undefined,
        manual_discount: 0
      },
      paymentCompany: [
        {
          id: 1,
          title: '上海毗邻星（需要发票，仅限对公转账）',
          paymentChannel: [
            {
              id: 1,
              title: '对公转账'
            }
          ],
        },
        {
          id: 2,
          title: '上海毛星球（不要发票，可对公转账或支付宝）',
          paymentChannel: [
            {
              id: 1,
              title: '对公转账'
            },
            {
              id: 2,
              title: '支付宝'
            }
          ],
        }
      ],
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
      marketingOrderTemp: {
        id: undefined, //this should only exist when editing
        department: undefined,
        client_name: undefined,
        shipping_address: undefined,
        contact: undefined,
        products: [
        ],
        note: undefined,
        date: undefined,
      },
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
  computed: {
    ...mapGetters([
      'id',
      'role',
      'name'
    ])
  },
  created() {
    this.getInReivewSalesCount()
    this.getInReivewMarketingOrderCount()
    this.getProductTypes()
    this.getRegions()
    this.temp.date = new Date()
    this.marketingOrderTemp.date = new Date()
  },
  methods: {
    canCreateSalesOrder() {
      if (this.role === 1 || this.role === 2 || this.role === 4 || this.role === 5 || this.role === 6 || this.role === 7) {
        return true
      } else {
        return false
      }
    },
    canCreateMarketingOrder() {
      if (this.role === 1 || this.role === 2 || this.role === 4 || 
          this.role === 5 || this.role === 6 || this.role === 7 || 
          this.role === 8 || this.role === 9 || this.role === 10) {
        return true
      } else {
        return false
      }
    },
    handleSetLineChartData(type) {
      this.$emit('handleSetLineChartData', type)
    },
    goToSalesInReviewPage() {
      this.$router.push({ path: 'sales/in-review-sales-order' })
    },
    goToMarketingOrderInReviewPage() {
      this.$router.push({ path: 'sales/in-review-marketing-order' })
    },
    getInReivewSalesCount() {
      SalesAPI.getAllInReviewSalesCount(this.listQuery)
        .then(response => {
          this.inReivewSalesCount = response.total
        })
    },
    getInReivewMarketingOrderCount() {
      OrderAPI.getMarketingOrderInReviewCount()
        .then(response => {
          this.inReivewMarketingOrderCount = response.total
        })
    },
    handleCreateSalesOrder() {
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    handleCreateMarketingOrder() {
      this.marketingOrderDialogFormVisible = true
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
        item.promotion_quantity = 0
        item.in_storage_quantity = undefined
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
        item.promotion_quantity = 0
        item.in_storage_quantity = undefined
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
    checkIfQuantityIsEnough(item, storageId) {
      console.log(item)
      console.log(storageId)
       if (parseFloat(item.quantity) + parseFloat(item.promotion_quantity) > parseFloat(item.in_storage_quantity[storageId-1])) {
        let total_out = parseFloat(item.quantity) + parseFloat(item.promotion_quantity)
        let str = item.product.title + ' 库存仅为 >' + parseFloat(item.in_storage_quantity[storageId-1]) +'<, 当前选择出库数量总数为 ' + total_out +'，请检查出库数量'
        this.$alert(str, '失败', {
          confirmButtonText: '确定',
          callback: action => {
          }
        });
        item.quantity = 0
        item.promotion_quantity = 0
        return false
      } else {
        return true
      }
    },
    addMoreProduct() {
      this.temp.products.push({
        product_type: undefined,
        product_sub_type: undefined,
        product_id: '',
        quantity: 0,
        promotion_quantity: 0,
        cost: undefined,
        price: undefined,
        discount_rate: undefined,
        note: undefined,
        key: this.temp.products.length + 1,
        total_price: 0
      });
    },
    addMoreMarketingOrderProduct() {
      this.marketingOrderTemp.products.push({
        product_type: undefined,
        product_sub_type: undefined,
        product_id: '',
        quantity: 0,
        cost: undefined,
        note: undefined,
        key: this.marketingOrderTemp.products.length + 1
      });
    },
    removeProduct(itemIndex) {
      this.$delete(this.temp.products, itemIndex)
      this.calculateOrderPrice()
    },
    removeMarketingOrderProduct(itemIndex) {
      this.$delete(this.marketingOrderTemp.products, itemIndex)
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
      } else if (subType === 6) { //猫条
        id = process.env.PRODUCT_SUB_TYPE_ID.CAT_SIP
      } else if (subType === 7) { //主粮罐
        id = process.env.PRODUCT_SUB_TYPE_ID.CAT_FOOD_CAN
      } else if (subType === 8) { //DunDun酱
        id = process.env.PRODUCT_SUB_TYPE_ID.DUN_DUN_CREAM
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
              promotion_quantity: 0,
              cost: p.cost,
              price: p.price,
              discount_rate: p.resaler_discount,
              note: undefined,
              key: this.temp.products.length + 1,
              total_price: 0,
              in_storage_quantity: p.in_storage_quantity
            }
            this.calculateTotalPrice(pd, 2)
            this.temp.products.push(pd)
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
    addSaleTestingProducts(type) {
      this.listLoading = true
      ProductAPI.getTestingProductsByType(type)
        .then(response => {
          response.forEach(pType => {
            pType.sub_type.forEach(subType => {
              subType.products.forEach(p => {
                let pd = {
                  product_type: pType,
                  product_sub_type: subType,
                  product_id: p.id,
                  product: p,
                  quantity: 1,
                  promotion_quantity: 0,
                  cost: p.cost,
                  price: p.price,
                  discount_rate: p.resaler_discount,
                  note: undefined,
                  key: this.marketingOrderTemp.products.length + 1,
                  total_price: 0,
                  in_storage_quantity: p.in_storage_quantity
                }
                this.calculateTotalPrice(pd, 1)
                this.marketingOrderTemp.products.push(pd);
              })
            })
          })
          this.listLoading = false
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
          item.in_storage_quantity = p.in_storage_quantity;
        }
      })
    },
    calculateTotalPrice(item, storageId) {
      if (this.checkIfQuantityIsEnough(item, storageId)) {
        item.total_price = roundToOne(roundToOne((item.price) * parseFloat(item.discount_rate)) * item.quantity)
        console.log(roundToTwo((item.price) * parseFloat(item.discount_rate)))
        item.total_cost = roundToTwo(item.cost * (parseFloat(item.quantity) + parseFloat(item.promotion_quantity)))
        item.total_profit = roundToTwo(item.total_price - item.total_cost)
        this.calculateOrderPrice()
      }
    },
    calculateOrderPrice() {
      let total = 0
      let total_product_cost = 0
      this.temp.products.forEach(p => {
        total = total + p.total_price;
        total_product_cost = total_product_cost + p.total_cost
      })
      this.temp.order_total_price = roundToTwo(parseFloat(total));
      this.temp.order_total_revenue = roundToTwo(parseFloat(total) - parseFloat(this.temp.manual_discount));
      this.temp.order_total_profit = roundToTwo(parseFloat(this.temp.order_total_price) - parseFloat(total_product_cost));
    },
    dismissAddOrderDialog() {
      this.dialogFormVisible = false
      this.marketingOrderDialogFormVisible = false
      this.$refs.fileInput.value = null
      this.setDataBackToDefault()
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
      if (!this.temp.resaler) {
        this.$message({
          message: '请选择具体销售渠道',
          type: 'error'
        })
      } else if (this.temp.products.length === 0) {
        this.$message({
          message: '至少要有一个或以上的产品入库',
          type: 'error'
        })
      } else if (!this.temp.payment_channel) {
        this.$message({
          message: '支付渠道必须选择',
          type: 'error'
        })
      } else if (!this.temp.payment_company) {
        this.$message({
          message: '支付公司必须选择',
          type: 'error'
        })
      } else {
        let failCheck = false
        this.temp.products.forEach(p => {
          if (parseFloat(p.quantity) + parseFloat(p.promotion_quantity) === 0) {
            failCheck = true
          }
        })

        if (failCheck) {
          this.$message({
            message: '有一款或多款产品出库总数为0，请仔细检查',
            type: 'error'
          })
        } else {
          let data = {
            inventory_type: 12,
            order_data: {
              manual_discount: this.temp.manual_discount,
              order_total_price: this.temp.order_total_price ? this.temp.order_total_price : 0,
              order_total_profit: this.temp.order_total_profit ? this.temp.order_total_profit : 0,
              order_total_revenue: this.temp.order_total_revenue ? this.temp.order_total_revenue : 0,
              resaler_id: this.temp.resaler ? this.temp.resaler.id : null,
              area_manager_atm: this.temp.area.manager_id,
              region_manager_atm: this.temp.region.manager_id,
              added_by: this.id,
              date: moment(this.temp.date).format('YYYY-MM-DD'),
              note: this.temp.note,
              payment_channel_id: this.temp.payment_channel.id,
              payment_company_id: this.temp.payment_company.id
            },
            product_data: [],
            storage: 2
          }
          this.temp.products.forEach(p => {
            let d = {
              product_id: p.product_id,
              quantity: p.quantity,
              promotion_quantity: p.promotion_quantity,
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
              this.listLoading = false
              this.$alert('下单成功', '成功', {
                confirmButtonText: '确定',
                callback: action => {
                  this.dialogFormVisible = false
                  this.getInReivewSalesCount()
                  this.setDataBackToDefault()
                }
              });
            })
            .catch(err => {
              that.$message({
                message: '下单失败，请联系徐神检查',
                type: 'error'
              })
              this.listLoading = false
            })
          }
      }
    },
    sendAddMarketingOrderRequest() {
      let that = this
      if (!this.marketingOrderTemp.client_name) {
        this.$message({
          message: '请填写具体客户姓名',
          type: 'error'
        })
      } else if (!this.marketingOrderTemp.shipping_address) {
        this.$message({
          message: '请填写具体的收货地址',
          type: 'error'
        })
      } else if (!this.marketingOrderTemp.contact) {
        this.$message({
          message: '请填写具体的联系方式',
          type: 'error'
        })
      } else if (!this.marketingOrderTemp.department) {
        this.$message({
          message: '请填写具体申请部门',
          type: 'error'
        })
      } else {
        let failCheck = false
        this.marketingOrderTemp.products.forEach(p => {
          if (parseFloat(p.quantity) + parseFloat(p.promotion_quantity) === 0) {
            failCheck = true
            this.$message({
              message: '有一款或多款产品出库总数为0，请仔细检查',
              type: 'error'
            })
          }
        })

        if (!failCheck) {
          let data = {
            inventory_type: 14,
            order_data: {
              department: this.marketingOrderTemp.department.name,
              client_name: this.marketingOrderTemp.client_name,
              shipping_address: this.marketingOrderTemp.shipping_address,
              contact: this.marketingOrderTemp.contact,
              added_by: this.id,
              date: moment(this.marketingOrderTemp.date).format('YYYY-MM-DD'),
              note: this.marketingOrderTemp.note
            },
            product_data: [],
            storage: 1
          }
          this.marketingOrderTemp.products.forEach(p => {
            let d = {
              product_id: p.product_id,
              quantity: p.quantity,
              per_item_cost_atm: p.cost,
              note: p.note,
            }
            data.product_data.push(d)
          })

          this.listLoading = true
          OrderAPI.addMarketingOrder(data)
            .then(response => {
              this.listLoading = false
              this.$alert('下单成功', '成功', {
                confirmButtonText: '确定',
                callback: action => {
                  this.marketingOrderDialogFormVisible = false
                  this.getInReivewMarketingOrderCount()
                  this.setDataBackToDefault()
                }
              });
            })
            .catch(err => {
              that.$message({
                message: '下单失败，请联系徐神检查',
                type: 'error'
              })
              this.listLoading = false
            })
          }
      }
    },
    addMarketingOrder() {
      this.$confirm('确定添加这个订单?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (this.uploadType === "1") {
          this.sendAddMarketingOrderRequest()
        } else {
          this.sendBulkInputDataRequest()
        }
      }).catch((err) => {  
        console.log(err)
      });
    },
    setDataBackToDefault() {
      this.temp = {
        id: undefined, //this should only exist when editing
        region: undefined,
        area: undefined,
        products: [
        ],
        order_total_price: 0,
        order_total_profit: 0,
        order_total_revenue : 0,
        resaler: undefined,
        note: undefined,
        manual_discount: 0,
        date: new Date()
      }
      this.marketingOrderTemp = {
        id: undefined, //this should only exist when editing
        department: undefined,
        client_name: undefined,
        shipping_address: undefined,
        contact: undefined,
        products: [
        ],
        note: undefined,
        date: new Date()
      }
      this.bulkInputData = []
    },
    onReadExcelFileChange(event) {
      console.log(event)
      let xlsxfile = event.target.files ? event.target.files[0] : null;
      this.bulkInputData = []
      let allEntries = []
      readXlsxFile(xlsxfile).then((rows) => {
        allEntries = []
        for (let index = 1; index < rows.length; index++) {
          const row = rows[index];
          let data = {
            id: row[0],
            name: row[1],
            address: row[2],
            contact: row[3],
            product_name: row[6].substring(0, row[6].indexOf('__')),
            product_id: row[6].substring(row[6].indexOf('__')+2),
            quantity: row[7],
            note: row[8],
          }
          allEntries.push(data)
        }
        if (allEntries.length === 0) {
          this.$alert('读取文件失败或文件为空', '失败', {
            confirmButtonText: '确定'
          });
        } else {
          this.bulkInputData = allEntries
          this.calculateRowSpan()
          this.$alert('文件读取成功，数据已经导入。请检查后提交', '成功', {
            confirmButtonText: '确定'
          });
          
        }
      })
    },
    clearExcelFileInput() {
      this.$refs.fileInput.value = null
      this.bulkInputData = []
    },
    sendBulkInputDataRequest() {
      if (!this.marketingOrderTemp.department) {
        this.$message({
          message: '请填写具体申请部门',
          type: 'error'
        })
      } else {
        let failCheck = false
        this.bulkInputData.forEach(p => {
          if (parseFloat(p.quantity) === 0) {
            failCheck = true
          }
        })

        if (failCheck) {
          this.$message({
            message: '有一条或多条产品数量为0，请仔细检查',
            type: 'error'
          })
        } else {
          let bulkData = []
          this.bulkInputData.forEach(d => {
            let found = false
            let newData = null
            bulkData.forEach(bd => {
              if (d.contact === bd.order_data.contact) {
                found = true
                newData = bd
              }
            })
            let pd = {
              product_id: d.product_id,
              quantity: d.quantity,
              note: d.note
            }
            if (!found) {
              newData = {
                inventory_type: 14,
                order_data: {
                  department: this.marketingOrderTemp.department.name,
                  client_name: d.name,
                  shipping_address: d.address,
                  contact: d.contact,
                  added_by: this.id,
                  date: moment(this.marketingOrderTemp.date).format('YYYY-MM-DD'),
                },
                product_data: [pd],
                storage: 1
              }
              bulkData.push(newData)
            } else {
              newData.product_data.push(pd)
            }
          })
          this.listLoading = true
          console.log(bulkData)
          OrderAPI.addBulkMarketingOrder(bulkData)
            .then(response => {
              this.listLoading = false
              this.$alert('下单成功', '成功', {
                confirmButtonText: '确定',
                callback: action => {
                  this.marketingOrderDialogFormVisible = false
                  this.$refs.fileInput.value = null
                  this.getInReivewMarketingOrderCount()
                  this.setDataBackToDefault()
                }
              });
            })
            .catch(err => {
              that.$message({
                message: '下单失败，请联系徐神检查',
                type: 'error'
              })
              this.listLoading = false
            })
        }
      }
    },
    calculateRowSpan() {
      let g = []
      let count = 0
      this.bulkInputData.forEach(i => {
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
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex < 3) {
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

    .card-panel-small {
      text-align: center;
      font-size: 20px;
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
  width: 70px;
}
.input-title-extra-long {
  width: 150px;
}
.inventory-in-input {
  width: 120px; 
  margin-left: 10px;
}
.inventory-in-input-short {
  width: 70px; 
  margin-left: 10px;
}
.inventory-in-input-extra {
  width: 150px; 
  margin-left: 10px;
}
.inventory-in-input-line {
  width: 250px; 
  margin-left: 10px;
}
.cheat-button {
  margin-bottom: 10px;
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
