<template>
  <div class="app-container">
    <div>
    <h2 class="title">直销渠道</h2>
      <el-button class="create-button" style="width: 200px; margin-left: 10px;" type="success" icon="el-icon-edit" @click="handleCreate">
        添加新直销渠道
      </el-button>
    </div>
    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="salesChannels"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column label="渠道ID" prop="id" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="渠道名称" prop="title" width="300px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="备注" prop="note" align="center">
        <template slot-scope="{row}">
          <span>{{ row.note }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="300px" align="center">
        <el-button type="primary" plain @click="editSalesChannel()">编辑</el-button>
        <el-button type="danger" plain @click="deleteSalesChannel()">删除</el-button>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getSalesChannels" />

    <el-dialog title="添加新直销渠道" :visible.sync="dialogFormVisible" width="80%">
      <el-form ref="dataForm"
        :model="temp" 
        label-position="left" 
        label-width="10px" 
        style="margin-left:20px;">
        <div>
          <h3 style="display: inline-block; width: 100px; vertical-align: top; margin-top: 0;"> 渠道信息 </h3>
          <div style="display: inline-block;">
            <div style=" margin-bottom: 5px;">
              <div class="input-title">渠道名称</div>
            </div>
            <el-form-item label="" prop="salesChannel" style="margin-bottom: 10px;">
              <el-input placeholder="渠道名称" v-model="temp.title" style="width: 200px;" class="filter-item" />
            </el-form-item>
          </div>
          <div>
          <h3 style="display: inline-block; width: 100px; vertical-align: top; margin-top: 0;"> 备注 </h3>
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
        <el-button type="primary" @click="addNewSalesChannel()">
          提交
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import SalesChannelAPI from '@/api/sales-channel'

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
      salesChannels: null,
      total: 0,
      listLoading: true,
      dialogFormVisible: false,
      rowSpans: null,
      listQuery: {
        page: 1,
        limit: 10
      },
      temp: {
        title: null,
        note: null,
      }
    }
  },
  created() {
    this.getSalesChannels()
    this.getCount()
  },
  computed: {
    ...mapGetters([
      'id'
    ])
  },
  methods: {
    getSalesChannels() {
      this.listLoading = true
      SalesChannelAPI.getAllSalesChannels(this.listQuery)
        .then(response => {
          this.salesChannels = response
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
      SalesChannelAPI.getSalesChannelsCount()
        .then(response => {
          this.total = response.total
        })
    },
    handleCreate() {
      this.dialogFormVisible = true
    },
    addNewSalesChannel() {
      this.$confirm('确定添加?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.sendNewSalesChannelRequest()
      }).catch((err) => {   
        console.log(err)     
      });
    },
    sendNewSalesChannelRequest() {
      if (!this.temp.title) {
        this.$message({
          message: '必须填写所有信息',
          type: 'error'
        })
    } else {
      this.listLoading = true
      SalesChannelAPI.addSalesChannel(this.temp)
        .then(response => {
          this.listLoading = false
            this.$alert('库存添加成功', '成功', {
              confirmButtonText: '确定',
              callback: action => {
                this.page = 1
                this.getSalesChannels()
                this.getCount()
                this.dialogFormVisible = false;
                this.temp = {
                  title:null,
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
    editSalesChannel() {

    },
    deleteSalesChannel() {

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
    width: 200px;
    line-height: 25px;
    font-size: 14px;
    margin-left: 10px;
  }
</style>
