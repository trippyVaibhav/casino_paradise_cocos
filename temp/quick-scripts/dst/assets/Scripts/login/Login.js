
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHRzL2xvZ2luL0xvZ2luLmpzIl0sIm5hbWVzIjpbImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwidXNlck5hbWUiLCJ0eXBlIiwiRWRpdEJveCIsInBhc3N3b3JkIiwicmVtZW1iZXJNZSIsIlRvZ2dsZSIsIm9uTG9hZCIsImlzQ2hlY2tlZCIsIm9uTG9naW5DbGljayIsImNvbnNvbGUiLCJsb2ciLCJzdHJpbmciXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUFBLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBR0xDLEVBQUFBLFVBQVUsRUFBRTtBQUVSQyxJQUFBQSxRQUFRLEVBQUU7QUFDTixpQkFBUyxJQURIO0FBRU5DLE1BQUFBLElBQUksRUFBRUwsRUFBRSxDQUFDTTtBQUZILEtBRkY7QUFNUkMsSUFBQUEsUUFBUSxFQUFFO0FBQ04saUJBQVMsSUFESDtBQUVORixNQUFBQSxJQUFJLEVBQUVMLEVBQUUsQ0FBQ007QUFGSCxLQU5GO0FBVVJFLElBQUFBLFVBQVUsRUFBRTtBQUNSLGlCQUFTLElBREQ7QUFFUkgsTUFBQUEsSUFBSSxFQUFFTCxFQUFFLENBQUNTO0FBRkQ7QUFWSixHQUhQO0FBb0JMO0FBRUFDLEVBQUFBLE1BdEJLLG9CQXNCSztBQUNOLFFBQUcsS0FBS0YsVUFBUixFQUFtQjtBQUNmLFdBQUtBLFVBQUwsQ0FBZ0JHLFNBQWhCLEdBQTRCLEtBQTVCO0FBQ0g7QUFDSixHQTFCSTtBQTRCTEMsRUFBQUEsWUE1QkssMEJBNEJVO0FBQ1hDLElBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLFVBQVosRUFBd0IsS0FBS1AsUUFBTCxDQUFjUSxNQUF0QztBQUNBRixJQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxVQUFaLEVBQXdCLEtBQUtWLFFBQUwsQ0FBY1csTUFBdEM7QUFDQUYsSUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksa0JBQVosRUFBZ0MsS0FBS04sVUFBTCxDQUFnQkcsU0FBaEQ7QUFFSDtBQWpDSSxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJjYy5DbGFzcyh7XG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuXG4gICAgICAgIHVzZXJOYW1lOiB7XG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuRWRpdEJveCxcbiAgICAgICAgfSxcbiAgICAgICAgcGFzc3dvcmQ6IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5FZGl0Qm94LFxuICAgICAgICB9LFxuICAgICAgICByZW1lbWJlck1lOiB7XG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuVG9nZ2xlXG4gICAgICAgIH1cbiAgICBcbiAgICB9LFxuXG4gICAgLy8gTElGRS1DWUNMRSBDQUxMQkFDS1M6XG5cbiAgICBvbkxvYWQgKCkge1xuICAgICAgICBpZih0aGlzLnJlbWVtYmVyTWUpe1xuICAgICAgICAgICAgdGhpcy5yZW1lbWJlck1lLmlzQ2hlY2tlZCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIG9uTG9naW5DbGljayAoKXtcbiAgICAgICAgY29uc29sZS5sb2coXCJwYXNzb3dyZFwiLCB0aGlzLnBhc3N3b3JkLnN0cmluZyk7XG4gICAgICAgIGNvbnNvbGUubG9nKFwidXNlcm5hbWVcIiwgdGhpcy51c2VyTmFtZS5zdHJpbmcpO1xuICAgICAgICBjb25zb2xlLmxvZygnVG9nZ2xlIHZhbHVlIGlzOicsIHRoaXMucmVtZW1iZXJNZS5pc0NoZWNrZWQpO1xuXG4gICAgfSxcbn0pO1xuIl19