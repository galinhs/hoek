(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["singleexhibition"],{"51cd":function(t,e,s){"use strict";s("d216")},"70d9":function(t,e,s){"use strict";s.r(e);var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("b-container",{attrs:{id:"singleEx",fluid:""}},[s("b-row",{staticClass:"d-flex justify-content-center"},[s("b-col",{staticClass:"eximg mt-3",attrs:{cols:"10",md:"7"}},t._l(t.images,(function(t,e){return s("img",{key:e,staticClass:"w-100",attrs:{src:t}})})),0),s("b-col",{staticClass:"mt-3 text-center",attrs:{cols:"12"}},[s("h1",{staticClass:"display-4 mt-3"},[t._v(t._s(t.name))])]),s("b-col",{staticClass:"d-flex justify-content-center",attrs:{cols:"12"}},[s("div",{staticClass:"my-3 divider"})]),s("b-col",{staticClass:"mt-3 text-center",attrs:{cols:"12"}},[s("h5",{staticClass:"mt-3 mb-5 text-muted"},[t._v(t._s(t.artist))]),s("h6",[t._v(t._s(t.startDate)+" - "+t._s(t.endDate))])])],1),s("b-row",{staticClass:"d-flex justify-content-md-center mt-4 mx-3"},[s("b-col",{attrs:{cols:"12",md:"7"}},[s("p",{staticClass:"my-3 mx-3"},[t._v(t._s(t.description))])]),s("b-col",{staticClass:"text-center",attrs:{cols:"12"}},[s("h4",{staticClass:"mt-5"},[t._v("展覽地點")])]),s("b-col",{staticClass:"d-flex justify-content-center",attrs:{cols:"12"}},[s("div",{staticClass:"my-1 divider"})]),s("b-col",{staticClass:"text-center",attrs:{cols:"12"}},[s("h5",{staticClass:"mt-2"},[t._v("Hoek")]),s("p",[t._v("MON – SAT 11:00 – 20:00")]),s("p",{staticClass:"mb-4"},[s("b-icon-geo-alt-fill"),t._v(" 新北市泰山區貴子里致遠新村55之1號")],1)])],1),s("b-row",{staticClass:"d-flex justify-content-center"},[s("b-col",{staticClass:"p-0 text-center map",attrs:{cols:"12"}},[s("iframe",{staticClass:"border-0",attrs:{src:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3614.702152324414!2d121.41729491542732!3d25.044180083967518!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442a7bed3dc9b59%3A0x57e6439a2db0fa2a!2zMjQzLCBOZXcgVGFpcGVpIENpdHksIFRhaXNoYW4gRGlzdHJpY3QsIOazsOWxseiBt-iok-S4reW_gw!5e0!3m2!1sen!2stw!4v1567655958210!5m2!1sen!2stw",frameborder:"0",allowfullscreen:"true",width:"100%",height:"250"}})])],1)],1)},r=[],n=s("1da1"),i=(s("96cf"),s("b0c0"),s("fb6a"),s("a4d3"),s("e01a"),s("d81d"),s("99af"),{name:"singleExhitbition",data:function(){return{name:"",artist:"",startDate:"",endDate:"",description:"",images:[]}},methods:{getExhibition:function(){var t=this;return Object(n["a"])(regeneratorRuntime.mark((function e(){var s,a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,t.axios.get("/exhibitions/"+t.$route.params.id);case 3:s=e.sent,a=s.data,t.name=a.result.name,t.artist=a.result.artist,t.startDate=new Date(a.result.startDate).toUTCString().slice(5,16),t.endDate=new Date(a.result.endDate).toUTCString().slice(5,16),t.description=a.result.description,t.images=a.result.image.map((function(t){return"".concat("https://hoekgallery.herokuapp.com","/files/").concat(t)})),document.title="".concat(t.name),e.next=18;break;case 14:e.prev=14,e.t0=e["catch"](0),console.log(e.t0),t.$router.push("/");case 18:case"end":return e.stop()}}),e,null,[[0,14]])})))()}},mounted:function(){var t=this;return Object(n["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:t.getExhibition();case 1:case"end":return e.stop()}}),e)})))()}}),c=i,o=(s("51cd"),s("2877")),l=Object(o["a"])(c,a,r,!1,null,null,null);e["default"]=l.exports},b0c0:function(t,e,s){var a=s("83ab"),r=s("9bf2").f,n=Function.prototype,i=n.toString,c=/^\s*function ([^ (]*)/,o="name";a&&!(o in n)&&r(n,o,{configurable:!0,get:function(){try{return i.call(this).match(c)[1]}catch(t){return""}}})},d216:function(t,e,s){},e01a:function(t,e,s){"use strict";var a=s("23e7"),r=s("83ab"),n=s("da84"),i=s("5135"),c=s("861d"),o=s("9bf2").f,l=s("e893"),u=n.Symbol;if(r&&"function"==typeof u&&(!("description"in u.prototype)||void 0!==u().description)){var d={},f=function(){var t=arguments.length<1||void 0===arguments[0]?void 0:String(arguments[0]),e=this instanceof f?new u(t):void 0===t?u():u(t);return""===t&&(d[e]=!0),e};l(f,u);var m=f.prototype=u.prototype;m.constructor=f;var p=m.toString,b="Symbol(test)"==String(u("test")),v=/^Symbol\((.*)\)[^)]+$/;o(m,"description",{configurable:!0,get:function(){var t=c(this)?this.valueOf():this,e=p.call(t);if(i(d,t))return"";var s=b?e.slice(7,-1):e.replace(v,"$1");return""===s?void 0:s}}),a({global:!0,forced:!0},{Symbol:f})}},fb6a:function(t,e,s){"use strict";var a=s("23e7"),r=s("861d"),n=s("e8b5"),i=s("23cb"),c=s("50c4"),o=s("fc6a"),l=s("8418"),u=s("b622"),d=s("1dde"),f=d("slice"),m=u("species"),p=[].slice,b=Math.max;a({target:"Array",proto:!0,forced:!f},{slice:function(t,e){var s,a,u,d=o(this),f=c(d.length),v=i(t,f),h=i(void 0===e?f:e,f);if(n(d)&&(s=d.constructor,"function"!=typeof s||s!==Array&&!n(s.prototype)?r(s)&&(s=s[m],null===s&&(s=void 0)):s=void 0,s===Array||void 0===s))return p.call(d,v,h);for(a=new(void 0===s?Array:s)(b(h-v,0)),u=0;v<h;v++,u++)v in d&&l(a,u,d[v]);return a.length=u,a}})}}]);
//# sourceMappingURL=singleexhibition.58b173d1.js.map