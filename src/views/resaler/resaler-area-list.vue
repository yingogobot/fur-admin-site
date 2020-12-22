<template>
  <div class="app-container">
    <div>
    <h2 class="title">分销地区</h2>
      <el-button v-if="role === 7 || role === 1" class="create-button" style="width: 200px; margin-left: 10px;" type="success" icon="el-icon-edit" @click="handleCreate">
        添加新分销地区
      </el-button>
    </div>
    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="resalerAreas"
      :span-method="objectSpanMethod"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column label="分销地区ID" prop="id" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="地区名称" prop="inventory_type" align="center">
        <template slot-scope="{row}">
          <span>{{ row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="地区经理" prop="inventory_type" align="center">
        <template slot-scope="{row}">
          <span>{{ row.area_manager_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="所属大区" prop="inventory_type" align="center">
        <template slot-scope="{row}">
          <span>{{ row.region_title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="大区主管" prop="inventory_type" align="center">
        <template slot-scope="{row}">
          <span>{{ row.region_manager_name }}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="role === 7 || role === 1" label="操作" width="300px" align="center">
        <template slot-scope="{row}">
          <el-button type="primary" plain @click="handleAddManager(row)">修改地区经理</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getAreas" />

    <el-dialog title="添加新分销地区" :visible.sync="addAreaDialogFormVisible" width="80%">
      <el-form ref="dataForm"
        :model="temp" 
        label-position="left" 
        label-width="10px" 
        style="margin-left:20px;">
        <div>
          <h3 style="display: inline-block; width: 100px; vertical-align: top; margin-top: 0;"> 分销地区信息 </h3>
          <div style="display: inline-block;">
            <div style=" margin-bottom: 5px;">
              <div class="input-title">地区</div>
              <div class="input-title">所属大区</div>
            </div>
            <el-form-item label="" prop="resaler" style="margin-bottom: 10px;">
              <el-input placeholder="地区名称" v-model="temp.title" style="width: 200px;" class="filter-item" />
              <el-select v-model="temp.region_id" value-key="id" placeholder="大区" 
                clearable style="width: 150px;" class="filter-item" >
              <el-option v-for="item in resalerRegions" :key="item.id" :label="item.title" :value="item.id" />
            </el-select>
            </el-form-item>
          </div>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addAreaDialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="addNewResalerArea()">
          提交
        </el-button>
      </div>
    </el-dialog>
    <el-dialog title="指定地区经理" :visible.sync="addManagerDialogFormVisible" width="80%">
      <el-form ref="dataForm"
        :model="tempM" 
        label-position="left" 
        label-width="10px" 
        style="margin-left:20px;">
        <div>
          <h3 style="display: inline-block; width: 100px; vertical-align: top; margin-top: 0;"> 分销地区信息 </h3>
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
          <el-button type="danger" @click="removeCurrentAreaManager()">
            移除当前大区经理
          </el-button>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addManagerDialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="addNewResalerAreaManager()">
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
      resalerAreas: null,
      resalerRegions: null,
      salesAccounts: null,
      total: 0,
      listLoading: true,
      addAreaDialogFormVisible: false,
      addManagerDialogFormVisible: false,
      rowSpans: null,
      listQuery: {
        page: 1,
        limit: 10
      },
      temp: {
        title: null,
        region_id: null
      },
      tempM: {
        area_id: null,
        manager_id: null,
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
      vm.getAreas()
      vm.getCount()
      vm.getRegions()
      vm.getSalesAccount()
      next();
    }) 
  },
  methods: {
    calculateRowSpan() {
      let g = []
      let count = 0
      this.resalerAreas.forEach(i => {
        let found = false
        g.forEach(t => {
          if (t.region_id === i.region_id) {
            found = true
            t.end++
            t.rowSpan++
            count = t.start + t.rowSpan
          }
        })

        if (!found) {
          let newT = {
            region_id: i.region_id,
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
    getAreas() {
      this.listLoading = true
      ResalerAPI.getAllResalerAreas(this.listQuery)
        .then(response => {
          console.log(response)
          this.resalerAreas = response
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
      ResalerAPI.getResalerAreasCount()
        .then(response => {
          this.total = response.total
        })
    },
    getRegions() {
      ResalerAPI.getAllResalerRegions()
        .then(response => {
          this.resalerRegions = response
        })
        .catch(err => {
        })
    },
    getSalesAccount() {
      UserAPI.getAccounts({role: [4, 5]})
        .then(response => {
          this.salesAccounts = response
        })
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex == 3) {
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
    handleCreate() {
      this.addAreaDialogFormVisible = true
    },
    addNewResalerArea() {
      this.$confirm('确定添加?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.sendNewResalerAreaRequest()
      }).catch((err) => {   
        console.log(err)     
      });
    },
    sendNewResalerAreaRequest() {
      if (!this.temp.title || !this.temp.region_id) {
        this.$message({
          message: '必须填写所有信息',
          type: 'error'
        })
    } else {
      this.listLoading = true
      console.log(this.temp)
      ResalerAPI.addResalerArea(this.temp)
        .then(response => {
          this.listLoading = false
            this.$alert('库存添加成功', '成功', {
              confirmButtonText: '确定',
              callback: action => {
                this.page = 1
                this.getAreas()
                this.getCount()
                this.dialogFormVisible = false;
                this.temp = {
                  title:null,
                  manager_id: null,
                  region_id: null
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
      this.tempM.area_id = item.id
      if (item.manager_id) {
        this.tempM.manager_id = item.manager_id
      }
      this.addManagerDialogFormVisible = true
    },
    addNewResalerAreaManager() {
      this.$confirm('确定添加?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.sendNewResalerAreaManagerRequest()
      }).catch((err) => {   
        console.log(err)     
      });
    },
    sendNewResalerAreaManagerRequest() {
      console.log(this.tempM)
      if (!this.tempM.area_id || !this.tempM.manager_id) {
        this.$message({
          message: '必须填写所有信息',
          type: 'error'
        })
    } else {
      this.listLoading = true
      ResalerAPI.addResalerAreaManager(this.tempM)
        .then(response => {
          this.listLoading = false
            this.$alert('添加成功', '成功', {
              confirmButtonText: '确定',
              callback: action => {
                this.page = 1
                this.getAreas()
                this.getCount()
                this.addManagerDialogFormVisible = false;
                this.tempM = {
                  area_id: null,
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
    removeCurrentAreaManager() {
      this.$confirm('确定要移除当前大区主管?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.sendRemoveAreaManagerRequest()
      }).catch((err) => {   
        console.log(err)     
      });
    },
    sendRemoveAreaManagerRequest() {
      this.listLoading = true
      ResalerAPI.removeResalerAreaManager(this.tempM)
        .then(response => {
          this.listLoading = false
          this.$alert('成功移除当前大区经理', '成功', {
            confirmButtonText: '确定',
            callback: action => {
              this.page = 1
              this.getAreas()
              this.getCount()
              this.addManagerDialogFormVisible = false;
              this.tempM = {
                area_id: null,
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
