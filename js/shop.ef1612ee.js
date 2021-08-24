(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["shop"],{"0fa5":function(t,e,r){"use strict";r.r(e);var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("b-container",{attrs:{id:"shop"}},[r("b-row",{staticClass:"mt-5"},[r("b-col",{staticClass:"d-flex justify-content-center",attrs:{cols:"12",md:"3"}},[r("b-list-group",{attrs:{variant:"dark"}},[r("b-list-group-item",{attrs:{active:""===t.category,href:"#"},on:{click:function(e){t.category=""}}},[t._v("全部商品")]),r("b-list-group-item",{attrs:{active:"攝影書"===t.category,href:"#"},on:{click:function(e){t.category="攝影書"}}},[t._v("攝影書")]),r("b-list-group-item",{attrs:{active:"雜誌"===t.category,href:"#"},on:{click:function(e){t.category="雜誌"}}},[t._v("雜誌")]),r("b-list-group-item",{attrs:{active:"畫集"===t.category,href:"#"},on:{click:function(e){t.category="畫集"}}},[t._v("畫集")]),r("b-list-group-item",{attrs:{active:"其他"===t.category,href:"#"},on:{click:function(e){t.category="其他"}}},[t._v("其他")])],1)],1),t.isLoading?r("b-col",{attrs:{cols:"12",md:"9"}},[r("b-row",t._l(t.products,(function(t){return r("b-col",{attrs:{cols:"6",md:"4"}},[r("b-card",[r("b-row",[r("b-col",{attrs:{cols:"12"}},[r("b-skeleton-img")],1)],1),r("b-row",{staticClass:"text-center"},[r("b-col",{staticClass:"mt-3",attrs:{cols:"12"}},[r("b-skeleton",{staticClass:"ml-3",attrs:{animation:"fade",width:"85%"}}),r("b-skeleton",{staticClass:"ml-5",attrs:{animation:"fade",width:"55%"}}),r("b-skeleton",{staticClass:"mt-2 ml-5",attrs:{animation:"fade",width:"40%"}})],1)],1)],1)],1)})),1)],1):t._e()],1)],1)},a=[],c=r("1da1"),o=(r("96cf"),r("4de4"),r("caad"),r("2532"),r("d81d"),r("99af"),function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("b-card",{staticClass:"product-card mx-auto d-flex align-items-center"},[r("div",{staticClass:"card-img"},[r("img",{attrs:{src:t.product.image[0]}})]),r("b-card-body",{staticClass:"p-1",attrs:{title:t.product.name,"sub-title":t.product.author}}),r("b-card-text",[t._v(t._s("$"+t.product.price))])],1)}),i=[],s={name:"ProductCard",props:{product:{type:Object,required:!0}}},u=s,l=(r("64b4"),r("2877")),d=Object(l["a"])(u,o,i,!1,null,null,null),f=d.exports,p={name:"Shop",data:function(){return{products:[],category:"",isLoading:!0}},components:{ProductCard:f},computed:{filtered:function(){var t=this;return this.products.filter((function(e){return e.category.includes(t.category)}))}},methods:{getProducts:function(){var t=this;return Object(c["a"])(regeneratorRuntime.mark((function e(){var r,n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,t.axios.get("/products");case 3:r=e.sent,n=r.data,t.products=n.result.map((function(t){return t.image&&(t.image=t.image.map((function(t){return"".concat("https://hoekgallery.herokuapp.com","/files/").concat(t)}))),t})),t.isLoading=!1,e.next=12;break;case 9:e.prev=9,e.t0=e["catch"](0),t.$swal({icon:"error",title:"錯誤",text:"取得商品失敗"});case 12:case"end":return e.stop()}}),e,null,[[0,9]])})))()},addcart:function(){var t=this;return Object(c["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(0!==t.$store.state.jwt.token.length){e.next=3;break}return t.$swal({icon:"error",title:"請先登入"}),e.abrupt("return");case 3:return e.prev=3,e.next=6,t.axios.post("/users/cart",{product:t.product,amount:1},{headers:{authorization:"Bearer "+t.$store.state.jwt.token}});case 6:t.$swal({icon:"success",title:"已加入購物車"}),e.next=13;break;case 9:e.prev=9,e.t0=e["catch"](3),console.log(e.t0),t.$swal({icon:"error",title:"加入購物車失敗"});case 13:case"end":return e.stop()}}),e,null,[[3,9]])})))()}},mounted:function(){var t=this;return Object(c["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:t.getProducts();case 1:case"end":return e.stop()}}),e)})))()}},g=p,m=(r("ace4"),Object(l["a"])(g,n,a,!1,null,null,null));e["default"]=m.exports},1985:function(t,e,r){},2532:function(t,e,r){"use strict";var n=r("23e7"),a=r("5a34"),c=r("1d80"),o=r("ab13");n({target:"String",proto:!0,forced:!o("includes")},{includes:function(t){return!!~String(c(this)).indexOf(a(t),arguments.length>1?arguments[1]:void 0)}})},"44e7":function(t,e,r){var n=r("861d"),a=r("c6b6"),c=r("b622"),o=c("match");t.exports=function(t){var e;return n(t)&&(void 0!==(e=t[o])?!!e:"RegExp"==a(t))}},"5a34":function(t,e,r){var n=r("44e7");t.exports=function(t){if(n(t))throw TypeError("The method doesn't accept regular expressions");return t}},"64b4":function(t,e,r){"use strict";r("1985")},"70ac":function(t,e,r){},"99af":function(t,e,r){"use strict";var n=r("23e7"),a=r("d039"),c=r("e8b5"),o=r("861d"),i=r("7b0b"),s=r("50c4"),u=r("8418"),l=r("65f0"),d=r("1dde"),f=r("b622"),p=r("2d00"),g=f("isConcatSpreadable"),m=9007199254740991,h="Maximum allowed index exceeded",b=p>=51||!a((function(){var t=[];return t[g]=!1,t.concat()[0]!==t})),v=d("concat"),w=function(t){if(!o(t))return!1;var e=t[g];return void 0!==e?!!e:c(t)},x=!b||!v;n({target:"Array",proto:!0,forced:x},{concat:function(t){var e,r,n,a,c,o=i(this),d=l(o,0),f=0;for(e=-1,n=arguments.length;e<n;e++)if(c=-1===e?o:arguments[e],w(c)){if(a=s(c.length),f+a>m)throw TypeError(h);for(r=0;r<a;r++,f++)r in c&&u(d,f,c[r])}else{if(f>=m)throw TypeError(h);u(d,f++,c)}return d.length=f,d}})},ab13:function(t,e,r){var n=r("b622"),a=n("match");t.exports=function(t){var e=/./;try{"/./"[t](e)}catch(r){try{return e[a]=!1,"/./"[t](e)}catch(n){}}return!1}},ace4:function(t,e,r){"use strict";r("70ac")},caad:function(t,e,r){"use strict";var n=r("23e7"),a=r("4d64").includes,c=r("44d2");n({target:"Array",proto:!0},{includes:function(t){return a(this,t,arguments.length>1?arguments[1]:void 0)}}),c("includes")},d81d:function(t,e,r){"use strict";var n=r("23e7"),a=r("b727").map,c=r("1dde"),o=c("map");n({target:"Array",proto:!0,forced:!o},{map:function(t){return a(this,t,arguments.length>1?arguments[1]:void 0)}})}}]);
//# sourceMappingURL=shop.ef1612ee.js.map