(window.webpackJsonp=window.webpackJsonp||[]).push([[22],{631:function(t,e,r){"use strict";r.r(e);var n=r(553),l=r.n(n),o=r(300),c=(r(551),{data:function(){return{searchClient:l()("48L2134NJ6","713961b75d7d86355a810e6175e42d75"),routing:{stateMapping:Object(o.a)()},sort:"",perPage:"",sortItems:[{value:"dev_MAIN",label:this.$t("relevance")}],bh:[{text:this.$t("top"),disabled:!1,to:this.localePath({name:"index"}),exact:!0},{text:this.$t("search")}]}},head:function(){return{title:this.$t("search")}},methods:{curationUrl:function(t){return"http://codh.rois.ac.jp/software/iiif-curation-viewer/demo/?curation="+t.curation+"&mode=annotation&lang=ja&pos="+t.pos},getSortItems:function(t){for(var e=[],i=0;i<t.length;i++){var r=t[i];e.push({text:r.label,value:r.value})}return e},getSortValue:function(t){this.sort=t},getPageValue:function(t){for(var i=0;i<t.length;i++){var e=t[i];if(e.isRefined){this.perPage=e.value;break}}}}}),v=r(103),d=r(139),m=r.n(d),_=r(547),h=r(215),f=r(96),x=r(514),y=r(485),C=r(213),w=r(175),$=r(515),V=r(625),S=r(58),component=Object(v.a)(c,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("client-only",[r("ais-instant-search",{attrs:{routing:t.routing,"search-client":t.searchClient,"index-name":"genji"}},[r("ais-configure",{attrs:{attributesToSnippet:["text","label"]}}),t._v(" "),r("v-sheet",{attrs:{color:"grey lighten-2"}},[r("v-container",{staticClass:"py-4",attrs:{fluid:""}},[r("v-breadcrumbs",{staticClass:"py-0",attrs:{items:t.bh},scopedSlots:t._u([{key:"divider",fn:function(){return[r("v-icon",[t._v("mdi-chevron-right")])]},proxy:!0}])})],1)],1),t._v(" "),r("v-container",{staticClass:"my-5"},[r("h2",[t._v(t._s(t.$t("search")))]),t._v(" "),r("p",{staticClass:"my-2"},[t._v("\n        『校異源氏物語』の本文テキストを検索します。\n      ")]),t._v(" "),r("v-row",{staticClass:"my-2",attrs:{dense:""}},[r("v-col",{attrs:{cols:"12",md:"10"}},[r("ais-search-box",{attrs:{placeholder:t.$t("add_a_search_term")}})],1),t._v(" "),r("v-col",{attrs:{cols:"12",md:"2"}},[r("client-only",[r("div",{staticClass:"text-right"},[r("ais-powered-by")],1)])],1)],1),t._v(" "),r("v-row",{staticClass:"mt-10",attrs:{dense:""}},[r("v-col",{attrs:{cols:"12",lg:"4"}},[r("ais-stats",{scopedSlots:t._u([{key:"default",fn:function(e){var n=e.nbHits;return r("h3",{staticClass:"my-0"},[t._v("\n              "+t._s(t.$t("search_result"))+": "+t._s(n.toLocaleString())+"\n              "+t._s(t.$t("hits"))+"\n            ")])}}])})],1),t._v(" "),r("v-col",{attrs:{cols:"12",lg:"8"}},[r("v-row",{attrs:{dense:""}},[r("v-col",{attrs:{cols:"12",lg:6}},[r("ais-pagination",{staticClass:"mb-4",attrs:{padding:2}})],1),t._v(" "),r("v-col",{attrs:{cols:"12",lg:6}},[r("v-row",[r("v-col",{attrs:{cols:"12",sm:6}},[r("ais-hits-per-page",{attrs:{items:[{text:"24",value:24,default:!0},{text:"60",value:60},{text:"120",value:120},{text:"512",value:512}]},scopedSlots:t._u([{key:"default",fn:function(e){var n=e.items,l=e.refine;return r("v-select",{attrs:{dense:"",items:n,label:t.$t("items_per_page")},on:{change:function(e){return l(t.perPage)}},model:{value:t.perPage,callback:function(e){t.perPage=e},expression:"perPage"}},[t._v("\n                      "+t._s(t.getPageValue(n))+"\n                    ")])}}])})],1),t._v(" "),r("v-col",{attrs:{cols:"12",sm:6}},[r("ais-sort-by",{attrs:{items:[{value:"genji",label:t.$t("relevance")},{value:"genji_page_asc",label:t.$t("ページ")+" "+t.$t("asc")},{value:"genji_page_desc",label:t.$t("ページ")+" "+t.$t("desc")}]},scopedSlots:t._u([{key:"default",fn:function(e){var n=e.items,l=e.currentRefinement,o=e.refine;return r("v-select",{attrs:{dense:"",items:t.getSortItems(n),label:t.$t("sort_by")},on:{change:function(e){return o(t.sort)}},model:{value:t.sort,callback:function(e){t.sort=e},expression:"sort"}},[t._v("\n                      "+t._s(t.getSortValue(l))+"\n                    ")])}}])})],1)],1)],1)],1)],1)],1),t._v(" "),r("v-row",{staticClass:"mt-5"},[r("v-col",{attrs:{col:"12",sm:"9","order-sm":"12"}},[r("ais-hits",{scopedSlots:t._u([{key:"default",fn:function(e){var n=e.items;return r("v-row",{},t._l(n,(function(e){return r("v-col",{key:e.objectID,attrs:{col:"12",sm:"3"}},[r("v-card",{attrs:{flat:"",outlined:""}},[r("nuxt-link",{attrs:{to:t.localePath({name:"item-id",params:{id:e.objectID}})}},[r("v-img",{staticClass:"grey lighten-2",staticStyle:{height:"150px"},attrs:{contain:"","max-height":"150",width:"100%",src:e.image}})],1),t._v(" "),r("v-card-text",[r("nuxt-link",{attrs:{to:t.localePath({name:"item-id",params:{id:e.objectID}})}},[r("h3",{staticClass:"mb-4"},[t._v(t._s(e.vol_str)+"  "+t._s(e.page)+t._s(t.$t(e.type)))])]),t._v(" "),e._snippetResult.text&&"none"!=e._snippetResult.text.matchLevel?r("p",[r("ais-snippet",{attrs:{attribute:"text",hit:e}})],1):t._e(),t._v(" "),t._e()],1)],1)],1)})),1)}}])}),t._v(" "),r("ais-pagination",{staticClass:"mt-10",attrs:{padding:2}})],1),t._v(" "),r("v-col",{attrs:{col:"12",sm:"3","order-sm":"1"}},[r("v-card",{staticClass:"mb-4",attrs:{flat:""}},[r("v-card-title",{staticClass:"headline grey lighten-2"},[t._v("\n              "+t._s(t.$t("vol_str"))+"\n            ")]),t._v(" "),r("v-card-text",[r("ais-refinement-list",{staticClass:"mt-4",attrs:{"show-more":"",operator:"and","show-more-limit":100,limit:20,attribute:"vol_str","sort-by":["isRefined","name:asc"]}})],1)],1)],1)],1)],1)],1)],1)}),[],!1,null,null,null);e.default=component.exports;m()(component,{VBreadcrumbs:_.a,VCard:h.a,VCardText:f.b,VCardTitle:f.c,VCol:x.a,VContainer:y.a,VIcon:C.a,VImg:w.a,VRow:$.a,VSelect:V.a,VSheet:S.a})}}]);