(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{485:function(t,e,r){"use strict";r.r(e);var n=r(450),l=r.n(n),o=r(274),c=(r(448),{data:function(){return{searchClient:l()("X6NDGPNEKY","6eb95994e7c070f22d01ed808eb2c081"),routing:{stateMapping:Object(o.a)()},sort:"",perPage:""}},head:function(){return{title:this.$t("search")}},methods:{aaa:function(t){console.log(t)},bbb:function(t){for(var e=[],i=0;i<t.length;i++){var r=t[i];e.push({text:r.label,value:r.value})}return e},ccc:function(t){this.sort=t},ddd:function(t){for(var i=0;i<t.length;i++){var e=t[i];if(e.isRefined){this.perPage=e.value;break}}},curationUrl:function(t){return"http://codh.rois.ac.jp/software/iiif-curation-viewer/demo/?curation="+t.curation+"&mode=annotation&lang=ja&pos="+t.pos}}}),v=r(95),d=r(130),m=r.n(d),_=r(434),h=r(433),f=r(479),C=r(426),w=r(157),x=r(480),y=r(481),$=r(54),component=Object(v.a)(c,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("client-only",[r("ais-instant-search",{attrs:{routing:t.routing,"search-client":t.searchClient,"index-name":"genji"}},[r("ais-configure",{attrs:{attributesToSnippet:["text","label"]}}),t._v(" "),r("v-container",{staticClass:"my-5"},[r("v-row",[r("v-col",{attrs:{col:"12",sm:"8","order-sm":"12"}},[r("client-only",[r("ais-powered-by",{staticClass:"my-2"})],1),t._v(" "),r("ais-search-box",{attrs:{placeholder:t.$t("add_a_search_term")}}),t._v(" "),r("v-sheet",{staticClass:"pa-4 my-4",attrs:{color:"grey lighten-3"}},[r("v-row",{attrs:{dense:""}},[r("v-col",{attrs:{cols:"12",sm:6}},[r("ais-stats",{scopedSlots:t._u([{key:"default",fn:function(e){e.hitsPerPage,e.nbPages;var n=e.nbHits;e.page,e.processingTimeMS,e.query;return r("p",{staticClass:"my-0"},[t._v("\n                    "+t._s(t.$t("search_result"))+": "+t._s(n.toLocaleString())+" "+t._s(t.$t("hits"))+"\n                  ")])}}])})],1),t._v(" "),r("v-col",{attrs:{cols:"12",sm:3}},[r("ais-hits-per-page",{attrs:{items:[{text:"24",value:24,default:!0},{text:"60",value:60},{text:"120",value:120},{text:"512",value:512}]},scopedSlots:t._u([{key:"default",fn:function(e){var n=e.items,l=e.refine;return r("v-select",{attrs:{dense:"",items:n,label:t.$t("items_per_page")},on:{change:function(e){return l(t.perPage)}},model:{value:t.perPage,callback:function(e){t.perPage=e},expression:"perPage"}},[t._v("\n                  "+t._s(t.ddd(n))+"\n                  ")])}}])})],1),t._v(" "),r("v-col",{attrs:{cols:"12",sm:3}},[r("ais-sort-by",{attrs:{items:[{value:"genji",label:t.$t("relevance")},{value:"genji_page_asc",label:t.$t("ページ")+" "+t.$t("asc")},{value:"genji_page_desc",label:t.$t("ページ")+" "+t.$t("desc")}]},scopedSlots:t._u([{key:"default",fn:function(e){var n=e.items,l=e.currentRefinement,o=e.refine;return r("v-select",{attrs:{dense:"",items:t.bbb(n),label:t.$t("sort_by")},on:{change:function(e){return o(t.sort)}},model:{value:t.sort,callback:function(e){t.sort=e},expression:"sort"}},[t._v("\n                  "+t._s(t.ccc(l))+"\n                  ")])}}])})],1)],1)],1),t._v(" "),r("ais-pagination",{staticClass:"my-4",attrs:{padding:2}}),t._v(" "),r("ais-hits",{scopedSlots:t._u([{key:"default",fn:function(e){var n=e.items;return r("v-row",{},t._l(n,(function(e){return r("v-col",{key:e.objectID,attrs:{col:"12",sm:"3"}},[r("v-card",{attrs:{flat:"",outlined:""}},[r("nuxt-link",{attrs:{to:t.localePath({name:"item-id",params:{id:e.objectID}})}},[r("v-img",{staticClass:"grey lighten-2",staticStyle:{height:"150px"},attrs:{contain:"","max-height":"150",width:"100%",src:e.image}})],1),t._v(" "),r("v-card-text",[r("nuxt-link",{attrs:{to:t.localePath({name:"item-id",params:{id:e.objectID}})}},[r("h3",{staticClass:"mb-4"},[t._v(t._s(e.vol)+" "+t._s(e.work)+" "+t._s(e.page)+t._s("国立国会図書館"==e.attribution?"ページ":"コマ目"))])]),t._v(" "),e._snippetResult.text&&"none"!=e._snippetResult.text.matchLevel?r("p",[r("ais-snippet",{attrs:{attribute:"text",hit:e}})],1):t._e(),t._v(" "),t._e(),t._v(" "),r("p",[t._v("\n                      "+t._s(e.attribution)+"\n                    ")])],1)],1)],1)})),1)}}])}),t._v(" "),r("ais-pagination",{staticClass:"my-4",attrs:{padding:2}})],1),t._v(" "),r("v-col",{attrs:{col:"12",sm:"4","order-sm":"1"}},[r("v-row",[r("v-col",{attrs:{col:"12",sm:"6"}},[r("h2",[t._v(t._s(t.$t("filter")))])]),t._v(" "),r("v-col",{staticClass:"text-right",attrs:{col:"12",sm:"6"}},[r("ais-clear-refinements",[r("span",{attrs:{slot:"resetLabel"},slot:"resetLabel"},[t._v(t._s(t.$t("reset")))])])],1)],1),t._v(" "),r("v-card",{staticClass:"mt-4",attrs:{flat:"",outlined:""}},[r("v-card-title",{staticClass:"headline grey lighten-2"},[t._v("\n              "+t._s(t.$t("attribution"))+"\n            ")]),t._v(" "),r("v-card-text",[r("ais-refinement-list",{staticClass:"mt-4",attrs:{"show-more":"",operator:"and","show-more-limit":100,limit:20,attribute:"attribution"}})],1)],1),t._v(" "),r("v-card",{staticClass:"mt-4",attrs:{flat:"",outlined:""}},[r("v-card-title",{staticClass:"headline grey lighten-2"},[t._v("\n              "+t._s(t.$t("work"))+"\n            ")]),t._v(" "),r("v-card-text",[r("ais-refinement-list",{staticClass:"mt-4",attrs:{"show-more":"",operator:"and","show-more-limit":100,limit:20,attribute:"work"}})],1)],1),t._v(" "),r("v-card",{staticClass:"mt-4",attrs:{flat:"",outlined:""}},[r("v-card-title",{staticClass:"headline grey lighten-2"},[t._v("\n              "+t._s(t.$t("vol"))+"\n            ")]),t._v(" "),r("v-card-text",[r("ais-refinement-list",{staticClass:"mt-4",attrs:{"show-more":"",operator:"and","show-more-limit":100,limit:20,attribute:"vol","sort-by":["isRefined","name:asc"]}})],1)],1)],1)],1)],1)],1)],1)}),[],!1,null,null,null);e.default=component.exports;m()(component,{VCard:_.a,VCardText:h.a,VCardTitle:h.b,VCol:f.a,VContainer:C.a,VImg:w.a,VRow:x.a,VSelect:y.a,VSheet:$.a})}}]);