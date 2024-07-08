
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
      var _this2 = this;

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
        console.log("response of user not found on login page", response);
        this.errorLable.string = response.error;
        this.loginErrorNode.active = true;
        setTimeout(function () {
          _this2.loginErrorNode.active = false;
        }, 2000);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHRzL2xvZ2luL0xvZ2luLmpzIl0sIm5hbWVzIjpbImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwidXNlck5hbWUiLCJ0eXBlIiwiRWRpdEJveCIsInBhc3N3b3JkIiwicmVtZW1iZXJNZSIsIlRvZ2dsZSIsImxvYmJ5Tm9kZSIsIk5vZGUiLCJlcnJvckxhYmxlIiwiTGFiZWwiLCJsb2dpbkVycm9yTm9kZSIsIm9uTG9hZCIsImlzQ2hlY2tlZCIsIm9uTG9naW5DbGljayIsImFkZHJlc3MiLCJLIiwiU2VydmVyQWRkcmVzcyIsImlwQWRkcmVzcyIsIlNlcnZlckFQSSIsImxvZ2luIiwiZGF0YSIsInVzZXJuYW1lIiwic3RyaW5nIiwiYWN0aXZlIiwic2V0VGltZW91dCIsIlNlcnZlckNvbSIsImh0dHBSZXF1ZXN0IiwicmVzcG9uc2UiLCJ0b2tlbiIsInJhbmRvbU51bWJlciIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsInN5cyIsImlzQnJvd3NlciIsImRvY3VtZW50IiwiY29va2llIiwibG9jYWxTdG9yYWdlIiwic2V0SXRlbSIsImJpbmQiLCJjb25zb2xlIiwibG9nIiwiZXJyb3IiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0FBLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBR0xDLEVBQUFBLFVBQVUsRUFBRTtBQUVSQyxJQUFBQSxRQUFRLEVBQUU7QUFDTixpQkFBUyxJQURIO0FBRU5DLE1BQUFBLElBQUksRUFBRUwsRUFBRSxDQUFDTTtBQUZILEtBRkY7QUFNUkMsSUFBQUEsUUFBUSxFQUFFO0FBQ04saUJBQVMsSUFESDtBQUVORixNQUFBQSxJQUFJLEVBQUVMLEVBQUUsQ0FBQ007QUFGSCxLQU5GO0FBVVJFLElBQUFBLFVBQVUsRUFBRTtBQUNSLGlCQUFTLElBREQ7QUFFUkgsTUFBQUEsSUFBSSxFQUFFTCxFQUFFLENBQUNTO0FBRkQsS0FWSjtB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YSxNQUFwQixHQUE2QixLQUE3QjtBQUNILFNBRlMsRUFFUCxJQUZPLENBQVY7QUFHSDtBQUVKLEtBeEI0QyxDQXdCM0NnQixJQXhCMkMsQ0F3QnRDLElBeEJzQyxDQUE3QztBQTBCSDtBQS9FSSxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJcbmNjLkNsYXNzKHtcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG5cbiAgICAgICAgdXNlck5hbWU6IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5FZGl0Qm94LFxuICAgICAgICB9LFxuICAgICAgICBwYXNzd29yZDoge1xuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLkVkaXRCb3gsXG4gICAgICAgIH0sXG4gICAgICAgIHJlbWVtYmVyTWU6IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5Ub2dnbGVcbiAgICAgICAgfSxcbiAgICAgICAgbG9iYnlOb2RlOntcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxuICAgICAgICB9LFxuICAgICAgICBlcnJvckxhYmxlOntcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgICAgICB0eXBlOmNjLkxhYmVsXG4gICAgICAgIH0sXG4gICAgICAgIGxvZ2luRXJyb3JOb2RlOntcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXG4gICAgICAgIH0sXG4gICAgXG4gICAgfSxcbiAgICAvLyBMSUZFLUNZQ0xFIENBTExCQUNLUzpcbiAgICBvbkxvYWQgKCkge1xuICAgICAgICBpZih0aGlzLnJlbWVtYmVyTWUpe1xuICAgICAgICAgICAgdGhpcy5yZW1lbWJlck1lLmlzQ2hlY2tlZCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIG9uTG9naW5DbGljayAoKXtcbiAgICAgICAgdmFyIGFkZHJlc3MgPSBLLlNlcnZlckFkZHJlc3MuaXBBZGRyZXNzICsgSy5TZXJ2ZXJBUEkubG9naW47XG4gICAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICAgICAgdXNlcm5hbWU6IHRoaXMudXNlck5hbWUuc3RyaW5nLFxuICAgICAgICAgICAgcGFzc3dvcmQ6IHRoaXMucGFzc3dvcmQuc3RyaW5nXG4gICAgICAgIH07XG4gICAgICAgIGlmKHRoaXMudXNlck5hbWUuc3RyaW5nID09IFwiXCIgfHwgdGhpcy5wYXNzd29yZC5zdHJpbmcgPT0gXCJcIil7XG4gICAgICAgICAgICB0aGlzLmVycm9yTGFibGUuc3RyaW5nID0gXCJVc2VybmFtZSBvciBQYXNzd29yZCBmaWVsZHMgYXJlIGVtcHR5XCJcbiAgICAgICAgICAgIHRoaXMubG9naW5FcnJvck5vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMubG9naW5FcnJvck5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICB9LCAyMDAwKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgU2VydmVyQ29tLmh0dHBSZXF1ZXN0KFwiUE9TVFwiLCBhZGRyZXNzLCBkYXRhLCBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgIGlmIChyZXNwb25zZS50b2tlbikge1xuICAgICAgICAgICAgICAgIGNvbnN0IHJhbmRvbU51bWJlciA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKSArIDE7XG4gICAgICAgICAgICAgICAgaWYgKGNjLnN5cy5pc0Jyb3dzZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuY29va2llID0gYHRva2VuPSR7cmVzcG9uc2UudG9rZW59OyBwYXRoPS87YDtcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuY29va2llID0gYGluZGV4ID0gJHtyYW5kb21OdW1iZXJ9YFxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNjLnN5cy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndG9rZW4nLCByZXNwb25zZS50b2tlbik7XG4gICAgICAgICAgICAgICAgICAgIGNjLnN5cy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShcImluZGV4XCIsIHJhbmRvbU51bWJlcik7IFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBDb29raWVzLnNldChcImluZGV4XCIsIHJhbmRvbU51bWJlcik7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9iYnlOb2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgfS5iaW5kKHRoaXMpLCAxMDAwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJyZXNwb25zZSBvZiB1c2VyIG5vdCBmb3VuZCBvbiBsb2dpbiBwYWdlXCIsIHJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICB0aGlzLmVycm9yTGFibGUuc3RyaW5nID0gcmVzcG9uc2UuZXJyb3JcbiAgICAgICAgICAgICAgICB0aGlzLmxvZ2luRXJyb3JOb2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9naW5FcnJvck5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfSwgMjAwMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgfS5iaW5kKHRoaXMpKTtcblxuICAgIH0sXG59KTsiXX0=