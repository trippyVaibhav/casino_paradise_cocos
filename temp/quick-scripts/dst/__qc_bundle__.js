
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/__qc_index__.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}
require('./assets/Scripts/ServerCom');
require('./assets/Scripts/login/Login');

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
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/ServerCom.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'bd275iqnndLToBuUOYxMq3n', 'ServerCom');
// Scripts/ServerCom.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {},
  // LIFE-CYCLE CALLBACKS:
  onLoad: function onLoad() {
    this.checkOrientation(); // Add event listener for canvas resize to handle orientation change

    cc.view.on('canvas-resize', this.checkOrientation, this);
  },
  checkOrientation: function checkOrientation() {
    try {
      var winSize = cc.winSize; // Check if the width is greater than the height to determine orientation

      if (winSize.width > winSize.height) {
        cc.view.setOrientation(cc.macro.ORIENTATION_LANDSCAPE);
      } else {
        cc.view.setOrientation(cc.macro.ORIENTATION_PORTRAIT);
      }
    } catch (error) {
      console.error("Error checking orientation:", error);
    }
  },
  postRequest: function postRequest(data, callBack) {}
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHRzL1NlcnZlckNvbS5qcyJdLCJuYW1lcyI6WyJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsIm9uTG9hZCIsImNoZWNrT3JpZW50YXRpb24iLCJ2aWV3Iiwib24iLCJ3aW5TaXplIiwid2lkdGgiLCJoZWlnaHQiLCJzZXRPcmllbnRhdGlvbiIsIm1hY3JvIiwiT1JJRU5UQVRJT05fTEFORFNDQVBFIiwiT1JJRU5UQVRJT05fUE9SVFJBSVQiLCJlcnJvciIsImNvbnNvbGUiLCJwb3N0UmVxdWVzdCIsImRhdGEiLCJjYWxsQmFjayJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQUEsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDTCxhQUFTRCxFQUFFLENBQUNFLFNBRFA7QUFHTEMsRUFBQUEsVUFBVSxFQUFFLEVBSFA7QUFPTDtBQUVBQyxFQUFBQSxNQVRLLG9CQVNJO0FBQ0wsU0FBS0MsZ0JBQUwsR0FESyxDQUVMOztBQUNBTCxJQUFBQSxFQUFFLENBQUNNLElBQUgsQ0FBUUMsRUFBUixDQUFXLGVBQVgsRUFBNEIsS0FBS0YsZ0JBQWpDLEVBQW1ELElBQW5EO0FBQ0gsR0FiSTtBQWVMQSxFQUFBQSxnQkFmSyw4QkFlYztBQUNmLFFBQUk7QUFDQSxVQUFJRyxPQUFPLEdBQUdSLEVBQUUsQ0FBQ1EsT0FBakIsQ0FEQSxDQUVBOztBQUNBLFVBQUlBLE9BQU8sQ0FBQ0MsS0FBUixHQUFnQkQsT0FBTyxDQUFDRSxNQUE1QixFQUFvQztBQUNoQ1YsUUFBQUEsRUFBRSxDQUFDTSxJQUFILENBQVFLLGNBQVIsQ0FBdUJYLEVBQUUsQ0FBQ1ksS0FBSCxDQUFTQyxxQkFBaEM7QUFDSCxPQUZELE1BRU87QUFDSGIsUUFBQUEsRUFBRSxDQUFDTSxJQUFILENBQVFLLGNBQVIsQ0FBdUJYLEVBQUUsQ0FBQ1ksS0FBSCxDQUFTRSxvQkFBaEM7QUFDSDtBQUNKLEtBUkQsQ0FRRSxPQUFPQyxLQUFQLEVBQWM7QUFDWkMsTUFBQUEsT0FBTyxDQUFDRCxLQUFSLENBQWMsNkJBQWQsRUFBNkNBLEtBQTdDO0FBQ0g7QUFDSixHQTNCSTtBQThCTEUsRUFBQUEsV0E5QkssdUJBOEJPQyxJQTlCUCxFQThCYUMsUUE5QmIsRUE4QnNCLENBRTFCO0FBaENJLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImNjLkNsYXNzKHtcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgIFxuICAgIH0sXG5cbiAgICAvLyBMSUZFLUNZQ0xFIENBTExCQUNLUzpcblxuICAgIG9uTG9hZCgpIHtcbiAgICAgICAgdGhpcy5jaGVja09yaWVudGF0aW9uKCk7XG4gICAgICAgIC8vIEFkZCBldmVudCBsaXN0ZW5lciBmb3IgY2FudmFzIHJlc2l6ZSB0byBoYW5kbGUgb3JpZW50YXRpb24gY2hhbmdlXG4gICAgICAgIGNjLnZpZXcub24oJ2NhbnZhcy1yZXNpemUnLCB0aGlzLmNoZWNrT3JpZW50YXRpb24sIHRoaXMpO1xuICAgIH0sXG4gICAgXG4gICAgY2hlY2tPcmllbnRhdGlvbigpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGxldCB3aW5TaXplID0gY2Mud2luU2l6ZTtcbiAgICAgICAgICAgIC8vIENoZWNrIGlmIHRoZSB3aWR0aCBpcyBncmVhdGVyIHRoYW4gdGhlIGhlaWdodCB0byBkZXRlcm1pbmUgb3JpZW50YXRpb25cbiAgICAgICAgICAgIGlmICh3aW5TaXplLndpZHRoID4gd2luU2l6ZS5oZWlnaHQpIHtcbiAgICAgICAgICAgICAgICBjYy52aWV3LnNldE9yaWVudGF0aW9uKGNjLm1hY3JvLk9SSUVOVEFUSU9OX0xBTkRTQ0FQRSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNjLnZpZXcuc2V0T3JpZW50YXRpb24oY2MubWFjcm8uT1JJRU5UQVRJT05fUE9SVFJBSVQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkVycm9yIGNoZWNraW5nIG9yaWVudGF0aW9uOlwiLCBlcnJvcik7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIFxuXG4gICAgcG9zdFJlcXVlc3QoZGF0YSwgY2FsbEJhY2spe1xuICAgICAgICAgICAgICAgIFxuICAgIH0sXG5cbn0pO1xuIl19
//------QC-SOURCE-SPLIT------

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
//------QC-SOURCE-SPLIT------
