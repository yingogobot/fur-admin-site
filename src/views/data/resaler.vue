<template>
  <div class="app-container">
    <div>
    <h2 class="title">分销渠道</h2>
      <el-button class="create-button" style="width: 200px; margin-left: 10px;" type="success" icon="el-icon-edit" @click="handleCreate">
        添加新分销渠道
      </el-button>
    </div>
    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="resalers"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column label="分销渠道ID" prop="id" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="渠道名称" prop="inventory_type" width="250px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="渠道内部评级" prop="inventory_type" width="200px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.level }}</span>
        </template>
      </el-table-column>
      <el-table-column label="负责人名字" prop="inventory_type" width="200px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.manager }}</span>
        </template>
      </el-table-column>
      <el-table-column label="地址" prop="inventory_type" width="200px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.address }}</span>
        </template>
      </el-table-column>
      <el-table-column label="备注" prop="inventory_type" align="center">
        <template slot-scope="{row}">
          <span>{{ row.note }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="300px" align="center">
        <template slot-scope="{row}">
          <el-button type="primary" plain @click="editResaler(row)">编辑</el-button>
          <el-button type="danger" plain @click="deleteResaler(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getResalers" />

    <el-dialog title="添加新分销渠道" :visible.sync="dialogFormVisible" width="80%">
      <el-form ref="dataForm"
        :model="temp" 
        label-position="left" 
        label-width="10px" 
        style="margin-left:20px;">
        <div>
          <h3 style="display: inline-block; width: 100px; vertical-align: top; margin-top: 0;"> 分销渠道信息 </h3>
          <div style="display: inline-block;">
            <div style=" margin-bottom: 5px;">
              <div class="input-title">渠道名称</div>
              <div class="input-title">负责人名字</div>
              <div class="input-title">地址</div>
            </div>
            <el-form-item label="" prop="resaler" style="margin-bottom: 10px;">
              <el-input placeholder="渠道名称" v-model="temp.name" style="width: 200px;" class="filter-item" />
              <el-input placeholder="负责人名字" v-model="temp.manager" style="width: 200px;" class="filter-item" />
              <el-input placeholder="负责人名字" v-model="temp.address" style="width: 200px;" class="filter-item" />
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
        <el-button type="primary" @click="addNewResaler()">
          提交
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import ResalerAPI from '@/api/resaler'

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
      resalers: null,
      total: 0,
      listLoading: true,
      dialogFormVisible: false,
      rowSpans: null,
      listQuery: {
        page: 1,
        limit: 10
      },
      temp: {
        name: null,
        manager: null,
        note: null,
        address: null,
      }
    }
  },
  created() {
    this.getResalers()
    this.getCount()
  },
  computed: {
    ...mapGetters([
      'id'
    ])
  },
  methods: {
    getResalers() {
      this.listLoading = true
      ResalerAPI.getAllResalers(this.listQuery)
        .then(response => {
          this.resalers = response
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
      ResalerAPI.getResalersCount()
        .then(response => {
          this.total = response.total
        })
    },
    handleCreate() {
      this.dialogFormVisible = true
    },
    addNewResaler() {
      this.$confirm('确定添加?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.sendNewResalerRequest()
      }).catch((err) => {   
        console.log(err)     
      });
    },
    sendNewResalerRequest() {
      if (!this.temp.name || !this.temp.manager) {
        this.$message({
          message: '必须填写所有信息',
          type: 'error'
        })
    } else {
      this.listLoading = true
      ResalerAPI.addResaler(this.temp)
        .then(response => {
          this.listLoading = false
            this.$alert('库存添加成功', '成功', {
              confirmButtonText: '确定',
              callback: action => {
                this.page = 1
                this.getResalers()
                this.getCount()
                this.dialogFormVisible = false;
                this.temp = {
                  name:null,
                  manager: null,
                  note: null,
                  address: null
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
    editResaler() {

    },
    deleteResaler(item) {
      this.$confirm('确定删除>>' + item.name + '<<吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.sendDeleteResalerRequest(item.id)
      }).catch((err) => {   
        console.log(err)     
      });
    },
    sendDeleteResalerRequest(id) {
      this.listLoading = true
      ResalerAPI.deleteResaler(id)
        .then(response => {
          this.listLoading = false
            this.$alert('删除成功', '成功', {
              confirmButtonText: '确定',
              callback: action => {
                this.page = 1
                this.getResalers()
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
    width: 200px;
    line-height: 25px;
    font-size: 14px;
    margin-left: 10px;
  }
</style>
