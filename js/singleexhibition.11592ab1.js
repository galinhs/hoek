(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["singleexhibition"],{"51cd":function(t,e,s){"use strict";s("d216")},"70d9":function(t,e,s){"use strict";s.r(e);var n=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("b-container",{attrs:{id:"singleEx",fluid:""}},[n("b-row",{staticClass:"d-flex justify-content-center"},[n("b-col",{staticClass:"eximg mt-3",attrs:{cols:"10",md:"7"}},t._l(t.images,(function(t,e){return n("img",{key:e,staticClass:"w-100",attrs:{src:t}})})),0),n("b-col",{staticClass:"mt-3 text-center",attrs:{cols:"12"}},[n("h1",{staticClass:"display-4 mt-3"},[t._v(t._s(t.name))])]),n("b-col",{staticClass:"d-flex justify-content-center",attrs:{cols:"12"}},[n("div",{staticClass:"my-3 divider"})]),n("b-col",{staticClass:"mt-3 text-center",attrs:{cols:"12"}},[n("h5",{staticClass:"mt-3 mb-5 text-muted"},[t._v(t._s(t.artist))]),n("h6",[t._v(t._s(t.startDate)+" - "+t._s(t.endDate))])])],1),n("b-row",{staticClass:"d-flex justify-content-md-center mt-4 mx-3"},[n("b-col",{attrs:{cols:"12",md:"7"}},[n("p",{staticClass:"my-3 mx-3"},[t._v(t._s(t.description))])]),n("b-col",{staticClass:"text-center",attrs:{cols:"12"}},[n("h4",{staticClass:"mt-5"},[t._v("展覽地點")])]),n("b-col",{staticClass:"d-flex justify-content-center",attrs:{cols:"12"}},[n("div",{staticClass:"my-1 divider"})]),n("b-col",{staticClass:"text-center",attrs:{cols:"12"}},[n("h5",{staticClass:"mt-2"},[t._v("Hoek")]),n("p",[t._v("MON – SAT 11:00 – 20:00")]),n("p",{staticClass:"mb-4"},[n("b-icon-geo-alt-fill"),t._v(" 新北市泰山區貴子里致遠新村55之1號")],1)])],1),n("b-row",{staticClass:"d-flex justify-content-center"},[n("b-col",{staticClass:"p-0 text-center map",attrs:{cols:"12"}},[n("img",{attrs:{src:s("8b55")}})])],1)],1)},a=[],r=s("1da1"),i=(s("96cf"),s("b0c0"),s("fb6a"),s("a4d3"),s("e01a"),s("d81d"),s("99af"),{name:"singleExhitbition",data:function(){return{name:"",artist:"",startDate:"",endDate:"",description:"",images:[]}},methods:{getExhibition:function(){var t=this;return Object(r["a"])(regeneratorRuntime.mark((function e(){var s,n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,t.axios.get("/exhibitions/"+t.$route.params.id);case 3:s=e.sent,n=s.data,t.name=n.result.name,t.artist=n.result.artist,t.startDate=new Date(n.result.startDate).toUTCString().slice(5,16),t.endDate=new Date(n.result.endDate).toUTCString().slice(5,16),t.description=n.result.description,t.images=n.result.image.map((function(t){return"".concat("https://hoekgallery.herokuapp.com","/files/").concat(t)})),document.title="".concat(t.name),e.next=18;break;case 14:e.prev=14,e.t0=e["catch"](0),console.log(e.t0),t.$router.push("/");case 18:case"end":return e.stop()}}),e,null,[[0,14]])})))()}},mounted:function(){var t=this;return Object(r["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:t.getExhibition();case 1:case"end":return e.stop()}}),e)})))()}}),c=i,o=(s("51cd"),s("2877")),l=Object(o["a"])(c,n,a,!1,null,null,null);e["default"]=l.exports},"8b55":function(t,e,s){t.exports=s.p+"img/map.1bad7c1d.png"},b0c0:function(t,e,s){var n=s("83ab"),a=s("9bf2").f,r=Function.prototype,i=r.toString,c=/^\s*function ([^ (]*)/,o="name";n&&!(o in r)&&a(r,o,{configurable:!0,get:function(){try{return i.call(this).match(c)[1]}catch(t){return""}}})},d216:function(t,e,s){},e01a:function(t,e,s){"use strict";var n=s("23e7"),a=s("83ab"),r=s("da84"),i=s("5135"),c=s("861d"),o=s("9bf2").f,l=s("e893"),u=r.Symbol;if(a&&"function"==typeof u&&(!("description"in u.prototype)||void 0!==u().description)){var d={},f=function(){var t=arguments.length<1||void 0===arguments[0]?void 0:String(arguments[0]),e=this instanceof f?new u(t):void 0===t?u():u(t);return""===t&&(d[e]=!0),e};l(f,u);var m=f.prototype=u.prototype;m.constructor=f;var p=m.toString,b="Symbol(test)"==String(u("test")),v=/^Symbol\((.*)\)[^)]+$/;o(m,"description",{configurable:!0,get:function(){var t=c(this)?this.valueOf():this,e=p.call(t);if(i(d,t))return"";var s=b?e.slice(7,-1):e.replace(v,"$1");return""===s?void 0:s}}),n({global:!0,forced:!0},{Symbol:f})}},fb6a:function(t,e,s){"use strict";var n=s("23e7"),a=s("861d"),r=s("e8b5"),i=s("23cb"),c=s("50c4"),o=s("fc6a"),l=s("8418"),u=s("b622"),d=s("1dde"),f=d("slice"),m=u("species"),p=[].slice,b=Math.max;n({target:"Array",proto:!0,forced:!f},{slice:function(t,e){var s,n,u,d=o(this),f=c(d.length),v=i(t,f),g=i(void 0===e?f:e,f);if(r(d)&&(s=d.constructor,"function"!=typeof s||s!==Array&&!r(s.prototype)?a(s)&&(s=s[m],null===s&&(s=void 0)):s=void 0,s===Array||void 0===s))return p.call(d,v,g);for(n=new(void 0===s?Array:s)(b(g-v,0)),u=0;v<g;v++,u++)v in d&&l(n,u,d[v]);return n.length=u,n}})}}]);
//# sourceMappingURL=singleexhibition.11592ab1.js.map