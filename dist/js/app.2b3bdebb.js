(function(e){function t(t){for(var r,a,s=t[0],c=t[1],u=t[2],d=0,m=[];d<s.length;d++)a=s[d],o[a]&&m.push(o[a][0]),o[a]=0;for(r in c)Object.prototype.hasOwnProperty.call(c,r)&&(e[r]=c[r]);l&&l(t);while(m.length)m.shift()();return i.push.apply(i,u||[]),n()}function n(){for(var e,t=0;t<i.length;t++){for(var n=i[t],r=!0,a=1;a<n.length;a++){var c=n[a];0!==o[c]&&(r=!1)}r&&(i.splice(t--,1),e=s(s.s=n[0]))}return e}var r={},o={app:0},i=[];function a(e){return s.p+"js/"+({about:"about"}[e]||e)+"."+{about:"2ca2c031"}[e]+".js"}function s(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.e=function(e){var t=[],n=o[e];if(0!==n)if(n)t.push(n[2]);else{var r=new Promise(function(t,r){n=o[e]=[t,r]});t.push(n[2]=r);var i,c=document.getElementsByTagName("head")[0],u=document.createElement("script");u.charset="utf-8",u.timeout=120,s.nc&&u.setAttribute("nonce",s.nc),u.src=a(e),i=function(t){u.onerror=u.onload=null,clearTimeout(d);var n=o[e];if(0!==n){if(n){var r=t&&("load"===t.type?"missing":t.type),i=t&&t.target&&t.target.src,a=new Error("Loading chunk "+e+" failed.\n("+r+": "+i+")");a.type=r,a.request=i,n[1](a)}o[e]=void 0}};var d=setTimeout(function(){i({type:"timeout",target:u})},12e4);u.onerror=u.onload=i,c.appendChild(u)}return Promise.all(t)},s.m=e,s.c=r,s.d=function(e,t,n){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},s.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)s.d(n,r,function(t){return e[t]}.bind(null,r));return n},s.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="",s.oe=function(e){throw console.error(e),e};var c=window["webpackJsonp"]=window["webpackJsonp"]||[],u=c.push.bind(c);c.push=t,c=c.slice();for(var d=0;d<c.length;d++)t(c[d]);var l=u;i.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},1309:function(e,t,n){},3:function(e,t){},"56d7":function(e,t,n){"use strict";n.r(t);n("cadf"),n("551c"),n("097d");var r=n("2b0e"),o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("md-app",{attrs:{"md-mode":"reveal"}},[n("md-app-toolbar",{staticClass:"md-primary"},[n("md-button",{staticClass:"md-icon-button",on:{click:function(t){e.menuVisible=!e.menuVisible}}},[n("md-icon",[e._v("")])],1)],1),n("md-app-drawer",{attrs:{"md-permanent":"full","md-active":e.menuVisible},on:{"update:mdActive":function(t){e.menuVisible=t}}},[n("md-toolbar",{staticClass:"md-transparent",attrs:{"md-elevation":"0"}},[e._v("\n        导航\n      ")]),n("md-list",[n("md-list-item",{attrs:{to:"/select"}},[n("md-icon",[e._v("")]),n("span",{staticClass:"md-list-item-text"},[e._v("选择房间")])],1),n("md-list-item",{on:{click:e.reload}},[n("md-icon",[e._v("")]),n("span",{staticClass:"md-list-item-text"},[e._v("重新链接")])],1),n("md-list-item",{on:{click:e.enterRandomRoom}},[n("md-icon",[e._v("")]),n("span",{staticClass:"md-list-item-text"},[e._v("随机进入")])],1),n("md-list-item",{attrs:{to:"/showRooms"}},[n("md-icon",[e._v("")]),n("span",{staticClass:"md-list-item-text"},[e._v("可用房间")])],1)],1)],1),n("md-app-content",[n("router-view")],1)],1)],1)},i=[],a=(n("96cf"),n("3040")),s=n("43f9"),c=n.n(s),u=(n("51de"),n("0759"),n("c665")),d=n("aa9a"),l=(n("d093"),n("8055")),m=(n("7f7f"),n("f751"),function(){function e(){Object(u["a"])(this,e)}return Object(d["a"])(e,[{key:"getUserMedia",value:function(e){var t=this,n={audio:!0,video:!0};return e=Object.assign({},n,e),navigator.mediaDevices.getUserMedia(e).catch(function(e){return t.errorHandler(e)})}},{key:"errorHandler",value:function(e){switch(e.name){case"AbortError":break;case"NotAllowedError":break;case"NotFoundError":break;case"NotReadableError":break;case"OverConstrainedError":break;case"SecurityError":break;case"TypeError":break}return console.log(e),{errorCode:e.code,errorMsg:e.name}}}]),e}()),f=new m,p=l["connect"]("https://zzz.lizimeow.cn"),h=function(){function e(){if(Object(u["a"])(this,e),!window.RTCPeerConnection)throw alert("系统不支持webrtc"),new Error("系统不支持webrtc");this.initPeerCoon(),this.initSocketEvent(),this.mediaDevices=f,this.debugObj={}}return Object(d["a"])(e,[{key:"initPeerCoon",value:function(){var e=this.peerConn=new RTCPeerConnection({iceServers:[{url:"stun:stun1.l.google.com:19302"},{url:"turn:zzz.lizimeow.cn",username:"zj",credential:"z111111"}]}),t=this.mediaStream;t&&!t.errorCode&&this.peerConn.addStream(t),this.initEvent(e)}},{key:"getMedia",value:function(e){var t=this;return this.mediaDevices.getUserMedia(e).then(function(e){return t.mediaStream=e,e})}},{key:"connectRoom",value:function(e){p.emit("createOrJoin",e)}},{key:"initEvent",value:function(e){var t=this;e.onicecandidate=function(e){if(e.candidate){var n={type:"candidate",label:e.candidate.sdpMLineIndex,id:e.candidate.sdpMid,candidate:e.candidate.candidate};t.sendMsgToConnectServer(n)}},e.onaddstream=function(e){console.log(e),"function"===typeof t.onAddStream&&t.onAddStream(e.stream)},e.ondatachannel=function(e){t.initChannelEvent(e.channel)}}},{key:"initChannelEvent",value:function(e){var t=this;e.onopen=function(e){console.log("open"),console.log(e)},e.onmessage=function(e){"function"===typeof t.onMessage&&t.onMessage(e)},e.onclose=function(e){console.log(e)}}},{key:"initSocketEvent",value:function(){var e=this;p.on("create",function(e){console.log("create ".concat(e))}),p.on("guestJoin",function(){var t=Object(a["a"])(regeneratorRuntime.mark(function t(n){var r;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return console.log("guestJoin"),e.initPeerCoon(),t.next=4,e.createOffer();case 4:r=t.sent,p.emit("getOffer",r);case 6:case"end":return t.stop()}},t,this)}));return function(e){return t.apply(this,arguments)}}()),p.on("getOffer",function(){var t=Object(a["a"])(regeneratorRuntime.mark(function t(n){var r;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return console.log("getoffer"),e.initPeerCoon(),t.next=4,e.getOffer(n);case 4:return t.next=6,e.createAnswer();case 6:r=t.sent,p.emit("getAnswer",r);case 8:case"end":return t.stop()}},t,this)}));return function(e){return t.apply(this,arguments)}}()),p.on("getAnswer",function(){var t=Object(a["a"])(regeneratorRuntime.mark(function t(n){return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return console.log("getanswer"),t.next=3,e.getAnswer(n);case 3:case"end":return t.stop()}},t,this)}));return function(e){return t.apply(this,arguments)}}()),p.on("message",function(t){if(t.type="candidate"){t.candidate;e.addIceCandidate(new RTCIceCandidate({candidate:t.candidate})).then(function(e){console.log("addicecandate success ".concat(e))},function(e){console.error("addicecandate fail ".concat(e))})}}),p.on("full",function(e){alert("房间已满"),location.href="/"}),p.on("getAvailableRooms",function(t){"function"===typeof e.onGetAvailableRooms&&e.onGetAvailableRooms(t)})}},{key:"createOffer",value:function(){var e=Object(a["a"])(regeneratorRuntime.mark(function e(){var t=this;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this.peerConn.createOffer().then(function(e){return t.peerConn.setLocalDescription(e),t.peerConn.localDescription},function(e){alert("create offer error:".concat(e))});case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()},{key:"getOffer",value:function(){var e=Object(a["a"])(regeneratorRuntime.mark(function e(t){return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this.peerConn.setRemoteDescription(new RTCSessionDescription(t)).then(function(){},function(e){alert("setRemoteDesc error: ".concat(e))});case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}()},{key:"createAnswer",value:function(){var e=Object(a["a"])(regeneratorRuntime.mark(function e(){var t=this;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this.peerConn.createAnswer().then(function(e){return t.peerConn.setLocalDescription(new RTCSessionDescription(e)),t.peerConn.localDescription},function(e){alert("create answer erro : ".concat(e))});case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()},{key:"getAnswer",value:function(e){return this.peerConn.setRemoteDescription(new RTCSessionDescription(e)).then(function(){},function(e){alert("set remote answer error :".concat(e))})}},{key:"sendMsgToConnectServer",value:function(e){p.emit("message",e)}},{key:"addIceCandidate",value:function(e){return this.peerConn.addIceCandidate(e)}},{key:"sendMsg",value:function(e){this.sendChannel.send(e)}},{key:"getAvailableRooms",value:function(){p.emit("getAvailableRooms")}},{key:"debug",value:function(e){this.debugObj=e}}]),e}(),v=new h;r["default"].use(c.a);var g={name:"app",components:{},data:function(){return{menuVisible:!1,sendTxt:"",roomId:"",hasJoinRoom:!1,localMsg:[],remoteMsg:[]}},mounted:function(){},destroyed:function(){},methods:{reload:function(){location.reload()},enterRandomRoom:function(){var e=this;v.getAvailableRooms(),v.onGetAvailableRooms=function(t){if(0!==t.length){var n=Math.floor(Math.random()*t.length);e.$router.push("/room/".concat(t[n]))}else alert("暂无房间")}},send:function(){v.sendMsg(this.sendTxt)},join:function(){var e=Object(a["a"])(regeneratorRuntime.mark(function e(){var t,n,r,o,i;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:if(/\w+/.test(this.roomId)){e.next=3;break}return alert("请输入房间号"),e.abrupt("return");case 3:return e.next=5,v.getMedia();case 5:if(t=e.sent,!t.errorMsg){e.next=9;break}return alert(t.errorMsg),e.abrupt("return");case 9:this.hasJoinRoom=!0,n=this.$refs.localVideo,r=this.$refs.remoteVideo,n.srcObject=t,v.connectRoom(this.roomId),o=this.$refs.canvas,o.width=400,o.height=300,i=o.getContext("2d"),setInterval(function(){var e=o.width/o.height*n.videoHeight/2,t=(n.videoWidth-e)/2,a=o.width/o.height*r.videoHeight/2,s=(r.videoWidth-a)/2;i.drawImage(n,t,0,e,n.videoHeight,0,0,o.width/2,o.height),i.drawImage(r,s,0,a,r.videoHeight,o.width/2,0,o.width/2,o.height)},30);case 19:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}(),snapshoot:function(){var e=this.$refs.snapshoot,t=this.$refs.canvas;e.src=t.toDataURL()},draw:function(){}}},b=g,w=(n("e756"),n("5c64"),n("2877")),y=Object(w["a"])(b,o,i,!1,null,null,null);y.options.__file="App.vue";var C=y.exports,R=n("8c4f"),k=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"home"},[n("div",{staticClass:"roomid"},[e._v("房间号："+e._s(e.$route.params.roomid))]),n("div",{staticClass:"md-layout"},[n("div",{staticClass:"md-layout-item md-small-size-100 ms-size-50",attrs:{id:"self"}},[n("md-card",{},[n("md-card-media",[n("video",{ref:"localVideo",attrs:{autoplay:"",muted:""},domProps:{muted:!0}})]),n("md-card-actions",[n("md-button",{on:{click:function(t){e.requestFullScreen("self")}}},[e._v("全屏")])],1)],1)],1),n("div",{staticClass:"md-layout-item md-small-size-100 md-size-50",attrs:{id:"other"}},[n("md-card",{},[n("md-card-media",[n("video",{ref:"remoteVideo",attrs:{autoplay:"",muted:""},domProps:{muted:!0}})]),n("md-card-actions",[n("md-button",[e._v("全屏")])],1)],1)],1)])])},x=[],_={name:"home",components:{},mounted:function(){var e=this;this.openCamera().then(function(){e.connect()}),this.initHandlerMethods()},methods:{initHandlerMethods:function(){var e=this;v.onAddStream=function(t){e.$refs.remoteVideo.srcObject=t}},requestFullScreen:function(e){var t=document.getElementById(e);t.requestFullscreen?t.requestFullscreen():t.mozRequestFullScreen?t.mozRequestFullScreen():t.webkitRequestFullscreen?t.webkitRequestFullscreen():t.msRequestFullscreen&&t.msRequestFullscreen()},exitFullscreen:function(){document.exitFullscreen?document.exitFullscreen():document.mozExitFullScreen?document.mozExitFullScreen():document.webkitExitFullscreen&&document.webkitExitFullscreen()},openCamera:function(){var e=Object(a["a"])(regeneratorRuntime.mark(function e(){var t;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,v.getMedia();case 2:t=e.sent,this.$refs.localVideo.srcObject=t;case 4:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}(),connect:function(){v.connectRoom(this.$route.params.roomid)}}},O=_,j=Object(w["a"])(O,k,x,!1,null,null,null);j.options.__file="room.vue";var M=j.exports,E=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"select"},[n("form",{attrs:{novalidate:""},on:{submit:function(t){return t.preventDefault(),e.validateUser(t)}}},[n("md-card",[n("md-card-content",[n("md-field",{class:e.getValidationClass("roomid")},[n("label",{attrs:{for:"room-id"}},[e._v("请输入房间号")]),n("md-input",{attrs:{name:"room-id",id:"room-id",autocomplete:"off",disabled:e.sending},model:{value:e.form.roomid,callback:function(t){e.$set(e.form,"roomid",t)},expression:"form.roomid"}}),e.$v.form.roomid.required?e._e():n("span",{staticClass:"md-error"},[e._v("请输入房间号")])],1)],1),e.sending?n("md-progress-bar",{attrs:{"md-mode":"indeterminate"}}):e._e(),n("md-card-actions",[n("md-button",{staticClass:"md-primary",attrs:{type:"submit",disabled:e.sending}},[e._v("进入")])],1)],1)],1)])},S=[],$=n("1dce"),A=n("b5ae"),z={name:"selectRoom",mixins:[$["validationMixin"]],data:function(){return{form:{roomid:""},sending:!1}},validations:{form:{roomid:{required:A["required"]}}},methods:{getValidationClass:function(e){var t=this.$v.form[e];if(t)return{"md-invalid":t.$invalid&&t.$dirty}},validateUser:function(){this.$v.$touch(),this.$v.$invalid||this.enterRoom()},enterRoom:function(){var e=Object(a["a"])(regeneratorRuntime.mark(function e(){var t;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:this.sending=!0,console.log(this.form),t=this.form.roomid,this.$router.push({name:"room",params:{roomid:t}}),this.sending=!1;case 5:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()}},F=z,T=Object(w["a"])(F,E,S,!1,null,null,null);T.options.__file="select-room.vue";var P=T.exports,D=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("md-empty-state",{attrs:{"md-rounded":"","md-size":300,"md-icon":"","md-label":"没有可用房间","md-description":"暂时没有可用房间，快去创建一个试试吧"}}),e._l(e.rooms,function(t){return n("md-card",{staticClass:"md-primary",attrs:{"md-with-hover":""},nativeOn:{click:function(n){e.$router.push("/room/"+t)}}},[n("md-ripple",[n("md-card-content",[e._v("房间号："+e._s(t))])],1)],1)})],2)},q=[],V={name:"home",components:{},data:function(){return{rooms:[]}},mounted:function(){var e=this;v.onGetAvailableRooms=function(t){e.rooms=t},v.getAvailableRooms()},methods:{ttt:function(){console.log(1)}}},I=V,H=(n("878a"),Object(w["a"])(I,D,q,!1,null,null,null));H.options.__file="show-rooms.vue";var J=H.exports;r["default"].use(R["a"]);var U=new R["a"]({routes:[{path:"/room/:roomid",name:"room",component:M},{path:"/select",name:"select",component:P},{path:"/showrooms",name:"showrooms",component:J},{path:"/about",name:"about",component:function(){return n.e("about").then(n.bind(null,"f820"))}},{path:"*",redirect:"/select"}]});r["default"].config.productionTip=!1,new r["default"]({router:U,render:function(e){return e(C)}}).$mount("#app")},"5c64":function(e,t,n){"use strict";var r=n("9f02"),o=n.n(r);o.a},"79ab":function(e,t,n){},"878a":function(e,t,n){"use strict";var r=n("1309"),o=n.n(r);o.a},"9f02":function(e,t,n){},e756:function(e,t,n){"use strict";var r=n("79ab"),o=n.n(r);o.a}});
//# sourceMappingURL=app.2b3bdebb.js.map