(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["orders"],{"159d":function(e,t,r){"use strict";r.r(t);var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("b-container",{attrs:{fluid:"",id:"orders"}},[r("b-table",{attrs:{items:e.orders,fields:e.fields},scopedSlots:e._u([{key:"cell(products)",fn:function(t){return[r("ul",{staticClass:"formwidth px-0"},e._l(t.item.products,(function(t){return r("li",[e._v(e._s(t.product.name)+" * "+e._s(t.amount))])})),0)]}},{key:"cell(details)",fn:function(t){return[r("ul",{staticClass:"formwidth px-0"},[r("li",[e._v(e._s(t.item.receiver))]),r("li",[e._v(e._s(t.item.phone))]),r("li",[e._v(e._s(t.item.delivery))]),r("li",[e._v(e._s(t.item.payment))])])]}}])}),r("b-row",{staticClass:"flex-column mt-5 pb-4 fixed-bottom",attrs:{id:"footer"}},[r("Footer")],1)],1)},s=[],a=r("1da1"),o=(r("96cf"),r("d81d"),r("fd2d")),i={name:"Orders",data:function(){return{orders:[],fields:[{key:"_id",label:"訂單編號"},{key:"date",label:"日期"},{key:"products",label:"商品"},{key:"details",label:"訂購資料"}]}},components:{Footer:o["a"]},mounted:function(){var e=this;return Object(a["a"])(regeneratorRuntime.mark((function t(){var r,n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,e.axios.get("/orders",{headers:{authorization:"Bearer "+e.$store.state.jwt.token}});case 3:r=t.sent,n=r.data,e.orders=n.result.map((function(e){return e.date=new Date(e.date).toLocaleString(),e})),t.next=11;break;case 8:t.prev=8,t.t0=t["catch"](0),e.$swal({icon:"error",title:"錯誤",text:"取得訂單失敗"});case 11:case"end":return t.stop()}}),t,null,[[0,8]])})))()}},l=i,c=(r("2f5c"),r("2877")),u=Object(c["a"])(l,n,s,!1,null,null,null);t["default"]=u.exports},"2f5c":function(e,t,r){"use strict";r("8ffe")},"8ffe":function(e,t,r){}}]);
//# sourceMappingURL=orders.95b03cc3.js.map