<template>
  <div class="app-container">
    <div class="filter-container">
      <!-- <h2>筛选结果</h2>
      <el-input v-model="listQuery.inventory_in_id" placeholder="入库批次" style="width: 150px;" class="filter-item"/>
      <el-select v-model="listQuery.inventory_in_type" placeholder="入库类型" clearable style="width: 150px; margin-left: 15px;" class="filter-item">
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
      </el-button> -->
      
    </div>

    <div>
    <h2 class="title">线下活动</h2>
    <el-button class="create-button" style="width: 200px; margin-left: 10px;" type="success" icon="el-icon-edit" @click="handleCreate">
        添加新活动
      </el-button>
    </div>
    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="events"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column label="活动ID" prop="id" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="活动名字" prop="inventory_type" width="250px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="起始时间" prop="inventory_type" width="200px" align="center">
        <template slot-scope="{row}">
          <span>{{moment(row.start_date).format('YYYY-MM-DD')}}</span>
        </template>
      </el-table-column>
       <el-table-column label="结束时间" prop="inventory_type" width="200px" align="center">
        <template slot-scope="{row}">
          <span>{{moment(row.end_date).format('YYYY-MM-DD')}}</span>
        </template>
      </el-table-column>
      <el-table-column label="活动备注" prop="inventory_type" align="center">
        <template slot-scope="{row}">
          <span>{{ row.note }}</span>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getEvents" />

    <!-- <el-dialog title="添加新入库" :visible.sync="dialogFormVisible" width="80%">
      <el-form ref="dataForm"
        :model="temp" 
        label-position="left" 
        label-width="10px" 
        style="margin-left:20px;">
        <div>
          <h3 style="display: inline-block; width: 100px;"> 入库类型 </h3>
          <el-form-item prop="type" style="display: inline-block;">
            <el-select v-model="temp.inventory_in_type" placeholder="选择入库类型">
              <el-option v-for="item in inventoryTypes" :key="item.id" :label="item.title" :value="item.id" />
            </el-select>
          </el-form-item>
        </div>
        <div>
          <h3 style="display: inline-block; width: 100px; vertical-align: top; margin-top: 0;"> 入库产品 </h3>
          <div style="display: inline-block;">
            <div style=" margin-bottom: 5px;">
              <div class="input-title">产品类型</div>
              <div class="input-title">产品分类</div>
              <div class="input-title">产品名称</div>
              <div class="input-title">产品规格</div>
              <div class="input-title">入库数量</div>
              <div class="input-title">产品成本</div>
            </div>
            <el-form-item v-for="(item, index) in temp.products" label="" :key="item.id" prop="product" style="margin-bottom: 10px;">
              <el-select v-model="item.product_type" placeholder="选择产品类型" 
                clearable style="width: 150px;" class="filter-item" 
                @change="getSubType(item.product_type, item)"
                @clear="getSubType(item.product_type, item)">
                <el-option v-for="item in productTypes" :key="item.id" :label="item.title" :value="item.id" />
              </el-select>
              <el-select v-model="item.product_sub_type" class="filter-item" placeholder="选择产品分类" 
                clearable style="width: 150px; margin-left: 10px;" 
                @change="getProductBySubType(item.product_sub_type, item)" 
                @clear="getProductBySubType(item.product_sub_type, item)">
                <el-option v-for="item in productSubTypes" :key="item.id" :label="item.title" :value="item.id" />
              </el-select>
              <el-select v-model="item.product_id" class="filter-item" placeholder="选择产品名称" 
                clearable style="width: 150px; margin-left: 10px;" 
                @change="readProductInfo(item)"
                @clear="readProductInfo(item)">
                <el-option v-for="item in products" :key="item.id" :label="item.title" :value="item.id" />
              </el-select>
              <el-input placeholder="产品型号" v-model="item.size" :disabled="true" style="width: 150px; margin-left: 10px;" class="filter-item" />
              <el-input v-model="item.quantity" placeholder="填写入库数量" class="filter-item" clearable style="width: 150px; margin-left: 10px;" />
              <el-input v-model="item.cost" placeholder="填写产品成本" class="filter-item" clearable style="width: 150px; margin-left: 10px;" />
              <el-button style="margin-left: 40px;" type="danger" icon="el-icon-delete" @click="removeProduct(index)" />
            </el-form-item>

            <el-form-item>
              <el-button style="width: 150px;" type="primary" plain @click="addMoreProduct">添加产品</el-button>
            </el-form-item>
          </div>
          <div>
          <h3 style="display: inline-block; width: 100px; vertical-align: top; margin-top: 0;"> 入库备注 </h3>
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
    </el-dialog> -->
  </div>
</template>

<script>
import { getAllEvents, getEventsCount } from '@/api/event'

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
      events: null,
      total: 0,
      listLoading: true,
      dialogFormVisible: false,
      rowSpans: null,
      listQuery: {
        page: 1,
        limit: 10
      },
    }
  },
  created() {
    this.getEvents()
    this.getCount()
  },
  computed: {
    ...mapGetters([
      'id'
    ])
  },
  methods: {
    getEvents() {
      this.listLoading = true
      getAllEvents(this.listQuery)
        .then(response => {
          this.events = response
          this.listLoading = false
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
      getEventsCount()
        .then(response => {
          this.total = response.total
        })
    },
    handleCreate() {

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
    margin-left: 10px;
  }
</style>
