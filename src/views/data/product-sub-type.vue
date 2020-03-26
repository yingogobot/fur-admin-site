<template>
  <div class="app-container">
    <div>
    <h2 class="title">产品细类</h2>
      <el-button class="create-button" style="width: 200px; margin-left: 10px;" type="success" icon="el-icon-edit" @click="handleCreate">
        添加新产品细类
      </el-button>
    </div>
    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="productSubTypes"
      :span-method="objectSpanMethod"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column label="产品系列ID" prop="id" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="父类名称" prop="title" align="center">
        <template slot-scope="{row}">
          <el-tag class="tag" :color="row.product_type_tag_color">{{ row.product_type_title }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="细类名称" prop="title" align="center">
        <template slot-scope="{row}">
          <el-tag class="tag" :color="row.tag_color">{{ row.title }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="300px" align="center">
        <el-button type="primary" plain @click="editSalesChannel()">编辑</el-button>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getAllProductSubType" />

    <el-dialog title="添加新产品细类" :visible.sync="dialogFormVisible" width="80%">
      <el-form ref="dataForm"
        :model="temp" 
        label-position="left" 
        label-width="10px" 
        style="margin-left:20px;">
        <div>
          <h3 style="width: 100px; vertical-align: top; margin-top: 0;"> 产品细类信息 </h3>
          <div style="display: inline-block;">
            <div style=" margin-bottom: 5px;">
              <div class="input-title">产品父类</div>
            </div>
            <el-select v-model="temp.type" placeholder="产品类型" 
              clearable style="width: 150px;" class="filter-item">
              <el-option v-for="item in productTypes" :key="item.id" :label="item.title" :value="item.id" />
            </el-select>
          </div>
          <div style="display: inline-block;">
            <div style=" margin-bottom: 5px;">
              <div class="input-title">产品细类名称</div>
            </div>
            <el-form-item label="" prop="salesChannel" style="margin-bottom: 10px;">
              <el-input placeholder="产品细类名称" v-model="temp.title" style="width: 200px;" class="filter-item" />
            </el-form-item>
          </div>
          <div style="display: inline-block;">
            <div style=" margin-bottom: 5px;">
              <div class="input-title">产品细类背景颜色</div>
            </div>
            <el-form-item label="" prop="salesChannel" style="margin-bottom: 10px;">
              <!-- <el-input placeholder="颜色HEX代码" v-model="temp.tag_color" style="width: 200px;" class="filter-item" /> -->
              <verte value="#f0f" v-model="temp.tag_color" model="hex"></verte>

            </el-form-item>
          </div>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="addNewSalesChannel()">
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
import verte from 'verte';

export default {
  name: 'ComplexTable',
  components: { Pagination },
  filters: {},
  data() {
    return {
      tableKey: 0,
      productTypes: null,
      productSubTypes: null,
      total: 0,
      listLoading: true,
      dialogFormVisible: false,
      rowSpans: null,
      listQuery: {
        page: 1,
        limit: 10
      },
      temp: {
        type: null,
        title: null,
        tag_color: null,
      }
    }
  },
  computed: {
    ...mapGetters([
      'id'
    ])
  },
  beforeRouteEnter (to, from, next) {
    next(vm => { 
      vm.getAllProductTypes()
      vm.getAllProductSubType()
      vm.getCount()
      next();
    }) 
  },
  methods: {
    calculateRowSpan() {
      let g = []
      let count = 0
      this.productSubTypes.forEach(i => {
        let found = false
        
        g.forEach(t => {
          if (t.id === i.type) {
            found = true
            t.end++
            t.rowSpan++
            count = t.start + t.rowSpan
          }
        })

        if (!found) {
          let newT = {
            id: i.type,
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
    getAllProductTypes() {
      this.listLoading = true
      ProductAPI.getAllProductType()
        .then(response => {
          this.productTypes = response
        })
        .catch(err => {
          this.$message({
            message: '读取库存失败，请联系徐神检查',
            type: 'error'
          })
          this.listLoading = false
        })
    },
    getAllProductSubType() {
      this.listLoading = true
      ProductAPI.getAllProductSubType(this.listQuery)
        .then(response => {
          this.productSubTypes = response
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
      ProductAPI.getAllProductSubTypeCount()
        .then(response => {
          this.total = response.total
        })
    },
    handleCreate() {
      this.dialogFormVisible = true
    },
    addNewSalesChannel() {
      console.log(this.temp)
      this.$confirm('确定添加?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.sendNewProductTypeRequest()
      }).catch((err) => {   
        console.log(err)     
      });
    },
    sendNewProductTypeRequest() {
      if (!this.temp.title) {
        this.$message({
          message: '必须填写所有信息',
          type: 'error'
        })
    } else {
      this.listLoading = true
      ProductAPI.addProductSubType(this.temp)
        .then(response => {
          this.listLoading = false
            this.$alert('添加成功', '成功', {
              confirmButtonText: '确定',
              callback: action => {
                this.page = 1
                this.getAllProductSubType()
                this.getCount()
                this.dialogFormVisible = false;
                this.temp = {
                  title:null,
                  tag_color: null
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
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex == 1 ) {
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
    width: 150px;
  }

  .sub_type_tag {
    color: white;
    font-size: 14px;
    width: 120px;
  }
  .input-title {
    display: inline-block;
    width: 200px;
    line-height: 25px;
    font-size: 14px;
    margin-left: 10px;
  }
</style>
