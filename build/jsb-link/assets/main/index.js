window.__require = function e(t, o, r) {
function i(a, c) {
if (!o[a]) {
if (!t[a]) {
var s = a.split("/");
s = s[s.length - 1];
if (!t[s]) {
var l = "function" == typeof __require && __require;
if (!c && l) return l(s, !0);
if (n) return n(s, !0);
throw new Error("Cannot find module '" + a + "'");
}
a = s;
}
var u = o[a] = {
exports: {}
};
t[a][0].call(u.exports, function(e) {
return i(t[a][1][e] || e);
}, u, u.exports, e, t, o, r);
}
return o[a].exports;
}
for (var n = "function" == typeof __require && __require, a = 0; a < r.length; a++) i(r[a]);
return i;
}({
1: [ function(e, t, o) {
"use strict";
Object.defineProperty(o, "__esModule", {
value: !0
});
var r = function(e) {
try {
return encodeURIComponent(e);
} catch (e) {
console.error("error encode %o");
}
return null;
}, i = function(e) {
try {
return decodeURIComponent(e);
} catch (e) {
console.error("error decode %o");
}
return null;
}, n = function(e) {
return r(e).replace(/[\-\.\+\*]/g, "\\$&");
}, a = {
getItem: function(e) {
return e && i(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + n(e) + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
},
setItem: function(e, t, o, i, n, a) {
if (!e || /^(?:expires|max\-age|path|domain|secure)$/i.test(e)) return !1;
var c = "";
if (o) switch (o.constructor) {
case Number:
c = Infinity === o ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + o;
break;

case String:
c = "; expires=" + o;
break;

case Date:
c = "; expires=" + o.toUTCString();
}
document.cookie = [ r(e), "=", r(t), c, n ? "; domain=" + n : "", i ? "; path=" + i : "", a ? "; secure" : "" ].join("");
return !0;
},
removeItem: function(e, t, o) {
if (!this.hasItem(e)) return !1;
document.cookie = [ r(e), "=; expires=Thu, 01 Jan 1970 00:00:00 GMT", o ? "; domain=" + o : "", t ? "; path=" + t : "" ].join("");
return !0;
},
hasItem: function(e) {
return !!e && new RegExp("(?:^|;\\s*)" + r(e).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=").test(document.cookie);
},
keys: function() {
var e = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
return e.map(function(e) {
return i(e);
});
}
};
o.default = a;
}, {} ],
GameConfig: [ function(e, t) {
"use strict";
cc._RF.push(t, "8da19Kpt7FCnoycSPF3SsWw", "GameConfig");
var o = window;
o.K = {};
o.K.internetAvailable = !0;
o.K.Error = cc.Enum({
CredentialsError: 401,
SuccessFalseError: 404
});
o.K.WS = !1;
o.K.DeveloperMode = !0;
o.K.ServerAddress = {
ipAddress: "https://game-crm-rtp-backend.onrender.com"
};
o.K.ServerAPI = {
login: "/api/users/login",
game: "/api/games/getGames?category"
};
o.K.Sounds = {};
t.exports = {
K: K
};
cc._RF.pop();
}, {} ],
Lobby: [ function(e, t) {
"use strict";
cc._RF.push(t, "44269NOlMVGd7tbn16fpN+w", "Lobby");
e("js-cookies");
var o = e("Login");
cc.Class({
extends: cc.Component,
properties: {
userId: {
default: null,
type: cc.Label
},
coinsLabel: {
default: null,
type: cc.Label
},
cloudAnimNode: {
default: null,
type: cc.Node
},
sprite: {
default: null,
type: cc.SpriteFrame
},
smallItemNode: {
default: null,
type: cc.Node
},
rightTiltNode: {
default: null,
type: cc.Node
},
leftTiltNode: {
default: null,
type: cc.Node
},
spinWheelNode: {
default: null,
type: cc.Node
},
OuterAnimation: {
default: null,
type: cc.Node
},
passwordNode: {
default: null,
type: cc.Node
},
passwordChangeButton: {
default: null,
type: cc.Node
},
popupNode: {
default: null,
type: cc.Node
},
oldPassword: {
default: null,
type: cc.Label
},
newPassword: {
default: null,
type: cc.Label
},
confirmPassword: {
default: null,
type: cc.Label
},
profileNode: {
default: null,
type: cc.Node
},
saveProfileBtn: {
default: null,
type: cc.Node
},
allTab: {
default: null,
type: cc.Node
},
fishTab: {
default: null,
type: cc.Node
},
favTab: {
default: null,
type: cc.Node
},
slotTab: {
default: null,
type: cc.Node
},
kenoTab: {
default: null,
type: cc.Node
},
otherTab: {
default: null,
type: cc.Node
},
loginNode: {
default: null,
type: o
},
category: null,
lefttiltAngle: -7,
tiltDuration: .2,
originalRotation: 0,
righttiltAngle: 7,
targetX: 0,
moveDuration: 2,
scaleUp: .9,
scaleNormal: .9
},
onLoad: function() {
this.category || (this.category = "all");
var e = this.cloudAnimNode.getPosition(), t = cc.moveTo(this.moveDuration, cc.v2(this.targetX, e.y));
this.cloudAnimNode.runAction(t);
var o = K.ServerAddress.ipAddress + K.ServerAPI.game + "=" + this.category;
ServerCom.httpRequest("GET", o, function(e) {
console.log("responseresponseresponse in lobby", e);
}.bind(this));
var r = cc.scaleTo(this.tiltDuration, this.leftTiltAngle), i = cc.scaleTo(this.animationDuration, this.scaleNormal), n = cc.sequence(r, i);
this.leftTiltNode.runAction(cc.repeatForever(n));
},
getGamesByCategoryAll: function() {
[ this.fishTab.getChildByName("bg"), this.favTab.getChildByName("bg"), this.slotTab.getChildByName("bg"), this.kenoTab.getChildByName("bg"), this.otherTab.getChildByName("bg") ].forEach(function(e) {
return e.active = !1;
});
this.allTab.getChildByName("bg").active = !0;
},
getGamesByCategoryfish: function() {
[ this.allTab.getChildByName("bg"), this.favTab.getChildByName("bg"), this.slotTab.getChildByName("bg"), this.kenoTab.getChildByName("bg"), this.otherTab.getChildByName("bg") ].forEach(function(e) {
return e.active = !1;
});
this.fishTab.getChildByName("bg").active = !0;
},
getGamesByCategoryfav: function() {
[ this.fishTab.getChildByName("bg"), this.allTab.getChildByName("bg"), this.slotTab.getChildByName("bg"), this.kenoTab.getChildByName("bg"), this.otherTab.getChildByName("bg") ].forEach(function(e) {
return e.active = !1;
});
this.favTab.getChildByName("bg").active = !0;
},
getGamesByCategorySlot: function() {
[ this.fishTab.getChildByName("bg"), this.allTab.getChildByName("bg"), this.favTab.getChildByName("bg"), this.kenoTab.getChildByName("bg"), this.otherTab.getChildByName("bg") ].forEach(function(e) {
return e.active = !1;
});
this.slotTab.getChildByName("bg").active = !0;
},
getGamesByCategoryKeno: function() {
[ this.fishTab.getChildByName("bg"), this.allTab.getChildByName("bg"), this.favTab.getChildByName("bg"), this.slotTab.getChildByName("bg"), this.otherTab.getChildByName("bg") ].forEach(function(e) {
return e.active = !1;
});
this.kenoTab.getChildByName("bg").active = !0;
},
getGamesByCategoryOther: function() {
[ this.fishTab.getChildByName("bg"), this.allTab.getChildByName("bg"), this.favTab.getChildByName("bg"), this.slotTab.getChildByName("bg"), this.kenoTab.getChildByName("bg") ].forEach(function(e) {
return e.active = !1;
});
this.otherTab.getChildByName("bg").active = !0;
},
zoomFullScreenClick: function() {
document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement ? document.cancelFullScreen ? document.cancelFullScreen() : document.mozCancelFullScreen ? document.mozCancelFullScreen() : document.webkitCancelFullScreen && document.webkitCancelFullScreen() : document.documentElement.requestFullscreen ? document.documentElement.requestFullscreen() : document.documentElement.mozRequestFullScreen ? document.documentElement.mozRequestFullScreen() : document.documentElement.webkitRequestFullscreen && document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
},
closeSpinNode: function() {
this.spinWheelNode.active && (this.spinWheelNode.active = !1);
},
openSpinWheelNode: function() {
var e = cc.rotateBy(5, 360), t = cc.repeatForever(e);
this.OuterAnimation.runAction(t);
this.spinWheelNode.active || (this.spinWheelNode.active = !0);
},
openProflePopup: function() {
this.popupNode.active = !0;
this.profileNode.active = !0;
},
logOutClick: function() {
console.log("clck");
this.node.active = !1;
this.loginNode.logutClick();
},
passwordChangeBtn: function() {
if ("" == this.oldPassword.string || "" == this.newPassword.string || "" == this.confirmPassword.string) {
ServerCom.errorLable.string = "All fields are mandatory";
ServerCom.loginErrorNode.active = !0;
setTimeout(function() {
ServerCom.loginErrorNode.active = !1;
}, 2e3);
} else {
if (this.newPassword.string != this.confirmPassword.string) {
ServerCom.errorLable.string = "New Password and confirm password did not match";
ServerCom.loginErrorNode.active = !0;
setTimeout(function() {
ServerCom.loginErrorNode.active = !1;
}, 2e3);
}
this.passwordNode.active = !1;
this.popupNode.active = !1;
}
},
changePassword: function() {
this.passwordNode.active = !0;
this.popupNode.active = !0;
},
closePopupBtn: function() {
if (this.passwordNode.active || this.profileNode.active) {
this.passwordNode.active = !1;
this.profileNode.active = !1;
}
this.popupNode.active = !1;
},
saveProfile: function() {
this.profileNode.active = !1;
this.popupNode.active = !1;
}
});
cc._RF.pop();
}, {
Login: "Login",
"js-cookies": 1
} ],
Login: [ function(e, t) {
"use strict";
cc._RF.push(t, "ac1ac5oJ6VEUL3rD+Zja0yl", "Login");
cc.Class({
extends: cc.Component,
properties: {
userName: {
default: null,
type: cc.EditBox
},
password: {
default: null,
type: cc.EditBox
},
rememberMe: {
default: null,
type: cc.Toggle
},
lobbyNode: {
default: null,
type: cc.Node
},
errorLable: {
default: null,
type: cc.Label
},
loginErrorNode: {
default: null,
type: cc.Node
}
},
onLoad: function() {
this.rememberMe && (this.rememberMe.isChecked = !1);
},
logutClick: function() {
this.lobbyNode.active && (this.lobbyNode.active = !1);
},
onLoginClick: function() {
var e = this, t = K.ServerAddress.ipAddress + K.ServerAPI.login, o = {
username: this.userName.string,
password: this.password.string
};
if ("" != this.userName.string && "" != this.password.string) ServerCom.httpRequest("POST", t, o, function(e) {
if (e.token) {
var t = Math.floor(10 * Math.random()) + 1;
if (cc.sys.isBrowser) {
document.cookie = "token=" + e.token + "; path=/;";
document.cookie = "index = " + t;
} else {
cc.sys.localStorage.setItem("token", e.token);
cc.sys.localStorage.setItem("index", t);
}
setTimeout(function() {
this.lobbyNode.active = !0;
}.bind(this), 1e3);
} else console.log("response of user not found on login page", e);
}.bind(this)); else {
this.errorLable.string = "Username or Password fields are empty";
this.loginErrorNode.active = !0;
setTimeout(function() {
e.loginErrorNode.active = !1;
}, 2e3);
}
}
});
cc._RF.pop();
}, {} ],
ServerCom: [ function(e, t) {
"use strict";
cc._RF.push(t, "bd275iqnndLToBuUOYxMq3n", "ServerCom");
e("js-cookies");
var o = window;
cc.Class({
extends: cc.Component,
properties: {
loading: {
default: null,
type: cc.Node
},
reconnecting: {
default: null,
type: cc.Node
},
tracker: {
default: {}
},
errorLable: {
default: null,
type: cc.Label
},
loginErrorNode: {
default: null,
type: cc.Node
},
trackerCount: 0,
timer: 0
},
onLoad: function() {
o.ServerCom = this;
this.checkOrientation();
cc.view.on("canvas-resize", this.checkOrientation, this);
},
checkOrientation: function() {
try {
var e = cc.winSize;
e.width > e.height ? cc.view.setOrientation(cc.macro.ORIENTATION_LANDSCAPE) : cc.view.setOrientation(cc.macro.ORIENTATION_PORTRAIT);
} catch (e) {
console.error("Error checking orientation:", e);
}
},
clearTracker: function() {
this.trackerCount = 0;
this.tracker = {};
},
httpRequest: function(e, t, o, r, i, n) {
var a = this, c = new XMLHttpRequest();
c.timeout = n || 1e3;
ServerCom.loading.active || (ServerCom.loading.active = !0);
c.onreadystatechange = function() {
K.internetAvailable = !0;
if (4 == c.readyState) {
ServerCom.loading.active = !1;
var e = c.responseText;
if (c.status >= 200 && c.status < 400) {
if (null != r) {
var t = JSON.parse(e);
r(t);
}
} else try {
var o = JSON.parse(e);
o.error && o.error;
console.log("errorDataerrorData", o, c);
a.errorLable.string = o.error;
a.loginErrorNode.active = !0;
setTimeout(function() {
a.loginErrorNode.active = !1;
}, 2e3);
} catch (e) {
console.error("Error parsing error response:", e);
}
}
};
c.onerror = function() {
ServerCom.loading.active = !1;
K.internetAvailable = !1;
try {
var e = JSON.parse(c.responseText);
e.error && e.error;
} catch (e) {
console.error("Error parsing error response:", e);
}
};
c.ontimeout = function() {
ServerCom.loading.active = !1;
K.disconnectRequestedByPlayer = !1;
K.internetAvailable = !1;
a.emit("error", {
code: K.Error.TimeOutError,
response: "Timeout " + t
});
};
c.open(e, t, !0);
c.setRequestHeader("Content-Type", "application/json");
var s = null;
if (!s && cc.sys.isBrowser) for (var l = document.cookie.split(";"), u = 0; u < l.length; u++) {
var d = l[u].trim();
if (d.startsWith("token=")) {
s = d.substring("token=".length, d.length);
break;
}
}
s && c.setRequestHeader("Cookie", "userToken=" + s);
"POST" === e ? c.send(JSON.stringify(o)) : "GET" === e && c.send();
}
});
cc._RF.pop();
}, {
"js-cookies": 1
} ]
}, {}, [ "GameConfig", "Lobby", "ServerCom", "Login" ]);