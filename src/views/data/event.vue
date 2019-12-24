<template>
  <div class="app-container">
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
      <el-table-column label="操作" width="300px" align="center">
        <template slot-scope="{row}">
          <el-button type="primary" plain @click="editEvent(row)">编辑</el-button>
          <el-button type="danger" plain @click="deleteEvent(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getEvents" />

    <el-dialog title="添加新活动" :visible.sync="dialogFormVisible" width="80%">
      <el-form ref="dataForm"
        :model="temp" 
        label-position="left" 
        label-width="10px" 
        style="margin-left:20px;">
        <div>
          <h3 style="display: inline-block; width: 100px; vertical-align: top; margin-top: 0;"> 活动信息 </h3>
          <div style="display: inline-block;">
            <div style=" margin-bottom: 5px;">
              <div class="input-title">活动名称</div>
              <div class="input-title">开始日期</div>
              <div class="input-title">结束日期</div>
            </div>
            <el-form-item label="" prop="event" style="margin-bottom: 10px;">
              <el-input placeholder="活动名称" v-model="temp.title" style="width: 200px;" class="filter-item" />
              <el-date-picker
                v-model="temp.start_date"
                type="date"
                style="width: 200px;"
                placeholder="开始日期">
              </el-date-picker>
              <el-date-picker
                v-model="temp.end_date"
                type="date"
                style="width: 200px;"
                placeholder="结束如期">
              </el-date-picker>
            </el-form-item>
          </div>
          <div>
          <h3 style="display: inline-block; width: 100px; vertical-align: top; margin-top: 0;"> 活动备注 </h3>
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
        <el-button type="primary" @click="addNewEvent()">
          提交
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import EventAPI from '@/api/event'

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
      events: null,
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
        start_date: null,
        end_date: null,
        note: null
      }
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
      EventAPI.getAllEvents(this.listQuery)
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
      EventAPI.getEventsCount()
        .then(response => {
          this.total = response.total
        })
    },
    handleCreate() {
      this.dialogFormVisible = true
    },
    addNewEvent() {
      this.$confirm('确定添加?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.sendNewEventRequest()
      }).catch((err) => {   
        console.log(err)     
      });
    },
    sendNewEventRequest() {
      if (!this.temp.title || !this.temp.start_date || !this.temp.end_date) {
        this.$message({
          message: '必须填写所有信息',
          type: 'error'
        })
    } else {
      this.listLoading = true
      EventAPI.addEvent(this.temp)
        .then(response => {
          this.listLoading = false
            this.$alert('添加成功', '成功', {
              confirmButtonText: '确定',
              callback: action => {
                this.page = 1
                this.getEvents()
                this.getCount()
                this.dialogFormVisible = false;
                this.temp = {
                  title:null,
                  start_date: null,
                  end_date: null,
                  note: undefined
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
    width: 200px;
    line-height: 25px;
    font-size: 14px;
    margin-left: 10px;
  }
</style>
