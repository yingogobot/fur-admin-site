(window.webpackJsonp=window.webpackJsonp||[]).push([[25],{"4oor":function(t,e,l){},"JT+t":function(t,e,l){"use strict";var n=l("4oor");l.n(n).a},qsn8:function(t,e,l){"use strict";l.r(e);var n=function(){var t=this,e=t.$createElement,l=t._self._c||e;return l("div",{staticClass:"app-container"},[l("div",{staticClass:"filter-container"},[l("h2",[t._v("筛选结果")]),t._v(" "),l("el-input",{staticClass:"filter-item",staticStyle:{width:"150px"},attrs:{placeholder:"会员id"},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.handleFilter(e)}},model:{value:t.listQuery.id,callback:function(e){t.$set(t.listQuery,"id",e)},expression:"listQuery.id"}}),t._v(" "),l("el-input",{staticClass:"filter-item",staticStyle:{width:"150px","margin-left":"15px"},attrs:{placeholder:"手机号"},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.handleFilter(e)}},model:{value:t.listQuery.cellphone,callback:function(e){t.$set(t.listQuery,"cellphone",e)},expression:"listQuery.cellphone"}}),t._v(" "),l("el-input",{staticClass:"filter-item",staticStyle:{width:"150px","margin-left":"15px"},attrs:{placeholder:"所在城市"},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.handleFilter(e)}},model:{value:t.listQuery.city,callback:function(e){t.$set(t.listQuery,"city",e)},expression:"listQuery.city"}}),t._v(" "),l("el-select",{staticClass:"filter-item",staticStyle:{width:"150px","margin-left":"15px"},attrs:{placeholder:"宠物类型",clearable:""},model:{value:t.listQuery.pet_type,callback:function(e){t.$set(t.listQuery,"pet_type",e)},expression:"listQuery.pet_type"}},t._l(t.petTypes,function(t){return l("el-option",{key:t.id,attrs:{label:t.title,value:t.id}})}),1),t._v(" "),l("el-select",{staticClass:"filter-item",staticStyle:{width:"150px","margin-left":"15px"},attrs:{placeholder:"宠物性别",clearable:""},model:{value:t.listQuery.pet_gender,callback:function(e){t.$set(t.listQuery,"pet_gender",e)},expression:"listQuery.pet_gender"}},t._l(t.petGenders,function(t){return l("el-option",{key:t.id,attrs:{label:t.title,value:t.id}})}),1),t._v(" "),l("el-input",{staticClass:"filter-item",staticStyle:{width:"150px","margin-left":"15px"},attrs:{placeholder:"宠物品种"},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.handleFilter(e)}},model:{value:t.listQuery.pet_sub_type,callback:function(e){t.$set(t.listQuery,"pet_sub_type",e)},expression:"listQuery.pet_sub_type"}}),t._v(" "),l("el-button",{staticClass:"filter-item",staticStyle:{width:"100px","margin-left":"15px"},attrs:{type:"primary",icon:"el-icon-search"},on:{click:t.handleFilter}},[t._v("\n      搜索\n    ")]),t._v(" "),l("el-button",{staticClass:"filter-item",staticStyle:{width:"200px","margin-left":"10px"},attrs:{type:"success",icon:"el-icon-edit"},on:{click:t.handleCreate}},[t._v("\n      添加新会员\n    ")])],1),t._v(" "),t._m(0),t._v(" "),l("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.listLoading,expression:"listLoading"}],key:t.tableKey,staticStyle:{width:"100%"},attrs:{data:t.members,"span-method":t.objectSpanMethod,border:"",fit:"","highlight-current-row":""}},[l("el-table-column",{attrs:{label:"会员ID",prop:"id",width:"100px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var n=e.row;return[l("span",[t._v(t._s(n.id))])]}}])}),t._v(" "),l("el-table-column",{attrs:{label:"姓名",prop:"name",width:"250px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var n=e.row;return[l("span",[t._v(t._s(n.name))])]}}])}),t._v(" "),l("el-table-column",{attrs:{label:"手机号码",prop:"cellphone",width:"200px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var n=e.row;return[l("span",[t._v(t._s(n.cellphone))])]}}])}),t._v(" "),l("el-table-column",{attrs:{label:"微信账号",prop:"wechat_account",width:"200px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var n=e.row;return[l("span",[t._v(t._s(n.wechat_account))])]}}])}),t._v(" "),l("el-table-column",{attrs:{label:"淘宝账号",prop:"taobao_account",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var n=e.row;return[l("span",[t._v(t._s(n.taobao_account))])]}}])}),t._v(" "),l("el-table-column",{attrs:{label:"所在城市",prop:"city",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var n=e.row;return[l("span",[t._v(t._s(n.city))])]}}])}),t._v(" "),l("el-table-column",{attrs:{label:"总消费金额",width:"150px",prop:"total_spend",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var n=e.row;return[l("span",[t._v(t._s(n.total_spend))])]}}])}),t._v(" "),l("el-table-column",{attrs:{label:"宠物类别",prop:"pet_type",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var n=e.row;return[l("span",[t._v(t._s(null===n.type?"":1===n.type?"狗":"猫"))])]}}])}),t._v(" "),l("el-table-column",{attrs:{label:"宠物名字",prop:"pet_name",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var n=e.row;return[l("span",[t._v(t._s(n.pet_name))])]}}])}),t._v(" "),l("el-table-column",{attrs:{label:"宠物品种",prop:"pet_sub_type",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var n=e.row;return[l("span",[t._v(t._s(n.sub_type))])]}}])}),t._v(" "),l("el-table-column",{attrs:{label:"宠物性别",prop:"pet_gender",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var n=e.row;return[l("span",[t._v(t._s(null===n.pet_gender?"":1===n.pet_gender?"boy":"girl"))])]}}])}),t._v(" "),l("el-table-column",{attrs:{label:"宠物生日",prop:"birthday",width:"200px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var n=e.row;return[l("span",[t._v(t._s(null===n.birthday?"":t.moment(n.birthday).format("YYYY-MM-DD")))])]}}])}),t._v(" "),l("el-table-column",{attrs:{label:"操作",width:"200px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var n=e.row;return[l("el-button",{attrs:{type:"primary",plain:""},on:{click:function(e){return t.checkMemberDetail(n)}}},[t._v("查看消费详情")])]}}])})],1),t._v(" "),l("pagination",{directives:[{name:"show",rawName:"v-show",value:t.total>0,expression:"total>0"}],attrs:{total:t.total,page:t.listQuery.page,limit:t.listQuery.limit},on:{"update:page":function(e){return t.$set(t.listQuery,"page",e)},"update:limit":function(e){return t.$set(t.listQuery,"limit",e)},pagination:t.getMembers}}),t._v(" "),l("el-dialog",{attrs:{title:"添加新会员",visible:t.dialogFormVisible,width:"80%"},on:{"update:visible":function(e){t.dialogFormVisible=e}}},[l("el-form",{ref:"dataForm",staticStyle:{"margin-left":"20px"},attrs:{model:t.temp,"label-position":"left","label-width":"10px"}},[l("div",[l("h3",{staticStyle:{display:"inline-block",width:"100px","vertical-align":"top","margin-top":"0"}},[t._v(" 会员信息 ")]),t._v(" "),l("div",{staticStyle:{display:"inline-block"}},[l("div",{staticStyle:{"margin-bottom":"5px"}},[l("div",{staticClass:"input-title"},[t._v("姓名")]),t._v(" "),l("div",{staticClass:"input-title"},[t._v("开始日期")]),t._v(" "),l("div",{staticClass:"input-title"},[t._v("结束日期")])]),t._v(" "),l("el-form-item",{staticStyle:{"margin-bottom":"10px"},attrs:{label:"",prop:"event"}},[l("el-input",{staticClass:"filter-item",staticStyle:{width:"200px"},attrs:{placeholder:"活动名称"},model:{value:t.temp.title,callback:function(e){t.$set(t.temp,"title",e)},expression:"temp.title"}}),t._v(" "),l("el-date-picker",{staticStyle:{width:"200px"},attrs:{type:"date",placeholder:"开始日期"},model:{value:t.temp.start_date,callback:function(e){t.$set(t.temp,"start_date",e)},expression:"temp.start_date"}}),t._v(" "),l("el-date-picker",{staticStyle:{width:"200px"},attrs:{type:"date",placeholder:"结束如期"},model:{value:t.temp.end_date,callback:function(e){t.$set(t.temp,"end_date",e)},expression:"temp.end_date"}})],1)],1)])]),t._v(" "),l("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[l("el-button",{on:{click:function(e){t.dialogFormVisible=!1}}},[t._v("\n        取消\n      ")]),t._v(" "),l("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.addNewMember()}}},[t._v("\n        提交\n      ")])],1)],1)],1)};n._withStripped=!0;l("rGqo");var a=l("23J+"),i=l("gZTm"),r=(l("7Qib"),l("Mz3J")),s=l("L2JU"),o={name:"ComplexTable",components:{Pagination:r.a},filters:{},data:function(){return{tableKey:0,members:null,total:0,listLoading:!0,dialogFormVisible:!1,rowSpans:null,listQuery:{page:1,limit:10},petTypes:[{id:1,title:"狗"},{id:2,title:"猫"}],petGenders:[{id:1,title:"公"},{id:2,title:"母"}],temp:{title:null,start_date:null,end_date:null,note:null}}},created:function(){},computed:Object(a.a)({},Object(s.b)(["id"])),beforeRouteEnter:function(t,e,l){l(function(t){t.getMembers(),t.getCount(),l()})},methods:{calculateRowSpan:function(){var t=[],e=0;this.members.forEach(function(l){var n=!1;if(t.forEach(function(t){t.id===l.id&&(n=!0,t.end++,t.rowSpan++,e=t.start+t.rowSpan)}),!n){var a={id:l.id,start:e,end:e+1,rowSpan:1};e++,t.push(a)}}),this.rowSpans=t},getMembers:function(){var t=this;this.listLoading=!0,i.a.getAllMembers(this.listQuery).then(function(e){t.members=e,t.listLoading=!1,t.calculateRowSpan()}).catch(function(e){t.$message({message:"读取库存失败，请联系徐神检查",type:"error"}),t.listLoading=!1})},getCount:function(){var t=this;i.a.getMembersCount().then(function(e){t.total=e.total})},handleCreate:function(){this.dialogFormVisible=!0},addNewMember:function(){var t=this;this.$confirm("确定添加?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){t.sendNewEventRequest()}).catch(function(t){})},sendNewEventRequest:function(){var t=this;this.temp.title&&this.temp.start_date&&this.temp.end_date?(this.listLoading=!0,i.a.addMember(this.temp).then(function(e){t.listLoading=!1,t.$alert("添加成功","成功",{confirmButtonText:"确定",callback:function(e){t.page=1,t.getEvents(),t.getCount(),t.dialogFormVisible=!1,t.temp={title:null,start_date:null,end_date:null,note:void 0}}})}).catch(function(e){t.$message({message:"添加失败，请联系徐神检查",type:"error"}),t.listLoading=!1})):this.$message({message:"必须填写所有信息",type:"error"})},handleFilter:function(){this.listQuery.page=1,this.getAllSales(),this.getSalesCount()},checkMemberDetail:function(){},objectSpanMethod:function(t){t.row,t.column;var e=t.rowIndex;if(t.columnIndex<=6){var l={rowspan:0,colspan:0};return this.rowSpans.forEach(function(t){e>=t.start&&e<t.end&&(e-t.start)%t.rowSpan==0&&(l={rowspan:t.rowSpan,colspan:1})}),l}}}},c=(l("JT+t"),l("KHd+")),p=Object(c.a)(o,n,[function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("h2",{staticClass:"title"},[this._v("会员列表")])])}],!1,null,"253223d4",null);p.options.__file="src/views/member/member-chart.vue";e.default=p.exports}}]);