<template>
  <div class="app-container">
    <div class="filter-container">
      <h2>筛选结果</h2>
      <el-input v-model="listQuery.inventory_id" placeholder="出库批次" style="width: 150px;" class="filter-item"/>
      <el-select v-model="listQuery.inventory_type" placeholder="出库类型" clearable style="width: 150px; margin-left: 15px;" class="filter-item">
        <el-option v-for="item in inventoryTypes" :key="item.id" :label="item.title" :value="item.id" />
      </el-select>
      <el-select v-model="listQuery.product_type" placeholder="产品类型" clearable style="width: 150px; margin-left: 15px;" class="filter-item" @change="getSubType(listQuery.product_type)">
        <el-option v-for="item in productTypes" :key="item.id" :label="item.title" :value="item.id" />
      </el-select>
      <el-select v-model="listQuery.product_sub_type" placeholder="产品分类" clearable style="width: 150px; margin-left: 15px;" class="filter-item" @change="getSelectedProducts(listQuery.product_sub_type)">
        <el-option v-for="item in productSubTypes" :key="item.id" :label="item.title" :value="item.id" />
      </el-select>
      <el-select v-model="listQuery.product" placeholder="产品" clearable style="width: 150px; margin-left: 15px;" class="filter-item">
        <el-option v-for="item in selectedProducts" :key="item.id" :label="item.title" :value="item.id" />
      </el-select>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter" style="width: 100px; margin-left: 15px;">
        搜索
      </el-button>
      <el-button class="filter-item" style="width: 200px; margin-left: 10px;" type="success" icon="el-icon-edit" @click="handleCreate">
        添加新出库
      </el-button>
    </div>

    <h2>出库详情</h2>
    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="inventories"
      :span-method="objectSpanMethod"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column label="出库批次ID" prop="id" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.inventory_id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="出库类型" prop="inventory_type" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.inventory_type }}</span>
        </template>
      </el-table-column>
      <el-table-column label="出库时间" prop="inventory_type" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{moment(row.date).format('YYYY-MM-DD')}}</span>
        </template>
      </el-table-column>
      <el-table-column label="产品类型" width="150px" align="center">
        <template slot-scope="{row}">
          <el-tag class="tag" :color="row.tag_color">{{ row.product_type }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="产品细类" width="150px" align="center">
        <template slot-scope="{row}">
          <el-tag class="sub_type_tag" :color="row.sub_type_tag_color">{{ row.product_sub_type }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="产品名称" min-width="200px" align="center">
        <template slot-scope="{row}">
          <span class="link-type" @click="handleUpdate(row)">{{ row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="产品型号" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.size }}</span>
        </template>
      </el-table-column>
      <el-table-column label="出库数量" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.quantity }}</span>
        </template>
      </el-table-column>
      <el-table-column label="产品成本" width="150px" align="center">
        <template slot-scope="{row}">
          <span>￥{{ row.per_item_cost_atm }}</span>
        </template>
      </el-table-column>
      <el-table-column label="申请人" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.ordered_by }}</span>
        </template>
      </el-table-column>
      <el-table-column label="备注" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.note }}</span>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getInventoryOut" />

    <el-dialog title="添加新出库" :visible.sync="dialogFormVisible" width="80%">
      <el-form ref="dataForm"
        :model="temp" 
        label-position="left" 
        label-width="10px" 
        style="margin-left:20px;">
        <div>
          <h3 style="display: inline-block; width: 100px;"> 出库类型 </h3>
          <el-form-item prop="type" style="display: inline-block;">
            <el-select v-model="temp.inventory_type" placeholder="选择出库类型">
              <el-option v-for="item in inventoryTypes" :key="item.id" :label="item.title" :value="item.id" />
            </el-select>
          </el-form-item>
        </div>
        <div>
          <h3 style="width: 100px; vertical-align: top; margin-top: 0;"> 出库产品 </h3>
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
          </div>
          <div style="display: inline-block;">
            <div style=" margin-bottom: 5px;">
              <div class="input-title">产品类型</div>
              <div class="input-title">产品分类</div>
              <div class="input-title">产品名称</div>
              <div class="input-title">产品规格</div>
              <div class="input-title">出库数量</div>
              <div class="input-title">产品成本</div>
              <div class="input-title">当前库存</div>
            </div>
            <el-form-item v-for="(p, index) in temp.products" 
              label="" :key="p.id" prop="product" style="margin-bottom: 10px;">
              <el-select v-model="p.product_type" value-key="id" placeholder="产品类型" 
                clearable style="width: 150px;" class="filter-item">
                <el-option v-for="item in productTypes" :key="item.id" :label="item.title" :value="item" />
              </el-select>
              <el-select v-if="temp.products[index].product_type" v-model="p.product_sub_type" value-key="id" style="width: 150px; margin-left: 10px;" class="filter-item" 
                placeholder="产品分类" clearable 
                @change="getProductBySubType(p.product_sub_type, p)" 
                @clear="getProductBySubType(p.product_sub_type, p)">
                <el-option  v-for="item in temp.products[index].product_type.sub_type" :key="item.id" :label="item.title" :value="item" />
              </el-select>
              <el-select v-if="temp.products[index].product_sub_type" v-model="p.product" value-key="id" style="width: 150px; margin-left: 10px;" class="filter-item" 
                placeholder="产品名称" clearable 
                @change="readProductInfo(p)"
                @clear="readProductInfo(p)">
                <el-option v-for="item in temp.products[index].product_sub_type.products" :key="item.id" :label="item.title" :value="item" />
              </el-select>
              <el-input placeholder="产品型号" v-model="p.size" :disabled="true" style="width: 150px; margin-left: 10px;" class="filter-item" />
              <el-input v-model="p.quantity" placeholder="填出库数量" class="filter-item" clearable style="width: 150px; margin-left: 10px;" />
              <el-input v-model="p.cost" placeholder="填写产品成本" class="filter-item" clearable style="width: 150px; margin-left: 10px;" />
              <el-input v-model="p.storage" class="filter-item" :disabled="true" style="width: 150px; margin-left: 10px;" />
              <el-button style="margin-left: 40px;" type="danger" icon="el-icon-delete" @click="removeProduct(index)" />
            </el-form-item>

            <el-form-item>
              <el-button style="width: 150px;" type="primary" plain @click="addMoreProduct">添加产品</el-button>
            </el-form-item>
          </div>
          <div style="margin-bottom: 10px;">
            <h3 style="display: inline-block; width: 100px; vertical-align: top; margin-top: 0;"> 申请人 </h3>
            <el-input v-model="temp.ordered_by" placeholder="填写申请人姓名" class="filter-item" clearable style="width: 200px;" />
          </div>
          <div style=" margin-bottom: 20px; ">
            <h3 style="display: inline-block; width: 100px; vertical-align: top; margin-top: 0;" class="section-title"> 出库日期 </h3>
            <el-date-picker
              v-model="temp.date"
              align="right"
              type="date"
              placeholder="选择日期"
              :picker-options="pickerOptions">
            </el-date-picker>
          </div>
          <div>
            <h3 style="display: inline-block; width: 100px; vertical-align: top; margin-top: 0;"> 出库备注 </h3>
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
        <el-button type="primary" @click="addNewInventory()">
          提交
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

import InventoryAPI from '@/api/inventory.js'
import ProductAPI from '@/api/product'

import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
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
      inventories: null,
      total: 0,
      listLoading: true,
      inventoryTypes:[],
      productTypes: [],
      productSubTypes: [],
      selectedProducts: [],
      products: [],
      productsStorage: [],
      listQuery: {
        inventory_id: undefined,
        inventory_type: undefined,
        page: 1,
        limit: 10,
        product_type: undefined,
        product_sub_type: undefined,
        product: undefined,
      },
      temp: {
        inventory_type: undefined,
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
        ordered_by: undefined,
        date: undefined
      },
      dialogFormVisible: false,
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
      }
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
      vm.getInventoryOut()
      vm.getInventoryOutCount()
      vm.getProductTypes()
      vm.getInventoryOutTypes()
      vm.loadProductStorage()
      next();
    }) 
  },
  methods: {
    calculateRowSpan() {
      let g = []
      let count = 0
      this.inventories.forEach(i => {
        let found = false
        g.forEach(t => {
          if (t.id === i.inventory_id) {
            found = true
            t.end++
            t.rowSpan++
            count = t.start + t.rowSpan
          }
        })

        if (!found) {
          let newT = {
            id: i.inventory_id,
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
    getInventoryOut() {
      this.listLoading = true
      this.listQuery.type_id = 2
      InventoryAPI.fetchAllInventorys(this.listQuery)
        .then(response => {
          this.inventories = response.data
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
    getInventoryOutTypes() {
      InventoryAPI.getAllInventoryTpes(2)
        .then(response => {
          this.inventoryTypes = response
        })
    },
    getInventoryOutCount() {
      this.listQuery.type_id = 2
      InventoryAPI.getAllInventoryCount(this.listQuery)
        .then(response => {
          this.total = response.total
        })
    },
    loadProductStorage() {
      InventoryAPI.getStorage()
        .then(response => {
          this.productsStorage = response
        })
    },
    getProductTypes() {
      ProductAPI.getAllProductType()
        .then(response => {
          this.productTypes = response
        })
    },
    getProductBySubType(subType, item) {
      this.products = subType.products
    },
    readProductInfo(item) {
      this.products.forEach(p => {
        if (p.id === item.product.id) {
          item.product_id = p.id
          item.size = p.size
          item.cost = p.cost
        }
      })

      this.productsStorage.forEach(p => {
        if (p.product_id === item.product.id) {
          item.storage = p.quantity
        }
      })
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0 || columnIndex === 1 || columnIndex === 2 || columnIndex === 9) {
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
      this.getInventoryOut()
      this.getInventoryOutCount()
    },
    addMoreProduct() {
      this.temp.products.push({
        product_type: '',
        product_sub_type: '',
        product_id: '',
        quantity: undefined,
        cost: undefined,
        key: this.temp.products.length + 1
      });
    },
    removeProduct(itemIndex) {
      this.$delete(this.temp.products, itemIndex)
    },
    addAllProductBySubType(subType) {
      let id = 0
      if (subType === 1) { //小包冻干
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
      }
      ProductAPI.getAllProductsBySubType(id)
        .then(response => {
            response.sub_type[0].products.forEach(p => {
              let pd = {
                product_type: response,
                product_sub_type: response.sub_type[0],
                product_id: p.id,
                product: p,
                size: p.size,
                cost: p.cost,
                quantity: 1,
                note: undefined,
                key: this.temp.products.length + 1
              }
              this.productsStorage.forEach(s => {
                if (s.product_id === p.id) {
                  pd.storage = s.quantity
                }
              })
              this.temp.products.push(pd);
            })
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
    },
    addNewInventory() {
      this.$confirm('确定添加?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.sendAddInventoryRequest()
      }).catch((err) => {   
        console.log(err)     
      });
  },
  sendAddInventoryRequest() {
    if (!this.temp.inventory_type) {
        this.$message({
          message: '出库类型必须填写',
          type: 'error'
        })
    } else if (this.temp.products.length === 0) {
      this.$message({
        message: '至少要有一个或以上的产品出库',
        type: 'error'
      })
    } else {
      let data = {
        inventory_type: this.temp.inventory_type,
        account_id: this.id,
        product_data: [],
        note: this.temp.note,
        ordered_by: this.temp.ordered_by,
        date: moment(this.temp.date).format('YYYY-MM-DD')
      }

      this.temp.products.forEach(p => {
        let d = {
          id: p.product_id,
          quantity: p.quantity,
          cost: p.cost
        }
        data.product_data.push(d)
      })

      console.log(data)
      this.listLoading = true
      InventoryAPI.addNewInventoryRequest(data)
        .then(response => {
          this.listLoading = false
          this.$alert('库存添加成功', '成功', {
            confirmButtonText: '确定',
            callback: action => {
              this.page = 1
              this.getInventoryOut()
              this.loadProductStorage()
              this.dialogFormVisible = false;
              this.temp = {
                inventory_type: undefined,
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
          console.log(err)     
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
