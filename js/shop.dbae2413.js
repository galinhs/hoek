(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["shop"],{"0fa5":function(t,e,r){"use strict";r.r(e);var a=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("b-container",{attrs:{id:"shop"}},[r("b-row",{staticClass:"mt-5"},[r("b-col",{staticClass:"d-flex justify-content-center",attrs:{cols:"12",md:"3"}},[r("b-list-group",{staticClass:"list-group list-group-flush",attrs:{variant:"dark"}},[r("b-list-group-item",{attrs:{active:""===t.category,href:"#"},on:{click:function(e){t.category=""}}},[t._v("全部商品")]),r("b-list-group-item",{attrs:{active:"攝影書"===t.category,href:"#"},on:{click:function(e){t.category="攝影書"}}},[t._v("攝影書")]),r("b-list-group-item",{attrs:{active:"雜誌"===t.category,href:"#"},on:{click:function(e){t.category="雜誌"}}},[t._v("雜誌")]),r("b-list-group-item",{attrs:{active:"畫集"===t.category,href:"#"},on:{click:function(e){t.category="畫集"}}},[t._v("畫集")]),r("b-list-group-item",{attrs:{active:"其他"===t.category,href:"#"},on:{click:function(e){t.category="其他"}}},[t._v("其他")])],1)],1),t.isLoading?r("b-col",{attrs:{cols:"12",md:"9"}},[r("b-row",t._l(t.item,(function(t){return r("b-col",{attrs:{cols:"6",md:"4"}},[r("b-card",{staticClass:"border-0"},[r("b-skeleton-img"),r("b-skeleton",{staticClass:"mt-3 ml-3",attrs:{animation:"fade",width:"85%"}}),r("b-skeleton",{staticClass:"ml-5",attrs:{animation:"fade",width:"55%"}}),r("b-skeleton",{staticClass:"mt-2 ml-5",attrs:{animation:"fade",width:"40%"}})],1)],1)})),1)],1):t._e(),t.isLoading?t._e():r("b-col",{attrs:{cols:"12",md:"9"}},[r("b-row",t._l(t.filtered,(function(t){return r("b-col",{key:t._id,staticClass:"d-flex flex-column mb-3",attrs:{cols:"6",md:"4"}},[r("ProductCard",{staticClass:"border-0",attrs:{product:t}})],1)})),1)],1)],1)],1)},c=[],n=r("1da1"),o=(r("96cf"),r("4de4"),r("caad"),r("2532"),r("d81d"),r("99af"),function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("b-card",{staticClass:"product-card mx-auto h-100 mb-auto",attrs:{"no-body":""}},[r("router-link",{attrs:{to:"/product/"+t.product._id}},[r("div",{staticClass:"card-img"},[r("img",{attrs:{src:t.product.image[0]}})])]),r("b-card-body",{staticClass:"pt-3 pb-0 mb-auto text-center"},[r("router-link",{attrs:{to:"/product/"+t.product._id}},[r("b-card-title",[t._v(t._s(t.product.name))]),r("b-card-sub-title",[t._v(t._s(t.product.author))])],1)],1),r("b-card-text",{staticClass:"mx-auto mb-1"},[t._v(t._s("$"+t.product.price))]),r("b-btn",{staticClass:"ml-auto",attrs:{variant:"transparent"},on:{click:function(e){return t.addcart(t.product._id)}}},[r("b-icon-cart-fill")],1)],1)}),s=[],i={name:"ProductCard",props:{product:{type:Object,required:!0}},methods:{addcart:function(t){var e=this;return Object(n["a"])(regeneratorRuntime.mark((function r(){return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:if(0!==e.$store.state.jwt.token.length){r.next=3;break}return e.$swal({icon:"error",title:"請先登入"}),r.abrupt("return");case 3:return r.prev=3,r.next=6,e.axios.post("/users/cart",{product:t,amount:1},{headers:{authorization:"Bearer "+e.$store.state.jwt.token}});case 6:e.$swal({icon:"success",title:"已加入購物車"}),r.next=13;break;case 9:r.prev=9,r.t0=r["catch"](3),console.log(r.t0),e.$swal({icon:"error",title:"加入購物車失敗"});case 13:case"end":return r.stop()}}),r,null,[[3,9]])})))()}}},u=i,l=(r("64b4"),r("2877")),d=Object(l["a"])(u,o,s,!1,null,null,null),p=d.exports,m={name:"Shop",data:function(){return{products:[],category:"",isLoading:!1,item:["a","b","c","d","e","f"]}},components:{ProductCard:p},computed:{filtered:function(){var t=this;return this.products.filter((function(e){return e.category.includes(t.category)}))}},methods:{getProducts:function(){var t=this;return Object(n["a"])(regeneratorRuntime.mark((function e(){var r,a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,t.axios.get("/products");case 3:r=e.sent,a=r.data,t.products=a.result.map((function(t){return t.image&&(t.image=t.image.map((function(t){return"".concat("https://hoekgallery.herokuapp.com","/files/").concat(t)}))),t})),t.isLoading=!1,e.next=12;break;case 9:e.prev=9,e.t0=e["catch"](0),t.$swal({icon:"error",title:"錯誤",text:"取得商品失敗"});case 12:case"end":return e.stop()}}),e,null,[[0,9]])})))()}},mounted:function(){var t=this;return Object(n["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:t.getProducts();case 1:case"end":return e.stop()}}),e)})))()}},f=m,b=(r("ace4"),Object(l["a"])(f,a,c,!1,null,null,null));e["default"]=b.exports},1985:function(t,e,r){},"64b4":function(t,e,r){"use strict";r("1985")},"70ac":function(t,e,r){},ace4:function(t,e,r){"use strict";r("70ac")}}]);
//# sourceMappingURL=shop.dbae2413.js.map