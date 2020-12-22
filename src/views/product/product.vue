<template>
  <div class="app-container">
    <div>
    <h2 class="title">产品列表</h2>
    <el-button  v-if="role === 7 || role === 1" class="create-button" style="width: 200px; margin-left: 10px;" type="success" icon="el-icon-edit" @click="handleCreate">
        添加新产品
      </el-button>
    </div>
    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="products"
      :span-method="objectSpanMethod"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column label="产品ID" prop="id" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
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
      <el-table-column label="名称" min-width="200px" align="center">
        <template slot-scope="{row}">
          <span class="link-type" @click="handleUpdate(row)">{{ row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="型号" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.size }}</span>
        </template>
      </el-table-column>
      <el-table-column label="成本" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.cost }}</span>
        </template>
      </el-table-column>
      <el-table-column label="零售价" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.price }}</span>
        </template>
      </el-table-column>
      <el-table-column label="经销商折扣" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.resaler_discount }}</span>
        </template>
      </el-table-column>
      <el-table-column  v-if="role === 7 || role === 1" label="操作" width="300px" align="center">
        <template slot-scope="{row}">
          <el-button type="primary" plain @click="editEvent(row)">编辑</el-button>
          <el-button type="danger" plain @click="deleteEvent(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getProducts" />

    <el-dialog title="添加新产品" :visible.sync="dialogFormVisible" width="80%">
      <el-form ref="dataForm"
        :model="temp" 
        label-position="left" 
        label-width="10px" 
        style="margin-left:20px;">
        <div>
          <h3 style="display: inline-block; width: 100px; vertical-align: top; margin-top: 0;"> 产品信息 </h3>
          <div style="display: inline-block;">
            <div style="margin-left: 10px; margin-bottom: 5px;">
              <div class="input-title">产品名称</div>
              <div class="input-title">产品类型</div>
              <div class="input-title">产品细类</div>
              <div class="input-title">规格</div>
              <div class="input-title">成本</div>
              <div class="input-title">零售价</div>
              <div class="input-title">经销商折扣（0-1）</div>
            </div>
            <el-form-item label="" prop="event" style="margin-bottom: 10px;">
              <el-input placeholder="产品名称" v-model="temp.title" style="width: 150px;" class="filter-item" />
              <el-select v-model="temp.type" class="filter-item" style="width: 150px;" placeholder="产品类型" clearable 
                @change="getSubType(temp.type, temp)"
                @clear="getSubType(temp.type, temp)">
                <el-option v-for="item in productTypes" :key="item.id" :label="item.title" :value="item.id" />
              </el-select>
              <el-select v-model="temp.sub_type" class="filter-item" style="width: 150px;" placeholder="产品细类" clearable >
                <el-option v-for="item in selectedProductSubTypes" :key="item.id" :label="item.title" :value="item.id" />
              </el-select>
              <el-input placeholder="规格" v-model="temp.size" style="width: 150px;" class="filter-item" />
              <el-input placeholder="成本" v-model="temp.cost" style="width: 150px;" class="filter-item" />
              <el-input placeholder="零售价" v-model="temp.price" style="width: 150px;" class="filter-item" />
              <el-input placeholder="经销商折扣" v-model="temp.resaler_discount" style="width: 150px;" class="filter-item" />
            </el-form-item>
          </div>
          <div>
          <h3 style="display: inline-block; width: 100px; vertical-align: top; margin-top: 0;"> 产品备注 </h3>
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
        <el-button type="primary" @click="addNewProduct()">
          提交
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import ProductAPI from '@/api/product'

import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import { mapGetters } from 'vuex'

export default {
  name: 'ComplexTable',
  components: { Pagination },
  filters: {},
  data() {
    return {
      tableKey: 0,
      products: null,
      productTypes: null,
      selectedProductSubTypes: null,
      total: 0,
      listLoading: true,
      dialogFormVisible: false,
      typeRowSpans: null,
      subTypeRowSpans: null,
      listQuery: {
        page: 1,
        limit: 10
      },
      temp: {
        title: null,
        type: null,
        sub_type: null,
        size: null,
        cost: null,
        price: null,
        note: null
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
      vm.getProducts()
      vm.getCount()
      vm.getProductTypes()
      next();
    }) 
  },
  methods: {
    calculateRowSpan() {
      let g = []
      let sg = []
      let count = 0
      let scount = 0
      this.products.forEach(i => {
        let found = false
        g.forEach(t => {
          if (t.product_type_id === i.product_type_id) {
            found = true
            t.end++
            t.rowSpan++
            count = t.start + t.rowSpan
          }
        })

        if (!found) {
          let newT = {
            product_type_id: i.product_type_id,
            start: count,
            end: count+1,
            rowSpan: 1
          }
          count++
          g.push(newT)
        }

        let sfound = false
        sg.forEach(t => {
          if (t.product_sub_type_id === i.product_sub_type_id) {
            sfound = true
            t.end++
            t.rowSpan++
            scount = t.start + t.rowSpan
          }
        })

        if (!sfound) {
          let newT = {
            product_sub_type_id: i.product_sub_type_id,
            start: scount,
            end: scount+1,
            rowSpan: 1
          }
          scount++
          sg.push(newT)
        }
      });
      this.typeRowSpans = g;
      this.subTypeRowSpans = sg;
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 1) {
        let data = {
          rowspan: 0,
          colspan: 0
        };
        this.typeRowSpans.forEach(i => {
          if (rowIndex >= i.start && rowIndex < i.end && (rowIndex - i.start) % i.rowSpan === 0) {
            data = {
              rowspan: i.rowSpan,
              colspan: 1
            };
            return;
          }
        })

        return data;
      } else if (columnIndex === 2) {
        let data = {
          rowspan: 0,
          colspan: 0
        };
        this.subTypeRowSpans.forEach(i => {
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
    getProducts() {
      this.listLoading = true
      ProductAPI.getAllProducts(this.listQuery)
        .then(response => {
          this.products = response
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
    getCount() {
      ProductAPI.getAllProductCount()
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
    getSubType(productType) {
      if (productType) {
        ProductAPI.getProductSubType({product_type_id: productType})
          .then(response => {
            this.selectedProductSubTypes = response
          })
      }
    },
    handleCreate() {
      this.dialogFormVisible = true
    },
    addNewProduct() {
      this.$confirm('确定添加?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.sendNewProductRequest()
      }).catch((err) => {   
        console.log(err)     
      });
    },
    sendNewProductRequest() {
      if (!this.temp.title) {
        this.$message({
          message: '必须填写产品名称',
          type: 'error'
        })
      } else {
        this.listLoading = true
        ProductAPI.addProduct(this.temp)
          .then(response => {
            this.listLoading = false
              this.$alert('添加成功', '成功', {
                confirmButtonText: '确定',
                callback: action => {
                  this.page = 1
                  this.getProducts()
                  this.getCount()
                  this.selectedProductSubTypes = null
                  this.dialogFormVisible = false;
                  this.temp = {
                    title: null,
                    type: null,
                    sub_type: null,
                    size: null,
                    cost: null,
                    price: null,
                    note: null
                  }
                }
              });
          })
          .catch(err => {
            console.log(err)     
            this.$message({
              message: '添加失败，请联系徐神检查',
              type: 'error'
            })
            this.listLoading = false
          })
        }
    },
    editEvent() {
      
    },
    deleteEvent(item) {
      this.$confirm('确定删除>>' + item.title + '<<吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.sendDeleteEventRequest(item.id)
      }).catch((err) => {   
        console.log(err)     
      });
    },
    sendDeleteEventRequest(id) {
      this.listLoading = true
      EventAPI.deleteEvent(id)
        .then(response => {
          this.listLoading = false
            this.$alert('删除成功', '成功', {
              confirmButtonText: '确定',
              callback: action => {
                this.page = 1
                this.getEvents()
                this.getCount()
              }
            });
        })
        .catch(err => {
          console.log(err)     
          this.$message({
            message: '删除失败，请联系徐神检查',
            type: 'error'
          })
          this.listLoading = false
        })
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
  }
</style>
