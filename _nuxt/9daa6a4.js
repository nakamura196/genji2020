(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{614:function(e,t,n){"use strict";n.r(t);n(45),n(14),n(305),n(69),n(34),n(72),n(229),n(53);var r=n(15),o=n(33),c=n(41),l=n(40),h=n(36),f=n(28),d=n(13),m=n(178),v=n(130),y=n.n(v);function k(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=Object(f.a)(e);if(t){var o=Object(f.a)(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return Object(h.a)(this,n)}}var w=function(e,t,n,desc){var r,o=arguments.length,c=o<3?t:null===desc?desc=Object.getOwnPropertyDescriptor(t,n):desc;if("object"===("undefined"==typeof Reflect?"undefined":Object(d.a)(Reflect))&&"function"==typeof Reflect.decorate)c=Reflect.decorate(e,t,n,desc);else for(var i=e.length-1;i>=0;i--)(r=e[i])&&(c=(o<3?r(c):o>3?r(t,n,c):r(t,n))||c);return o>3&&c&&Object.defineProperty(t,n,c),c},j=n(585).Network;function O(){for(var e="#",i=0;i<6;i++)e+="0123456789ABCDEF"[Math.floor(16*Math.random())];return e}function x(p){return"http://schema.org/agential"===p?"":"http://schema.org/spatial"===p?"":"http://schema.org/temporal"===p?"":""}var R=function(e){Object(l.a)(h,e);var t,n=k(h);function h(){var e;return Object(o.a)(this,h),(e=n.apply(this,arguments)).nodes=[],e.edges=[],e.options={nodes:{},edges:{color:"lightgray"}},e}return Object(c.a)(h,[{key:"watchU",value:function(){this.init()}},{key:"created",value:function(){this.init()}},{key:"init",value:function(){this.search()}},{key:"search",value:(t=Object(r.a)(regeneratorRuntime.mark((function e(){var u,t,n,r,o,c,l,h,i,f,s,label,d,p,m,v,k,w,j;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return u=this.u,t="\n        SELECT DISTINCT ?p ?s ?label ?keyword ?label_k count(?cho) as ?count \n        ?s2 ?label2 count(?cho2) as ?count2 WHERE { \n          BIND(<".concat(u,"> as ?s)\n          ?cho ?p2 ?s . \n          ?s rdfs:label ?label . \n          ?cho ?p ?keyword . \n          filter (?p != rdf:type && ?p != schema:inLanguage \n          && ?p != schema:temporal && ?p != jps:relationType \n          && ?p != jps:region && ?p != schema:license)\n          filter(?s != ?keyword)\n          ?keyword rdfs:label ?label_k . \n          filter(?label_k != '不明' && ?label_k != 'unknown / not defined')\n        } order by desc(?count) limit 20\n      "),e.next=4,y.a.get("https://jpsearch.go.jp/rdf/sparql?query="+encodeURIComponent(t)+"&output=json");case 4:n=e.sent,r=n.data.results.bindings,o=[],c=[],l={},h={"http://schema.org/agential":"#9E9E9E","http://schema.org/about":"#4CAF50","http://schema.org/spatial":"#FF9800","http://schema.org/temporal":"#795548","http://schema.org/category":"#E91E63","http://schema.org/isPartOf":"#9C27B0"},i=0;case 11:if(!(i<r.length)){e.next=30;break}if(f=r[i],s=f.s.value,l[s]||(l[s]={label:f.label.value,index:Object.keys(l).length,icon:x("http://schema.org/agential"),uri:s,p:"http://schema.org/agential"}),label=f.label.value,label=f.name?f.name.value:label,"不明"!==(d=f.label_k.value)){e.next=20;break}return e.abrupt("continue",27);case 20:for(p=f.p.value,m=["creator","publisher","contributor","provider"],v=0;v<m.length;v++)p=p.replace("http://schema.org/"+m[v],"http://schema.org/agential");h[p]||(h[p]=O()),k=f.keyword.value,l[k]||(l[k]={label:d,index:Object.keys(l).length,icon:x(p),uri:k,p:p}),c.push({from:l[s].index,to:l[k].index,value:Math.min(Number(f.count.value),1e3),title:f.p.value+"（"+Number(f.count.value).toLocaleString()+"）",arrows:"to",color:h[p]});case 27:i++,e.next=11;break;case 30:for(w in l)j=l[w],o.push({id:j.index,label:j.label,shape:"icon",icon:{code:j.icon},uri:j.uri,p:j.p});this.nodes=o,this.edges=c;case 33:case"end":return e.stop()}}),e,this)}))),function(){return t.apply(this,arguments)})},{key:"onNodeSelected",value:function(e){var t=e.nodes;if(t.length>0){var n=this.nodes[t[0]],r="item",o={};"http://schema.org/spatial"===n.p?(r="entity",o={entity:"spatial"}):"http://schema.org/about"===n.p&&(r="keyword"),this.$router.push(this.localePath({name:r,params:o,query:{id:n.uri}}),(function(){}),(function(){}))}}}]),h}(m.Vue);w([Object(m.Prop)()],R.prototype,"u",void 0),w([Object(m.Watch)("u")],R.prototype,"watchU",null);var E=R=w([Object(m.Component)({components:{network:j}})],R),_=n(103),C=n(139),N=n.n(C),S=n(215),D=n(485),component=Object(_.a)(E,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return e.nodes.length>0?n("v-container",[n("h2",{staticClass:"mt-5 mb-3 text-center"},[e._v(e._s(e.$t("network")))]),e._v(" "),n("v-card",{attrs:{"no-body":"",outlined:"",flat:""}},[n("network",{ref:"network",staticStyle:{height:"600px"},attrs:{nodes:e.nodes,edges:e.edges,options:e.options},on:{click:e.onNodeSelected}})],1)],1):e._e()}),[],!1,null,null,null);t.default=component.exports;N()(component,{Network:n(614).default}),N()(component,{VCard:S.a,VContainer:D.a})}}]);