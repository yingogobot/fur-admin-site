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
      <el-select v-model="listQuery.fully_paid" placeholder="付款状态" clearable style="width: 150px; margin-left: 15px;" class="filter-item" @clear="clearFullyPaid()" >
        <el-option v-for="item in paymentTypes" :key="item.id" :label="item.title" :value="item.id" />
      </el-select>
      <el-select v-model="listQuery.special_type" placeholder="特殊状态" clearable style="width: 150px; margin-left: 15px;" class="filter-item" @clear="clearSpecialType()">
        <el-option v-for="item in specialTypes" :key="item.id" :label="item.title" :value="item.id" />
      </el-select>
      <el-input v-model="listQuery.note" placeholder="备注" style="width: 150px; margin-left: 15px;" class="filter-item" @keyup.enter.native="handleFilter" />
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
      <el-table-column label="销售类型" prop="sales_type" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.sales_type }}</span>
        </template>
      </el-table-column>
      <el-table-column label="销售时间" prop="sales_type" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{moment(row.date).format('YYYY-MM-DD')}}</span>
        </template>
      </el-table-column>
      <el-table-column label="销售渠道" prop="sales_type" width="100px" align="center">
        <template slot-scope="{row}">
          <div v-if="row.sales_type_id === 1">
            <span>直销</span>
          </div>
          <div v-if="row.sales_type_id === 2">
            <span>活动销售</span>
          </div>
          <div v-if="row.sales_type_id === 3">
            <span>分销取货</span>
          </div>
          <div v-if="row.sales_type_id === 5">
            <span>其他销售</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="客户信息" prop="sales_type" width="180px" align="center">
        <template slot-scope="{row}">
          <div v-if="row.sales_type_id === 1">
            <span>{{ row.member_name + ' | ' + row.member_cellphone }}</span>
          </div>
          <div v-if="row.sales_type_id === 2">
            <span>{{ row.event_title }}</span>
          </div>
          <div v-if="row.sales_type_id === 3">
            <span>{{ row.resaler_name }}</span>
          </div>
          <div v-if="row.sales_type_id === 4">
            <span>其他销售</span>
          </div>
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
      <el-table-column label="单品折扣率" width="100px" align="center">
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
      <el-table-column label="订单折扣率" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.discount * 100 }}%</span>
        </template>
      </el-table-column>
      <el-table-column label="订单总价" width="100px" align="center">
        <template slot-scope="{row}">
          <span>￥{{ row.order_total_price }}</span>
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
       <el-table-column label="备注" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.note }}</span>
        </template>
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
            <el-select v-model="temp.sales_channel" value-key="id" placeholder="选择入库类型" >
              <el-option v-for="item in salesChannel" :key="item.id" :label="item.title" :value="item" />
            </el-select>
          </el-form-item>
          <h3 style="padding-left: 30px; display: inline-block; width: 100px;"> 购买客户 </h3>
          <el-form-item prop="type" style="display: inline-block;">
            <el-select v-model="temp.member" value-key="cellphone" filterable remote placeholder="请输入手机号码"
              :remote-method="searchMember" :loading="isSearchingMember">
              <el-option v-for="item in members" :key="item.id" :label="item.searchValue" :value="item" />
            </el-select>
          </el-form-item>
          <span style="display: inline-block; margin-left: 20px;" v-if="this.formType === 2 && temp.member"> {{ temp.member.name + ' | ' + temp.member.cellphone }}</span>
        </div>
        <div v-if="temp.sales_type === 2">
          <h3 style="display: inline-block; width: 100px;"> 活动名称 </h3>
          <el-form-item prop="type" style="display: inline-block;">
            <el-select v-model="temp.event" value-key="id" placeholder="选择入库类型">
              <el-option v-for="item in events" :key="item.id" :label="item.title" :value="item" />
            </el-select>
          </el-form-item>
        </div>
        <div v-if="temp.sales_type === 3">
          <h3 style="display: inline-block; width: 100px;"> 分销渠道 </h3>
          <el-form-item prop="type" style="display: inline-block;">
            <el-select v-model="temp.resaler" value-key="id" placeholder="选择入库类型">
              <el-option v-for="item in resalers" :key="item.id" :label="item.name" :value="item" />
            </el-select>
          </el-form-item>
        </div>
        <div v-if="this.formType === 2 && temp.selectedProducts.length > 0" style="margin-top:30px; margin-bottom: 30px;">
          <h3 style="display: inline-block; width: 100px; vertical-align: top; margin-top: 0;"> 已添加产品 </h3>
          <div style="display: inline-block; margin-bottom: 5px;">
            <div>
              <div class="input-title input-title-extra-long">产品类型</div>
              <div class="input-title input-title-extra-long">产品分类</div>
              <div class="input-title input-title-extra-long">产品名称</div>
              <div class="input-title input-title-short">零售价</div>
              <div class="input-title input-title-short">数量</div>
              <div class="input-title input-title-short">产品优惠</div>
              <div class="input-title input-title-short">产品折扣</div>
              <div class="input-title input-title-extra-long">总价</div>
              <div class="input-title input-title-extra-long">备注</div>
            </div>
            <div v-for="(p, index) in temp.selectedProducts" :key="p.id" prop="product" style="margin-top:20px; margin-bottom: 5px;">
              <div class="input-title input-title-extra-long">{{p.product_type.title}}</div>
              <div class="input-title input-title-extra-long">{{p.product_sub_type.title}}</div>
              <div class="input-title input-title-extra-long">{{p.title}}</div>
              <div class="input-title input-title-short">{{p.price}}</div>
              <div class="input-title input-title-short">{{p.quantity}}</div>
              <div class="input-title input-title-short">{{p.discount}}</div>
              <div class="input-title input-title-short">{{p.discount_rate}}</div>
              <div class="input-title input-title-extra-long">{{p.total_price}}</div>
              <div class="input-title input-title-extra-long">{{p.product_note}}</div>
              <el-button type="danger" @click="deleteSelectedProduct(index)">
                删除
              </el-button>
              <hr />
            </div>
          </div>
        </div>
        <div>
          <h3 v-if="this.formType === 1" style="display: inline-block; width: 100px; vertical-align: top; margin-top: 0;"> 销售产品 </h3>
          <h3  v-if="this.formType === 2" style="display: inline-block; width: 100px; vertical-align: top; margin-top: 0;"> 添加销售产品 </h3>

          <div style="margin-bottom: 20px"> 
            作弊工具：
            <el-button type="info" @click="addAllProductBySubType(1)">
              添加淘宝小冻干套装
            </el-button>
            <el-button type="info" @click="addAllProductBySubType(6)">
              添加koko小冻干套装
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
          </div>
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
              <el-input v-model="p.discount" placeholder="产品优惠" class="filter-item inventory-in-input-short" clearable @change="calculateTotalPrice(p)"  />
              <el-input v-model="p.discount_rate" placeholder="折扣率" class="filter-item inventory-in-input-short" clearable @change="calculateTotalPrice(p)"  />
              <el-input v-model="p.total_price" placeholder="总价" class="filter-item inventory-in-input-extra" clearable :disabled="true"/>
              <el-input v-model="p.note" placeholder="备注" class="filter-item inventory-in-input-extra" clearable/>
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
              <h3 class="middle-title"> 人工改价 </h3>
              <el-input v-model="temp.manual_discount" placeholder="人工改价" class="filter-item" clearable @change="calculateOrderPrice()" />
            </div>
          </div>
          <div style=" margin-bottom: 20px; ">
            <h3 class="section-title"> 其他成本 </h3>
            <div style="display: inline-block; width: 150px;">
              <h3 class="middle-title"> 运费 </h3>
              <el-input v-model="temp.shipping_cost" placeholder="运费" class="filter-item" clearable @change="calculateOrderPrice()" />
            </div>
            <div style="margin-left: 10px; display: inline-block; width: 150px;">
              <h3 class="middle-title"> 额外成本 </h3>
              <el-input v-model="temp.other_cost" placeholder="额外成本" class="filter-item" clearable @change="calculateOrderPrice()" />
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
            <h3 class="section-title"> 出库备注 </h3>
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
        <el-button v-if="this.formType === 1" type="primary" @click="addSalesOrder()">
          提交新的销售订单
        </el-button>
        <el-button v-if="this.formType === 2" type="primary" @click="updateSalesOrder()">
          修改当前销售订单
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
import MemberAPI from '@/api/member'

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
      editingProduct: null,
      salesTypes:[],
      productTypes: [],
      productSubTypes: [],
      selectedProducts: [],
      products: [],
      resalers: [],
      salesChannel: [],
      events: [],
      paymentTypes: [
        {id: 0, title: '否'},
        {id: 1, title: '是'}
      ],
      specialTypes: [
        {id: 0, title: '否'},
        {id: 1, title: '是'}
      ],
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
        event_id: undefined,
        fully_paid: undefined,
        special_type: undefined,
        note: undefined,
      },
      temp: {
        id: undefined, //this should only exist when editing
        sales_type: undefined,
        products: [{
            product_type: undefined,
            product_sub_type: undefined,
            product_id: '',
            quantity: 0,
            cost: undefined,
            price: undefined,
            discount: 0,
            discount_rate: 1,
            note: undefined,
            key: 1,
            total_price: 0,
            note: undefined,
          }
        ],
        selectedProducts:[],
        deletedProducts:[],
        order_total_price: 0,
        order_total_profit: 0,
        coupon: 0,
        discount: 1,
        manual_discount: 0,
        shipping_cost: 5,
        other_cost: 0,
        member: undefined,
        sales_channel: undefined,
        resaler: undefined,
        event: undefined,
        note: undefined,
        fully_paid: true,
        special_type: false,
        date: undefined
      },
      memberCellphone: '',
      isSearchingMember: false,
      members:[],
      dialogFormVisible: false,
      formType: 0,
      rowSpans: null,
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
  created() {
    this.temp.date = new Date()
  },
  computed: {
    ...mapGetters([
      'id'
    ])
  },
  beforeRouteEnter (to, from, next) {
    next(vm => { 
      vm.getAllSales()
      vm.getSalesCount()
      vm.getProductTypes()
      vm.getSalesTypes()
      vm.getResalers()
      vm.getSalesChannels()
      vm.getEvents()
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
      SalesAPI.getAllSales(this.listQuery)
        .then(response => {
          this.sales = response.data
          this.listLoading = false
          console.log(this.sales)
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
    getSalesTypes() {
      SalesAPI.getAllSalesType()
        .then(response => {
          this.salesTypes = response
        })
    },
    getSalesCount() {
      SalesAPI.getAllSalesCount(this.listQuery)
        .then(response => {
          this.total = response.total
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
      this.products = subType.products
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
      if (columnIndex < 5 || (columnIndex >= 14 && columnIndex <= 23)) {
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
      console.log(item)
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
