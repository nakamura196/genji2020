(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{635:function(t,e,n){"use strict";n.r(e);n(305);var r=n(33),c=n(41),o=n(40),f=n(36),l=n(28),y=n(13),h=n(178);function d(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,r=Object(l.a)(t);if(e){var c=Object(l.a)(this).constructor;n=Reflect.construct(r,arguments,c)}else n=r.apply(this,arguments);return Object(f.a)(this,n)}}var j=function(t,e,n,desc){var r,c=arguments.length,o=c<3?e:null===desc?desc=Object.getOwnPropertyDescriptor(e,n):desc;if("object"===("undefined"==typeof Reflect?"undefined":Object(y.a)(Reflect))&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,n,desc);else for(var i=t.length-1;i>=0;i--)(r=t[i])&&(o=(c<3?r(o):c>3?r(e,n,o):r(e,n))||o);return c>3&&o&&Object.defineProperty(e,n,o),o},O=function(t){Object(o.a)(n,t);var e=d(n);function n(){return Object(r.a)(this,n),e.apply(this,arguments)}return Object(c.a)(n,[{key:"xml",get:function(){return this.$store.getters.getXml},set:function(t){this.$store.commit("setXml",t)}},{key:"title",get:function(){var t=this.xml,title="TEI Viewer";return t&&t.querySelector("tei-title")?t.querySelector("tei-title").textContent:title}}]),n}(h.Vue),v=O=j([Object(h.Component)({})],O),m=n(103),component=Object(m.a)(v,(function(){var t=this,e=t.$createElement;return(t._self._c||e)("span",[t._v("\n  "+t._s(t.title)+"\n")])}),[],!1,null,null,null);e.default=component.exports}}]);