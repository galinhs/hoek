(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["orders"],{"159d":function(e,t,r){"use strict";r.r(t);var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("b-container",{attrs:{fluid:"",id:"orders"}},[r("b-table",{attrs:{items:e.orders,fields:e.fields},scopedSlots:e._u([{key:"cell(products)",fn:function(t){return[r("ul",{staticClass:"formwidth"},e._l(t.item.products,(function(t){return r("li",[e._v(e._s(t.product.name)+" * "+e._s(t.amount))])})),0)]}}])}),r("b-row",{staticClass:"flex-column mt-5 pb-4",attrs:{id:"footer"}},[r("Footer")],1)],1)},a=[],o=r("1da1"),s=(r("96cf"),r("d81d"),r("fd2d")),c={name:"Orders",data:function(){return{orders:[],fields:[{key:"_id",label:"訂單編號"},{key:"date",label:"日期"},{key:"products",label:"商品"}]}},components:{Footer:s["a"]},mounted:function(){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function t(){var r,n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,e.axios.get("/orders",{headers:{authorization:"Bearer "+e.$store.state.jwt.token}});case 3:r=t.sent,n=r.data,e.orders=n.result.map((function(e){return e.date=new Date(e.date).toLocaleString(),e})),t.next=11;break;case 8:t.prev=8,t.t0=t["catch"](0),e.$swal({icon:"error",title:"錯誤",text:"取得訂單失敗"});case 11:case"end":return t.stop()}}),t,null,[[0,8]])})))()}},u=c,i=(r("2f5c"),r("2877")),d=Object(i["a"])(u,n,a,!1,null,null,null);t["default"]=d.exports},"2f5c":function(e,t,r){"use strict";r("8ffe")},"8ffe":function(e,t,r){}}]);
//# sourceMappingURL=orders.c1813c3e.js.map