(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{"+tmW":function(t,e,n){},"9Uwk":function(t,e,n){"use strict";var i=n("+tmW");n.n(i).a},CQXc:function(t,e,n){"use strict";var i=n("DyJX");e.a={getAllEvents:function(t){return new Promise(function(e,n){i.a.post("event/get_all",t).then(function(t){return e(t)}).catch(function(t){return n(t)})})},getEventsCount:function(){return new Promise(function(t,e){i.a.post("event/get_count").then(function(e){return t(e)}).catch(function(t){return e(t)})})},addEvent:function(t){return new Promise(function(e,n){i.a.post("event/add",t).then(function(t){return e(t)}).catch(function(t){return n(t)})})},deleteEvent:function(t){return new Promise(function(e,n){var l={id:t};i.a.post("event/delete",l).then(function(t){return e(t)}).catch(function(t){return n(t)})})}}},IQfF:function(t,e,n){"use strict";var i=n("DyJX");e.a={getAllSalesChannels:function(){return new Promise(function(t,e){i.a.post("sales_channel/get_all").then(function(e){return t(e)}).catch(function(t){return e(t)})})},getSalesChannelsCount:function(){return new Promise(function(t,e){i.a.post("sales_channel/get_count").then(function(e){return t(e)}).catch(function(t){return e(t)})})},addSalesChannel:function(t){return new Promise(function(e,n){i.a.post("sales_channel/add",t).then(function(t){return e(t)}).catch(function(t){return n(t)})})},deleteSalesChannel:function(t){return new Promise(function(e,n){var l={id:t};i.a.post("sales_channel/delete",l).then(function(t){return e(t)}).catch(function(t){return n(t)})})}}},Mz3J:function(t,e,n){"use strict";var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"pagination-container",class:{hidden:t.hidden}},[n("el-pagination",t._b({attrs:{background:t.background,"current-page":t.currentPage,"page-size":t.pageSize,layout:t.layout,"page-sizes":t.pageSizes,total:t.total},on:{"update:currentPage":function(e){t.currentPage=e},"update:current-page":function(e){t.currentPage=e},"update:pageSize":function(e){t.pageSize=e},"update:page-size":function(e){t.pageSize=e},"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}},"el-pagination",t.$attrs,!1))],1)};i._withStripped=!0;n("xfY5");Math.easeInOutQuad=function(t,e,n,i){return(t/=i/2)<1?n/2*t*t+e:-n/2*(--t*(t-2)-1)+e};var l=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(t){window.setTimeout(t,1e3/60)};function a(t,e,n){var i=document.documentElement.scrollTop||document.body.parentNode.scrollTop||document.body.scrollTop,a=t-i,o=0;e=void 0===e?500:e;!function t(){o+=20;var r,s=Math.easeInOutQuad(o,i,a,e);r=s,document.documentElement.scrollTop=r,document.body.parentNode.scrollTop=r,document.body.scrollTop=r,o<e?l(t):n&&"function"==typeof n&&n()}()}var o={name:"Pagination",props:{total:{required:!0,type:Number},page:{type:Number,default:1},limit:{type:Number,default:20},pageSizes:{type:Array,default:function(){return[10,20,30,50]}},layout:{type:String,default:"total, sizes, prev, pager, next, jumper"},background:{type:Boolean,default:!0},autoScroll:{type:Boolean,default:!0},hidden:{type:Boolean,default:!1}},computed:{currentPage:{get:function(){return this.page},set:function(t){this.$emit("update:page",t)}},pageSize:{get:function(){return this.limit},set:function(t){this.$emit("update:limit",t)}}},methods:{handleSizeChange:function(t){this.$emit("pagination",{page:this.currentPage,limit:t}),this.autoScroll&&a(0,800)},handleCurrentChange:function(t){this.$emit("pagination",{page:t,limit:this.pageSize}),this.autoScroll&&a(0,800)}}},r=(n("VhpY"),n("KHd+")),s=Object(r.a)(o,i,[],!1,null,"72233bcd",null);s.options.__file="src/components/Pagination/index.vue";e.a=s.exports},RJdx:function(t,e,n){},S4mp:function(t,e,n){"use strict";var i=n("DyJX");e.a={getAllResalers:function(){return new Promise(function(t,e){i.a.post("resaler/get_all").then(function(e){return t(e)}).catch(function(t){return e(t)})})},getResalersCount:function(){return new Promise(function(t,e){i.a.post("resaler/get_count").then(function(e){return t(e)}).catch(function(t){return e(t)})})},addResaler:function(t){return new Promise(function(e,n){i.a.post("resaler/add",t).then(function(t){return e(t)}).catch(function(t){return n(t)})})},deleteResaler:function(t){return new Promise(function(e,n){var l={id:t};i.a.post("resaler/delete",l).then(function(t){return e(t)}).catch(function(t){return n(t)})})}}},VhpY:function(t,e,n){"use strict";var i=n("RJdx");n.n(i).a},ZySA:function(t,e,n){"use strict";n("jUE0");var i="@@wavesContext";function l(t,e){function n(n){var i=Object.assign({},e.value),l=Object.assign({ele:t,type:"hit",color:"rgba(0, 0, 0, 0.15)"},i),a=l.ele;if(a){a.style.position="relative",a.style.overflow="hidden";var o=a.getBoundingClientRect(),r=a.querySelector(".waves-ripple");switch(r?r.className="waves-ripple":((r=document.createElement("span")).className="waves-ripple",r.style.height=r.style.width=Math.max(o.width,o.height)+"px",a.appendChild(r)),l.type){case"center":r.style.top=o.height/2-r.offsetHeight/2+"px",r.style.left=o.width/2-r.offsetWidth/2+"px";break;default:r.style.top=(n.pageY-o.top-r.offsetHeight/2-document.documentElement.scrollTop||document.body.scrollTop)+"px",r.style.left=(n.pageX-o.left-r.offsetWidth/2-document.documentElement.scrollLeft||document.body.scrollLeft)+"px"}return r.style.backgroundColor=l.color,r.className="waves-ripple z-active",!1}}return t[i]?t[i].removeHandle=n:t[i]={removeHandle:n},n}var a={bind:function(t,e){t.addEventListener("click",l(t,e),!1)},update:function(t,e){t.removeEventListener("click",t[i].removeHandle,!1),t.addEventListener("click",l(t,e),!1)},unbind:function(t){t.removeEventListener("click",t[i].removeHandle,!1),t[i]=null,delete t[i]}},o=function(t){t.directive("waves",a)};window.Vue&&(window.waves=a,Vue.use(o)),a.install=o;e.a=a},jUE0:function(t,e,n){},q7Gq:function(t,e,n){"use strict";n.r(e);var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"app-container"},[n("div",{staticClass:"filter-container"},[n("h2",[t._v("筛选结果")]),t._v(" "),n("el-input",{staticClass:"filter-item",staticStyle:{width:"150px"},attrs:{placeholder:"出库批次"},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.handleFilter(e)}},model:{value:t.listQuery.sales_id,callback:function(e){t.$set(t.listQuery,"sales_id",e)},expression:"listQuery.sales_id"}}),t._v(" "),n("el-select",{staticClass:"filter-item",staticStyle:{width:"150px","margin-left":"15px"},attrs:{placeholder:"出库类型",clearable:""},model:{value:t.listQuery.sales_type,callback:function(e){t.$set(t.listQuery,"sales_type",e)},expression:"listQuery.sales_type"}},t._l(t.salesTypes,function(t){return n("el-option",{key:t.id,attrs:{label:t.title,value:t.id}})}),1),t._v(" "),1===t.listQuery.sales_type?n("el-select",{staticClass:"filter-item",staticStyle:{width:"150px","margin-left":"15px"},attrs:{placeholder:"销售渠道",clearable:""},model:{value:t.listQuery.sales_channel_id,callback:function(e){t.$set(t.listQuery,"sales_channel_id",e)},expression:"listQuery.sales_channel_id"}},t._l(t.salesChannel,function(t){return n("el-option",{key:t.id,attrs:{label:t.title,value:t.id}})}),1):t._e(),t._v(" "),2===t.listQuery.sales_type?n("el-select",{staticClass:"filter-item",staticStyle:{width:"150px","margin-left":"15px"},attrs:{placeholder:"活动类型",clearable:""},model:{value:t.listQuery.event_id,callback:function(e){t.$set(t.listQuery,"event_id",e)},expression:"listQuery.event_id"}},t._l(t.events,function(t){return n("el-option",{key:t.id,attrs:{label:t.title,value:t.id}})}),1):t._e(),t._v(" "),3===t.listQuery.sales_type?n("el-select",{staticClass:"filter-item",staticStyle:{width:"150px","margin-left":"15px"},attrs:{placeholder:"分销渠道",clearable:""},model:{value:t.listQuery.resaler_id,callback:function(e){t.$set(t.listQuery,"resaler_id",e)},expression:"listQuery.resaler_id"}},t._l(t.resalers,function(t){return n("el-option",{key:t.id,attrs:{label:t.name,value:t.id}})}),1):t._e(),t._v(" "),n("el-select",{staticClass:"filter-item",staticStyle:{width:"150px","margin-left":"15px"},attrs:{placeholder:"产品类型",clearable:""},on:{change:function(e){return t.getSubType(t.listQuery.product_type)}},model:{value:t.listQuery.product_type,callback:function(e){t.$set(t.listQuery,"product_type",e)},expression:"listQuery.product_type"}},t._l(t.productTypes,function(t){return n("el-option",{key:t.id,attrs:{label:t.title,value:t.id}})}),1),t._v(" "),n("el-select",{staticClass:"filter-item",staticStyle:{width:"150px","margin-left":"15px"},attrs:{placeholder:"产品分类",clearable:""},on:{change:function(e){return t.getSelectedProducts(t.listQuery.product_sub_type)}},model:{value:t.listQuery.product_sub_type,callback:function(e){t.$set(t.listQuery,"product_sub_type",e)},expression:"listQuery.product_sub_type"}},t._l(t.productSubTypes,function(t){return n("el-option",{key:t.id,attrs:{label:t.title,value:t.id}})}),1),t._v(" "),n("el-select",{staticClass:"filter-item",staticStyle:{width:"150px","margin-left":"15px"},attrs:{placeholder:"产品",clearable:""},model:{value:t.listQuery.product,callback:function(e){t.$set(t.listQuery,"product",e)},expression:"listQuery.product"}},t._l(t.selectedProducts,function(t){return n("el-option",{key:t.id,attrs:{label:t.title,value:t.id}})}),1),t._v(" "),n("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",staticStyle:{width:"100px","margin-left":"15px"},attrs:{type:"primary",icon:"el-icon-search"},on:{click:t.handleFilter}},[t._v("\n      搜索\n    ")]),t._v(" "),n("el-button",{staticClass:"filter-item",staticStyle:{width:"200px","margin-left":"10px"},attrs:{type:"success",icon:"el-icon-edit"},on:{click:t.handleCreate}},[t._v("\n      添加新销售\n    ")])],1),t._v(" "),n("h2",[t._v("销售详情")]),t._v(" "),n("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.listLoading,expression:"listLoading"}],key:t.tableKey,staticStyle:{width:"100%"},attrs:{data:t.sales,"span-method":t.objectSpanMethod,border:"",fit:""}},[n("el-table-column",{attrs:{label:"订单ID",prop:"id",width:"80px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.row;return[n("span",[t._v(t._s(i.id))])]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"销售类型",prop:"sales_type",width:"100px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.row;return[n("span",[t._v(t._s(i.sales_type))])]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"销售时间",prop:"sales_type",width:"100px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.row;return[n("span",[t._v(t._s(t.moment(i.created_at).format("YYYY-MM-DD")))])]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"销售渠道",width:"100px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.row;return[n("span",[t._v(t._s(i.sales_channel||i.resaler_name||i.event_title))])]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"产品类型",width:"100px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.row;return[n("el-tag",{staticClass:"tag",attrs:{color:i.tag_color}},[t._v(t._s(i.product_type))])]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"产品细类",width:"140px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.row;return[n("el-tag",{staticClass:"sub_type_tag",attrs:{color:i.sub_type_tag_color}},[t._v(t._s(i.product_sub_type))])]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"产品名称",width:"150px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.row;return[n("span",{staticClass:"link-type",on:{click:function(e){return t.handleUpdate(i)}}},[t._v(t._s(i.product_title))])]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"产品型号",width:"100px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.row;return[n("span",[t._v(t._s(i.size))])]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"数量",width:"100px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.row;return[n("span",[t._v(t._s(i.quantity))])]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"产品成本",width:"100px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.row;return[n("span",[t._v("￥"+t._s(i.per_item_cost_atm))])]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"销售价格",width:"100px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.row;return[n("span",[t._v("￥"+t._s(i.per_item_price_atm))])]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"单品优惠",width:"100px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.row;return[n("span",[t._v("￥"+t._s(i.per_product_discount))])]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"单品折扣",width:"100px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.row;return[n("span",[t._v(t._s(100*i.per_product_discount_ratio)+"%")])]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"单品总价",width:"100px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.row;return[n("span",[t._v("￥"+t._s(i.total_price))])]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"运费成本",width:"100px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.row;return[n("span",[t._v("￥"+t._s(i.shipping_cost))])]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"其他成本",width:"100px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.row;return[n("span",[t._v("￥"+t._s(i.other_cost))])]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"订单优惠",width:"100px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.row;return[n("span",[t._v("￥"+t._s(i.coupon))])]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"订单折扣",width:"100px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.row;return[n("span",[t._v("￥"+t._s(i.discount))])]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"全额付款",width:"100px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.row;return[n("span",[t._v(t._s(1===i.fully_paid?"是":"否"))])]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"特殊状态",width:"100px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.row;return[n("span",[t._v(t._s(1===i.special_type?"是":"否"))])]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"录入人",width:"150px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.row;return[n("span",[t._v(t._s(i.added_by_name))])]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"查看订单详情",width:"150px",align:"center"}},[n("el-button",{attrs:{type:"primary",plain:""},on:{click:t.addMoreProduct}},[t._v("详情")])],1)],1),t._v(" "),n("pagination",{directives:[{name:"show",rawName:"v-show",value:t.total>0,expression:"total>0"}],attrs:{total:t.total,page:t.listQuery.page,limit:t.listQuery.limit},on:{"update:page":function(e){return t.$set(t.listQuery,"page",e)},"update:limit":function(e){return t.$set(t.listQuery,"limit",e)},pagination:t.getAllSales}}),t._v(" "),n("el-dialog",{attrs:{title:"添加新销售",visible:t.dialogFormVisible,width:"80%"},on:{"update:visible":function(e){t.dialogFormVisible=e}}},[n("el-form",{ref:"dataForm",staticStyle:{"margin-left":"20px"},attrs:{model:t.temp,"label-position":"left","label-width":"10px"}},[n("div",[n("h3",{staticStyle:{display:"inline-block",width:"100px"}},[t._v(" 销售类型 ")]),t._v(" "),n("el-form-item",{staticStyle:{display:"inline-block"},attrs:{prop:"type"}},[n("el-select",{attrs:{placeholder:"选择销售类型"},model:{value:t.temp.sales_type,callback:function(e){t.$set(t.temp,"sales_type",e)},expression:"temp.sales_type"}},t._l(t.salesTypes,function(t){return n("el-option",{key:t.id,attrs:{label:t.title,value:t.id}})}),1)],1)],1),t._v(" "),1===t.temp.sales_type?n("div",[n("h3",{staticStyle:{display:"inline-block",width:"100px"}},[t._v(" 直销渠道 ")]),t._v(" "),n("el-form-item",{staticStyle:{display:"inline-block"},attrs:{prop:"type"}},[n("el-select",{attrs:{placeholder:"选择入库类型"},model:{value:t.temp.sales_channel,callback:function(e){t.$set(t.temp,"sales_channel",e)},expression:"temp.sales_channel"}},t._l(t.salesChannel,function(t){return n("el-option",{key:t.id,attrs:{label:t.title,value:t.id}})}),1)],1)],1):t._e(),t._v(" "),2===t.temp.sales_type?n("div",[n("h3",{staticStyle:{display:"inline-block",width:"100px"}},[t._v(" 活动名称 ")]),t._v(" "),n("el-form-item",{staticStyle:{display:"inline-block"},attrs:{prop:"type"}},[n("el-select",{attrs:{placeholder:"选择入库类型"},model:{value:t.temp.event,callback:function(e){t.$set(t.temp,"event",e)},expression:"temp.event"}},t._l(t.events,function(t){return n("el-option",{key:t.id,attrs:{label:t.title,value:t.id}})}),1)],1)],1):t._e(),t._v(" "),3===t.temp.sales_type?n("div",[n("h3",{staticStyle:{display:"inline-block",width:"100px"}},[t._v(" 分销渠道 ")]),t._v(" "),n("el-form-item",{staticStyle:{display:"inline-block"},attrs:{prop:"type"}},[n("el-select",{attrs:{placeholder:"选择入库类型"},model:{value:t.temp.event,callback:function(e){t.$set(t.temp,"event",e)},expression:"temp.event"}},t._l(t.resalers,function(t){return n("el-option",{key:t.id,attrs:{label:t.name,value:t.id}})}),1)],1)],1):t._e(),t._v(" "),n("div",[n("h3",{staticStyle:{display:"inline-block",width:"100px","vertical-align":"top","margin-top":"0"}},[t._v(" 出库产品 ")]),t._v(" "),n("div",{staticStyle:{display:"inline-block"}},[n("div",{staticStyle:{"margin-bottom":"5px"}},[n("div",{staticClass:"input-title input-title-extra-long"},[t._v("产品类型")]),t._v(" "),n("div",{staticClass:"input-title input-title-extra-long"},[t._v("产品分类")]),t._v(" "),n("div",{staticClass:"input-title input-title-extra-long"},[t._v("产品名称")]),t._v(" "),n("div",{staticClass:"input-title input-title-short"},[t._v("零售价")]),t._v(" "),n("div",{staticClass:"input-title input-title-short"},[t._v("数量")]),t._v(" "),n("div",{staticClass:"input-title input-title-short"},[t._v("产品优惠")]),t._v(" "),n("div",{staticClass:"input-title input-title-short"},[t._v("产品折扣")]),t._v(" "),n("div",{staticClass:"input-title input-title-extra-long"},[t._v("总价")])]),t._v(" "),t._l(t.temp.products,function(e,i){return n("el-form-item",{key:e.id,staticStyle:{"margin-bottom":"10px"},attrs:{label:"",prop:"product"}},[n("el-select",{staticClass:"filter-item",staticStyle:{width:"150px"},attrs:{placeholder:"产品类型",clearable:""},on:{change:function(n){return t.getSubType(e.product_type,e)},clear:function(n){return t.getSubType(e.product_type,e)}},model:{value:e.product_type,callback:function(n){t.$set(e,"product_type",n)},expression:"item.product_type"}},t._l(t.productTypes,function(t){return n("el-option",{key:t.id,attrs:{label:t.title,value:t.id}})}),1),t._v(" "),n("el-select",{staticClass:"filter-item inventory-in-input-extra",attrs:{placeholder:"产品分类",clearable:""},on:{change:function(n){return t.getProductBySubType(e.product_sub_type,e)},clear:function(n){return t.getProductBySubType(e.product_sub_type,e)}},model:{value:e.product_sub_type,callback:function(n){t.$set(e,"product_sub_type",n)},expression:"item.product_sub_type"}},t._l(t.productSubTypes,function(t){return n("el-option",{key:t.id,attrs:{label:t.title,value:t.id}})}),1),t._v(" "),n("el-select",{staticClass:"filter-item inventory-in-input-extra",attrs:{placeholder:"产品名称",clearable:""},on:{change:function(n){return t.readProductInfo(e)},clear:function(n){return t.readProductInfo(e)}},model:{value:e.product_id,callback:function(n){t.$set(e,"product_id",n)},expression:"item.product_id"}},t._l(t.products,function(t){return n("el-option",{key:t.id,attrs:{label:t.title,value:t.id}})}),1),t._v(" "),n("el-input",{staticClass:"filter-item inventory-in-input-short",attrs:{placeholder:"零售价",disabled:!0},model:{value:e.price,callback:function(n){t.$set(e,"price",n)},expression:"item.price"}}),t._v(" "),n("el-input",{staticClass:"filter-item inventory-in-input-short",attrs:{placeholder:"数量",clearable:""},on:{change:function(n){return t.calculateTotalPrice(e)}},model:{value:e.quantity,callback:function(n){t.$set(e,"quantity",n)},expression:"item.quantity"}}),t._v(" "),n("el-input",{staticClass:"filter-item inventory-in-input-short",attrs:{placeholder:"产品优惠",clearable:""},on:{change:function(n){return t.calculateTotalPrice(e)}},model:{value:e.discount,callback:function(n){t.$set(e,"discount",n)},expression:"item.discount"}}),t._v(" "),n("el-input",{staticClass:"filter-item inventory-in-input-short",attrs:{placeholder:"折扣率",clearable:""},on:{change:function(n){return t.calculateTotalPrice(e)}},model:{value:e.discount_rate,callback:function(n){t.$set(e,"discount_rate",n)},expression:"item.discount_rate"}}),t._v(" "),n("el-input",{staticClass:"filter-item inventory-in-input-extra",attrs:{placeholder:"总价",clearable:"",disabled:!0},model:{value:e.total_price,callback:function(n){t.$set(e,"total_price",n)},expression:"item.total_price"}}),t._v(" "),n("el-button",{staticStyle:{"margin-left":"10px"},attrs:{type:"danger",icon:"el-icon-delete"},on:{click:function(e){return t.removeProduct(i)}}})],1)}),t._v(" "),n("el-form-item",[n("el-button",{staticStyle:{width:"150px"},attrs:{type:"primary",plain:""},on:{click:t.addMoreProduct}},[t._v("添加产品")]),t._v(" "),n("div",[t._v(" 产品折扣为0-1，例如：9折，则填写0.9")]),t._v(" "),n("div",[t._v(" 总价 =（零售价 * 产品折扣 - 产品优惠）* 数量")])],1)],2),t._v(" "),n("div",{staticStyle:{"margin-bottom":"20px"}},[n("h3",{staticClass:"section-title"},[t._v(" 优惠信息 ")]),t._v(" "),n("div",{staticStyle:{display:"inline-block",width:"150px"}},[n("h3",{staticClass:"middle-title"},[t._v(" 订单优惠券 ")]),t._v(" "),n("el-input",{staticClass:"filter-item",attrs:{placeholder:"订单优惠券",clearable:""},on:{change:function(e){return t.calculateOrderPrice()}},model:{value:t.temp.coupon,callback:function(e){t.$set(t.temp,"coupon",e)},expression:"temp.coupon"}})],1),t._v(" "),n("div",{staticStyle:{"margin-left":"10px",display:"inline-block",width:"150px"}},[n("h3",{staticClass:"middle-title"},[t._v(" 订单折扣 ")]),t._v(" "),n("el-input",{staticClass:"filter-item",attrs:{placeholder:"订单折扣",clearable:""},on:{change:function(e){return t.calculateOrderPrice()}},model:{value:t.temp.discount,callback:function(e){t.$set(t.temp,"discount",e)},expression:"temp.discount"}})],1),t._v(" "),n("div",{staticStyle:{"margin-left":"10px",display:"inline-block",width:"150px"}},[n("h3",{staticClass:"middle-title"},[t._v(" 运费 ")]),t._v(" "),n("el-input",{staticClass:"filter-item",attrs:{placeholder:"运费",clearable:""},on:{change:function(e){return t.calculateOrderPrice()}},model:{value:t.temp.shipping_cost,callback:function(e){t.$set(t.temp,"shipping_cost",e)},expression:"temp.shipping_cost"}})],1),t._v(" "),n("div",{staticStyle:{"margin-left":"10px",display:"inline-block",width:"150px"}},[n("h3",{staticClass:"middle-title"},[t._v(" 其他费用 ")]),t._v(" "),n("el-input",{staticClass:"filter-item",attrs:{placeholder:"其他费用",clearable:""},on:{change:function(e){return t.calculateOrderPrice()}},model:{value:t.temp.other_cost,callback:function(e){t.$set(t.temp,"other_cost",e)},expression:"temp.other_cost"}})],1)]),t._v(" "),n("div",{staticStyle:{"margin-bottom":"20px"}},[n("h3",{staticClass:"section-title"},[t._v(" 汇总信息 ")]),t._v(" "),n("div",{staticStyle:{display:"inline-block",width:"150px"}},[n("h3",{staticClass:"middle-title"},[t._v(" 订单总价 ")]),t._v(" "),n("el-input",{staticClass:"filter-item",attrs:{placeholder:"订单总价",clearable:"",disabled:!0},model:{value:t.temp.order_total_price,callback:function(e){t.$set(t.temp,"order_total_price",e)},expression:"temp.order_total_price"}})],1),t._v(" "),n("div",{staticStyle:{"margin-left":"10px",display:"inline-block",width:"150px"}},[n("h3",{staticClass:"middle-title"},[t._v(" 订单总利润 ")]),t._v(" "),n("el-input",{staticClass:"filter-item",attrs:{placeholder:"订单总利润",clearable:"",disabled:!0},model:{value:t.temp.order_total_profit,callback:function(e){t.$set(t.temp,"order_total_profit",e)},expression:"temp.order_total_profit"}})],1),t._v(" "),n("div",{staticStyle:{"margin-left":"10px",display:"inline-block",width:"150px"}},[n("h3",{staticClass:"block-title"},[t._v(" 是否全额付款 ")]),t._v(" "),n("el-checkbox",{model:{value:t.temp.fully_paid,callback:function(e){t.$set(t.temp,"fully_paid",e)},expression:"temp.fully_paid"}},[t._v("全额付款")])],1),t._v(" "),n("div",{staticStyle:{"margin-left":"10px",display:"inline-block",width:"150px"}},[n("h3",{staticClass:"block-title"},[t._v(" 特殊状态 ")]),t._v(" "),n("el-checkbox",{model:{value:t.temp.special_type,callback:function(e){t.$set(t.temp,"special_type",e)},expression:"temp.special_type"}},[t._v("特殊状态")])],1)]),t._v(" "),n("div",[n("h3",{staticClass:"section-title"},[t._v(" 出库备注 ")]),t._v(" "),n("el-input",{staticStyle:{width:"70%"},attrs:{type:"textarea",autosize:{minRows:2,maxRows:4},placeholder:"备注"},model:{value:t.temp.note,callback:function(e){t.$set(t.temp,"note",e)},expression:"temp.note"}})],1)])]),t._v(" "),n("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[n("el-button",{on:{click:function(e){t.dialogFormVisible=!1}}},[t._v("\n        取消\n      ")]),t._v(" "),n("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.addSalesOrder()}}},[t._v("\n        提交\n      ")])],1)],1)],1)};i._withStripped=!0;n("rGqo");var l=n("23J+"),a=n("DyJX"),o=function(t){return new Promise(function(e,n){a.a.post("sales/all",t).then(function(t){return e(t)}).catch(function(t){return n(t)})})},r=function(t){return new Promise(function(e,n){a.a.post("sales/get_count",t).then(function(t){return e(t)}).catch(function(t){return n(t)})})},s=function(){return new Promise(function(t,e){a.a.post("sales/sales_types").then(function(e){return t(e)}).catch(function(t){return e(t)})})},c=n("xMja"),u=n("S4mp"),p=n("CQXc"),d=n("IQfF"),_=n("ZySA"),f=(n("7Qib"),n("Mz3J")),v=n("L2JU"),h={name:"ComplexTable",components:{Pagination:f.a},directives:{waves:_.a},filters:{},data:function(){return{tableKey:0,sales:null,total:0,listLoading:!0,salesTypes:[],productTypes:[],productSubTypes:[],selectedProducts:[],products:[],resalers:[],salesChannel:[],events:[],listQuery:{sales_id:void 0,sales_type:void 0,sales_channel_id:void 0,page:1,limit:10,product_type:void 0,product_sub_type:void 0,product:void 0,resaler_id:void 0,event_id:void 0},temp:{sales_type:void 0,products:[{product_type:"",product_sub_type:"",product_id:"",quantity:0,cost:void 0,price:void 0,discount:0,discount_rate:1,note:void 0,key:1,total_price:0}],order_total_price:0,order_total_profit:0,coupon:0,discount:1,shipping_cost:0,other_cost:0,sales_channel:void 0,resaler_id:void 0,event_id:void 0,note:void 0,fully_paid:!0,special_type:!1},dialogFormVisible:!1,rowSpans:null}},created:function(){this.getAllSales(),this.getSalesCount(),this.getProductTypes(),this.getSalesTypes(),this.getResalers(),this.getSalesChannels(),this.getEvents()},computed:Object(l.a)({},Object(v.b)(["id"])),methods:{calculateRowSpan:function(){var t=[],e=0;this.sales.forEach(function(n){var i=!1;if(t.forEach(function(t){t.id===n.id&&(i=!0,t.end++,t.rowSpan++,e=t.start+t.rowSpan)}),!i){var l={id:n.id,start:e,end:e+1,rowSpan:1};e++,t.push(l)}}),this.rowSpans=t},getAllSales:function(){var t=this;this.listLoading=!0,o(this.listQuery).then(function(e){t.sales=e.data,t.listLoading=!1,t.calculateRowSpan();var n=[];t.sales.forEach(function(t){t.total_price=(t.per_item_price_atm*t.per_product_discount_ratio-t.per_product_discount)*t.quantity,t.total_profit=t.total_price-t.per_item_cost_atm*t.quantity;var e=!1;if(n.forEach(function(n){n.id===t.id&&(e=!0,n.order_total_price=n.order_total_price+t.total_price,n.order_total_profit=n.order_total_profit+t.total_profit)}),!e){var i={id:t.id,order_total_price:t.total_price,order_total_profit:t.total_profit};n.push(i)}}),n.forEach(function(e){t.sales.forEach(function(t){e.id===t.id&&(t.order_total_price=e.order_total_price-t.coupon-t.discount,t.order_total_profit=e.order_total_profit-t.shipping_cost-t.other_cost)})})}).catch(function(e){t.$message({message:"getAllSales 读取库存失败，请联系徐神检查",type:"error"}),t.listLoading=!1})},getSalesTypes:function(){var t=this;s().then(function(e){t.salesTypes=e})},getSalesCount:function(){var t=this;r(this.listQuery).then(function(e){t.total=e.total})},getProductTypes:function(){var t=this;c.a.getAllProductType().then(function(e){t.productTypes=e})},getSubType:function(t,e){var n=this;this.selectedProducts=[],this.listQuery.product=void 0,this.productSubTypes=[],this.listQuery.product_sub_type=void 0,t&&c.a.getProductSubType({product_type_id:t}).then(function(t){n.productSubTypes=t}),e&&(e.product_sub_type=void 0,e.product_id=void 0,e.cost=void 0,e.size=void 0,e.quantity=0,e.total_price=0,e.discount=0,e.discount_ratio=1)},getSelectedProducts:function(t){var e=this;this.selectedProducts=[],this.listQuery.product=void 0,t&&c.a.getProductBySubType({product_sub_type:t}).then(function(t){e.selectedProducts=t})},getProductBySubType:function(t,e){var n=this;t&&c.a.getProductBySubType({product_sub_type:t}).then(function(t){n.products=t}),e&&(e.product_id=void 0,e.cost=void 0,e.size=void 0,e.quantity=0,e.total_price=0,e.discount=0,e.discount_ratio=1)},getResalers:function(){var t=this;u.a.getAllResalers().then(function(e){t.resalers=e})},getEvents:function(){var t=this;p.a.getAllEvents().then(function(e){t.events=e})},getSalesChannels:function(){var t=this;d.a.getAllSalesChannels().then(function(e){t.salesChannel=e})},readProductInfo:function(t){this.products.forEach(function(e){e.id===t.product_id&&(t.size=e.size,t.cost=e.cost,t.price=e.price)})},calculateTotalPrice:function(t){t.total_price=Math.round((t.price*t.discount_rate-t.discount)*t.quantity*100)/100,this.calculateOrderPrice()},calculateOrderPrice:function(){var t=0;this.temp.products.forEach(function(e){t+=e.total_price}),this.temp.order_total_price=t*this.temp.discount-this.temp.coupon,this.temp.order_total_profit=t*this.temp.discount-this.temp.coupon-this.temp.shipping_cost-this.temp.other_cost},objectSpanMethod:function(t){t.row,t.column;var e=t.rowIndex,n=t.columnIndex;if(n<4||n>=14&&n<22){var i={rowspan:0,colspan:0};return this.rowSpans.forEach(function(t){e>=t.start&&e<t.end&&(e-t.start)%t.rowSpan==0&&(i={rowspan:t.rowSpan,colspan:1})}),i}},handleFilter:function(){this.listQuery.page=1,this.getAllSales(),this.getSalesCount()},addMoreProduct:function(){this.temp.products.push({product_type:"",product_sub_type:"",product_id:"",quantity:void 0,cost:void 0,price:void 0,discount:0,discount_rate:1,note:void 0,key:this.temp.products.length+1,total_price:0})},removeProduct:function(t){this.$delete(this.temp.products,t)},handleCreate:function(){var t=this;this.dialogFormVisible=!0,this.$nextTick(function(){t.$refs.dataForm.clearValidate()})},addSalesOrder:function(){var t=this;this.$confirm("确定添加?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){t.sendAddSalesRequest()}).catch(function(){})},sendAddSalesRequest:function(){var t=this;if(this.temp.sales_type)if(0===this.temp.products.length)this.$message({message:"至少要有一个或以上的产品入库",type:"error"});else{var e={sales_order_data:{type:this.temp.sales_type,coupon:this.temp.coupon,discount:this.temp.discount,shipping_cost:this.temp.shipping_cost,other_cost:this.temp.other_cost,sales_channel_id:this.temp.sales_channel_id,resaler_id:this.temp.resaler_id,event_id:this.temp.event_id,fully_paid:this.temp.fully_paid?1:0,special_type:this.temp.special_type?1:0,added_by:this.id,note:this.temp.note},product_data:[]};this.temp.products.forEach(function(t){var n={product_id:t.product_id,quantity:t.quantity,cost:t.cost,price:t.price,discount:t.discount,discount_ratio:t.discount_rate};e.product_data.push(n)}),this.listLoading=!0,addNewInventoryRequest(e).then(function(e){t.listLoading=!1,t.$alert("库存添加成功","成功",{confirmButtonText:"确定",callback:function(e){t.page=1,t.getInventoryOut(),t.dialogFormVisible=!1,t.temp={inventory_in_type:void 0,products:[{product_type:"",product_sub_type:"",product_id:"",quantity:void 0,cost:void 0,size:"",key:1}],note:void 0,ordered_by:void 0}}})}).catch(function(e){t.$message({message:"添加库存失败，请联系徐神检查",type:"error"}),t.listLoading=!1})}else this.$message({message:"入库类型必须填写",type:"error"})}}},m=(n("9Uwk"),n("KHd+")),y=Object(m.a)(h,i,[],!1,null,"7e41e320",null);y.options.__file="src/views/sales/sales-order.vue";e.default=y.exports},xMja:function(t,e,n){"use strict";var i=n("DyJX");e.a={getAllProductType:function(){return new Promise(function(t,e){i.a.post("product/get_all_product_type").then(function(e){return t(e)}).catch(function(t){return e(t)})})},getProductSubType:function(t){return new Promise(function(e,n){i.a.post("product/get_product_sub_type",t).then(function(t){return e(t)}).catch(function(t){return n(t)})})},getProductBySubType:function(t){return new Promise(function(e,n){i.a.post("product/get_product_by_sub_type",t).then(function(t){return e(t)}).catch(function(t){return n(t)})})}}}}]);