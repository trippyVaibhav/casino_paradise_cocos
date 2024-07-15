
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/login/Login.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
    },
    lobbyNode: {
      "default": null,
      type: cc.Node
    },
    errorLable: {
      "default": null,
      type: cc.Label
    },
    loginErrorNode: {
      "default": null,
      type: cc.Node
    }
  },
  // LIFE-CYCLE CALLBACKS:
  onLoad: function onLoad() {
    if (this.rememberMe) {
      this.rememberMe.isChecked = false;
    }
  },
  logutClick: function logutClick() {
    if (this.lobbyNode.active) {
      this.lobbyNode.active = false;
    }
  },
  onLoginClick: function onLoginClick() {
    var _this = this;

    var address = K.ServerAddress.ipAddress + K.ServerAPI.login;
    var data = {
      username: this.userName.string,
      password: this.password.string
    };

    if (this.userName.string == "" || this.password.string == "") {
      this.errorLable.string = "Username or Password fields are empty";
      this.loginErrorNode.active = true;
      setTimeout(function () {
        _this.loginErrorNode.active = false;
      }, 2000);
      return;
    }

    ServerCom.httpRequest("POST", address, data, function (response) {
      if (response.token) {
        var randomNumber = Math.floor(Math.random() * 10) + 1;

        if (cc.sys.isBrowser) {
          document.cookie = "token=" + response.token + "; path=/;";
          document.cookie = "index = " + randomNumber;
        } else {
          cc.sys.localStorage.setItem('token', response.token);
          cc.sys.localStorage.setItem("index", randomNumber);
        } // Cookies.set("index", randomNumber);


        setTimeout(function () {
          this.lobbyNode.active = true;
        }.bind(this), 1000);
      } else {
        console.log("response of user not found on login page", response); // this.errorLable.string = response.error
        // this.loginErrorNode.active = true;
        // setTimeout(() => {
        //     this.loginErrorNode.active = false;
        // }, 2000);
      }
    }.bind(this));
  }
});

cc._RF.pop();
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcbG9naW5cXExvZ2luLmpzIl0sIm5hbWVzIjpbImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwidXNlck5hbWUiLCJ0eXBlIiwiRWRpdEJveCIsInBhc3N3b3JkIiwicmVtZW1iZXJNZSIsIlRvZ2dsZSIsImxvYmJ5Tm9kZSIsIk5vZGUiLCJlcnJvckxhYmxlIiwiTGFiZWwiLCJsb2dpbkVycm9yTm9kZSIsIm9uTG9hZCIsImlzQ2hlY2tlZCIsImxvZ3V0Q2xpY2siLCJhY3RpdmUiLCJvbkxvZ2luQ2xpY2siLCJhZGRyZXNzIiwiSyIsIlNlcnZlckFkZHJlc3MiLCJpcEFkZHJlc3MiLCJTZXJ2ZXJBUEkiLCJsb2dpbiIsImRhdGEiLCJ1c2VybmFtZSIsInN0cmluZyIsInNldFRpbWVvdXQiLCJTZXJ2ZXJDb20iLCJodHRwUmVxdWVzdCIsInJlc3BvbnNlIiwidG9rZW4iLCJyYW5kb21OdW1iZXIiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJzeXMiLCJpc0Jyb3dzZXIiLCJkb2N1bWVudCIsImNvb2tpZSIsImxvY2FsU3RvcmFnZSIsInNldEl0ZW0iLCJiaW5kIiwiY29uc29sZSIsImxvZyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQUEsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDTCxhQUFTRCxFQUFFLENBQUNFLFNBRFA7QUFHTEMsRUFBQUEsVUFBVSxFQUFFO0FBRVJDLElBQUFBLFFBQVEsRUFBRTtBQUNOLGlCQUFTLElBREg7QUFFTkMsTUFBQUEsSUFBSSxFQUFFTCxFQUFFLENBQUNNO0FBRkgsS0FGRjtBQU1SQyxJQUFBQSxRQUFRLEVBQUU7QUFDTixpQkFBUyxJQURIO0FBRU5GLE1BQUFBLElBQUksRUFBRUwsRUFBRSxDQUFDTTtBQUZILEtBTkY7QUFVUkUsSUFBQUEsVUFBVSxFQUFFO0FBQ1IsaUJBQVMsSUFERDtBQUVSSCxNQUFBQSxJQUFJLEVBQUVMLEVBQUUsQ0FBQ1M7QUFG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QUFDSDtBQUVKLEtBeEI0QyxDQXdCM0NZLElBeEIyQyxDQXdCdEMsSUF4QnNDLENBQTdDO0FBMEJIO0FBdEZJLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5jYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG5cclxuICAgICAgICB1c2VyTmFtZToge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5FZGl0Qm94LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcGFzc3dvcmQ6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuRWRpdEJveCxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHJlbWVtYmVyTWU6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuVG9nZ2xlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBsb2JieU5vZGU6e1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZXJyb3JMYWJsZTp7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6Y2MuTGFiZWxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGxvZ2luRXJyb3JOb2RlOntcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXHJcbiAgICBcclxuICAgIH0sXHJcbiAgICAvLyBMSUZFLUNZQ0xFIENBTExCQUNLUzpcclxuICAgIG9uTG9hZCAoKSB7XHJcbiAgICAgICAgaWYodGhpcy5yZW1lbWJlck1lKXtcclxuICAgICAgICAgICAgdGhpcy5yZW1lbWJlck1lLmlzQ2hlY2tlZCA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgIFxyXG4gICAgfSxcclxuICAgIGxvZ3V0Q2xpY2soKXtcclxuICAgICAgICBpZih0aGlzLmxvYmJ5Tm9kZS5hY3RpdmUpe1xyXG4gICAgICAgICAgICB0aGlzLmxvYmJ5Tm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIG9uTG9naW5DbGljayAoKXtcclxuICAgICAgICB2YXIgYWRkcmVzcyA9IEsuU2VydmVyQWRkcmVzcy5pcEFkZHJlc3MgKyBLLlNlcnZlckFQSS5sb2dpbjtcclxuICAgICAgICB2YXIgZGF0YSA9IHtcclxuICAgICAgICAgICAgdXNlcm5hbWU6IHRoaXMudXNlck5hbWUuc3RyaW5nLFxyXG4gICAgICAgICAgICBwYXNzd29yZDogdGhpcy5wYXNzd29yZC5zdHJpbmdcclxuICAgICAgICB9O1xyXG4gICAgICAgIGlmKHRoaXMudXNlck5hbWUuc3RyaW5nID09IFwiXCIgfHwgdGhpcy5wYXNzd29yZC5zdHJpbmcgPT0gXCJcIil7XHJcbiAgICAgICAgICAgIHRoaXMuZXJyb3JMYWJsZS5zdHJpbmcgPSBcIlVzZXJuYW1lIG9yIFBhc3N3b3JkIGZpZWxkcyBhcmUgZW1wdHlcIlxyXG4gICAgICAgICAgICB0aGlzLmxvZ2luRXJyb3JOb2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2dpbkVycm9yTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgfSwgMjAwMCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcbiAgICAgICAgU2VydmVyQ29tLmh0dHBSZXF1ZXN0KFwiUE9TVFwiLCBhZGRyZXNzLCBkYXRhLCBmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgaWYgKHJlc3BvbnNlLnRva2VuKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCByYW5kb21OdW1iZXIgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCkgKyAxO1xyXG4gICAgICAgICAgICAgICAgaWYgKGNjLnN5cy5pc0Jyb3dzZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5jb29raWUgPSBgdG9rZW49JHtyZXNwb25zZS50b2tlbn07IHBhdGg9LztgO1xyXG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmNvb2tpZSA9IGBpbmRleCA9ICR7cmFuZG9tTnVtYmVyfWBcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2Muc3lzLmxvY2FsU3RvcmFnZS5zZXRJdGVtKCd0b2tlbicsIHJlc3BvbnNlLnRva2VuKTtcclxuICAgICAgICAgICAgICAgICAgICBjYy5zeXMubG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJpbmRleFwiLCByYW5kb21OdW1iZXIpOyBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vIENvb2tpZXMuc2V0KFwiaW5kZXhcIiwgcmFuZG9tTnVtYmVyKTtcclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9iYnlOb2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9LmJpbmQodGhpcyksIDEwMDApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInJlc3BvbnNlIG9mIHVzZXIgbm90IGZvdW5kIG9uIGxvZ2luIHBhZ2VcIiwgcmVzcG9uc2UpO1xyXG4gICAgICAgICAgICAgICAgLy8gdGhpcy5lcnJvckxhYmxlLnN0cmluZyA9IHJlc3BvbnNlLmVycm9yXHJcbiAgICAgICAgICAgICAgICAvLyB0aGlzLmxvZ2luRXJyb3JOb2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAvLyBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIC8vICAgICB0aGlzLmxvZ2luRXJyb3JOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgLy8gfSwgMjAwMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfS5iaW5kKHRoaXMpKTtcclxuXHJcbiAgICB9LFxyXG59KTsiXX0=