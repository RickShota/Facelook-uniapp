(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/common/chat-item"],{"219e":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r=u(n("690a"));function u(t){return t&&t.__esModule?t:{default:t}}var i=1,c={name:"chatItem",props:{item:Object,index:Number,pretime:[Number,String]},computed:{isSelf:function(){return i===this.item.user_id},shortTime:function(){return r.default.getChatTime(this.item.create_time,this.pretime)}}};e.default=c},5759:function(t,e,n){},6379:function(t,e,n){"use strict";n.r(e);var r=n("68d5"),u=n("8d01");for(var i in u)"default"!==i&&function(t){n.d(e,t,(function(){return u[t]}))}(i);n("d9b7");var c,a=n("f0c5"),o=Object(a["a"])(u["default"],r["b"],r["c"],!1,null,"3446bdd6",null,!1,r["a"],c);e["default"]=o.exports},"68d5":function(t,e,n){"use strict";var r;n.d(e,"b",(function(){return u})),n.d(e,"c",(function(){return i})),n.d(e,"a",(function(){return r}));var u=function(){var t=this,e=t.$createElement;t._self._c},i=[]},"8d01":function(t,e,n){"use strict";n.r(e);var r=n("219e"),u=n.n(r);for(var i in r)"default"!==i&&function(t){n.d(e,t,(function(){return r[t]}))}(i);e["default"]=u.a},d9b7:function(t,e,n){"use strict";var r=n("5759"),u=n.n(r);u.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/common/chat-item-create-component',
    {
        'components/common/chat-item-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("6379"))
        })
    },
    [['components/common/chat-item-create-component']]
]);
