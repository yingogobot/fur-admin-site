<template>
  <div class="app-container">
    <div class="filter-container">
      <h2>筛选结果</h2>
      <el-select v-model="listQuery.product_type" 
        placeholder="产品类型" clearable 
        style="width: 150px; margin-left: 15px;" 
        class="filter-item" 
        @change="getSubType(listQuery.product_type)">
        <el-option v-for="item in productTypes" :key="item.id" :label="item.title" :value="item.id" />
      </el-select>
      <el-select v-model="listQuery.product_sub_type" placeholder="产品分类" clearable style="width: 150px; margin-left: 15px;" class="filter-item" @change="getSelectedProducts(listQuery.product_sub_type)">
        <el-option v-for="item in productSubTypes" :key="item.id" :label="item.title" :value="item.id" />
      </el-select>
      <el-select v-model="listQuery.product_id" placeholder="产品" clearable style="width: 150px; margin-left: 15px;" class="filter-item">
        <el-option v-for="item in selectedProducts" :key="item.id" :label="item.title" :value="item.id" />
      </el-select>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter" style="width: 100px; margin-left: 15px;">
        搜索
      </el-button>
      <!-- <el-button class="filter-item" style="width: 200px; margin-left: 10px;" type="success" icon="el-icon-edit" @click="handleCreate">
        添加新入库
      </el-button> -->
    </div>

    <h2>B仓-分销仓 库存详情</h2>
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
      <el-table-column label="产品ID" prop="id" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.product_id }}</span>
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
      <el-table-column label="产品名称" width="200px" align="center">
        <template slot-scope="{row}">
          <span class="link-type" @click="handleUpdate(row)">{{ row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="产品型号" width="200px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.size }}</span>
        </template>
      </el-table-column>
      <el-table-column label="剩余数量" min-width="300px" align="center">
        <template slot-scope="{row}">
          <span class="quantity" :class="{'low-quantity': row.quantity <= 300}">{{ row.quantity }}</span>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getAllStorage" />
  </div>
</template>

<script>
import InventoryAPI from '@/api/inventory'
import ProductAPI from '@/api/product'

import waves from '@/directive/waves' // waves directive
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
      inventories: null,
      productTypes: [],
      productSubTypes: [],
      selectedProducts: [],
      total: 0,
      listLoading: true,
      rowSpans: null,
      listQuery: {
        page: 1,
        limit: 99999,
        product_type: undefined,
        product_sub_type: undefined,
        product_id: undefined,
        storage_id: 2
      },
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
      vm.getAllStorage()
      vm.getProductTypes()
      next();
    }) 
  },
  methods: {
    getAllStorage() {
      this.listLoading = true
      //storage_id 2 分销仓
      InventoryAPI.getStorage(this.listQuery)
        .then(response => {
          console.log(response)
          this.inventories = response
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
    getProductTypes() {
      ProductAPI.getAllProductType()
        .then(response => {
          this.productTypes = response
        })
    },
    getSubType(productType, item) {
      this.listQuery.product = undefined
      this.listQuery.product_sub_type = undefined
      this.productSubTypes = []
      this.selectedProducts = []
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
        item.quantity = undefined
      }
    },
    getSelectedProducts(subType) {
      this.listQuery.product = undefined
      this.selectedProducts = []
      if (subType) {
        ProductAPI.getProductBySubType({product_sub_type: subType})
          .then(response => {
            this.selectedProducts = response
          })
      }
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getAllStorage()
    },
    calculateRowSpan() {
      let g = []
      let count = 0
      this.inventories.forEach(i => {
        let found = false
        g.forEach(t => {
          if (t.id === i.product_sub_type_id) {
            found = true
            t.end++
            t.rowSpan++
            count = t.start + t.rowSpan
          }
        })

        if (!found) {
          let newT = {
            id: i.product_sub_type_id,
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
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 1 || columnIndex === 2) {
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
  .quantity {
    color: #2ecc71;
    font-size: 18px;
  }
  .low-quantity {
    color: #e74c3c !important;
  }
</style>
