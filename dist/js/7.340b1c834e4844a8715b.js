(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{"79C1":function(e,t,n){},"8tky":function(e,t,n){"use strict";(function(e){"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:void 0!==e||"undefined"!=typeof self&&self;var n,r=(function(e,t){e.exports=function e(t,n,r){var a,o,i=window,l="application/octet-stream",s=r||l,u=t,c=!n&&!r&&u,d=document.createElement("a"),p=function(e){return String(e)},f=i.Blob||i.MozBlob||i.WebKitBlob||p,h=n||"download";if(f=f.call?f.bind(i):Blob,"true"===String(this)&&(s=(u=[u,s])[0],u=u[1]),c&&c.length<2048&&(h=c.split("/").pop().split("?")[0],d.href=c,-1!==d.href.indexOf(c))){var _=new XMLHttpRequest;return _.open("GET",c,!0),_.responseType="blob",_.onload=function(t){e(t.target.response,h,l)},setTimeout(function(){_.send()},0),_}if(/^data:([\w+-]+\/[\w+.-]+)?[,;]/.test(u)){if(!(u.length>2096103.424&&f!==p))return navigator.msSaveBlob?navigator.msSaveBlob(v(u),h):b(u);u=v(u),s=u.type||l}else if(/([\x80-\xff])/.test(u)){for(var m=0,g=new Uint8Array(u.length),y=g.length;m<y;++m)g[m]=u.charCodeAt(m);u=new f([g],{type:s})}function v(e){for(var t=e.split(/[:;,]/),n=t[1],r="base64"==t[2]?atob:decodeURIComponent,a=r(t.pop()),o=a.length,i=0,l=new Uint8Array(o);i<o;++i)l[i]=a.charCodeAt(i);return new f([l],{type:n})}function b(e,t){if("download"in d)return d.href=e,d.setAttribute("download",h),d.className="download-js-link",d.innerHTML="downloading...",d.style.display="none",document.body.appendChild(d),setTimeout(function(){d.click(),document.body.removeChild(d),!0===t&&setTimeout(function(){i.URL.revokeObjectURL(d.href)},250)},66),!0;if(/(Version)\/(\d+)\.(\d+)(?:\.(\d+))?.*Safari\//.test(navigator.userAgent))return/^data:/.test(e)&&(e="data:"+e.replace(/^data:([\w\/\-\+]+)/,l)),window.open(e)||confirm("Displaying New Document\n\nUse Save As... to download, then click back to return to this page.")&&(location.href=e),!0;var n=document.createElement("iframe");document.body.appendChild(n),!t&&/^data:/.test(e)&&(e="data:"+e.replace(/^data:([\w\/\-\+]+)/,l)),n.src=e,setTimeout(function(){document.body.removeChild(n)},333)}if(a=u instanceof f?u:new f([u],{type:s}),navigator.msSaveBlob)return navigator.msSaveBlob(a,h);if(i.URL)b(i.URL.createObjectURL(a),!0);else{if("string"==typeof a||a.constructor===p)try{return b("data:"+s+";base64,"+i.btoa(a))}catch(e){return b("data:"+s+","+encodeURIComponent(a))}(o=new FileReader).onload=function(e){b(this.result)},o.readAsDataURL(a)}return!0}}(n={exports:{}},n.exports),n.exports);var a=function(e,t,n,r,a,o,i,l,s,u){"boolean"!=typeof i&&(s=l,l=i,i=!1);var c,d="function"==typeof n?n.options:n;if(e&&e.render&&(d.render=e.render,d.staticRenderFns=e.staticRenderFns,d._compiled=!0,a&&(d.functional=!0)),r&&(d._scopeId=r),o?(c=function(e){(e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),t&&t.call(this,s(e)),e&&e._registeredComponents&&e._registeredComponents.add(o)},d._ssrRegister=c):t&&(c=i?function(){t.call(this,u(this.$root.$options.shadowRoot))}:function(e){t.call(this,l(e))}),c)if(d.functional){var p=d.render;d.render=function(e,t){return c.call(t),p(e,t)}}else{var f=d.beforeCreate;d.beforeCreate=f?[].concat(f,c):[c]}return n};const o={props:{type:{type:String,default:"xls"},data:{type:Array,required:!1,default:null},fields:{type:Object,default:()=>null},exportFields:{type:Object,default:()=>null},defaultValue:{type:String,required:!1,default:""},header:{default:null},footer:{default:null},name:{type:String,default:"data.xls"},fetch:{type:Function},meta:{type:Array,default:()=>[]},worksheet:{type:String,default:"Sheet1"},beforeGenerate:{type:Function},beforeFinish:{type:Function},escapeCsv:{type:Boolean,default:!0},stringifyLongNum:{type:Boolean,default:!1}},computed:{idName:()=>"export_"+(new Date).getTime(),downloadFields(){return this.fields?this.fields:this.exportFields?this.exportFields:void 0}},methods:{async generate(){"function"==typeof this.beforeGenerate&&await this.beforeGenerate();let e=this.data;if("function"!=typeof this.fetch&&e||(e=await this.fetch()),!e||!e.length)return;let t=this.getProcessedJson(e,this.downloadFields);return"html"===this.type?this.export(this.jsonToXLS(t),this.name.replace(".xls",".html"),"text/html"):"csv"===this.type?this.export(this.jsonToCSV(t),this.name.replace(".xls",".csv"),"application/csv"):this.export(this.jsonToXLS(t),this.name,"application/vnd.ms-excel")},export:async function(e,t,n){let a=this.base64ToBlob(e,n);"function"==typeof this.beforeFinish&&await this.beforeFinish(),r(a,t,n)},jsonToXLS(e){let t="<thead>";const n=Object.keys(e[0]).length;let r=this;const a=this.header||this.$attrs.title;a&&(t+=this.parseExtraData(a,'<tr><th colspan="'+n+'">${data}</th></tr>')),t+="<tr>";for(let n in e[0])t+="<th>"+n+"</th>";return t+="</tr>",t+="</thead>",t+="<tbody>",e.map(function(e,n){t+="<tr>";for(let n in e)t+="<td>"+r.preprocessLongNum(r.valueReformattedForMultilines(e[n]))+"</td>";t+="</tr>"}),t+="</tbody>",null!=this.footer&&(t+="<tfoot>",t+=this.parseExtraData(this.footer,'<tr><td colspan="'+n+'">${data}</td></tr>'),t+="</tfoot>"),'<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><meta name=ProgId content=Excel.Sheet> <meta name=Generator content="Microsoft Excel 11"><meta http-equiv="Content-Type" content="text/html; charset=UTF-8">\x3c!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>${worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--\x3e<style>br {mso-data-placement: same-cell;}</style></head><body><table>${table}</table></body></html>'.replace("${table}",t).replace("${worksheet}",this.worksheet)},jsonToCSV(e){let t=this;var n=[];const r=this.header||this.$attrs.title;r&&n.push(this.parseExtraData(r,"${data}\r\n"));for(let t in e[0])n.push(t),n.push(",");return n.pop(),n.push("\r\n"),e.map(function(e){for(let r in e){let a=e[r]+"";t.escapeCsv&&(a='="'+a+'"').match(/[,"\n]/)&&(a='"'+a.replace(/\"/g,'""')+'"'),n.push(a),n.push(",")}n.pop(),n.push("\r\n")}),null!=this.footer&&n.push(this.parseExtraData(this.footer,"${data}\r\n")),n.join("")},getProcessedJson(e,t){let n=this.getKeys(e,t),r=[],a=this;return e.map(function(e,t){let o={};for(let t in n){let r=n[t];o[t]=a.getValue(r,e)}r.push(o)}),r},getKeys(e,t){if(t)return t;let n={};for(let t in e[0])n[t]=t;return n},parseExtraData(e,t){let n="";if(Array.isArray(e))for(var r=0;r<e.length;r++)e[r]&&(n+=t.replace("${data}",e[r]));else n+=t.replace("${data}",e);return n},getValue(e,t){const n="object"!=typeof e?e:e.field;let r="string"!=typeof n?[]:n.split("."),a=this.defaultValue;return a=n?r.length>1?this.getValueFromNestedItem(t,r):this.parseValue(t[n]):t,e.hasOwnProperty("callback")&&(a=this.getValueFromCallback(a,e.callback)),a},valueReformattedForMultilines:e=>"string"==typeof e?e.replace(/\n/gi,"<br/>"):e,preprocessLongNum(e){if(this.stringifyLongNum){if(String(e).startsWith("0x"))return e;if(!isNaN(e)&&""!=e&&(e>99999999999||e<1e-13))return'="'+e+'"'}return e},getValueFromNestedItem(e,t){let n=e;for(let e of t)n&&(n=n[e]);return this.parseValue(n)},getValueFromCallback(e,t){if("function"!=typeof t)return this.defaultValue;const n=t(e);return this.parseValue(n)},parseValue(e){return e||0===e||"boolean"==typeof e?e:this.defaultValue},base64ToBlob(e,t){let n=window.btoa(window.unescape(encodeURIComponent(e))),r=atob(n),a=r.length,o=new Uint8ClampedArray(a);for(;a--;)o[a]=r.charCodeAt(a);return new Blob([o],{type:t})}}};var i=function(){var e=this.$createElement;return(this._self._c||e)("div",{attrs:{id:this.idName},on:{click:this.generate}},[this._t("default",[this._v(" Download "+this._s(this.name)+" ")])],2)};i._withStripped=!0;var l=a({render:i,staticRenderFns:[]},void 0,o,void 0,!1,void 0,void 0,void 0);t.a=l}).call(this,n("yLpj"))},S4mp:function(e,t,n){"use strict";var r=n("DyJX");t.a={getAllResalers:function(e){return new Promise(function(t,n){r.a.post("resaler/get_all",e).then(function(e){return t(e)}).catch(function(e){return n(e)})})},getResalersCount:function(e){return new Promise(function(t,n){r.a.post("resaler/get_count",e).then(function(e){return t(e)}).catch(function(e){return n(e)})})},addResaler:function(e){return new Promise(function(t,n){r.a.post("resaler/add",e).then(function(e){return t(e)}).catch(function(e){return n(e)})})},deleteResaler:function(e){return new Promise(function(t,n){var a={id:e};r.a.post("resaler/delete",a).then(function(e){return t(e)}).catch(function(e){return n(e)})})},getAllResalerRegions:function(e){return new Promise(function(t,n){r.a.post("resaler/get_all_regions",e).then(function(e){return t(e)}).catch(function(e){return n(e)})})},getResalerRegionsCount:function(){return new Promise(function(e,t){r.a.post("resaler/get_region_count").then(function(t){return e(t)}).catch(function(e){return t(e)})})},addResalerRegion:function(e){return new Promise(function(t,n){r.a.post("resaler/add_region",e).then(function(e){return t(e)}).catch(function(e){return n(e)})})},addResalerRegionManager:function(e){return new Promise(function(t,n){r.a.post("resaler/add_region_manager",e).then(function(e){return t(e)}).catch(function(e){return n(e)})})},removeResalerRegionManager:function(e){return new Promise(function(t,n){r.a.post("resaler/remove_region_manager",e).then(function(e){return t(e)}).catch(function(e){return n(e)})})},getAllResalerAreas:function(e){return new Promise(function(t,n){r.a.post("resaler/get_all_areas",e).then(function(e){return t(e)}).catch(function(e){return n(e)})})},getResalerAreasCount:function(){return new Promise(function(e,t){r.a.post("resaler/get_area_count").then(function(t){return e(t)}).catch(function(e){return t(e)})})},addResalerArea:function(e){return new Promise(function(t,n){r.a.post("resaler/add_area",e).then(function(e){return t(e)}).catch(function(e){return n(e)})})},addResalerAreaManager:function(e){return new Promise(function(t,n){r.a.post("resaler/add_area_manager",e).then(function(e){return t(e)}).catch(function(e){return n(e)})})},removeResalerAreaManager:function(e){return new Promise(function(t,n){r.a.post("resaler/remove_area_manager",e).then(function(e){return t(e)}).catch(function(e){return n(e)})})},getResalerTypes:function(){return new Promise(function(e,t){r.a.post("resaler/get_all_types").then(function(t){return e(t)}).catch(function(e){return t(e)})})}}},Tu2r:function(e,t,n){"use strict";n.r(t);var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"app-container"},[n("div",{staticClass:"filter-container"},[n("h2",[e._v("筛选结果")]),e._v(" "),n("el-date-picker",{staticClass:"filter-item",staticStyle:{"margin-left":"15px"},attrs:{type:"monthrange","range-separator":"至","start-placeholder":"开始月份","end-placeholder":"结束月份"},model:{value:e.listQuery.date,callback:function(t){e.$set(e.listQuery,"date",t)},expression:"listQuery.date"}}),e._v(" "),n("el-input",{staticClass:"filter-item",staticStyle:{width:"150px","margin-left":"15px"},attrs:{placeholder:"订单编号"},model:{value:e.listQuery.resaler_sales_id,callback:function(t){e.$set(e.listQuery,"resaler_sales_id",t)},expression:"listQuery.resaler_sales_id"}}),e._v(" "),n("el-select",{staticClass:"filter-item",staticStyle:{width:"150px","margin-left":"15px"},attrs:{placeholder:"分销大区",clearable:""},on:{change:function(t){return e.getAreas(e.listQuery.region_id)}},model:{value:e.listQuery.region_id,callback:function(t){e.$set(e.listQuery,"region_id",t)},expression:"listQuery.region_id"}},e._l(e.resalerRegions,function(e){return n("el-option",{key:e.id,attrs:{label:e.title,value:e.id}})}),1),e._v(" "),n("el-select",{staticClass:"filter-item",staticStyle:{width:"150px","margin-left":"15px"},attrs:{placeholder:"分销地区",clearable:""},on:{change:function(t){return e.getResalers(e.listQuery.resaler_region_id,e.listQuery.area_id)}},model:{value:e.listQuery.area_id,callback:function(t){e.$set(e.listQuery,"area_id",t)},expression:"listQuery.area_id"}},e._l(e.resalerAreas,function(e){return n("el-option",{key:e.id,attrs:{label:e.title,value:e.id}})}),1),e._v(" "),n("el-select",{staticClass:"filter-item",staticStyle:{width:"150px","margin-left":"15px"},attrs:{placeholder:"分销渠道",clearable:""},model:{value:e.listQuery.resaler_id,callback:function(t){e.$set(e.listQuery,"resaler_id",t)},expression:"listQuery.resaler_id"}},e._l(e.resalers,function(e){return n("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})}),1),e._v(" "),n("el-select",{staticClass:"filter-item",staticStyle:{width:"150px","margin-left":"15px"},attrs:{placeholder:"地区经理",clearable:""},model:{value:e.listQuery.area_manager_atm,callback:function(t){e.$set(e.listQuery,"area_manager_atm",t)},expression:"listQuery.area_manager_atm"}},e._l(e.areaManager,function(e){return n("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})}),1),e._v(" "),n("el-select",{staticClass:"filter-item",staticStyle:{width:"150px","margin-left":"15px"},attrs:{placeholder:"大区经理",clearable:""},model:{value:e.listQuery.region_manager_atm,callback:function(t){e.$set(e.listQuery,"region_manager_atm",t)},expression:"listQuery.region_manager_atm"}},e._l(e.regionManager,function(e){return n("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})}),1),e._v(" "),n("el-select",{staticClass:"filter-item",staticStyle:{width:"150px","margin-left":"15px"},attrs:{placeholder:"产品类型",clearable:""},on:{change:function(t){return e.getSubType(e.listQuery.product_type)}},model:{value:e.listQuery.product_type,callback:function(t){e.$set(e.listQuery,"product_type",t)},expression:"listQuery.product_type"}},e._l(e.productTypes,function(e){return n("el-option",{key:e.id,attrs:{label:e.title,value:e.id}})}),1),e._v(" "),n("el-select",{staticClass:"filter-item",staticStyle:{width:"150px","margin-left":"15px"},attrs:{placeholder:"产品分类",clearable:""},on:{change:function(t){return e.getSelectedProducts(e.listQuery.product_sub_type)}},model:{value:e.listQuery.product_sub_type,callback:function(t){e.$set(e.listQuery,"product_sub_type",t)},expression:"listQuery.product_sub_type"}},e._l(e.productSubTypes,function(e){return n("el-option",{key:e.id,attrs:{label:e.title,value:e.id}})}),1),e._v(" "),n("el-select",{staticClass:"filter-item",staticStyle:{width:"150px","margin-left":"15px"},attrs:{placeholder:"产品",clearable:""},model:{value:e.listQuery.product,callback:function(t){e.$set(e.listQuery,"product",t)},expression:"listQuery.product"}},e._l(e.selectedProducts,function(e){return n("el-option",{key:e.id,attrs:{label:e.title,value:e.id}})}),1),e._v(" "),n("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",staticStyle:{width:"100px","margin-left":"15px"},attrs:{type:"primary",icon:"el-icon-search"},on:{click:e.handleFilter}},[e._v("\n      搜索\n    ")]),e._v(" "),e.dataForExcel&&e.dataForExcel.length>0?n("downloadexcel",{staticClass:"downloadExcelBtn",attrs:{data:e.dataForExcel,"before-finish":e.finishDownload}},[e._v("\n      导出数据到Excel\n    ")]):e._e()],1),e._v(" "),n("h2",[e._v("销售详情")]),e._v(" "),n("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],key:e.tableKey,staticStyle:{width:"100%"},attrs:{data:e.sales,"span-method":e.objectSpanMethod,border:"",fit:""}},[n("el-table-column",{attrs:{label:"订单ID",prop:"id",width:"80px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var r=t.row;return[n("span",[e._v(e._s(r.id))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"分销渠道",prop:"sales_type",width:"150px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var r=t.row;return[n("span",[e._v(e._s(r.name))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"订单总价",width:"100px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var r=t.row;return[n("span",[e._v("￥"+e._s(r.order_total_revenue))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"所属地区",prop:"sales_type",width:"150px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var r=t.row;return[n("span",[e._v(e._s(r.area_title))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"订单归属地区经理",prop:"sales_type",width:"150px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var r=t.row;return[n("span",[e._v(e._s(r.area_manager_atm_name))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"所属大区",prop:"sales_type",width:"150px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var r=t.row;return[n("span",[e._v(e._s(r.region_title))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"订单归属大区经理",prop:"sales_type",width:"150px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var r=t.row;return[n("span",[e._v(e._s(r.region_manager_atm_name))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"销售时间",prop:"sales_type",width:"100px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var r=t.row;return[n("span",[e._v(e._s(e.moment(r.date).format("YYYY-MM-DD")))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"产品类型",width:"100px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var r=t.row;return[n("el-tag",{staticClass:"tag",attrs:{color:r.tag_color}},[e._v(e._s(r.product_type))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"产品细类",width:"140px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var r=t.row;return[n("el-tag",{staticClass:"sub_type_tag",attrs:{color:r.sub_type_tag_color}},[e._v(e._s(r.product_sub_type))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"产品名称",width:"150px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var r=t.row;return[n("span",{staticClass:"link-type",on:{click:function(t){return e.handleUpdate(r)}}},[e._v(e._s(r.product_title))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"产品型号",width:"100px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var r=t.row;return[n("span",[e._v(e._s(r.size))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"销售数量",width:"100px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var r=t.row;return[n("span",[e._v(e._s(r.quantity))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"赠送数量",width:"100px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var r=t.row;return[n("span",[e._v(e._s(r.promotion_quantity))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"销售价格",width:"100px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var r=t.row;return[n("span",[e._v("￥"+e._s(r.per_item_price_atm))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"单品折扣率",width:"100px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var r=t.row;return[n("span",[e._v(e._s(1==r.per_product_discount_ratio?"原价":0==r.per_product_discount_ratio?"免费赠品":1*Math.floor(100*r.per_product_discount_ratio)/100*10+"折"))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"单品总价",width:"100px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var r=t.row;return[n("span",[e._v("￥"+e._s(r.total_price))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"支付公司",width:"200px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var r=t.row;return[n("span",[e._v(e._s(r.payment_company_title))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"支付渠道",width:"150px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var r=t.row;return[n("span",[e._v(e._s(r.payment_channel_title))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"全额付款",width:"100px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var r=t.row;return[n("span",[e._v(e._s(1===r.fully_paid?"是":"否"))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"云仓订单编号",width:"200px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var r=t.row;return[n("span",[e._v(e._s(r.deliver_tracking_code))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"备注",width:"250px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var r=t.row;return[n("span",[e._v(e._s(r.note))])]}}])})],1),e._v(" "),n("pagination",{directives:[{name:"show",rawName:"v-show",value:e.total>0,expression:"total>0"}],attrs:{total:e.total,page:e.listQuery.page,limit:e.listQuery.limit},on:{"update:page":function(t){return e.$set(e.listQuery,"page",t)},"update:limit":function(t){return e.$set(e.listQuery,"limit",t)},pagination:e.getAllSales}})],1)};r._withStripped=!0;n("f3/d"),n("rGqo");var a=n("23J+"),o=n("xUCC"),i=n("xMja"),l=n("S4mp"),s=n("gZTm"),u=n("wk8/"),c=n("ZySA"),d=n("Mz3J"),p=n("L2JU"),f=n("wd/R"),h=n.n(f),_=n("8tky"),m={name:"ComplexTable",components:{Pagination:d.a,downloadexcel:_.a},directives:{waves:c.a},filters:{},data:function(){return{tableKey:0,sales:null,dataForExcel:null,total:0,listLoading:!0,productTypes:[],productSubTypes:[],products:[],resalers:[],resalerRegions:[],resalerAreas:[],areaManager:[],regionManager:[],selectedProducts:[],listQuery:{page:1,limit:10,resaler_sales_id:void 0,product_type:void 0,product_sub_type:void 0,area_id:void 0,region_id:void 0,resaler_id:void 0,area_manager_atm:void 0,region_manager_atm:void 0},rowSpans:null}},created:function(){},computed:Object(a.a)({},Object(p.b)(["id","role"])),beforeRouteEnter:function(e,t,n){n(function(e){e.getAllSales(),e.getSalesCount(),e.getProductTypes(),e.getResalers(),e.getAreas(),e.getRegions(),e.getSalesAreaManager(),e.getSalesRegionManager(),n()})},methods:{calculateRowSpan:function(){var e=[],t=0;this.sales.forEach(function(n){var r=!1;if(e.forEach(function(e){e.id===n.id&&(r=!0,e.end++,e.rowSpan++,t=e.start+e.rowSpan)}),!r){var a={id:n.id,start:t,end:t+1,rowSpan:1};t++,e.push(a)}}),this.rowSpans=e},getAllSales:function(){var e=this;this.listLoading=!0,this.listQuery.date&&this.listQuery.date.length>1&&(this.listQuery.start_date=h()(this.listQuery.date[0]).format("YYYY-MM-DD"),this.listQuery.end_date=h()(this.listQuery.date[1]).format("YYYY-MM-DD")),o.a.getAllResalerSales(this.listQuery).then(function(t){e.sales=t,e.listLoading=!1,e.calculateRowSpan(),e.prepareExcelData()}).catch(function(t){e.$message({message:"getAllSales 读取库存失败，请联系徐神检查",type:"error"}),e.listLoading=!1})},getSalesCount:function(){var e=this;this.listQuery.date&&this.listQuery.date.length>1&&(this.listQuery.start_date=h()(this.listQuery.date[0]).format("YYYY-MM-DD"),this.listQuery.end_date=h()(this.listQuery.date[1]).format("YYYY-MM-DD")),o.a.getAllResalerSalesCount(this.listQuery).then(function(t){e.total=t.total})},prepareExcelData:function(){var e=this;this.dataForExcel=[],this.sales.forEach(function(t){var n=!1;if(e.dataForExcel.forEach(function(e){e.id===t.id&&(n=!0)}),!n){var r={id:t.id,region_title:t.region_title,region_manager_atm_name:t.region_manager_atm_name,area_title:t.area_title,area_manager_atm_name:t.area_manager_atm_name,resaler_name:t.name,order_total_price:t.order_total_price,order_total_profit:t.order_total_profit,deliver_tracking_code:t.deliver_tracking_code,note:t.note};e.dataForExcel.push(r)}})},getAreas:function(e){var t=this;l.a.getAllResalerAreas({region_id:e,page:1,limit:1e4}).then(function(e){t.resalerAreas=e}).catch(function(e){})},getRegions:function(){var e=this;l.a.getAllResalerRegions({page:1,limit:1e4}).then(function(t){e.resalerRegions=t}).catch(function(e){})},getSalesAreaManager:function(){var e=this;u.a.getAccounts({role:[4,5]}).then(function(t){e.areaManager=t})},getSalesRegionManager:function(){var e=this;u.a.getAccounts({role:[5]}).then(function(t){e.regionManager=t})},getProductTypes:function(){var e=this;i.a.getAllProductType().then(function(t){e.productTypes=t})},getSubType:function(e){this.selectedProducts=[],this.listQuery.product=void 0,this.listQuery.product_sub_type=void 0,this.productSubTypes=e.product_type.sub_type,e&&(e.product_sub_type=void 0,e.product_id=void 0,e.cost=void 0,e.size=void 0,e.quantity=0,e.total_price=0,e.discount=0,e.discount_rate=1)},getSelectedProducts:function(e){var t=this;this.selectedProducts=[],this.listQuery.product=void 0,e&&i.a.getProductBySubType({product_sub_type:e}).then(function(e){t.selectedProducts=e})},getProductBySubType:function(e,t){this.products=e.products,t&&(t.product_id=void 0,t.cost=void 0,t.size=void 0,t.quantity=0,t.total_price=0,t.discount=0,t.discount_rate=1)},getResalers:function(e,t){var n=this;l.a.getAllResalers({region_id:e,area_id:t}).then(function(e){n.resalers=e})},readProductInfo:function(e){this.products.forEach(function(t){t.id===e.product.id&&(e.product_id=t.id,e.size=t.size,e.cost=t.cost,e.price=t.price)})},objectSpanMethod:function(e){e.row,e.column;var t=e.rowIndex,n=e.columnIndex;if(n<7||n>=16&&n<=23){var r={rowspan:0,colspan:0};return this.rowSpans.forEach(function(e){t>=e.start&&t<e.end&&(t-e.start)%e.rowSpan==0&&(r={rowspan:e.rowSpan,colspan:1})}),r}},handleFilter:function(){this.listQuery.page=1,this.getAllSales(),this.getSalesCount()},clearFullyPaid:function(){this.listQuery.fully_paid=void 0},clearSpecialType:function(){this.listQuery.special_type=void 0},searchMember:function(e){var t=this;this.isSearchingMember=!0,e.length>3&&s.a.searchMemberByCellphone({cellphone:e}).then(function(e){t.isSearchingMember=!1,t.members=e,t.members.forEach(function(e){e.searchValue=e.cellphone+" | "+e.name})}).catch(function(e){t.$message({message:"搜索失败，请联系徐神检查",type:"error"}),t.isSearchingMember=!1})},selectMember:function(e){this.temp.member_name=e.name,this.temp.member_cellphone=e.cellphone},finishDownload:function(){alert("下载完成")}}},g=(n("xj5x"),n("KHd+")),y=Object(g.a)(m,r,[],!1,null,"9314a9ea",null);y.options.__file="src/views/sales/resaler-sales-order.vue";t.default=y.exports},ZySA:function(e,t,n){"use strict";n("jUE0");var r="@@wavesContext";function a(e,t){function n(n){var r=Object.assign({},t.value),a=Object.assign({ele:e,type:"hit",color:"rgba(0, 0, 0, 0.15)"},r),o=a.ele;if(o){o.style.position="relative",o.style.overflow="hidden";var i=o.getBoundingClientRect(),l=o.querySelector(".waves-ripple");switch(l?l.className="waves-ripple":((l=document.createElement("span")).className="waves-ripple",l.style.height=l.style.width=Math.max(i.width,i.height)+"px",o.appendChild(l)),a.type){case"center":l.style.top=i.height/2-l.offsetHeight/2+"px",l.style.left=i.width/2-l.offsetWidth/2+"px";break;default:l.style.top=(n.pageY-i.top-l.offsetHeight/2-document.documentElement.scrollTop||document.body.scrollTop)+"px",l.style.left=(n.pageX-i.left-l.offsetWidth/2-document.documentElement.scrollLeft||document.body.scrollLeft)+"px"}return l.style.backgroundColor=a.color,l.className="waves-ripple z-active",!1}}return e[r]?e[r].removeHandle=n:e[r]={removeHandle:n},n}var o={bind:function(e,t){e.addEventListener("click",a(e,t),!1)},update:function(e,t){e.removeEventListener("click",e[r].removeHandle,!1),e.addEventListener("click",a(e,t),!1)},unbind:function(e){e.removeEventListener("click",e[r].removeHandle,!1),e[r]=null,delete e[r]}},i=function(e){e.directive("waves",o)};window.Vue&&(window.waves=o,Vue.use(i)),o.install=i;t.a=o},jUE0:function(e,t,n){},xMja:function(e,t,n){"use strict";var r=n("DyJX");t.a={addProduct:function(e){return new Promise(function(t,n){r.a.post("product/add",e).then(function(e){return t(e)}).catch(function(e){return n(e)})})},getAllProducts:function(e){return new Promise(function(t,n){r.a.post("product/get_all_products",e).then(function(e){return t(e)}).catch(function(e){return n(e)})})},getAllProductCount:function(e){return new Promise(function(t,n){r.a.post("product/get_all_products_count",e).then(function(e){return t(e)}).catch(function(e){return n(e)})})},getAllProductsBySubType:function(e){return new Promise(function(t,n){r.a.post("product/get_all_products_by_sub_type",{sub_type:e}).then(function(e){return t(e)}).catch(function(e){return n(e)})})},getAllProductType:function(e){return new Promise(function(t,n){r.a.post("product/get_all_product_type",{storage_type:e}).then(function(e){return t(e)}).catch(function(e){return n(e)})})},getAllProductTypeCount:function(){return new Promise(function(e,t){r.a.post("product/get_all_product_type_count").then(function(t){return e(t)}).catch(function(e){return t(e)})})},getProductSubType:function(e){return new Promise(function(t,n){r.a.post("product/get_product_sub_type",e).then(function(e){return t(e)}).catch(function(e){return n(e)})})},getAllProductSubType:function(e){return new Promise(function(t,n){r.a.post("product/get_all_product_sub_type",e).then(function(e){return t(e)}).catch(function(e){return n(e)})})},getAllProductSubTypeCount:function(){return new Promise(function(e,t){r.a.post("product/get_product_sub_type_count").then(function(t){return e(t)}).catch(function(e){return t(e)})})},getProductBySubType:function(e){return new Promise(function(t,n){r.a.post("product/get_product_by_sub_type",e).then(function(e){return t(e)}).catch(function(e){return n(e)})})},addProductType:function(e){return new Promise(function(t,n){r.a.post("product/add_product_type",e).then(function(e){return t(e)}).catch(function(e){return n(e)})})},addProductSubType:function(e){return new Promise(function(t,n){r.a.post("product/add_product_sub_type",e).then(function(e){return t(e)}).catch(function(e){return n(e)})})},getTestingProductsByType:function(e){return new Promise(function(t,n){r.a.post("product/get_testing_product_by_type",{type:e}).then(function(e){return t(e)}).catch(function(e){return n(e)})})}}},xj5x:function(e,t,n){"use strict";var r=n("79C1");n.n(r).a}}]);