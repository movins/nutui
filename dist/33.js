/*! NutUI v1.2.2 Tue May 15 2018 17:51:06 GMT+0800 (中国标准时间) */
webpackJsonpnutui([33],{1015:function(t,n,_){n=t.exports=_(2)(),n.push([t.i,"",""])},1114:function(t,n){t.exports={render:function(){var t=this,n=t.$createElement,_=t._self._c||n;return _("div",[_("nut-docheader",{attrs:{name:t.$route.name,chName:t.$route.params.chnName,type:"Component",desc:"加载等待蒙层。",showQrCode:!0}}),t._v(" "),_("h5",[t._v("依赖")]),t._v(" "),_("h6",[t._v("Mask")]),t._v(" "),_("h5",[t._v("基本用法")]),t._v(" "),_("nut-codebox",{attrs:{code:"this.$loading(options);"}}),t._v(" "),_("h5",[t._v("示例")]),t._v(" "),_("nut-codebox",{attrs:{code:t.demo}}),t._v(" "),_("nut-codebox",{attrs:{code:"export default {\n    data(){\n        return{\n          loading:null\n        }\n    },\n    mounted(){\n      this.loading = this.$loading({\n        maxDuring:5000,\n        iconUrl:'//misc.360buyimg.com/mtd/pc/o2_toolbar/1.0.0/home/images/loading.gif'\n      });\n    },\n    methods:{\n      showLoading(options){\n        this.loading.show();\n      },\n      hideLoading(options){\n        this.loading.hide();\n      },\n    }\n}"}}),t._v(" "),_("h5",[t._v("Options")]),t._v(" "),t._m(0)],1)},staticRenderFns:[function(){var t=this,n=t.$createElement,_=t._self._c||n;return _("div",{staticClass:"tbl-wrapper"},[_("table",{staticClass:"u-full-width"},[_("thead",[_("tr",[_("th",[t._v("参数")]),t._v(" "),_("th",[t._v("说明")]),t._v(" "),_("th",[t._v("类型")]),t._v(" "),_("th",[t._v("默认值")]),t._v(" "),_("th",[t._v("可选值")])])]),t._v(" "),_("tbody",[_("tr",[_("td",[t._v("maxDuring")]),t._v(" "),_("td",[t._v("最大展示时长")]),t._v(" "),_("td",[t._v("Number")]),t._v(" "),_("td",[t._v("0（0为不消失）")]),t._v(" "),_("td",[t._v("--")])]),t._v(" "),_("tr",[_("td",[t._v("bgColor")]),t._v(" "),_("td",[t._v("遮罩层颜色")]),t._v(" "),_("td",[t._v("String")]),t._v(" "),_("td",[t._v("'rgba(0,0,0,.5)'")]),t._v(" "),_("td",[t._v("支持HEX、RGBA")])]),t._v(" "),_("tr",[_("td",[t._v("iconUrl")]),t._v(" "),_("td",[t._v("icon图片地址")]),t._v(" "),_("td",[t._v("String")]),t._v(" "),_("td",[t._v("''")]),t._v(" "),_("td",[t._v("--")])]),t._v(" "),_("tr",[_("td",[t._v("text")]),t._v(" "),_("td",[t._v("提示文字")]),t._v(" "),_("td",[t._v("String")]),t._v(" "),_("td",[t._v("'加载中...'")]),t._v(" "),_("td",[t._v("--")])]),t._v(" "),_("tr",[_("td",[t._v("textColor")]),t._v(" "),_("td",[t._v("文字颜色")]),t._v(" "),_("td",[t._v("String")]),t._v(" "),_("td",[t._v("'#000000'")]),t._v(" "),_("td",[t._v("支持HEX、RGBA")])]),t._v(" "),_("tr",[_("td",[t._v("userClose")]),t._v(" "),_("td",[t._v("是否允许用户点击关闭")]),t._v(" "),_("td",[t._v("Boolean")]),t._v(" "),_("td",[t._v("true")]),t._v(" "),_("td",[t._v("--")])]),t._v(" "),_("tr",[_("td",[t._v("fade")]),t._v(" "),_("td",[t._v("是否开启渐隐渐现动效")]),t._v(" "),_("td",[t._v("Boolean")]),t._v(" "),_("td",[t._v("false")]),t._v(" "),_("td",[t._v("--")])])])])])}]}},1207:function(t,n,_){var o=_(1015);"string"==typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);_(3)("3ce7d4a2",o,!0,{})},847:function(t,n,_){function o(t){_(1207)}var v=_(1)(_(939),_(1114),o,null,null);t.exports=v.exports},939:function(t,n,_){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default={data:function(){return{loading:null,demo:'<a href="javascript:;" @click="showLoading">Demo</a>'}},mounted:function(){this.loading=this.$loading({maxDuring:5e3,iconUrl:"//misc.360buyimg.com/mtd/pc/o2_toolbar/1.0.0/home/images/loading.gif"})},methods:{showLoading:function(t){this.loading.show()},hideLoading:function(t){this.loading.hide()}}}}});