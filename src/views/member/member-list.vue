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
      <el-table-column label="淘宝账号" prop="taobao_account"  width="200px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.taobao_account }}</span>
        </template>
      </el-table-column>
      <el-table-column label="支付宝账号" prop="taobao_account"  width="200px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.alipay_account }}</span>
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
      <el-table-column label="操作" width="300px" align="center">
        <template slot-scope="{row}">
          <el-button type="warning" plain @click="editMember(row)">编辑</el-button>
          <el-button v-if="row.total_spend > 0" type="primary" plain @click="checkMemberDetail(row)">消费详情</el-button>
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
          <h3 v-if="formType === 1" style="vertical-align: top; margin-top: 0;"> 添加新会员信息 </h3>
          <h3 v-if="formType === 2" style="vertical-align: top; margin-top: 0;"> 编辑会员信息 </h3>
          <div style="display: inline-block;">
            <div style=" margin-bottom: 5px;">
              <div class="input-title">客户姓名</div>
              <div class="input-title">手机号码</div>
              <div class="input-title">所在城市</div>
              <div class="input-title">微信账号</div>
              <div class="input-title">淘宝账号</div>
              <div class="input-title">支付宝账号</div>
            </div>
            <el-form-item label="" prop="event" style="margin-bottom: 10px;">
              <el-input placeholder="客户姓名" v-model="temp.name" style="width: 150px;" class="filter-item" />
              <el-input placeholder="手机号码" v-model="temp.cellphone" style="width: 150px; margin-left:10px;" class="filter-item" />
              <el-input placeholder="所在城市" v-model="temp.city" style="width: 150px; margin-left:10px;" class="filter-item" />
              <el-input placeholder="微信账号" v-model="temp.wechat_account" style="width: 150px; margin-left:10px;" class="filter-item" />
              <el-input placeholder="淘宝账号" v-model="temp.taobao_account" style="width: 150px; margin-left:10px;" class="filter-item" />
              <el-input placeholder="支付宝账号" v-model="temp.alipay_account" style="width: 150px; margin-left:10px;" class="filter-item" />
            </el-form-item>
          </div>
          <div v-if="temp.currentPets && temp.currentPets.length > 0">
            <h3 style="display: block; width: 100px; vertical-align: top; margin-top: 40;"> 当前宠物信息 </h3>
            <div style="display: inline-block;">
              <div style=" margin-bottom: 5px;">
                <div class="input-title">宠物ID</div>
                <div class="input-title">宠物类型</div>
                <div class="input-title">宠物名称</div>
                <div class="input-title">宠物品种</div>
                <div class="input-title">性别</div>
                <div class="input-title">生日</div>
              </div>
              <div v-for="(item, index) in temp.currentPets" 
                label="" :key="item.id" prop="product" style="margin-bottom: 10px;">
                <span style="display: inline-block; width: 150px; margin-left: 10px;">{{item.id}}</span>
                <span style="display: inline-block; width: 150px; margin-left: 10px;">{{item.type === 1 ? '狗' : '猫'}}</span>
                <span style="display: inline-block; width: 150px; margin-left: 10px;">{{item.name}}</span>
                <span style="display: inline-block; width: 150px; margin-left: 10px;">{{item.sub_type}}</span>
                <span style="display: inline-block; width: 150px; margin-left: 10px;">{{item.gender === 1 ? '公' : '母'}}</span>
                <span style="display: inline-block; width: 150px; margin-left: 10px;">{{moment(item.birthday).format('YYYY-MM-DD')}}</span>
                <el-button style="margin-left: 10px;" type="danger" icon="el-icon-delete" @click="removePetFromEditing(item, index)" />
              </div>
            </div>
          </div>
          <div>
            <h3 style="display: block; width: 100px; vertical-align: top; margin-top: 40;"> 宠物信息 </h3>
            <div style="display: inline-block;">
              <div style=" margin-bottom: 5px;">
                <div class="input-title">宠物类型</div>
                <div class="input-title">宠物名称</div>
                <div class="input-title">宠物品种</div>
                <div class="input-title">性别</div>
                <div class="input-title">生日</div>
              </div>
              <el-form-item v-for="(item, index) in temp.pets" 
                label="" :key="item.id" prop="product" style="margin-bottom: 10px;">
                <el-select v-model="item.type" class="filter-item" style="width: 150px;" placeholder="宠物类型" clearable>
                  <el-option v-for="item in petTypes" :key="item.id" :label="item.title" :value="item.id" />
                </el-select>
                <el-input v-model="item.name" placeholder="宠物名称" class="filter-item" style="width: 150px; margin-left:10px;" clearable  />
                <el-input v-model="item.sub_type" placeholder="宠物品种" class="filter-item" style="width: 150px; margin-left:10px;" clearable  />
                <el-select v-model="item.gender" class="filter-item inventory-in-input-extra" placeholder="宠物性别" clearable>
                  <el-option v-for="item in petGenders" :key="item.id" :label="item.title" :value="item.id" />
                </el-select>
                <el-date-picker
                  v-model="item.birthday"
                  type="date"
                  style="width: 200px;"
                  placeholder="生日">
                </el-date-picker>
                <el-button style="margin-left: 10px;" type="danger" icon="el-icon-delete" @click="removePet(index)" />
              </el-form-item>
              <el-form-item>
                <el-button style="width: 150px;" type="primary" plain @click="addMorePet">添加宠物</el-button>
              </el-form-item>
            </div>
          </div>
          <div>
            <h3 class="section-title"> 客户备注 </h3>
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
        <el-button v-if="this.formType === 1" type="primary" @click="addNewMember()">
          添加新会员
        </el-button>
        <el-button v-if="this.formType === 2" type="primary" @click="updateMember()">
          修改会员信息
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
import moment from 'moment'

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
      formType: 1,
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
        name: null,
        cellphone: null,
        wechat_account: null,
        taobao_account: null,
        alipay_account: null,
        city: null,
        notes: null,
        pets: [{
          name: undefined,
          type: undefined,
          sub_type: undefined,
          gender: undefined,
          birthday: undefined
        }

        ]
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
      this.formType = 1
    },
    removePet(itemIndex) {
      this.$delete(this.temp.pets, itemIndex)
    },
    addNewMember() {
      this.$confirm('确定添加?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.sendNewMemberRequest()
      }).catch((err) => {   
        console.log(err)     
      });
    },
    sendNewMemberRequest() {
      if (!this.temp.cellphone || !this.temp.name ) {
        this.$message({
          message: '必须填写姓名电话',
          type: 'error'
        })
    } else {
      this.listLoading = true
      let data = {
        member_data: {
          name: this.temp.name,
          cellphone: this.temp.cellphone,
          wechat_account: this.temp.wechat_account,
          taobao_account: this.temp.taobao_account,
          alipay_account: this.temp.alipay_account,
          city: this.temp.city,
          note: this.temp.note
        },
        pets: [],
      }
      this.temp.pets.forEach(p => {
        let d = {
          name: p.name,
          type: p.type,
          sub_type: p.sub_type,
          gender: p.gender,
          birthday: moment(p.birthday).format('YYYY-MM-DD')
        }
        data.pets.push(d)
      })

      MemberAPI.addMember(data)
        .then(response => {
          this.listLoading = false
            this.$alert('添加成功', '成功', {
              confirmButtonText: '确定',
              callback: action => {
                this.page = 1
                this.getMembers()
                this.getCount()
                this.dialogFormVisible = false;
                this.temp = {
                  name: null,
                  cellphone: null,
                  wechat_account: null,
                  taobao_account: null,
                  alipay_account: null,
                  note: null,
                  pets: []
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
    editMember(item) {
      console.log(item)
      this.dialogFormVisible = true
      this.formType = 2
      this.temp = {
        id: item.id,
        name: item.name,
        cellphone: item.cellphone,
        city: item.city,
        wechat_account: item.wechat_account,
        taobao_account: item.taobao_account,
        alipay_account: item.alipay_account,
        note: item.note,
        currentPets: [],
        deletePets: [],
        pets: [],
      } 
      this.members.forEach(m => {
        if(m.id === item.id) {
          this.temp.currentPets.push({
            id: m.pet_id,
            name: m.pet_name,
            type: m.type,
            sub_type: m.sub_type,
            gender: m.pet_gender,
            birthday: m.birthday
          })
        }
      });
    },
    removePetFromEditing(item, itemIndex) {
      this.$delete(this.temp.currentPets, itemIndex)
      this.temp.deletePets.push(item)
    },
    updateMember() {
      this.$confirm('确定修改?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.sendUpdateMemberRequest()
      }).catch((err) => {   
        console.log(err)     
      });
    },
    sendUpdateMemberRequest() {
      if (!this.temp.cellphone || !this.temp.name ) {
        this.$message({
          message: '必须填写姓名电话',
          type: 'error'
        })
    } else {
      this.listLoading = true
      let data = {
        member_data: {
          id: this.temp.id,
          name: this.temp.name,
          cellphone: this.temp.cellphone,
          wechat_account: this.temp.wechat_account,
          taobao_account: this.temp.taobao_account,
          alipay_account: this.temp.alipay_account,
          city: this.temp.city,
          note: this.temp.note
        },
        add_pets: [],
        delete_pets: this.temp.deletePets
      }
      this.temp.pets.forEach(p => {
        let d = {
          name: p.name,
          type: p.type,
          sub_type: p.sub_type,
          gender: p.gender,
          birthday: moment(p.birthday).format('YYYY-MM-DD')
        }
        data.add_pets.push(d)
      })

      MemberAPI.updateMember(data)
        .then(response => {
          this.listLoading = false
            this.$alert('修改成功', '成功', {
              confirmButtonText: '确定',
              callback: action => {
                this.page = 1
                this.getMembers()
                this.getCount()
                this.dialogFormVisible = false;
                this.temp = {
                  name: null,
                  cellphone: null,
                  wechat_account: null,
                  taobao_account: null,
                  alipay_account: null,
                  note: null,
                  pets: [],
                  deletePets: [],
                  currentPets: []
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
    checkMemberDetail(item) {
      console.log(item)
      this.$router.push({ name: 'member-sales-detail', params: { id: item.id, member: item } })
    },
    addMorePet() {
      this.temp.pets.push({
        name: undefined,
        type: undefined,
        sub_type: undefined,
        gender: undefined,
        birthday: undefined
      });
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex <= 6 || columnIndex === 13) {
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
    width: 150px;
    line-height: 25px;
    font-size: 14px;
    margin-left: 10px;
  }
</style>
