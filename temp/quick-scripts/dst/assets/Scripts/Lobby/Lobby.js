
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Lobby/Lobby.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '44269NOlMVGd7tbn16fpN+w', 'Lobby');
// Scripts/Lobby/Lobby.js

"use strict";

// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
cc.Class({
  "extends": cc.Component,
  properties: {
    userId: {
      "default": null,
      type: cc.Label
    },
    coinsLabel: {
      "default": null,
      type: cc.Label
    },
    category: null
  },
  // LIFE-CYCLE CALLBACKS:
  onLoad: function onLoad() {
    if (!this.category) {
      this.category = "all";
    }

    var address = K.ServerAddress.ipAddress + K.ServerAPI.game + "=" + this.category;
    ServerCom.httpRequest("GET", address, function (response) {
      console.log("responseresponseresponse in lobby", response);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHRzL0xvYmJ5L0xvYmJ5LmpzIl0sIm5hbWVzIjpbImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwidXNlcklkIiwidHlwZSIsIkxhYmVsIiwiY29pbnNMYWJlbCIsImNhdGVnb3J5Iiwib25Mb2FkIiwiYWRkcmVzcyIsIksiLCJTZXJ2ZXJBZGRyZXNzIiwiaXBBZGRyZXNzIiwiU2VydmVyQVBJIiwiZ2FtZSIsIlNlcnZlckNvbSIsImh0dHBSZXF1ZXN0IiwicmVzcG9uc2UiLCJjb25zb2xlIiwibG9nIiwiYmluZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQUEsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDTCxhQUFTRCxFQUFFLENBQUNFLFNBRFA7QUFHTEMsRUFBQUEsVUFBVSxFQUFFO0FBQ1hDLElBQUFBLE1BQU0sRUFBQztBQUNKLGlCQUFTLElBREw7QUFFSkMsTUFBQUEsSUFBSSxFQUFDTCxFQUFFLENBQUNNO0FBRkosS0FESTtBQUtYQyxJQUFBQSxVQUFVLEVBQUM7QUFDUixpQkFBUyxJQUREO0FBRVJGLE1BQUFBLElBQUksRUFBRUwsRUFBRSxDQUFDTTtBQUZELEtBTEE7QUFTWEUsSUFBQUEsUUFBUSxFQUFFO0FBVEMsR0FIUDtBQWdCTDtBQUVBQyxFQUFBQSxNQWxCSyxvQkFrQks7QUFDTixRQUFHLENBQUMsS0FBS0QsUUFBVCxFQUFrQjtBQUNkLFdBQUtBLFFBQUwsR0FBZ0IsS0FBaEI7QUFDSDs7QUFDRCxRQUFJRSxPQUFPLEdBQUdDLENBQUMsQ0FBQ0MsYUFBRixDQUFnQkMsU0FBaEIsR0FBNEJGLENBQUMsQ0FBQ0csU0FBRixDQUFZQyxJQUF4QyxHQUE4QyxHQUE5QyxHQUFtRCxLQUFLUCxRQUF0RTtBQUVBUSxJQUFBQSxTQUFTLENBQUNDLFdBQVYsQ0FBc0IsS0FBdEIsRUFBNkJQLE9BQTdCLEVBQXNDLFVBQVVRLFFBQVYsRUFBb0I7QUFDdkRDLE1BQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLG1DQUFaLEVBQWlERixRQUFqRDtBQUNGLEtBRnFDLENBRXBDRyxJQUZvQyxDQUUvQixJQUYrQixDQUF0QztBQUdIO0FBM0JJLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIExlYXJuIGNjLkNsYXNzOlxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvY2xhc3MuaHRtbFxuLy8gTGVhcm4gQXR0cmlidXRlOlxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxuLy8gTGVhcm4gbGlmZS1jeWNsZSBjYWxsYmFja3M6XG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXG5cbmNjLkNsYXNzKHtcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgIHVzZXJJZDp7XG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgIHR5cGU6Y2MuTGFiZWwsXG4gICAgIH0sXG4gICAgIGNvaW5zTGFiZWw6e1xuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICB0eXBlOiBjYy5MYWJlbCxcbiAgICAgfSxcbiAgICAgY2F0ZWdvcnk6IG51bGwsXG4gICAgICBcbiAgICB9LFxuXG4gICAgLy8gTElGRS1DWUNMRSBDQUxMQkFDS1M6XG5cbiAgICBvbkxvYWQgKCkge1xuICAgICAgICBpZighdGhpcy5jYXRlZ29yeSl7XG4gICAgICAgICAgICB0aGlzLmNhdGVnb3J5ID0gXCJhbGxcIlxuICAgICAgICB9XG4gICAgICAgIHZhciBhZGRyZXNzID0gSy5TZXJ2ZXJBZGRyZXNzLmlwQWRkcmVzcyArIEsuU2VydmVyQVBJLmdhbWUgK1wiPVwiKyB0aGlzLmNhdGVnb3J5O1xuICAgICAgICBcbiAgICAgICAgU2VydmVyQ29tLmh0dHBSZXF1ZXN0KFwiR0VUXCIsIGFkZHJlc3MsIGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICBjb25zb2xlLmxvZyhcInJlc3BvbnNlcmVzcG9uc2VyZXNwb25zZSBpbiBsb2JieVwiLCByZXNwb25zZSk7XG4gICAgICAgIH0uYmluZCh0aGlzKSk7XG4gICAgfSxcbn0pO1xuIl19