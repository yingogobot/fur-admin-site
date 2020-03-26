<template>
  <div class="app-container">
    <div class="filter-container">
      <h2>筛选结果</h2>
      <el-input v-model="listQuery.id" placeholder="会员id" style="width: 150px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-input v-model="listQuery.cellphone" placeholder="手机号" style="width: 150px; margin-left: 15px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-input v-model="listQuery.city" placeholder="所在城市" style="width: 150px; margin-left: 15px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-select v-model="listQuery.pet_type" placeholder="宠物类型" clearable style="width: 150px; margin-left: 15px;" class="filter-item">
        <el-option v-for="item in petTypes" :key="item.id" :label="item.title" :value="item.id" />
      </el-select>
      <el-select v-model="listQuery.pet_gender" placeholder="宠物性别" clearable style="width: 150px; margin-left: 15px;" class="filter-item">
        <el-option v-for="item in petGenders" :key="item.id" :label="item.title" :value="item.id" />
      </el-select>
      <el-input v-model="listQuery.pet_sub_type" placeholder="宠物品种" style="width: 150px; margin-left: 15px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter" style="width: 100px; margin-left: 15px;">
        搜索
      </el-button>
      <el-button class="filter-item" style="width: 200px; margin-left: 10px;" type="success" icon="el-icon-edit" @click="handleCreate">
        添加新会员
      </el-button>
    </div>
    <div>
      <h2 class="title">会员列表</h2>
    </div>
    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="members"
      :span-method="objectSpanMethod"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column label="会员ID" prop="id" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="姓名" prop="name" width="250px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="手机号码" prop="cellphone" width="200px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.cellphone }}</span>
        </template>
      </el-table-column>
       <el-table-column label="微信账号" prop="wechat_account" width="200px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.wechat_account }}</span>
        </template>
      </el-table-column>
      <el-table-column label="淘宝账号" prop="taobao_account" align="center">
        <template slot-scope="{row}">
          <span>{{ row.taobao_account }}</span>
        </template>
      </el-table-column>
      <el-table-column label="所在城市" prop="city" align="center">
        <template slot-scope="{row}">
          <span>{{ row.city }}</span>
        </template>
      </el-table-column>
      <el-table-column label="总消费金额" width="150px" prop="total_spend" align="center">
        <template slot-scope="{row}">
          <span>{{ row.total_spend }}</span>
        </template>
      </el-table-column>
      <el-table-column label="宠物类别" prop="pet_type" align="center">
        <template slot-scope="{row}">
          <span>{{ row.type === null ? '' : (row.type === 1 ? '狗':'猫') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="宠物名字" prop="pet_name" align="center">
        <template slot-scope="{row}">
          <span>{{ row.pet_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="宠物品种" prop="pet_sub_type" align="center">
        <template slot-scope="{row}">
          <span>{{ row.sub_type }}</span>
        </template>
      </el-table-column>
      <el-table-column label="宠物性别" prop="pet_gender" align="center">
        <template slot-scope="{row}">
          <span>{{ row.pet_gender === null ? '' : (row.pet_gender === 1 ? 'boy':'girl')}}</span>
        </template>
      </el-table-column>
      <el-table-column label="宠物生日" prop="birthday" width="200px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.birthday === null ? '' : moment(row.birthday).format('YYYY-MM-DD') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200px" align="center">
        <template slot-scope="{row}">
          <el-button type="primary" plain @click="checkMemberDetail(row)">查看消费详情</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getMembers" />

    <el-dialog title="添加新会员" :visible.sync="dialogFormVisible" width="80%">
      <el-form ref="dataForm"
        :model="temp" 
        label-position="left" 
        label-width="10px" 
        style="margin-left:20px;">
        <div>
          <h3 style="display: inline-block; width: 100px; vertical-align: top; margin-top: 0;"> 会员信息 </h3>
          <div style="display: inline-block;">
            <div style=" margin-bottom: 5px;">
              <div class="input-title">姓名</div>
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
          
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="addNewMember()">
          提交
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import MemberAPI from '@/api/member'

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
      members: null,
      total: 0,
      listLoading: true,
      dialogFormVisible: false,
      rowSpans: null,
      listQuery: {
        page: 1,
        limit: 10
      },
      petTypes: [
        { id: 1, title: '狗' },
        { id: 2, title: '猫' },
      ],
      petGenders: [
        { id: 1, title: '公' },
        { id: 2, title: '母' },
      ],
      temp: {
        title: null,
        start_date: null,
        end_date: null,
        note: null,
        
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
      vm.getMembers()
      vm.getCount()
      next();
    }) 
  },
  methods: {
    calculateRowSpan() {
      let g = []
      let count = 0
      this.members.forEach(i => {
        let found = false
        
        g.forEach(t => {
          if (t.id === i.id) {
            found = true
            t.end++
            t.rowSpan++
            count = t.start + t.rowSpan
          }
        })

        if (!found) {
          let newT = {
            id: i.id,
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
    getMembers() {
      this.listLoading = true
      MemberAPI.getAllMembers(this.listQuery)
        .then(response => {
          this.members = response
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
      MemberAPI.getMembersCount()
        .then(response => {
          this.total = response.total
        })
    },
    handleCreate() {
      this.dialogFormVisible = true
    },
    addNewMember() {
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
      MemberAPI.addMember(this.temp)
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
    handleFilter() {
      this.listQuery.page = 1
      this.getAllSales()
      this.getSalesCount()
    },
    checkMemberDetail() {
      
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex <= 6) {
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
