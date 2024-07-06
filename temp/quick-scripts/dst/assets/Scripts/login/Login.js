
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
    }
  },
  // LIFE-CYCLE CALLBACKS:
  onLoad: function onLoad() {
    if (this.rememberMe) {
      this.rememberMe.isChecked = false;
    }
  },
  onLoginClick: function onLoginClick() {
    var address = K.ServerAddress.ipAddress + K.ServerAPI.login;
    var data = {
      username: this.userName.string,
      password: this.password.string
    };
    ServerCom.httpRequest("POST", address, data, function (response) {
      if (response.token) {
        cc.sys.localStorage.setItem("token", response.token);
        var randomNumber = Math.floor(Math.random() * 10) + 1;
        cc.sys.localStorage.setItem("index", randomNumber);
        setTimeout(function () {
          this.lobbyNode.active = true;
        }.bind(this), 1000);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHRzL2xvZ2luL0xvZ2luLmpzIl0sIm5hbWVzIjpbImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwidXNlck5hbWUiLCJ0eXBlIiwiRWRpdEJveCIsInBhc3N3b3JkIiwicmVtZW1iZXJNZSIsIlRvZ2dsZSIsImxvYmJ5Tm9kZSIsIk5vZGUiLCJvbkxvYWQiLCJpc0NoZWNrZWQiLCJvbkxvZ2luQ2xpY2siLCJhZGRyZXNzIiwiSyIsIlNlcnZlckFkZHJlc3MiLCJpcEFkZHJlc3MiLCJTZXJ2ZXJBUEkiLCJsb2dpbiIsImRhdGEiLCJ1c2VybmFtZSIsInN0cmluZyIsIlNlcnZlckNvbSIsImh0dHBSZXF1ZXN0IiwicmVzcG9uc2UiLCJ0b2tlbiIsInN5cyIsImxvY2FsU3RvcmFnZSIsInNldEl0ZW0iLCJyYW5kb21OdW1iZXIiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJzZXRUaW1lb3V0IiwiYWN0aXZlIiwiYmluZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQUEsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDTCxhQUFTRCxFQUFFLENBQUNFLFNBRFA7QUFHTEMsRUFBQUEsVUFBVSxFQUFFO0FBRVJDLElBQUFBLFFBQVEsRUFBRTtBQUNOLGlCQUFTLElBREg7QUFFTkMsTUFBQUEsSUFBSSxFQUFFTCxFQUFFLENBQUNNO0FBRkgsS0FGRjtBQU1SQyxJQUFBQSxRQUFRLEVBQUU7QUFDTixpQkFBUyxJQURIO0FBRU5GLE1BQUFBLElBQUksRUFBRUwsRUFBRSxDQUFDTTtBQUZILEtBTkY7QUFVUkUsSUFBQUEsVUFBVSxFQUFFO0FBQ1IsaUJBQVMsSUFERDtBQUVSSCxNQUFBQSxJQUFJLEVBQUVMLEVBQUUsQ0FBQ1M7QUFGRCxLQVZKO0FBY1JDLElBQUFBLFNBQVMsRUFBQztBQUNOLGlCQUFTLElBREg7QUFFTkwsTUFBQUEsSUFBSSxFQUFFTCxFQUFFLENBQUNXO0FBRkg7QUFkRixHQUhQO0FBdUJMO0FBQ0FDLEVBQUFBLE1BeEJLLG9CQXdCSztBQUNOLFFBQUcsS0FBS0osVUFBUixFQUFtQjtBQUNmLFdBQUtBLFVBQUwsQ0FBZ0JLLFNBQWhCLEdBQTRCLEtBQTVCO0FBQ0g7QUFDSixHQTVCSTtBQThCTEMsRUFBQUEsWUE5QkssMEJBOEJVO0FBQ1gsUUFBSUMsT0FBTyxHQUFHQyxDQUFDLENBQUNDLGFBQUYsQ0FBZ0JDLFNBQWhCLEdBQTRCRixDQUFDLENBQUNHLFNBQUYsQ0FBWUMsS0FBdEQ7QUFDQSxRQUFJQyxJQUFJLEdBQUc7QUFDUEMsTUFBQUEsUUFBUSxFQUFFLEtBQUtsQixRQUFMLENBQWNtQixNQURqQjtBQUVQaEIsTUFBQUEsUUFBUSxFQUFFLEtBQUtBLFFBQUwsQ0FBY2dCO0FBRmpCLEtBQVg7QUFJQUMsSUFBQUEsU0FBUyxDQUFDQyxXQUFWLENBQXNCLE1BQXRCLEVBQThCVixPQUE5QixFQUF1Q00sSUFBdkMsRUFBNkMsVUFBVUssUUFBVixFQUFvQjtBQUM3RCxVQUFJQSxRQUFRLENBQUNDLEtBQWIsRUFBb0I7QUFDaEIzQixRQUFBQSxFQUFFLENBQUM0QixHQUFILENBQU9DLFlBQVAsQ0FBb0JDLE9BQXBCLENBQTRCLE9BQTVCLEVBQXFDSixRQUFRLENBQUNDLEtBQTlDO0FBQ0EsWUFBTUksWUFBWSxHQUFHQyxJQUFJLENBQUNDLEtBQUwsQ0FBV0QsSUFBSSxDQUFDRSxNQUFMLEtBQWdCLEVBQTNCLElBQWlDLENBQXREO0FBQ0FsQyxRQUFBQSxFQUFFLENBQUM0QixHQUFILENBQU9DLFlBQVAsQ0FBb0JDLE9BQXBCLENBQTRCLE9BQTVCLEVBQXFDQyxZQUFyQztBQUNBSSxRQUFBQSxVQUFVLENBQUMsWUFBWTtBQUNuQixlQUFLekIsU0FBTCxDQUFlMEIsTUFBZixHQUF3QixJQUF4QjtBQUNILFNBRlUsQ0FFVEMsSUFGUyxDQUVKLElBRkksQ0FBRCxFQUVJLElBRkosQ0FBVjtBQUdIO0FBRUosS0FWNEMsQ0FVM0NBLElBVjJDLENBVXRDLElBVnNDLENBQTdDO0FBWUg7QUFoREksQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXG5jYy5DbGFzcyh7XG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuXG4gICAgICAgIHVzZXJOYW1lOiB7XG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuRWRpdEJveCxcbiAgICAgICAgfSxcbiAgICAgICAgcGFzc3dvcmQ6IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5FZGl0Qm94LFxuICAgICAgICB9LFxuICAgICAgICByZW1lbWJlck1lOiB7XG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuVG9nZ2xlXG4gICAgICAgIH0sXG4gICAgICAgIGxvYmJ5Tm9kZTp7XG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcbiAgICAgICAgfVxuICAgIFxuICAgIH0sXG4gICAgLy8gTElGRS1DWUNMRSBDQUxMQkFDS1M6XG4gICAgb25Mb2FkICgpIHtcbiAgICAgICAgaWYodGhpcy5yZW1lbWJlck1lKXtcbiAgICAgICAgICAgIHRoaXMucmVtZW1iZXJNZS5pc0NoZWNrZWQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBvbkxvZ2luQ2xpY2sgKCl7XG4gICAgICAgIHZhciBhZGRyZXNzID0gSy5TZXJ2ZXJBZGRyZXNzLmlwQWRkcmVzcyArIEsuU2VydmVyQVBJLmxvZ2luO1xuICAgICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgICAgIHVzZXJuYW1lOiB0aGlzLnVzZXJOYW1lLnN0cmluZyxcbiAgICAgICAgICAgIHBhc3N3b3JkOiB0aGlzLnBhc3N3b3JkLnN0cmluZ1xuICAgICAgICB9O1xuICAgICAgICBTZXJ2ZXJDb20uaHR0cFJlcXVlc3QoXCJQT1NUXCIsIGFkZHJlc3MsIGRhdGEsIGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgaWYgKHJlc3BvbnNlLnRva2VuKSB7XG4gICAgICAgICAgICAgICAgY2Muc3lzLmxvY2FsU3RvcmFnZS5zZXRJdGVtKFwidG9rZW5cIiwgcmVzcG9uc2UudG9rZW4pO1xuICAgICAgICAgICAgICAgIGNvbnN0IHJhbmRvbU51bWJlciA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKSArIDE7XG4gICAgICAgICAgICAgICAgY2Muc3lzLmxvY2FsU3RvcmFnZS5zZXRJdGVtKFwiaW5kZXhcIiwgcmFuZG9tTnVtYmVyKTsgICBcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2JieU5vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9LmJpbmQodGhpcyksIDEwMDApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgIH0uYmluZCh0aGlzKSk7XG5cbiAgICB9LFxufSk7Il19