"use strict";
cc._RF.push(module, 'ac1ac5oJ6VEUL3rD+Zja0yl', 'Login');
// Scripts/login/Login.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {
    userName: {
      "default": null,
      type: cc.EditBox
    },
    password: {
      "default": null,
      type: cc.EditBox
    },
    rememberMe: {
      "default": null,
      type: cc.Toggle
    }
  },
  // LIFE-CYCLE CALLBACKS:
  onLoad: function onLoad() {
    if (this.rememberMe) {
      this.rememberMe.isChecked = false;
    }
  },
  onLoginClick: function onLoginClick() {
    console.log("passowrd", this.password.string);
    console.log("username", this.userName.string);
    console.log('Toggle value is:', this.rememberMe.isChecked);
  }
});

cc._RF.pop();