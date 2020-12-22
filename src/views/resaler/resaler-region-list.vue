<template>
  <div class="app-container">
    <div>
    <h2 class="title">分销大区</h2>
      <el-button  v-if="role === 7 || role === 1" 
        class="create-button" 
        style="width: 200px; margin-left: 10px;" 
        type="success" icon="el-icon-edit" @click="handleCreate">
        添加新分销大区
      </el-button>
    </div>
    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="resalerRegions"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column label="分销大区ID" prop="id" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="大区名称" prop="inventory_type" align="center">
        <template slot-scope="{row}">
          <span>{{ row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="大区经理" prop="inventory_type" align="center">
        <template slot-scope="{row}">
          <span>{{ row.manager_name }}</span>
        </template>
      </el-table-column>
      <el-table-column  v-if="role === 7 || role === 1" label="操作" width="300px" align="center">
        <template slot-scope="{row}">
          <el-button type="primary" plain @click="handleAddManager(row)">修改大区经理</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getRegions" />

    <el-dialog title="添加新分销渠道" :visible.sync="addRegionDialogFormVisible" width="80%">
      <el-form ref="dataForm"
        :model="temp" 
        label-position="left" 
        label-width="10px" 
        style="margin-left:20px;">
        <div>
          <h3 style="display: inline-block; width: 100px; vertical-align: top; margin-top: 0;"> 分销大区信息 </h3>
          <div style="display: inline-block;">
            <div style=" margin-bottom: 5px;">
              <div class="input-title">渠道大区</div>
            </div>
            <el-form-item label="" prop="resaler" style="margin-bottom: 10px;">
              <el-input placeholder="大区名称" v-model="temp.title" style="width: 200px;" class="filter-item" />
            </el-form-item>
          </div>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addRegionDialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="addNewResalerRegion()">
          提交
        </el-button>
      </div>
    </el-dialog>
    <el-dialog title="指定大区经理" :visible.sync="addManagerDialogFormVisible" width="80%">
      <el-form ref="dataForm"
        :model="tempM" 
        label-position="left" 
        label-width="10px" 
        style="margin-left:20px;">
        <div>
          <h3 style="display: inline-block; width: 100px; vertical-align: top; margin-top: 0;"> 分销大区信息 </h3>
          <div style="display: inline-block;">
            <div style=" margin-bottom: 5px;">
              <div class="input-title">经理</div>
            </div>
            <el-form-item label="" prop="resaler" style="margin-bottom: 10px;">
              <el-select v-model="tempM.manager_id" value-key="id" placeholder="经理" 
                clearable style="width: 150px;" class="filter-item" >
                <el-option v-for="item in salesAccounts" :key="item.id" :label="item.name" :value="item.id" />
              </el-select>
            </el-form-item>
          </div>
        </div>
        <div>
          <el-button type="danger" @click="removeCurrentRegionManager()">
            移除当前大区经理
          </el-button>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addManagerDialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="addNewResalerRegionManager()">
          提交
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import ResalerAPI from '@/api/resaler'
import UserAPI from '@/api/user'

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
      resalerRegions: null,
      salesAccounts: null,
      total: 0,
      listLoading: true,
      addRegionDialogFormVisible: false,
      addManagerDialogFormVisible: false,
      rowSpans: null,
      listQuery: {
        page: 1,
        limit: 10
      },
      temp: {
        title: null
      },
      tempM: {
        region_id: null,
        manager_id: null
      }
    }
  },
  created() {
  },
  computed: {
    ...mapGetters([
      'id',
      'role'
    ])
  },
  beforeRouteEnter (to, from, next) {
    next(vm => { 
      vm.getRegions()
      vm.getCount()
      vm.getSalesAccount()
      next();
    }) 
  },
  methods: {
    getRegions() {
      this.listLoading = true
      ResalerAPI.getAllResalerRegions(this.listQuery)
        .then(response => {
          this.resalerRegions = response
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
      ResalerAPI.getResalerRegionsCount()
        .then(response => {
          this.total = response.total
        })
    },
    getSalesAccount() {
      UserAPI.getAccounts({role: [5]})
        .then(response => {
          this.salesAccounts = response
          console.log(response)
        })
    },
    handleCreate() {
      this.addRegionDialogFormVisible = true
    },
    addNewResalerRegion() {
      this.$confirm('确定添加?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.sendNewResalerRegionRequest()
      }).catch((err) => {   
        console.log(err)     
      });
    },
    sendNewResalerRegionRequest() {
      if (!this.temp.title) {
        this.$message({
          message: '必须填写所有信息',
          type: 'error'
        })
    } else {
      this.listLoading = true
      ResalerAPI.addResalerRegion(this.temp)
        .then(response => {
          this.listLoading = false
            this.$alert('库存添加成功', '成功', {
              confirmButtonText: '确定',
              callback: action => {
                this.page = 1
                this.getRegions()
                this.getCount()
                this.addRegionDialogFormVisible = false;
                this.temp = {
                  title:null
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
    handleAddManager(item) {
      this.tempM.region_id = item.id
      if (item.manager_id) {
        this.tempM.manager_id = item.manager_id
      }
      this.addManagerDialogFormVisible = true
    },
    addNewResalerRegionManager() {
      this.$confirm('确定添加?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.sendNewResalerRegionManagerRequest()
      }).catch((err) => {   
        console.log(err)     
      });
    },
    sendNewResalerRegionManagerRequest() {
      console.log(this.tempM)
      if (!this.tempM.region_id || !this.tempM.manager_id) {
        this.$message({
          message: '必须填写所有信息',
          type: 'error'
        })
    } else {
      this.listLoading = true
      ResalerAPI.addResalerRegionManager(this.tempM)
        .then(response => {
          this.listLoading = false
            this.$alert('添加成功', '成功', {
              confirmButtonText: '确定',
              callback: action => {
                this.page = 1
                this.getRegions()
                this.getCount()
                this.addManagerDialogFormVisible = false;
                this.tempM = {
                  region_id: null,
                  manager_id: null
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
    removeCurrentRegionManager() {
      this.$confirm('确定要移除当前大区经理?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.sendRemoveRegionManagerRequest()
      }).catch((err) => {   
        console.log(err)     
      });
    },
    sendRemoveRegionManagerRequest() {
      this.listLoading = true
      ResalerAPI.removeResalerRegionManager(this.tempM)
        .then(response => {
          this.listLoading = false
          this.$alert('成功移除当前大区经理', '成功', {
            confirmButtonText: '确定',
            callback: action => {
              this.page = 1
              this.getRegions()
              this.getCount()
              this.addManagerDialogFormVisible = false;
              this.tempM = {
                region_id: null,
                manager_id: null
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
    },
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
