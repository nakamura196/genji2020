(window.webpackJsonp=window.webpackJsonp||[]).push([[18],{629:function(t,e,n){"use strict";n.r(e);n(48),n(69),n(21),n(80),n(70),n(71),n(53);var r=n(15),o=n(130),l=n.n(o),c=n(163);function v(t,e){var n,r,o,l=[];for(n=0;n<=t.length;n++)l[n]=[n];for(r=0;r<=e.length;r++)l[0][r]=r;for(n=1;n<=t.length;n++)for(r=1;r<=e.length;r++)o=t.charCodeAt(n-1)===e.charCodeAt(r-1)?0:1,l[n][r]=Math.min(l[n-1][r]+1,l[n][r-1]+1,l[n-1][r-1]+o);return l[t.length][e.length]/Math.max(t.length,e.length)}var h={asyncData:function(t){return Object(r.a)(regeneratorRuntime.mark((function e(){var n,r,o,c,v,h,d,m,_,f,k,i,x,C,y;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n=t.payload,r=t.app,!n){e.next=5;break}return e.abrupt("return",{result:n});case 5:return o=r.context.params.id,e.next=8,l.a.get(r.context.env.BASE_URL+"/nuxt.json");case 8:for(_ in c=e.sent,v=c.data,h=v[o],d=h.arr,m={},d){for(f=[],k=d[_],i=0;i<k.length;i++)x=k[i],(C=v[x.id]).score=x.score,f.push(C);m[_]=f}return y={item:h,arr:m},e.abrupt("return",{result:y});case 16:case"end":return e.stop()}}),e)})))()},data:function(){return{baseUrl:"https://nakamura196.github.io/genji2020",prefix:"https://nakamura196.github.io/genji2020",select:"すべて",selectedText:"",isSignedIn:!1,checkbox:{},like:!0,dialog:!1}},computed:{url:function(){return this.baseUrl+"/edit/"+this.$route.params.id},id:function(){return this.$route.params.id},title:function(){return null},items:function(){var t=this.result.arr,e=["すべて"];for(var n in t)e.push(n);return e},chips:function(){for(var t=this.result.arr,e=[],n=this.checkbox,i=0;i<t.length;i++){var r=t[i],o=r.objectID;n[o]&&n[o].length>0&&e.push(r.attribution)}return e},item:function(){return this.result.item}},watch:{selectedText:function(){var t=this.selectedText,e=this.result.arr;for(var n in e){for(var r=e[n],o=[],l=function(i){for(var e=r[i],n=e.label,map={},l=0;l<n.length;l++){var text=n[l],c=v(t,text);map[l]=c}var h=Object.keys(map).map((function(t){return{key:t,value:map[t]}}));h.sort((function(a,b){return a.value<b.value?-1:a.value>b.value?1:0})),e.highlight=h[0].key,o.push(e)},i=0;i<r.length;i++)l(i);e[n]=o}this.result.arr=e}},created:function(){var t=this;this.onAuthStateChanged(),console.log(this.result);for(var e={},n=this.result.arr,i=0;i<n.length;i++)e[n[i].objectID]=[];var r=c.a.firestore().collection(this.result.item.objectID);r?r.get().then((function(n){n.forEach((function(t){e[t.id]=Array.isArray(t.data().values)?t.data().values:[t.data().values]})),t.checkbox=e})).catch((function(t){console.log("error : "+t)})):this.checkbox=e},methods:{onAuthStateChanged:function(){var t=this;c.a.auth().onAuthStateChanged((function(e){t.userName=e?e.displayName:null,t.userPic=e?e.photoURL:null,t.isSignedIn=!!e}))},getIframeUrl:function(){var t=this.result.item;return t.manifest?this.baseUrl+"/curation/?manifest="+t.manifest+"&canvas="+encodeURIComponent(t.canvas):this.baseUrl+"/curation/?curation="+t.curation+"&pos="+t.pos},selected:function(){this.selectedText=window.getSelection().toString()},getCurationUrl:function(){var t=this.result.item;return t.curation?"http://codh.rois.ac.jp/software/iiif-curation-viewer/demo/?curation="+t.curation+"&pos="+t.pos+"&mode=annotation":"http://codh.rois.ac.jp/software/iiif-curation-viewer/demo/?manifest="+t.manifest+"&canvas="+t.canvas},aaa:function(t){console.log(t)},update2:function(data){var t=data,e=this.checkbox[data],n=this.result.item.objectID;this.$store.dispatch("addNumber",{id:t,values:e,parent:n}),this.dialog=!0},toArray2:function(map){var t=[];for(var e in map)t.push({key:e,text:map[e]});return console.log(t),t},checkLike:function(){return this.like}},head:function(){var title=this.title;return{title:title,meta:[{hid:"og:title",property:"og:title",content:title},{hid:"og:type",property:"og:type",content:"article"},{hid:"og:url",property:"og:url",content:this.url},{hid:"og:image",property:"og:image",content:this.result.item.image},{hid:"twitter:card",name:"twitter:card",content:"summary_large_image"}]}}},d=n(103),m=n(139),_=n.n(m),f=n(303),k=n(215),x=n(96),C=n(640),y=n(530),w=n(514),I=n(485),V=n(487),S=n(620),j=n(621),D=n(622),T=n(623),U=n(213),P=n(175),$=n(132),A=n(97),R=n(217),L=n(515),E=n(625),O=n(58),F=n(490),M=n(499),N=n(624),component=Object(d.a)(h,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("v-container",{staticClass:"py-5"},[n("iframe",{attrs:{src:t.getIframeUrl(),width:"100%",height:"400",allowfullscreen:"",frameborder:"0"}})]),t._v(" "),n("v-container",[n("div",{staticClass:"text-center"},[n("v-tooltip",{attrs:{bottom:""},scopedSlots:t._u([{key:"activator",fn:function(e){var r=e.on;return[n("v-btn",t._g({staticClass:"mx-1",attrs:{icon:"",target:"_blank",href:t.getCurationUrl()}},r),[n("img",{attrs:{src:t.baseUrl+"/img/icons/icp-logo.svg",width:"30px"}})])]}}])},[t._v(" "),n("span",[t._v(t._s("IIIF Curation Viewer"))])]),t._v(" "),n("v-tooltip",{attrs:{bottom:""},scopedSlots:t._u([{key:"activator",fn:function(e){var r=e.on;return[n("v-btn",t._g({staticClass:"mx-1",attrs:{icon:"",target:"_blank",href:"https://twitter.com/intent/tweet?url="+t.url}},r),[n("v-icon",[t._v("mdi-twitter")])],1)]}}])},[t._v(" "),n("span",[t._v(t._s("Twitter"))])]),t._v(" "),n("v-tooltip",{attrs:{bottom:""},scopedSlots:t._u([{key:"activator",fn:function(e){var r=e.on;return[n("v-btn",t._g({staticClass:"mx-1",attrs:{icon:"",target:"_blank",href:"https://www.facebook.com/sharer/sharer.php?u="+t.url}},r),[n("v-icon",[t._v("mdi-facebook")])],1)]}}])},[t._v(" "),n("span",[t._v(t._s("Facebook"))])]),t._v(" "),n("v-tooltip",{attrs:{bottom:""},scopedSlots:t._u([{key:"activator",fn:function(e){var r=e.on;return[n("v-btn",t._g({staticClass:"mx-1",attrs:{icon:"",target:"_blank",href:"http://getpocket.com/edit?url="+t.url}},r),[n("img",{staticStyle:{"font-size":"30px"},attrs:{src:"https://cultural.jp/img/icons/pocket.svg"}})])]}}])},[t._v(" "),n("span",[t._v(t._s("Pocket"))])]),t._v(" "),n("p",{staticClass:"my-4"},[n("v-tooltip",{attrs:{bottom:""},scopedSlots:t._u([{key:"activator",fn:function(e){var r=e.on;return[t.item.prev?n("v-btn",t._g({staticClass:"ma-1",attrs:{to:t.localePath({name:"edit-id",params:{id:t.item.prev}})}},r),[n("v-icon",[t._v("mdi-chevron-left")])],1):t._e()]}}])},[t._v(" "),n("span",[t._v(t._s("前の"+t.item.type+"へ"))])]),t._v(" "),n("v-tooltip",{attrs:{bottom:""},scopedSlots:t._u([{key:"activator",fn:function(e){var r=e.on;return[t.item.next?n("v-btn",t._g({staticClass:"ma-1",attrs:{to:t.localePath({name:"edit-id",params:{id:t.item.next}})}},r),[n("v-icon",[t._v("mdi-chevron-right")])],1):t._e()]}}])},[t._v(" "),n("span",[t._v(t._s("次の"+t.item.type+"へ"))])])],1)],1)]),t._v(" "),n("v-sheet",{staticClass:"pa-4 mt-5 mb-3",attrs:{color:"grey lighten-3"}},[n("v-container",[n("dl",{staticClass:"row"},[n("dt",{staticClass:"col-sm-3 text-muted"},[n("b",[t._v("URL")])]),t._v(" "),n("dd",{staticClass:"col-sm-9",staticStyle:{"overflow-wrap":"break-word"}},[n("a",{attrs:{href:t.prefix+"/item/"+t.$route.params.id}},[t._v(t._s(t.prefix+"/item/"+t.$route.params.id))])])]),t._v(" "),n("dl",{staticClass:"row"},[n("dt",{staticClass:"col-sm-3 text-muted"},[n("b",[t._v(t._s(t.$t("title")))])]),t._v(" "),n("dd",{staticClass:"col-sm-9"},[t._v("\n          "+t._s(t.item.vol_str)+" "+t._s(t.item.page)+t._s(t.item.type)+"\n        ")])]),t._v(" "),n("dl",{staticClass:"row"},[n("dt",{staticClass:"col-sm-3 text-muted"},[n("b",[t._v(t._s(t.$t("target")))])]),t._v(" "),n("dd",{staticClass:"col-sm-9"},[t._v("\n          "+t._s(t.item.target)+"\n        ")])])])],1),t._v(" "),n("v-container",[n("v-expansion-panels",{attrs:{tile:"",value:"国立国会図書館"==t.result.item.attribution?0:1}},[n("v-expansion-panel",{staticClass:"my-4"},[n("v-expansion-panel-header",[t._v("\n          "+t._s("国立国会図書館"==t.result.item.attribution?"テキスト":"OCRテキスト")+"\n        ")]),t._v(" "),n("v-expansion-panel-content",[n("p",{domProps:{innerHTML:t._s(t.result.item.text.split("\n").join("<b> / </b>"))},on:{select:t.selected,blur:t.selected,keyup:t.selected,click:t.selected}})])],1)],1),t._v(" "),t.chips.length>0&&t.isSignedIn?[n("dl",{staticClass:"row"},[n("dt",{staticClass:"col-sm-3 text-muted"},[n("b",[t._v("番号付与済み")])]),t._v(" "),n("dd",{staticClass:"col-sm-9"},t._l(t.chips,(function(e,r){return n("v-chip",{key:"chip_"+r,staticClass:"mx-2"},[t._v("\n            "+t._s(e)+"\n          ")])})),1)])]:t._e(),t._v(" "),n("v-sheet",{staticClass:"pa-4 my-4",attrs:{color:"grey lighten-3"}},[n("v-row",[n("v-col",{attrs:{cols:"12",sm:5}},[n("h3",[t._v("類似コマ")]),t._v(" "),n("small",[n("ul",[n("li",[t._v("\n                「校異源氏物語テキスト」または「くずし字OCR結果テキスト」間の編集距離に基づく類似度を利用しています。\n              ")]),t._v(" "),n("li",[t._v("\n                すでに頁番号が付与されている場合には、背景が黄色になります。\n              ")])])])]),t._v(" "),n("v-col",{attrs:{cols:"12",sm:7}},[n("v-select",{attrs:{items:t.items,label:t.$t("target")},model:{value:t.select,callback:function(e){t.select=e},expression:"select"}})],1)],1)],1),t._v(" "),t._l(t.result.arr,(function(e,r){return["すべて"==t.select||r==t.select?[n("h3",{key:r,staticClass:"mb-3 mt-5"},[t._v(t._s(r))]),t._v(" "),t._l(e,(function(e,o){return[n("v-card",{key:r+o,staticClass:"mb-5",style:t.result.item.koui.includes(e.objectID)?"background-color : #FFF59D":"",attrs:{flat:"",outlined:""}},[n("v-row",[n("v-col",{attrs:{cols:"12",sm:"3"}},[n("nuxt-link",{attrs:{to:t.localePath({name:"edit-id",params:{id:e.objectID}})}},[n("v-img",{staticStyle:{height:"150px"},attrs:{src:e.image,contain:"",width:"100%"}})],1),t._v(" "),n("v-card-text",[n("div",{staticClass:"text-center"},[n("nuxt-link",{staticClass:"mr-2",attrs:{to:t.localePath({name:"edit-id",params:{id:e.objectID}})}},[n("h3",[t._v("\n                        "+t._s(e.vol_str)+" "+t._s(e.page)+t._s(e.type)+"\n                      ")])]),t._v(" "),n("v-progress-linear",{attrs:{value:100*e.score,height:"25"}},[t._v("\n                      類似度:\n                      "),n("strong",[t._v(t._s(Math.ceil(100*e.score))+"%")])]),t._v(" "),n("div",{staticClass:"mt-2"},[t.checkLike()?n("v-btn",{attrs:{icon:"",color:"pink"},on:{click:function(e){t.like=!t.like}}},[n("v-icon",{staticClass:"mr-1"},[t._v("mdi-heart")]),t._v("1\n                      ")],1):n("v-btn",{attrs:{icon:""},on:{click:function(e){t.like=!t.like}}},[n("v-icon",[t._v("mdi-heart-outline")])],1)],1)],1),t._v(" "),""!=t.selectedText?[n("p",{staticClass:"mt-4"},[n("b",[t._v("選択済みテキスト：")]),t._v(t._s(t.selectedText)+"\n                    ")])]:t._e(),t._v(" "),t.isSignedIn&&"国立国会図書館"==t.result.item.attribution?n("p",{staticClass:"mt-4"},[n("v-btn",{attrs:{color:"primary"},on:{click:function(n){return t.update2(e.objectID)}}},[t._v(t._s(t.$t("update")))])],1):t._e()],2)],1),t._v(" "),n("v-col",{attrs:{cols:"12",sm:"9"}},[t.isSignedIn&&"国立国会図書館"==t.result.item.attribution?[n("v-virtual-scroll",{attrs:{items:e.label,height:"500","item-height":"30"},scopedSlots:t._u([{key:"default",fn:function(r){var text=r.item,o=r.index;return[n("v-list-item",{key:o},[n("v-list-item-content",[n("v-checkbox",{staticClass:"my-0 py-0",attrs:{value:o,dense:""},model:{value:t.checkbox[e.objectID],callback:function(n){t.$set(t.checkbox,e.objectID,n)},expression:"checkbox[item.objectID]"}},[n("template",{slot:"label"},[o==e.highlight&&""!=t.selectedText?n("span",{staticClass:"background-color : yellow lighten-3"},[t._v("\n                                "+t._s(text)+"\n                              ")]):n("span",[t._v("\n                                "+t._s(text)+"\n                              ")])])],2)],1)],1)]}}],null,!0)})]:[n("v-card-text",[n("v-expansion-panels",{attrs:{tile:"",value:"国立国会図書館"==e.attribution?0:1}},[n("v-expansion-panel",[n("v-expansion-panel-header",[t._v("\n                          "+t._s("国立国会図書館"==e.attribution?"テキスト":"OCRテキスト")+"\n                        ")]),t._v(" "),n("v-expansion-panel-content",[n("p",[t._l(e.label,(function(text,r){return[r==e.highlight&&""!=t.selectedText?n("span",{key:r,staticClass:"background-color : yellow lighten-3"},[t._v("\n                                "+t._s(text)+"\n                              ")]):n("span",{key:r},[t._v("\n                                "+t._s(text)+"\n                              ")]),t._v(" "),r!=e.label.length-1?n("b",{key:"br-"+r},[t._v("\n                                /\n                              ")]):t._e()]}))],2),t._v(" "),""!=t.selectedText?[n("b",[t._v("選択済みテキスト：")]),t._v(t._s(t.selectedText))]:t._e()],2)],1)],1)],1)]],2)],1)],1)]}))]:t._e()]}))],2),t._v(" "),n("v-dialog",{attrs:{width:"500"},model:{value:t.dialog,callback:function(e){t.dialog=e},expression:"dialog"}},[n("v-card",[n("v-card-text",{staticClass:"pt-5"},[t._v("更新しました。")]),t._v(" "),n("v-card-actions",[n("v-spacer"),t._v(" "),n("v-btn",{attrs:{color:"primary"},on:{click:function(e){t.dialog=!t.dialog}}},[t._v("閉じる")])],1)],1)],1)],1)}),[],!1,null,null,null);e.default=component.exports;_()(component,{VBtn:f.a,VCard:k.a,VCardActions:x.a,VCardText:x.b,VCheckbox:C.a,VChip:y.a,VCol:w.a,VContainer:I.a,VDialog:V.a,VExpansionPanel:S.a,VExpansionPanelContent:j.a,VExpansionPanelHeader:D.a,VExpansionPanels:T.a,VIcon:U.a,VImg:P.a,VListItem:$.a,VListItemContent:A.a,VProgressLinear:R.a,VRow:L.a,VSelect:E.a,VSheet:O.a,VSpacer:F.a,VTooltip:M.a,VVirtualScroll:N.a})}}]);