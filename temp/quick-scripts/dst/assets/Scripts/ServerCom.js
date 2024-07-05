
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