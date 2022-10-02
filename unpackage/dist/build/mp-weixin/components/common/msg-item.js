(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/common/msg-item"],{"0f7c":function(e,n,t){"use strict";(function(e){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var u=a(t("690a"));function a(e){return e&&e.__esModule?e:{default:e}}var o={components:{},props:{item:Object,index:Number},computed:{username:function(){return this.item.username}},onLoad:function(){},filters:{formatTime:function(e){return u.default.gettime(e)}},methods:{open:function(){e.navigateTo({url:"../../pages/chat-page/chat-page?username="+this.username})}}};n.default=o}).call(this,t("543d")["default"])},"5aac":function(e,n,t){"use strict";t.r(n);var u=t("c9a4"),a=t("7d8c");for(var o in a)"default"!==o&&function(e){t.d(n,e,(function(){return a[e]}))}(o);var r,c=t("f0c5"),i=Object(c["a"])(a["default"],u["b"],u["c"],!1,null,null,null,!1,u["a"],r);n["default"]=i.exports},"7d8c":function(e,n,t){"use strict";t.r(n);var u=t("0f7c"),a=t.n(u);for(var o in u)"default"!==o&&function(e){t.d(n,e,(function(){return u[e]}))}(o);n["default"]=a.a},c9a4:function(e,n,t){"use strict";t.d(n,"b",(function(){return a})),t.d(n,"c",(function(){return o})),t.d(n,"a",(function(){return u}));var u={uniBadge:function(){return t.e("uni_modules/uni-badge/components/uni-badge/uni-badge").then(t.bind(null,"db30"))}},a=function(){var e=this,n=e.$createElement,t=(e._self._c,e._f("formatTime")(e.item.update_time));e.$mp.data=Object.assign({},{$root:{f0:t}})},o=[]}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/common/msg-item-create-component',
    {
        'components/common/msg-item-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("5aac"))
        })
    },
    [['components/common/msg-item-create-component']]
]);
