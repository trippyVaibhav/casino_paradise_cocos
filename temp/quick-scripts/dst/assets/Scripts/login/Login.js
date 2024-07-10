
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHRzL2xvZ2luL0xvZ2luLmpzIl0sIm5hbWVzIjpbImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwidXNlck5hbWUiLCJ0eXBlIiwiRWRpdEJveCIsInBhc3N3b3JkIiwicmVtZW1iZXJNZSIsIlRvZ2dsZSIsImxvYmJ5Tm9kZSIsIk5vZGUiLCJlcnJvckxhYmxlIiwiTGFiZWwiLCJsb2dpbkVycm9yTm9kZSIsIm9uTG9hZCIsImlzQ2hlY2tlZCIsImxvZ3V0Q2xpY2siLCJhY3RpdmUiLCJvbkxvZ2luQ2xpY2siLCJhZGRyZXNzIiwiSyIsIlNlcnZlckFkZHJlc3MiLCJpcEFkZHJlc3MiLCJTZXJ2ZXJBUEkiLCJsb2dpbiIsImRhdGEiLCJ1c2VybmFtZSIsInN0cmluZyIsInNldFRpbWVvdXQiLCJTZXJ2ZXJDb20iLCJodHRwUmVxdWVzdCIsInJlc3BvbnNlIiwidG9rZW4iLCJyYW5kb21OdW1iZXIiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJzeXMiLCJpc0Jyb3dzZXIiLCJkb2N1bWVudCIsImNvb2tpZSIsImxvY2FsU3RvcmFnZSIsInNldEl0ZW0iLCJiaW5kIiwiY29uc29sZSIsImxvZyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQUEsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDTCxhQUFTRCxFQUFFLENBQUNFLFNBRFA7QUFHTEMsRUFBQUEsVUFBVSxFQUFFO0FBRVJDLElBQUFBLFFBQVEsRUFBRTtBQUNOLGlCQUFTLElBREg7QUFFTkMsTUFBQUEsSUFBSSxFQUFFTCxFQUFFLENBQUNNO0FBRkgsS0FGRjtBQU1SQyxJQUFBQSxRQUFRLEVBQUU7QUFDTixpQkFBUyxJQURIO0FBRU5GLE1BQUFBLElBQUksRUFBRUwsRUFBRSxDQUFDTTtBQUZILEtBTkY7QUFVUkUsSUFBQUEsVUFBVSxFQUFFO0FBQ1IsaUJBQVMsSUFERDtBQUVSSCxNQUFBQSxJQUFJLEVBQUVMLEVBQUUsQ0FBQ1M7QUFGRCxL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SDtBQUVKLEtBeEI0QyxDQXdCM0NZLElBeEIyQyxDQXdCdEMsSUF4QnNDLENBQTdDO0FBMEJIO0FBdEZJLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxuY2MuQ2xhc3Moe1xuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcblxuICAgICAgICB1c2VyTmFtZToge1xuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLkVkaXRCb3gsXG4gICAgICAgIH0sXG4gICAgICAgIHBhc3N3b3JkOiB7XG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuRWRpdEJveCxcbiAgICAgICAgfSxcbiAgICAgICAgcmVtZW1iZXJNZToge1xuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLlRvZ2dsZVxuICAgICAgICB9LFxuICAgICAgICBsb2JieU5vZGU6e1xuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXG4gICAgICAgIH0sXG4gICAgICAgIGVycm9yTGFibGU6e1xuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6Y2MuTGFiZWxcbiAgICAgICAgfSxcbiAgICAgICAgbG9naW5FcnJvck5vZGU6e1xuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcbiAgICAgICAgfSxcbiAgICAgICAgXG4gICAgXG4gICAgfSxcbiAgICAvLyBMSUZFLUNZQ0xFIENBTExCQUNLUzpcbiAgICBvbkxvYWQgKCkge1xuICAgICAgICBpZih0aGlzLnJlbWVtYmVyTWUpe1xuICAgICAgICAgICAgdGhpcy5yZW1lbWJlck1lLmlzQ2hlY2tlZCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgXG4gICAgfSxcbiAgICBsb2d1dENsaWNrKCl7XG4gICAgICAgIGlmKHRoaXMubG9iYnlOb2RlLmFjdGl2ZSl7XG4gICAgICAgICAgICB0aGlzLmxvYmJ5Tm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBvbkxvZ2luQ2xpY2sgKCl7XG4gICAgICAgIHZhciBhZGRyZXNzID0gSy5TZXJ2ZXJBZGRyZXNzLmlwQWRkcmVzcyArIEsuU2VydmVyQVBJLmxvZ2luO1xuICAgICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgICAgIHVzZXJuYW1lOiB0aGlzLnVzZXJOYW1lLnN0cmluZyxcbiAgICAgICAgICAgIHBhc3N3b3JkOiB0aGlzLnBhc3N3b3JkLnN0cmluZ1xuICAgICAgICB9O1xuICAgICAgICBpZih0aGlzLnVzZXJOYW1lLnN0cmluZyA9PSBcIlwiIHx8IHRoaXMucGFzc3dvcmQuc3RyaW5nID09IFwiXCIpe1xuICAgICAgICAgICAgdGhpcy5lcnJvckxhYmxlLnN0cmluZyA9IFwiVXNlcm5hbWUgb3IgUGFzc3dvcmQgZmllbGRzIGFyZSBlbXB0eVwiXG4gICAgICAgICAgICB0aGlzLmxvZ2luRXJyb3JOb2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvZ2luRXJyb3JOb2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgfSwgMjAwMCk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICAgIFNlcnZlckNvbS5odHRwUmVxdWVzdChcIlBPU1RcIiwgYWRkcmVzcywgZGF0YSwgZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICBpZiAocmVzcG9uc2UudG9rZW4pIHtcbiAgICAgICAgICAgICAgICBjb25zdCByYW5kb21OdW1iZXIgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCkgKyAxO1xuICAgICAgICAgICAgICAgIGlmIChjYy5zeXMuaXNCcm93c2VyKSB7XG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmNvb2tpZSA9IGB0b2tlbj0ke3Jlc3BvbnNlLnRva2VufTsgcGF0aD0vO2A7XG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmNvb2tpZSA9IGBpbmRleCA9ICR7cmFuZG9tTnVtYmVyfWBcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjYy5zeXMubG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3Rva2VuJywgcmVzcG9uc2UudG9rZW4pO1xuICAgICAgICAgICAgICAgICAgICBjYy5zeXMubG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJpbmRleFwiLCByYW5kb21OdW1iZXIpOyBcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gQ29va2llcy5zZXQoXCJpbmRleFwiLCByYW5kb21OdW1iZXIpO1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvYmJ5Tm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH0uYmluZCh0aGlzKSwgMTAwMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicmVzcG9uc2Ugb2YgdXNlciBub3QgZm91bmQgb24gbG9naW4gcGFnZVwiLCByZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgLy8gdGhpcy5lcnJvckxhYmxlLnN0cmluZyA9IHJlc3BvbnNlLmVycm9yXG4gICAgICAgICAgICAgICAgLy8gdGhpcy5sb2dpbkVycm9yTm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIC8vIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIC8vICAgICB0aGlzLmxvZ2luRXJyb3JOb2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIC8vIH0sIDIwMDApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgIH0uYmluZCh0aGlzKSk7XG5cbiAgICB9LFxufSk7Il19