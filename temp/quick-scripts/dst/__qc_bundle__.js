
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
require('./assets/Scripts/Config/GameConfig');
require('./assets/Scripts/Lobby/Lobby');
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

var Cookies = require('js-cookies'); // const axios = require('./axios/dist/axios');
// const axios = require('axios');


var root = window;
cc.Class({
  "extends": cc.Component,
  properties: {
    loading: {
      "default": null,
      type: cc.Node
    },
    reconnecting: {
      "default": null,
      type: cc.Node
    },
    tracker: {
      "default": {}
    },
    errorLable: {
      "default": null,
      type: cc.Label
    },
    loginErrorNode: {
      "default": null,
      type: cc.Node
    },
    trackerCount: 0,
    timer: 0
  },
  // LIFE-CYCLE CALLBACKS:
  onLoad: function onLoad() {
    // Created ServerCom Gloabaly so that we can access it anywhere we want
    root.ServerCom = this;
    this.checkOrientation(); // Add event listener for canvas resize to handle orientation change

    cc.view.on('canvas-resize', this.checkOrientation, this);
  },
  // following function is to check the width and change the orientation(Landscape/Potrait) for mobile or dekstop
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
  clearTracker: function clearTracker() {
    this.trackerCount = 0;
    this.tracker = {};
  },

  /**
   * @method httpPostRequest
   * @description HTTP request - POST data 
   * @param {String} address -address of Server 
   * @param {Object} data -Data/PayLoad to be sent
   * @param {method} callback -Callback to be executed if response.succss is true!
   * @param {method} error -Callback to be executed if response.success is false!
   * @param {Number} timeout -value in milli seconds, Specify request timeout time! 
   * @memberof Utilities.ServerCom#
   */
  httpRequest: function httpRequest(method, address, data, callback, error, timeout) {
    var inst = this;
    var xhr = new XMLHttpRequest();
    xhr.timeout = timeout || 1000;

    if (!ServerCom.loading.active) {
      ServerCom.loading.active = true;
    }

    xhr.onreadystatechange = function () {
      K.internetAvailable = true;

      if (xhr.readyState == 4) {
        ServerCom.loading.active = false;
        var response = xhr.responseText;

        if (xhr.status >= 200 && xhr.status < 400) {
          if (callback !== null && callback !== undefined) {
            var data = JSON.parse(response);
            callback(data);
          }
        } else {
          var errorMsg = "Unknown error";

          try {
            var errorData = JSON.parse(response);

            if (errorData.error) {
              errorMsg = errorData.error;
            }

            console.log("errorDataerrorData", errorData, xhr);
            inst.errorLable.string = errorData.error;
            inst.loginErrorNode.active = true;
            setTimeout(function () {
              inst.loginErrorNode.active = false;
            }, 2000); // callback(errorData);
          } catch (e) {
            console.error("Error parsing error response:", e);
          }
        }
      }
    };

    xhr.onerror = function (err) {
      ServerCom.loading.active = false;
      K.internetAvailable = false;
      var errorMsg = "Unknown error";

      try {
        var errorData = JSON.parse(xhr.responseText);

        if (errorData.error) {
          errorMsg = errorData.error;
        }
      } catch (e) {
        console.error("Error parsing error response:", e);
      }
    };

    xhr.ontimeout = function () {
      ServerCom.loading.active = false;
      K.disconnectRequestedByPlayer = false;
      K.internetAvailable = false; // 

      inst.emit('error', {
        code: K.Error.TimeOutError,
        response: "Timeout " + address
      });
    }; // 
    // xhr.withCredentials = true;


    xhr.open(method, address, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    var token = null;

    if (!token && cc.sys.isBrowser) {
      var cookies = document.cookie.split(';');

      for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();

        if (cookie.startsWith('token=')) {
          token = cookie.substring('token='.length, cookie.length);
          break;
        }
      }
    } // If token exists, add it to a custom header


    if (token) {
      xhr.setRequestHeader("Cookie", "userToken=" + token);
    }

    if (method === "POST") {
      xhr.send(JSON.stringify(data));
    } else if (method === "GET") {
      xhr.send();
    }
  } // WILL use the following code later to check if the same api is request untill we gets its response
  // /**
  // updateTracker: function (val, key, showLoading) {
  //     var incr = val ? +1 : -1;
  //     this.trackerCount = this.trackerCount + incr;
  //     var isActive = val && showLoading;
  //     if(!this.loading.active && showLoading){
  //         this.loading.active = true; 
  //     }else if(this.loading.active && !showLoading) {
  //         this.loading.active = false;
  //     }
  //     //this.loading.active = val && showLoading;
  //     this.tracker[key] = val;
  // },

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHRzL1NlcnZlckNvbS5qcyJdLCJuYW1lcyI6WyJDb29raWVzIiwicmVxdWlyZSIsInJvb3QiLCJ3aW5kb3ciLCJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsImxvYWRpbmciLCJ0eXBlIiwiTm9kZSIsInJlY29ubmVjdGluZyIsInRyYWNrZXIiLCJlcnJvckxhYmxlIiwiTGFiZWwiLCJsb2dpbkVycm9yTm9kZSIsInRyYWNrZXJDb3VudCIsInRpbWVyIiwib25Mb2FkIiwiU2VydmVyQ29tIiwiY2hlY2tPcmllbnRhdGlvbiIsInZpZXciLCJvbiIsIndpblNpemUiLCJ3aWR0aCIsImhlaWdodCIsInNldE9yaWVudGF0aW9uIiwibWFjcm8iLCJPUklFTlRBVElPTl9MQU5EU0NBUEUiLCJPUklFTlRBVElPTl9QT1JUUkFJVCIsImVycm9yIiwiY29uc29sZSIsImNsZWFyVHJhY2tlciIsImh0dHBSZXF1ZXN0IiwibWV0aG9kIiwiYWRkcmVzcyIsImRhdGEiLCJjYWxsYmFjayIsInRpbWVvdXQiLCJpbnN0IiwieGhyIiwiWE1MSHR0cFJlcXVlc3QiLCJhY3RpdmUiLCJvbnJlYWR5c3RhdGVjaGFuZ2UiLCJLIiwiaW50ZXJuZXRBdmFpbGFibGUiLCJyZWFkeVN0YXRlIiwicmVzcG9uc2UiLCJyZXNwb25zZVRleHQiLCJzdGF0dXMiLCJ1bmRlZmluZWQiLCJKU09OIiwicGFyc2UiLCJlcnJvck1zZyIsImVycm9yRGF0YSIsImxvZyIsInN0cmluZyIsInNldFRpbWVvdXQiLCJlIiwib25lcnJvciIsImVyciIsIm9udGltZW91dCIsImRpc2Nvbm5lY3RSZXF1ZXN0ZWRCeVBsYXllciIsImVtaXQiLCJjb2RlIiwiRXJyb3IiLCJUaW1lT3V0RXJyb3IiLCJvcGVuIiwic2V0UmVxdWVzdEhlYWRlciIsInRva2VuIiwic3lzIiwiaXNCcm93c2VyIiwiY29va2llcyIsImRvY3VtZW50IiwiY29va2llIiwic3BsaXQiLCJpIiwibGVu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TUFBQUEsR0FBRyxDQUFDeUMsSUFBSjtBQUNIO0FBQ0osR0F2SkksQ0EwSkw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUF2S0ssQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgQ29va2llcyA9IHJlcXVpcmUoJ2pzLWNvb2tpZXMnKTtcbi8vIGNvbnN0IGF4aW9zID0gcmVxdWlyZSgnLi9heGlvcy9kaXN0L2F4aW9zJyk7XG4vLyBjb25zdCBheGlvcyA9IHJlcXVpcmUoJ2F4aW9zJyk7XG5cbnZhciByb290ID0gd2luZG93O1xuY2MuQ2xhc3Moe1xuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIGxvYWRpbmc6IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxuICAgICAgICB9LFxuICAgICAgICByZWNvbm5lY3Rpbmc6IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxuICAgICAgICB9LFxuICAgICAgICB0cmFja2VyOiB7XG4gICAgICAgICAgICBkZWZhdWx0OiB7fSxcbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3JMYWJsZTp7XG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAgICAgdHlwZTpjYy5MYWJlbFxuICAgICAgICB9LFxuICAgICAgICBsb2dpbkVycm9yTm9kZTp7XG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZVxuICAgICAgICB9LFxuICAgICAgICB0cmFja2VyQ291bnQ6IDAsXG4gICAgICAgIHRpbWVyIDogMCxcbiAgICB9LFxuICAgIC8vIExJRkUtQ1lDTEUgQ0FMTEJBQ0tTOlxuICAgIG9uTG9hZCgpIHtcbiAgICAgICAgLy8gQ3JlYXRlZCBTZXJ2ZXJDb20gR2xvYWJhbHkgc28gdGhhdCB3ZSBjYW4gYWNjZXNzIGl0IGFueXdoZXJlIHdlIHdhbnRcbiAgICAgICAgcm9vdC5TZXJ2ZXJDb20gPSB0aGlzO1xuICAgICAgICB0aGlzLmNoZWNrT3JpZW50YXRpb24oKTtcbiAgICAgICAgLy8gQWRkIGV2ZW50IGxpc3RlbmVyIGZvciBjYW52YXMgcmVzaXplIHRvIGhhbmRsZSBvcmllbnRhdGlvbiBjaGFuZ2VcbiAgICAgICAgY2Mudmlldy5vbignY2FudmFzLXJlc2l6ZScsIHRoaXMuY2hlY2tPcmllbnRhdGlvbiwgdGhpcyk7XG4gICAgfSxcbiAgICAvLyBmb2xsb3dpbmcgZnVuY3Rpb24gaXMgdG8gY2hlY2sgdGhlIHdpZHRoIGFuZCBjaGFuZ2UgdGhlIG9yaWVudGF0aW9uKExhbmRzY2FwZS9Qb3RyYWl0KSBmb3IgbW9iaWxlIG9yIGRla3N0b3BcbiAgICBjaGVja09yaWVudGF0aW9uKCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgbGV0IHdpblNpemUgPSBjYy53aW5TaXplO1xuICAgICAgICAgICAgLy8gQ2hlY2sgaWYgdGhlIHdpZHRoIGlzIGdyZWF0ZXIgdGhhbiB0aGUgaGVpZ2h0IHRvIGRldGVybWluZSBvcmllbnRhdGlvblxuICAgICAgICAgICAgaWYgKHdpblNpemUud2lkdGggPiB3aW5TaXplLmhlaWdodCkge1xuICAgICAgICAgICAgICAgIGNjLnZpZXcuc2V0T3JpZW50YXRpb24oY2MubWFjcm8uT1JJRU5UQVRJT05fTEFORFNDQVBFKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY2Mudmlldy5zZXRPcmllbnRhdGlvbihjYy5tYWNyby5PUklFTlRBVElPTl9QT1JUUkFJVCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgY2hlY2tpbmcgb3JpZW50YXRpb246XCIsIGVycm9yKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgY2xlYXJUcmFja2VyOiBmdW5jdGlvbigpe1xuICAgICAgICB0aGlzLnRyYWNrZXJDb3VudCA9IDA7XG4gICAgICAgIHRoaXMudHJhY2tlciA9IHt9O1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIGh0dHBQb3N0UmVxdWVzdFxuICAgICAqIEBkZXNjcmlwdGlvbiBIVFRQIHJlcXVlc3QgLSBQT1NUIGRhdGEgXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGFkZHJlc3MgLWFkZHJlc3Mgb2YgU2VydmVyIFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhIC1EYXRhL1BheUxvYWQgdG8gYmUgc2VudFxuICAgICAqIEBwYXJhbSB7bWV0aG9kfSBjYWxsYmFjayAtQ2FsbGJhY2sgdG8gYmUgZXhlY3V0ZWQgaWYgcmVzcG9uc2Uuc3VjY3NzIGlzIHRydWUhXG4gICAgICogQHBhcmFtIHttZXRob2R9IGVycm9yIC1DYWxsYmFjayB0byBiZSBleGVjdXRlZCBpZiByZXNwb25zZS5zdWNjZXNzIGlzIGZhbHNlIVxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSB0aW1lb3V0IC12YWx1ZSBpbiBtaWxsaSBzZWNvbmRzLCBTcGVjaWZ5IHJlcXVlc3QgdGltZW91dCB0aW1lISBcbiAgICAgKiBAbWVtYmVyb2YgVXRpbGl0aWVzLlNlcnZlckNvbSNcbiAgICAgKi9cblxuIFxuICAgIGh0dHBSZXF1ZXN0OiBmdW5jdGlvbiAobWV0aG9kLCBhZGRyZXNzLCBkYXRhLCBjYWxsYmFjaywgZXJyb3IsIHRpbWVvdXQpIHtcbiAgICAgICAgdmFyIGluc3QgPSB0aGlzO1xuICAgICAgICB2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgICAgIHhoci50aW1lb3V0ID0gdGltZW91dCB8fCAxMDAwO1xuICAgICAgICBpZighU2VydmVyQ29tLmxvYWRpbmcuYWN0aXZlKXtcbiAgICAgICAgICAgIFNlcnZlckNvbS5sb2FkaW5nLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgeGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIEsuaW50ZXJuZXRBdmFpbGFibGUgPSB0cnVlO1xuICAgICAgICAgICAgaWYgKHhoci5yZWFkeVN0YXRlID09IDQpIHtcbiAgICAgICAgICAgICAgICBTZXJ2ZXJDb20ubG9hZGluZy5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB2YXIgcmVzcG9uc2UgPSB4aHIucmVzcG9uc2VUZXh0O1xuICAgICAgICAgICAgICAgIGlmICh4aHIuc3RhdHVzID49IDIwMCAmJiB4aHIuc3RhdHVzIDwgNDAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjYWxsYmFjayAhPT0gbnVsbCAmJiBjYWxsYmFjayAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZGF0YSA9IEpTT04ucGFyc2UocmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKGRhdGEpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGVycm9yTXNnID0gXCJVbmtub3duIGVycm9yXCI7XG4gICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZXJyb3JEYXRhID0gSlNPTi5wYXJzZShyZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXJyb3JEYXRhLmVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3JNc2cgPSBlcnJvckRhdGEuZXJyb3I7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImVycm9yRGF0YWVycm9yRGF0YVwiLCBlcnJvckRhdGEsIHhocik7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbnN0LmVycm9yTGFibGUuc3RyaW5nID0gZXJyb3JEYXRhLmVycm9yXG4gICAgICAgICAgICAgICAgICAgICAgICBpbnN0LmxvZ2luRXJyb3JOb2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnN0LmxvZ2luRXJyb3JOb2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSwgMjAwMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjYWxsYmFjayhlcnJvckRhdGEpO1xuICAgICAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgcGFyc2luZyBlcnJvciByZXNwb25zZTpcIiwgZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgXG4gICAgICAgIHhoci5vbmVycm9yID0gZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgU2VydmVyQ29tLmxvYWRpbmcuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICBLLmludGVybmV0QXZhaWxhYmxlID0gZmFsc2U7XG4gICAgXG4gICAgICAgICAgICB2YXIgZXJyb3JNc2cgPSBcIlVua25vd24gZXJyb3JcIjtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgdmFyIGVycm9yRGF0YSA9IEpTT04ucGFyc2UoeGhyLnJlc3BvbnNlVGV4dCk7XG4gICAgICAgICAgICAgICAgaWYgKGVycm9yRGF0YS5lcnJvcikge1xuICAgICAgICAgICAgICAgICAgICBlcnJvck1zZyA9IGVycm9yRGF0YS5lcnJvcjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkVycm9yIHBhcnNpbmcgZXJyb3IgcmVzcG9uc2U6XCIsIGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIFxuICAgICAgICB4aHIub250aW1lb3V0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgU2VydmVyQ29tLmxvYWRpbmcuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICBLLmRpc2Nvbm5lY3RSZXF1ZXN0ZWRCeVBsYXllciA9IGZhbHNlO1xuICAgICAgICAgICAgSy5pbnRlcm5ldEF2YWlsYWJsZSA9IGZhbHNlO1xuICAgICAgICAgICAgLy8gXG4gICAgICAgICAgICBpbnN0LmVtaXQoJ2Vycm9yJywge1xuICAgICAgICAgICAgICAgIGNvZGU6IEsuRXJyb3IuVGltZU91dEVycm9yLFxuICAgICAgICAgICAgICAgIHJlc3BvbnNlOiBcIlRpbWVvdXQgXCIgKyBhZGRyZXNzLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgICAgIC8vIFxuICAgICAgICAvLyB4aHIud2l0aENyZWRlbnRpYWxzID0gdHJ1ZTtcbiAgICAgICAgeGhyLm9wZW4obWV0aG9kLCBhZGRyZXNzLCB0cnVlKTtcbiAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoXCJDb250ZW50LVR5cGVcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpO1xuICAgICAgICBsZXQgdG9rZW4gPSBudWxsO1xuICAgICAgICBpZiAoIXRva2VuICYmIGNjLnN5cy5pc0Jyb3dzZXIpIHtcbiAgICAgICAgICAgIGNvbnN0IGNvb2tpZXMgPSBkb2N1bWVudC5jb29raWUuc3BsaXQoJzsnKTtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY29va2llcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGNvb2tpZSA9IGNvb2tpZXNbaV0udHJpbSgpO1xuICAgICAgICAgICAgICAgIGlmIChjb29raWUuc3RhcnRzV2l0aCgndG9rZW49JykpIHtcbiAgICAgICAgICAgICAgICAgICAgdG9rZW4gPSBjb29raWUuc3Vic3RyaW5nKCd0b2tlbj0nLmxlbmd0aCwgY29va2llLmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBJZiB0b2tlbiBleGlzdHMsIGFkZCBpdCB0byBhIGN1c3RvbSBoZWFkZXJcbiAgICAgICAgaWYgKHRva2VuKSB7XG4gICAgICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcihcIkNvb2tpZVwiLCBgdXNlclRva2VuPSR7dG9rZW59YCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG1ldGhvZCA9PT0gXCJQT1NUXCIpIHtcbiAgICAgICAgICAgIHhoci5zZW5kKEpTT04uc3RyaW5naWZ5KGRhdGEpKTtcbiAgICAgICAgfSBlbHNlIGlmIChtZXRob2QgPT09IFwiR0VUXCIpIHtcbiAgICAgICAgICAgIHhoci5zZW5kKCk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgXG4gICAgLy8gV0lMTCB1c2UgdGhlIGZvbGxvd2luZyBjb2RlIGxhdGVyIHRvIGNoZWNrIGlmIHRoZSBzYW1lIGFwaSBpcyByZXF1ZXN0IHVudGlsbCB3ZSBnZXRzIGl0cyByZXNwb25zZVxuICAgIC8vIC8qKlxuICAgIC8vIHVwZGF0ZVRyYWNrZXI6IGZ1bmN0aW9uICh2YWwsIGtleSwgc2hvd0xvYWRpbmcpIHtcbiAgICAvLyAgICAgdmFyIGluY3IgPSB2YWwgPyArMSA6IC0xO1xuICAgIC8vICAgICB0aGlzLnRyYWNrZXJDb3VudCA9IHRoaXMudHJhY2tlckNvdW50ICsgaW5jcjtcbiAgICAvLyAgICAgdmFyIGlzQWN0aXZlID0gdmFsICYmIHNob3dMb2FkaW5nO1xuICAgIC8vICAgICBpZighdGhpcy5sb2FkaW5nLmFjdGl2ZSAmJiBzaG93TG9hZGluZyl7XG4gICAgLy8gICAgICAgICB0aGlzLmxvYWRpbmcuYWN0aXZlID0gdHJ1ZTsgXG4gICAgLy8gICAgIH1lbHNlIGlmKHRoaXMubG9hZGluZy5hY3RpdmUgJiYgIXNob3dMb2FkaW5nKSB7XG4gICAgLy8gICAgICAgICB0aGlzLmxvYWRpbmcuYWN0aXZlID0gZmFsc2U7XG4gICAgLy8gICAgIH1cbiAgICAvLyAgICAgLy90aGlzLmxvYWRpbmcuYWN0aXZlID0gdmFsICYmIHNob3dMb2FkaW5nO1xuICAgIC8vICAgICB0aGlzLnRyYWNrZXJba2V5XSA9IHZhbDtcbiAgICAvLyB9LFxuXG59KTsiXX0=
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
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Config/GameConfig.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '8da19Kpt7FCnoycSPF3SsWw', 'GameConfig');
// Scripts/Config/GameConfig.js

"use strict";

/**
 * @namespace Configs
 */

/**
 * @class GameConfig
 * @memberof Configs
 */

/** 
 * @alias window
 * @name root
 * @memberof Configs.GameConfig#
 */
var root = window;
root.K = {};
root.K.internetAvailable = true;
/**
 * @enum {Number} Represents possible errors in the game
 * @name Error
 * @memberof Configs.GameConfig#
 */

root.K.Error = cc.Enum({
  CredentialsError: 401,
  SuccessFalseError: 404
});
root.K.WS = false;
root.K.DeveloperMode = true;
root.K.ServerAddress = {
  ////// IP and URLS update as per requirements
  ipAddress: "https://game-crm-rtp-backend.onrender.com" // OTL

};
/**
 * @description Server APIs
 * @name ServerAPI
 * @memberof Configs.GameConfig#
 */

root.K.ServerAPI = {
  login: "/api/users/login",
  game: "/api/games/getGames?category"
};
/**
 * @description Represents sound effects played on user related events
 * @name Sounds
 * @memberof Configs.GameConfig#
 */

root.K.Sounds = {}; // /**
//  * @description Data that maybe stored on a system
//  * @name SystemStorageKeys
//  * @memberof Configs.GameConfig#
//  */
// root.K.SystemStorageKeys = {
//     userId: "userId",
//     password: "password",
//     rememberMePreference: "rememberMePreference",
// };

module.exports = {
  K: K
};

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHRzL0NvbmZpZy9HYW1lQ29uZmlnLmpzIl0sIm5hbWVzIjpbInJvb3QiLCJ3aW5kb3ciLCJLIiwiaW50ZXJuZXRBdmFpbGFibGUiLCJFcnJvciIsImNjIiwiRW51bSIsIkNyZWRlbnRpYWxzRXJyb3IiLCJTdWNjZXNzRmFsc2VFcnJvciIsIldTIiwiRGV2ZWxvcGVyTW9kZSIsIlNlcnZlckFkZHJlc3MiLCJpcEFkZHJlc3MiLCJTZXJ2ZXJBUEkiLCJsb2dpbiIsImdhbWUiLCJTb3VuZHMiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSUEsSUFBSSxHQUFHQyxNQUFYO0FBRUFELElBQUksQ0FBQ0UsQ0FBTCxHQUFTLEVBQVQ7QUFFQUYsSUFBSSxDQUFDRSxDQUFMLENBQU9DLGlCQUFQLEdBQTJCLElBQTNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQUgsSUFBSSxDQUFDRSxDQUFMLENBQU9FLEtBQVAsR0FBZUMsRUFBRSxDQUFDQyxJQUFILENBQVE7QUFDbkJDLEVBQUFBLGdCQUFnQixFQUFFLEdBREM7QUFFbkJDLEVBQUFBLGlCQUFpQixFQUFFO0FBRkEsQ0FBUixDQUFmO0FBTUFSLElBQUksQ0FBQ0UsQ0FBTCxDQUFPTyxFQUFQLEdBQVksS0FBWjtBQUVBVCxJQUFJLENBQUNFLENBQUwsQ0FBT1EsYUFBUCxHQUF1QixJQUF2QjtBQUVBVixJQUFJLENBQUNFLENBQUwsQ0FBT1MsYUFBUCxHQUF1QjtBQUNuQjtBQUNBQyxFQUFBQSxTQUFTLEVBQUUsMkNBRlEsQ0FFcUM7O0FBRnJDLENBQXZCO0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQVosSUFBSSxDQUFDRSxDQUFMLENBQU9XLFNBQVAsR0FBbUI7QUFDZkMsRUFBQUEsS0FBSyxFQUFFLGtCQURRO0FBRWZDLEVBQUFBLElBQUksRUFBRTtBQUZTLENBQW5CO0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQWYsSUFBSSxDQUFDRSxDQUFMLENBQU9jLE1BQVAsR0FBZ0IsRUFBaEIsRUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQUMsTUFBTSxDQUFDQyxPQUFQLEdBQWlCO0FBQ2JoQixFQUFBQSxDQUFDLEVBQUVBO0FBRFUsQ0FBakIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQG5hbWVzcGFjZSBDb25maWdzXG4gKi9cblxuLyoqXG4gKiBAY2xhc3MgR2FtZUNvbmZpZ1xuICogQG1lbWJlcm9mIENvbmZpZ3NcbiAqL1xuXG4vKiogXG4gKiBAYWxpYXMgd2luZG93XG4gKiBAbmFtZSByb290XG4gKiBAbWVtYmVyb2YgQ29uZmlncy5HYW1lQ29uZmlnI1xuICovXG52YXIgcm9vdCA9IHdpbmRvdztcblxucm9vdC5LID0ge307XG5cbnJvb3QuSy5pbnRlcm5ldEF2YWlsYWJsZSA9IHRydWU7XG4vKipcbiAqIEBlbnVtIHtOdW1iZXJ9IFJlcHJlc2VudHMgcG9zc2libGUgZXJyb3JzIGluIHRoZSBnYW1lXG4gKiBAbmFtZSBFcnJvclxuICogQG1lbWJlcm9mIENvbmZpZ3MuR2FtZUNvbmZpZyNcbiAqL1xucm9vdC5LLkVycm9yID0gY2MuRW51bSh7XG4gICAgQ3JlZGVudGlhbHNFcnJvcjogNDAxLFxuICAgIFN1Y2Nlc3NGYWxzZUVycm9yOiA0MDQsXG59KTtcblxuXG5yb290LksuV1MgPSBmYWxzZTtcblxucm9vdC5LLkRldmVsb3Blck1vZGUgPSB0cnVlO1xuXG5yb290LksuU2VydmVyQWRkcmVzcyA9IHtcbiAgICAvLy8vLy8gSVAgYW5kIFVSTFMgdXBkYXRlIGFzIHBlciByZXF1aXJlbWVudHNcbiAgICBpcEFkZHJlc3M6IFwiaHR0cHM6Ly9nYW1lLWNybS1ydHAtYmFja2VuZC5vbnJlbmRlci5jb21cIiwgLy8gT1RMXG59O1xuXG4vKipcbiAqIEBkZXNjcmlwdGlvbiBTZXJ2ZXIgQVBJc1xuICogQG5hbWUgU2VydmVyQVBJXG4gKiBAbWVtYmVyb2YgQ29uZmlncy5HYW1lQ29uZmlnI1xuICovXG5yb290LksuU2VydmVyQVBJID0ge1xuICAgIGxvZ2luOiBcIi9hcGkvdXNlcnMvbG9naW5cIixcbiAgICBnYW1lOiBcIi9hcGkvZ2FtZXMvZ2V0R2FtZXM/Y2F0ZWdvcnlcIixcbn07XG5cbi8qKlxuICogQGRlc2NyaXB0aW9uIFJlcHJlc2VudHMgc291bmQgZWZmZWN0cyBwbGF5ZWQgb24gdXNlciByZWxhdGVkIGV2ZW50c1xuICogQG5hbWUgU291bmRzXG4gKiBAbWVtYmVyb2YgQ29uZmlncy5HYW1lQ29uZmlnI1xuICovXG5yb290LksuU291bmRzID0ge1xufTtcblxuXG5cbi8vIC8qKlxuLy8gICogQGRlc2NyaXB0aW9uIERhdGEgdGhhdCBtYXliZSBzdG9yZWQgb24gYSBzeXN0ZW1cbi8vICAqIEBuYW1lIFN5c3RlbVN0b3JhZ2VLZXlzXG4vLyAgKiBAbWVtYmVyb2YgQ29uZmlncy5HYW1lQ29uZmlnI1xuLy8gICovXG4vLyByb290LksuU3lzdGVtU3RvcmFnZUtleXMgPSB7XG4vLyAgICAgdXNlcklkOiBcInVzZXJJZFwiLFxuLy8gICAgIHBhc3N3b3JkOiBcInBhc3N3b3JkXCIsXG4vLyAgICAgcmVtZW1iZXJNZVByZWZlcmVuY2U6IFwicmVtZW1iZXJNZVByZWZlcmVuY2VcIixcbi8vIH07XG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBLOiBLLFxufSJdfQ==
//------QC-SOURCE-SPLIT------

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
var Cookies = require('js-cookies');

var login = require('Login');

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
    cloudAnimNode: {
      "default": null,
      type: cc.Node
    },
    sprite: {
      "default": null,
      type: cc.SpriteFrame
    },
    smallItemNode: {
      "default": null,
      type: cc.Node
    },
    rightTiltNode: {
      "default": null,
      type: cc.Node
    },
    leftTiltNode: {
      "default": null,
      type: cc.Node
    },
    spinWheelNode: {
      "default": null,
      type: cc.Node
    },
    OuterAnimation: {
      "default": null,
      type: cc.Node
    },
    passwordNode: {
      "default": null,
      type: cc.Node
    },
    passwordChangeButton: {
      "default": null,
      type: cc.Node
    },
    popupNode: {
      "default": null,
      type: cc.Node
    },
    oldPassword: {
      "default": null,
      type: cc.Label
    },
    newPassword: {
      "default": null,
      type: cc.Label
    },
    confirmPassword: {
      "default": null,
      type: cc.Label
    },
    profileNode: {
      "default": null,
      type: cc.Node
    },
    saveProfileBtn: {
      "default": null,
      type: cc.Node
    },
    allTab: {
      "default": null,
      type: cc.Node
    },
    fishTab: {
      "default": null,
      type: cc.Node
    },
    favTab: {
      "default": null,
      type: cc.Node
    },
    slotTab: {
      "default": null,
      type: cc.Node
    },
    kenoTab: {
      "default": null,
      type: cc.Node
    },
    otherTab: {
      "default": null,
      type: cc.Node
    },
    loginNode: {
      "default": null,
      type: login
    },
    category: null,
    lefttiltAngle: -7,
    // Angle to tilt the node (in degrees)
    tiltDuration: 0.2,
    // Duration of the tilt animation
    originalRotation: 0,
    righttiltAngle: 7,
    targetX: 0,
    moveDuration: 2.0,
    scaleUp: 0.9,
    // Scale factor when mouse enters
    scaleNormal: 0.9
  },
  // LIFE-CYCLE CALLBACKS:
  onLoad: function onLoad() {
    if (!this.category) {
      this.category = "all";
    }

    var currentPos = this.cloudAnimNode.getPosition();
    var moveAction = cc.moveTo(this.moveDuration, cc.v2(this.targetX, currentPos.y)); // Run the move action on the sprite node

    this.cloudAnimNode.runAction(moveAction);
    var address = K.ServerAddress.ipAddress + K.ServerAPI.game + "=" + this.category;
    ServerCom.httpRequest("GET", address, function (response) {
      console.log("responseresponseresponse in lobby", response);
    }.bind(this));
    var leftAngle = cc.scaleTo(this.tiltDuration, this.leftTiltAngle);
    var sleftDownAction = cc.scaleTo(this.animationDuration, this.scaleNormal); // Create the sequence action

    var scaleSequence = cc.sequence(leftAngle, sleftDownAction); // Repeat the sequence forever

    this.leftTiltNode.runAction(cc.repeatForever(scaleSequence)); // Set initial position of the sprite
    //  let leftTilt = cc.rotateTo(this.tiltDuration, this.leftTiltAngle);
    // //  let rightTilt = cc.rotateTo(this.tiltDuration, this.rightTiltAngle);
    //  let originalTilt = cc.rotateTo(this.tiltDuration, this.originalRotation);
    //  // Create the sequence action for leftTiltNode
    //  let tiltSequence = cc.sequence(leftTilt, originalTilt);
    //  // Run the sequence action indefinitely on leftTiltNode
    //  this.leftTiltNode.runAction(cc.repeatForever(tiltSequence));
    //  // Create the tilt actions for rightTiltNode
    // //  let leftTiltRightNode = cc.rotateTo(this.tiltDuration, this.leftTiltAngle);
    //  let rightTiltRightNode = cc.rotateTo(this.tiltDuration, this.rightTiltAngle);
    //  let originalTiltRightNode = cc.rotateTo(this.tiltDuration, this.originalRotation);
    //  // Create the sequence action for rightTiltNode
    //  let tiltSequenceRightNode = cc.sequence(rightTiltRightNode, originalTiltRightNode);
    //  // Run the sequence action indefinitely on rightTiltNode
    //  this.rightTiltNode.runAction(cc.repeatForever(tiltSequenceRightNode));
    //Registerred Mouse Enter event
    // this.smallItemNode.on(cc.Node.EventType.MOUSE_ENTER, this.onMouseEnter, this);
    // // Register mouse leave event
    // this.smallItemNode.on(cc.Node.EventType.MOUSE_LEAVE, this.onMouseLeave, this);
    // console.log(this.node);
    // this.node.getChildByName("Games").getChildByName("GameScrollView").getChildByName("view").getChildByName("content").getChildByName("item").on(cc.Node.EventType.MOUSE_ENTER, this.onMouseEnter, this);
    // this.node.getChildByName("Games").getChildByName("GameScrollView").getChildByName("view").getChildByName("content").getChildByName("item").on(cc.Node.EventType.MOUSE_LEAVE, this.onMouseLeave, this);
    // this.node.getChildByName("Games").getChildByName("GameScrollView").getChildByName("view").getChildByName("content").getChildByName("item1").on(cc.Node.EventType.MOUSE_ENTER, this.onMouse1Enter, this);
    // this.node.getChildByName("Games").getChildByName("GameScrollView").getChildByName("view").getChildByName("content").getChildByName("item1").on(cc.Node.EventType.MOUSE_LEAVE, this.onMouse1Leave, this);
    // this.node.getChildByName("Games").getChildByName("GameScrollView").getChildByName("view").getChildByName("content").getChildByName("item2").on(cc.Node.EventType.MOUSE_ENTER, this.onMouse2Enter, this);
    // this.node.getChildByName("Games").getChildByName("GameScrollView").getChildByName("view").getChildByName("content").getChildByName("item2").on(cc.Node.EventType.MOUSE_LEAVE, this.onMouse2Leave, this);
    // this.node.getChildByName("Games").getChildByName("GameScrollView").getChildByName("view").getChildByName("content").getChildByName("item3").on(cc.Node.EventType.MOUSE_ENTER, this.onMouse3Enter, this);
    // this.node.getChildByName("Games").getChildByName("GameScrollView").getChildByName("view").getChildByName("content").getChildByName("item3").on(cc.Node.EventType.MOUSE_LEAVE, this.onMouse3Leave, this); 
    // this.node.getChildByName("Games").getChildByName("GameScrollView").getChildByName("view").getChildByName("content").getChildByName("item4").on(cc.Node.EventType.MOUSE_ENTER, this.onMouse4Enter, this);
    // this.node.getChildByName("Games").getChildByName("GameScrollView").getChildByName("view").getChildByName("content").getChildByName("item4").on(cc.Node.EventType.MOUSE_LEAVE, this.onMouse4Leave, this);
    // this.node.getChildByName("Games").getChildByName("GameScrollView").getChildByName("view").getChildByName("content").getChildByName("item5").on(cc.Node.EventType.MOUSE_ENTER, this.onMouse5Enter, this);
    // this.node.getChildByName("Games").getChildByName("GameScrollView").getChildByName("view").getChildByName("content").getChildByName("item5").on(cc.Node.EventType.MOUSE_LEAVE, this.onMouse5Leave, this);
    // this.node.getChildByName("Games").getChildByName("GameScrollView").getChildByName("view").getChildByName("content").getChildByName("item6").on(cc.Node.EventType.MOUSE_ENTER, this.onMouse6Enter, this);
    // this.node.getChildByName("Games").getChildByName("GameScrollView").getChildByName("view").getChildByName("content").getChildByName("item6").on(cc.Node.EventType.MOUSE_LEAVE, this.onMouse6Leave, this);
  },
  //     onMouseEnter: function(){
  //         this.node.getChildByName("Games").getChildByName("GameScrollView").getChildByName("view").getChildByName("content").getChildByName("item").setScale(1.08);
  //     },
  //     onMouse1Enter: function(){
  //       this.node.getChildByName("Games").getChildByName("GameScrollView").getChildByName("view").getChildByName("content").getChildByName("item1").setScale(1.08);
  //   },
  //   onMouse2Enter: function(){
  //     this.node.getChildByName("Games").getChildByName("GameScrollView").getChildByName("view").getChildByName("content").getChildByName("item2").setScale(1.08);
  // },
  // onMouse3Enter: function(){
  //   this.node.getChildByName("Games").getChildByName("GameScrollView").getChildByName("view").getChildByName("content").getChildByName("item3").setScale(1.08);
  // },
  // onMouse4Enter: function(){
  //   this.node.getChildByName("Games").getChildByName("GameScrollView").getChildByName("view").getChildByName("content").getChildByName("item4").setScale(1.08);
  // },
  // onMouse5Enter: function(){
  //   this.node.getChildByName("Games").getChildByName("GameScrollView").getChildByName("view").getChildByName("content").getChildByName("item5").setScale(1.08);
  // },
  // onMouse6Enter: function(){
  //   this.node.getChildByName("Games").getChildByName("GameScrollView").getChildByName("view").getChildByName("content").getChildByName("item6").setScale(1.08);
  // },
  getGamesByCategoryAll: function getGamesByCategoryAll() {
    var gameTabs = [this.fishTab.getChildByName('bg'), this.favTab.getChildByName('bg'), this.slotTab.getChildByName('bg'), this.kenoTab.getChildByName('bg'), this.otherTab.getChildByName('bg')];
    gameTabs.forEach(function (tab) {
      return tab.active = false;
    });
    this.allTab.getChildByName('bg').active = true; // console.log('Custom event received:', event.detail.value);
  },
  getGamesByCategoryfish: function getGamesByCategoryfish() {
    var gameTabs = [this.allTab.getChildByName('bg'), this.favTab.getChildByName('bg'), this.slotTab.getChildByName('bg'), this.kenoTab.getChildByName('bg'), this.otherTab.getChildByName('bg')];
    gameTabs.forEach(function (tab) {
      return tab.active = false;
    });
    this.fishTab.getChildByName('bg').active = true; // console.log('Custom event received:', event.detail.value);
  },
  getGamesByCategoryfav: function getGamesByCategoryfav() {
    var gameTabs = [this.fishTab.getChildByName('bg'), this.allTab.getChildByName('bg'), this.slotTab.getChildByName('bg'), this.kenoTab.getChildByName('bg'), this.otherTab.getChildByName('bg')];
    gameTabs.forEach(function (tab) {
      return tab.active = false;
    });
    this.favTab.getChildByName('bg').active = true; // console.log('Custom event received:', event.detail.value);
  },
  getGamesByCategorySlot: function getGamesByCategorySlot(event) {
    var gameTabs = [this.fishTab.getChildByName('bg'), this.allTab.getChildByName('bg'), this.favTab.getChildByName('bg'), this.kenoTab.getChildByName('bg'), this.otherTab.getChildByName('bg')];
    gameTabs.forEach(function (tab) {
      return tab.active = false;
    });
    this.slotTab.getChildByName('bg').active = true; // console.log('Custom event received:', event.detail.value);
  },
  getGamesByCategoryKeno: function getGamesByCategoryKeno(event) {
    var gameTabs = [this.fishTab.getChildByName('bg'), this.allTab.getChildByName('bg'), this.favTab.getChildByName('bg'), this.slotTab.getChildByName('bg'), this.otherTab.getChildByName('bg')];
    gameTabs.forEach(function (tab) {
      return tab.active = false;
    });
    this.kenoTab.getChildByName('bg').active = true; // console.log('Custom event received:', event.detail.value);
  },
  getGamesByCategoryOther: function getGamesByCategoryOther(event) {
    var gameTabs = [this.fishTab.getChildByName('bg'), this.allTab.getChildByName('bg'), this.favTab.getChildByName('bg'), this.slotTab.getChildByName('bg'), this.kenoTab.getChildByName('bg')];
    gameTabs.forEach(function (tab) {
      return tab.active = false;
    });
    this.otherTab.getChildByName('bg').active = true;
  },
  // onMouseLeave: function(){
  //     this.node.getChildByName("Games").getChildByName("GameScrollView").getChildByName("view").getChildByName("content").getChildByName("item").setScale(this.scaleNormal);
  // },
  // onMouse1Leave: function(){
  //   this.node.getChildByName("Games").getChildByName("GameScrollView").getChildByName("view").getChildByName("content").getChildByName("item1").setScale(this.scaleNormal);
  // },
  // onMouse2Leave: function(){
  //   this.node.getChildByName("Games").getChildByName("GameScrollView").getChildByName("view").getChildByName("content").getChildByName("item2").setScale(this.scaleNormal);
  // },
  // onMouse3Leave: function(){
  //   this.node.getChildByName("Games").getChildByName("GameScrollView").getChildByName("view").getChildByName("content").getChildByName("item3").setScale(this.scaleNormal);
  // },
  // onMouse4Leave: function(){
  //   this.node.getChildByName("Games").getChildByName("GameScrollView").getChildByName("view").getChildByName("content").getChildByName("item4").setScale(this.scaleNormal);
  // },
  // onMouse5Leave: function(){
  //   this.node.getChildByName("Games").getChildByName("GameScrollView").getChildByName("view").getChildByName("content").getChildByName("item5").setScale(this.scaleNormal);
  // },
  // onMouse6Leave: function(){
  //   this.node.getChildByName("Games").getChildByName("GameScrollView").getChildByName("view").getChildByName("content").getChildByName("item6").setScale(this.scaleNormal);
  // },
  // for full Screen
  zoomFullScreenClick: function zoomFullScreenClick() {
    if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement) {
      // current working methods
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
      }
    } else {
      if (document.cancelFullScreen) {
        document.cancelFullScreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      }
    }
  },
  closeSpinNode: function closeSpinNode() {
    if (this.spinWheelNode.active) {
      this.spinWheelNode.active = false;
    }
  },
  openSpinWheelNode: function openSpinWheelNode() {
    var rotateAction = cc.rotateBy(5, 360);
    var continueRotate = cc.repeatForever(rotateAction);
    this.OuterAnimation.runAction(continueRotate);

    if (!this.spinWheelNode.active) {
      this.spinWheelNode.active = true;
    }
  },
  openProflePopup: function openProflePopup() {
    this.popupNode.active = true;
    this.profileNode.active = true;
  },
  logOutClick: function logOutClick() {
    console.log("clck");
    this.node.active = false;
    this.loginNode.logutClick();
  },
  passwordChangeBtn: function passwordChangeBtn() {
    if (this.oldPassword.string == "" || this.newPassword.string == "" || this.confirmPassword.string == "") {
      ServerCom.errorLable.string = "All fields are mandatory";
      ServerCom.loginErrorNode.active = true;
      setTimeout(function () {
        ServerCom.loginErrorNode.active = false;
      }, 2000);
    } else {
      if (this.newPassword.string != this.confirmPassword.string) {
        ServerCom.errorLable.string = "New Password and confirm password did not match";
        ServerCom.loginErrorNode.active = true;
        setTimeout(function () {
          ServerCom.loginErrorNode.active = false;
        }, 2000);
      }

      this.passwordNode.active = false;
      this.popupNode.active = false;
    }
  },
  changePassword: function changePassword() {
    this.passwordNode.active = true;
    this.popupNode.active = true;
  },
  closePopupBtn: function closePopupBtn() {
    if (this.passwordNode.active || this.profileNode.active) {
      this.passwordNode.active = false;
      this.profileNode.active = false;
    }

    this.popupNode.active = false;
  },
  saveProfile: function saveProfile() {
    this.profileNode.active = false;
    this.popupNode.active = false;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHRzL0xvYmJ5L0xvYmJ5LmpzIl0sIm5hbWVzIjpbIkNvb2tpZXMiLCJyZXF1aXJlIiwibG9naW4iLCJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsInVzZXJJZCIsInR5cGUiLCJMYWJlbCIsImNvaW5zTGFiZWwiLCJjbG91ZEFuaW1Ob2RlIiwiTm9kZSIsInNwcml0ZSIsIlNwcml0ZUZyYW1lIiwic21hbGxJdGVtTm9kZSIsInJpZ2h0VGlsdE5vZGUiLCJsZWZ0VGlsdE5vZGUiLCJzcGluV2hlZWxOb2RlIiwiT3V0ZXJBbmltYXRpb24iLCJwYXNzd29yZE5vZGUiLCJwYXNzd29yZENoYW5nZUJ1dHRvbiIsInBvcHVwTm9kZSIsIm9sZFBhc3N3b3JkIiwibmV3UGFzc3dvcmQiLCJjb25maXJtUGFzc3dvcmQiLCJwcm9maWxlTm9kZSIsInNhdmVQcm9maWxlQnRuIiwiYWxsVGFiIiwiZmlzaFRhYiIsImZhdlRhYiIsInNsb3RUYWIiLCJrZW5vVGFiIiwib3RoZXJUYWIiLCJsb2dpbk5vZGUiLCJjYXRlZ29yeSIsImxlZnR0aWx0QW5nbGUiLCJ0aWx0RHVyYXRpb24iLCJvcmlnaW5hbFJvdGF0aW9uIiwicmlnaHR0aWx0QW5nbGUiLCJ0YXJnZXRYIiwibW92ZUR1cmF0aW9uIiwic2NhbGVVcCIsInNjYWxlTm9ybWFsIiwib25Mb2FkIiwiY3VycmVudFBvcyIsImdldFBvc2l0aW9uIiwibW92ZUFjdGlvbiIsIm1vdmVUbyIsInYyIiwieSIsInJ1bkFjdGlvbiIsImFkZHJlc3MiLCJLIiwiU2VydmVyQWRkcmVzcyIsImlwQWRkcmVzcyIsIlNlcnZlckFQSSIsImdhbWUiLCJTZXJ2ZXJDb20iLCJodHRwUmVxdWVzdCIsInJlc3BvbnNlIiwiY29uc29sZSIsImxvZyIsImJpbmQiLCJsZWZ0QW5nbGUiLCJzY2FsZVRvIiwibGVmdFRpbHRBbmdsZSIsInNsZWZ0RG93bkFjdGlvbiIsImFuaW1hdGlvbkR1cmF0aW9uIiwic2NhbGVTZXF1ZW5jZSIsInNlcXVlbmNlIiwicmVwZWF0Rm9yZXZlciIsImdldEdhbWVzQnlDYXRlZ29yeUFsbCIsImdhbWVUYWJzIiwiZ2V0Q2hpbGRCeU5hbWUiLCJmb3JFYWNoIiwidGFiIiwiYWN0aXZlIiwiZ2V0R2FtZXNCeUNhdGVnb3J5ZmlzaCIsImdldEdhbWVzQnlDYXRlZ29yeWZhdiIsImdldEdhbWVzQnlDYXRlZ29yeVNsb3QiLCJldmVudCIsImdldEdhbWVzQnlDYXRlZ29yeUtlbm8iLCJnZXRHYW1lc0J5Q2F0ZWdvcnlPdGhlciIsInpvb21GdWxsU2NyZWVuQ2xpY2siLCJkb2N1bWVudCIsImZ1bGxzY3JlZW5FbGVtZW50IiwibW96RnVsbFNjcmVlbkVsZW1lbnQiLCJ3ZWJraXRGdWxsc2NyZWVuRWxlbWVudCIsImRvY3VtZW50RWxlbWVudCIsInJlcXVlc3RGdWxsc2NyZWVuIiwibW96UmVxdWVzdEZ1bGxTY3JlZW4iLCJ3ZWJraXRSZXF1ZXN0RnVsbHNjcmVlbiIsIkVsZW1lbnQiLCJBTExPV19LRVlCT0FSRF9JTlBVVCIsImNhbmNlbEZ1bGxTY3JlZW4iLCJtb3pDYW5jZWxGdWxsU2NyZWVuIiwid2Via2l0Q2FuY2VsRnVsbFNjcmVlbiIsImNsb3NlU3Bpbk5vZGUiLCJvcGVuU3BpbldoZWVsTm9kZSIsInJvdGF0ZUFjdGlvbiIsInJvdGF0ZUJ5IiwiY29udGludWVSb3RhdGUiLCJvcGVuUHJvZmxlUG9wdXAiLCJsb2dPdXRDbGljayIsIm5vZGUiLCJsb2d1dENsaWNrIiwicGFzc3dvcmRDaGFuZ2VCdG4iLCJzdHJpbmciLCJlcnJvckxhYmxlIiwibG9naW5FcnJvck5vZGUiLCJzZXRUaW1lb3V0IiwiY2hhbmdlUGFzc3dvcmQiLCJjbG9zZVBvcHVwQnRuIiwic2F2ZVByb2ZpbGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBTUEsT0FBTyxHQUFHQyxPQUFPLENBQUMsWUFBRCxDQUF2Qjs7QUFDQSxJQUFN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LElBQTNCO0FBQ0EsU0FBS3ZELFNBQUwsQ0FBZXVELE1BQWYsR0FBd0IsSUFBeEI7QUFFRCxHQXJWSTtBQXNWTG9DLEVBQUFBLGFBQWEsRUFBRSx5QkFBVTtBQUN2QixRQUFHLEtBQUs3RixZQUFMLENBQWtCeUQsTUFBbEIsSUFBNEIsS0FBS25ELFdBQUwsQ0FBaUJtRCxNQUFoRCxFQUF1RDtBQUNyRCxXQUFLekQsWUFBTCxDQUFrQnlELE1BQWxCLEdBQTJCLEtBQTNCO0FBQ0EsV0FBS25ELFdBQUwsQ0FBaUJtRCxNQUFqQixHQUEwQixLQUExQjtBQUNEOztBQUNELFNBQUt2RCxTQUFMLENBQWV1RCxNQUFmLEdBQXdCLEtBQXhCO0FBQ0QsR0E1Vkk7QUE2VkxxQyxFQUFBQSxXQUFXLEVBQUUsdUJBQVU7QUFDckIsU0FBS3hGLFdBQUwsQ0FBaUJtRCxNQUFqQixHQUEwQixLQUExQjtBQUNBLFNBQUt2RCxTQUFMLENBQWV1RCxNQUFmLEdBQXdCLEtBQXhCO0FBRUQ7QUFqV0ksQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTGVhcm4gY2MuQ2xhc3M6XG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9jbGFzcy5odG1sXG4vLyBMZWFybiBBdHRyaWJ1dGU6XG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcbmNvbnN0IENvb2tpZXMgPSByZXF1aXJlKCdqcy1jb29raWVzJyk7XG5jb25zdCBsb2dpbiA9IHJlcXVpcmUoJ0xvZ2luJylcbmNjLkNsYXNzKHtcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgIHVzZXJJZDp7XG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgIHR5cGU6Y2MuTGFiZWwsXG4gICAgIH0sXG4gICAgIGNvaW5zTGFiZWw6e1xuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICB0eXBlOiBjYy5MYWJlbCxcbiAgICAgfSxcbiAgICAgY2xvdWRBbmltTm9kZTp7XG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgIHR5cGU6IGNjLk5vZGVcbiAgICAgfSxcbiAgICAgc3ByaXRlOiB7XG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgIHR5cGU6IGNjLlNwcml0ZUZyYW1lLFxuICAgIH0sXG4gICAgc21hbGxJdGVtTm9kZTp7XG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgIHR5cGU6IGNjLk5vZGUsXG4gICAgfSxcbiAgICByaWdodFRpbHROb2RlOntcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgICAgdHlwZTogY2MuTm9kZVxuICAgIH0sXG4gICAgbGVmdFRpbHROb2RlOntcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgICAgdHlwZTogY2MuTm9kZVxuICAgIH0sXG4gICAgc3BpbldoZWVsTm9kZTp7XG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgIHR5cGU6IGNjLk5vZGVcbiAgICB9LFxuICAgIE91dGVyQW5pbWF0aW9uOntcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgICAgdHlwZTpjYy5Ob2RlLFxuICAgIH0sXG4gICAgcGFzc3dvcmROb2RlOntcbiAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxuICAgIH0sXG4gICAgcGFzc3dvcmRDaGFuZ2VCdXR0b246e1xuICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIHR5cGU6Y2MuTm9kZVxuICAgIH0sXG4gICAgcG9wdXBOb2RlOntcbiAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB0eXBlOiBjYy5Ob2RlXG4gICAgfSxcbiAgICBvbGRQYXNzd29yZDoge1xuICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIHR5cGU6IGNjLkxhYmVsXG4gICAgfSxcbiAgICBuZXdQYXNzd29yZDoge1xuICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIHR5cGU6IGNjLkxhYmVsXG4gICAgfSxcbiAgICBjb25maXJtUGFzc3dvcmQ6IHtcbiAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB0eXBlOiBjYy5MYWJlbFxuICAgIH0sXG4gICAgcHJvZmlsZU5vZGU6e1xuICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIHR5cGU6IGNjLk5vZGVcbiAgICB9LFxuICAgIHNhdmVQcm9maWxlQnRuOntcbiAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB0eXBlOiBjYy5Ob2RlXG4gICAgfSxcbiAgICBhbGxUYWI6IHtcbiAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxuICAgIH0sXG4gICAgZmlzaFRhYjoge1xuICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIHR5cGU6IGNjLk5vZGUsXG4gICAgfSxcbiAgICBmYXZUYWI6IHtcbiAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxuICAgIH0sXG4gICAgc2xvdFRhYjoge1xuICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIHR5cGU6IGNjLk5vZGUsXG4gICAgfSxcbiAgICBrZW5vVGFiOiB7XG4gICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgdHlwZTogY2MuTm9kZSxcbiAgICB9LFxuICAgIG90aGVyVGFiOiB7XG4gICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgdHlwZTogY2MuTm9kZSxcbiAgICB9LFxuICAgIGxvZ2luTm9kZToge1xuICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIHR5cGU6IGxvZ2luLFxuICAgIH0sXG4gICAgIGNhdGVnb3J5OiBudWxsLFxuICAgICBsZWZ0dGlsdEFuZ2xlOiAtNywgIC8vIEFuZ2xlIHRvIHRpbHQgdGhlIG5vZGUgKGluIGRlZ3JlZXMpXG4gICAgIHRpbHREdXJhdGlvbjogMC4yLCAgLy8gRHVyYXRpb24gb2YgdGhlIHRpbHQgYW5pbWF0aW9uXG4gICAgIG9yaWdpbmFsUm90YXRpb246IDAsXG4gICAgIHJpZ2h0dGlsdEFuZ2xlOiA3LFxuICAgICB0YXJnZXRYOiAwLCAgIFxuICAgICBtb3ZlRHVyYXRpb246IDIuMCwgXG4gICAgIHNjYWxlVXA6IDAuOSwgIC8vIFNjYWxlIGZhY3RvciB3aGVuIG1vdXNlIGVudGVyc1xuICAgIHNjYWxlTm9ybWFsOiAwLjksXG4gICAgICBcbiAgICB9LFxuXG4gICAgLy8gTElGRS1DWUNMRSBDQUxMQkFDS1M6XG5cbiAgICBvbkxvYWQgKCkge1xuICAgICAgICBpZighdGhpcy5jYXRlZ29yeSl7XG4gICAgICAgICAgICB0aGlzLmNhdGVnb3J5ID0gXCJhbGxcIlxuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGN1cnJlbnRQb3MgPSB0aGlzLmNsb3VkQW5pbU5vZGUuZ2V0UG9zaXRpb24oKTtcbiAgICAgICAgbGV0IG1vdmVBY3Rpb24gPSBjYy5tb3ZlVG8odGhpcy5tb3ZlRHVyYXRpb24sIGNjLnYyKHRoaXMudGFyZ2V0WCwgY3VycmVudFBvcy55KSk7XG5cbiAgICAgICAgLy8gUnVuIHRoZSBtb3ZlIGFjdGlvbiBvbiB0aGUgc3ByaXRlIG5vZGVcbiAgICAgICAgdGhpcy5jbG91ZEFuaW1Ob2RlLnJ1bkFjdGlvbihtb3ZlQWN0aW9uKTtcblxuICAgICAgICBcbiAgICAgICAgdmFyIGFkZHJlc3MgPSBLLlNlcnZlckFkZHJlc3MuaXBBZGRyZXNzICsgSy5TZXJ2ZXJBUEkuZ2FtZSArXCI9XCIrIHRoaXMuY2F0ZWdvcnk7XG4gICAgICAgIFxuICAgICAgICBTZXJ2ZXJDb20uaHR0cFJlcXVlc3QoXCJHRVRcIiwgYWRkcmVzcywgZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgIGNvbnNvbGUubG9nKFwicmVzcG9uc2VyZXNwb25zZXJlc3BvbnNlIGluIGxvYmJ5XCIsIHJlc3BvbnNlKTtcbiAgICAgICAgfS5iaW5kKHRoaXMpKTtcblxuICAgICAgICBsZXQgbGVmdEFuZ2xlID0gY2Muc2NhbGVUbyh0aGlzLnRpbHREdXJhdGlvbiwgdGhpcy5sZWZ0VGlsdEFuZ2xlKTtcbiAgICAgICAgbGV0IHNsZWZ0RG93bkFjdGlvbiA9IGNjLnNjYWxlVG8odGhpcy5hbmltYXRpb25EdXJhdGlvbiwgdGhpcy5zY2FsZU5vcm1hbCk7XG4gICAgICAgIFxuICAgICAgICAvLyBDcmVhdGUgdGhlIHNlcXVlbmNlIGFjdGlvblxuICAgICAgICBsZXQgc2NhbGVTZXF1ZW5jZSA9IGNjLnNlcXVlbmNlKGxlZnRBbmdsZSwgc2xlZnREb3duQWN0aW9uKTtcbiAgICAgICAgXG4gICAgICAgIC8vIFJlcGVhdCB0aGUgc2VxdWVuY2UgZm9yZXZlclxuICAgICAgICB0aGlzLmxlZnRUaWx0Tm9kZS5ydW5BY3Rpb24oY2MucmVwZWF0Rm9yZXZlcihzY2FsZVNlcXVlbmNlKSk7XG4gICAgICAgICAvLyBTZXQgaW5pdGlhbCBwb3NpdGlvbiBvZiB0aGUgc3ByaXRlXG4gICAgICAgIC8vICBsZXQgbGVmdFRpbHQgPSBjYy5yb3RhdGVUbyh0aGlzLnRpbHREdXJhdGlvbiwgdGhpcy5sZWZ0VGlsdEFuZ2xlKTtcbiAgICAgICAgLy8gLy8gIGxldCByaWdodFRpbHQgPSBjYy5yb3RhdGVUbyh0aGlzLnRpbHREdXJhdGlvbiwgdGhpcy5yaWdodFRpbHRBbmdsZSk7XG4gICAgICAgIC8vICBsZXQgb3JpZ2luYWxUaWx0ID0gY2Mucm90YXRlVG8odGhpcy50aWx0RHVyYXRpb24sIHRoaXMub3JpZ2luYWxSb3RhdGlvbik7XG4gXG4gICAgICAgIC8vICAvLyBDcmVhdGUgdGhlIHNlcXVlbmNlIGFjdGlvbiBmb3IgbGVmdFRpbHROb2RlXG4gICAgICAgIC8vICBsZXQgdGlsdFNlcXVlbmNlID0gY2Muc2VxdWVuY2UobGVmdFRpbHQsIG9yaWdpbmFsVGlsdCk7XG4gXG4gICAgICAgIC8vICAvLyBSdW4gdGhlIHNlcXVlbmNlIGFjdGlvbiBpbmRlZmluaXRlbHkgb24gbGVmdFRpbHROb2RlXG4gICAgICAgIC8vICB0aGlzLmxlZnRUaWx0Tm9kZS5ydW5BY3Rpb24oY2MucmVwZWF0Rm9yZXZlcih0aWx0U2VxdWVuY2UpKTtcbiBcbiAgICAgICAgLy8gIC8vIENyZWF0ZSB0aGUgdGlsdCBhY3Rpb25zIGZvciByaWdodFRpbHROb2RlXG4gICAgICAgIC8vIC8vICBsZXQgbGVmdFRpbHRSaWdodE5vZGUgPSBjYy5yb3RhdGVUbyh0aGlzLnRpbHREdXJhdGlvbiwgdGhpcy5sZWZ0VGlsdEFuZ2xlKTtcbiAgICAgICAgLy8gIGxldCByaWdodFRpbHRSaWdodE5vZGUgPSBjYy5yb3RhdGVUbyh0aGlzLnRpbHREdXJhdGlvbiwgdGhpcy5yaWdodFRpbHRBbmdsZSk7XG4gICAgICAgIC8vICBsZXQgb3JpZ2luYWxUaWx0UmlnaHROb2RlID0gY2Mucm90YXRlVG8odGhpcy50aWx0RHVyYXRpb24sIHRoaXMub3JpZ2luYWxSb3RhdGlvbik7XG4gXG4gICAgICAgIC8vICAvLyBDcmVhdGUgdGhlIHNlcXVlbmNlIGFjdGlvbiBmb3IgcmlnaHRUaWx0Tm9kZVxuICAgICAgICAvLyAgbGV0IHRpbHRTZXF1ZW5jZVJpZ2h0Tm9kZSA9IGNjLnNlcXVlbmNlKHJpZ2h0VGlsdFJpZ2h0Tm9kZSwgb3JpZ2luYWxUaWx0UmlnaHROb2RlKTtcbiBcbiAgICAgICAgLy8gIC8vIFJ1biB0aGUgc2VxdWVuY2UgYWN0aW9uIGluZGVmaW5pdGVseSBvbiByaWdodFRpbHROb2RlXG4gICAgICAgIC8vICB0aGlzLnJpZ2h0VGlsdE5vZGUucnVuQWN0aW9uKGNjLnJlcGVhdEZvcmV2ZXIodGlsdFNlcXVlbmNlUmlnaHROb2RlKSk7XG5cbiAgICAgICAgLy9SZWdpc3RlcnJlZCBNb3VzZSBFbnRlciBldmVudFxuICAgICAgICAvLyB0aGlzLnNtYWxsSXRlbU5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuTU9VU0VfRU5URVIsIHRoaXMub25Nb3VzZUVudGVyLCB0aGlzKTtcbiAgICAgICAgLy8gLy8gUmVnaXN0ZXIgbW91c2UgbGVhdmUgZXZlbnRcbiAgICAgICAgLy8gdGhpcy5zbWFsbEl0ZW1Ob2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLk1PVVNFX0xFQVZFLCB0aGlzLm9uTW91c2VMZWF2ZSwgdGhpcyk7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMubm9kZSk7XG4gICAgICAgIC8vIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcIkdhbWVzXCIpLmdldENoaWxkQnlOYW1lKFwiR2FtZVNjcm9sbFZpZXdcIikuZ2V0Q2hpbGRCeU5hbWUoXCJ2aWV3XCIpLmdldENoaWxkQnlOYW1lKFwiY29udGVudFwiKS5nZXRDaGlsZEJ5TmFtZShcIml0ZW1cIikub24oY2MuTm9kZS5FdmVudFR5cGUuTU9VU0VfRU5URVIsIHRoaXMub25Nb3VzZUVudGVyLCB0aGlzKTtcbiAgICAgICAgLy8gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiR2FtZXNcIikuZ2V0Q2hpbGRCeU5hbWUoXCJHYW1lU2Nyb2xsVmlld1wiKS5nZXRDaGlsZEJ5TmFtZShcInZpZXdcIikuZ2V0Q2hpbGRCeU5hbWUoXCJjb250ZW50XCIpLmdldENoaWxkQnlOYW1lKFwiaXRlbVwiKS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5NT1VTRV9MRUFWRSwgdGhpcy5vbk1vdXNlTGVhdmUsIHRoaXMpO1xuICAgICAgICAvLyB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJHYW1lc1wiKS5nZXRDaGlsZEJ5TmFtZShcIkdhbWVTY3JvbGxWaWV3XCIpLmdldENoaWxkQnlOYW1lKFwidmlld1wiKS5nZXRDaGlsZEJ5TmFtZShcImNvbnRlbnRcIikuZ2V0Q2hpbGRCeU5hbWUoXCJpdGVtMVwiKS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5NT1VTRV9FTlRFUiwgdGhpcy5vbk1vdXNlMUVudGVyLCB0aGlzKTtcbiAgICAgICAgLy8gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiR2FtZXNcIikuZ2V0Q2hpbGRCeU5hbWUoXCJHYW1lU2Nyb2xsVmlld1wiKS5nZXRDaGlsZEJ5TmFtZShcInZpZXdcIikuZ2V0Q2hpbGRCeU5hbWUoXCJjb250ZW50XCIpLmdldENoaWxkQnlOYW1lKFwiaXRlbTFcIikub24oY2MuTm9kZS5FdmVudFR5cGUuTU9VU0VfTEVBVkUsIHRoaXMub25Nb3VzZTFMZWF2ZSwgdGhpcyk7XG4gICAgICAgIC8vIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcIkdhbWVzXCIpLmdldENoaWxkQnlOYW1lKFwiR2FtZVNjcm9sbFZpZXdcIikuZ2V0Q2hpbGRCeU5hbWUoXCJ2aWV3XCIpLmdldENoaWxkQnlOYW1lKFwiY29udGVudFwiKS5nZXRDaGlsZEJ5TmFtZShcIml0ZW0yXCIpLm9uKGNjLk5vZGUuRXZlbnRUeXBlLk1PVVNFX0VOVEVSLCB0aGlzLm9uTW91c2UyRW50ZXIsIHRoaXMpO1xuICAgICAgICAvLyB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJHYW1lc1wiKS5nZXRDaGlsZEJ5TmFtZShcIkdhbWVTY3JvbGxWaWV3XCIpLmdldENoaWxkQnlOYW1lKFwidmlld1wiKS5nZXRDaGlsZEJ5TmFtZShcImNvbnRlbnRcIikuZ2V0Q2hpbGRCeU5hbWUoXCJpdGVtMlwiKS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5NT1VTRV9MRUFWRSwgdGhpcy5vbk1vdXNlMkxlYXZlLCB0aGlzKTtcbiAgICAgICAgLy8gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiR2FtZXNcIikuZ2V0Q2hpbGRCeU5hbWUoXCJHYW1lU2Nyb2xsVmlld1wiKS5nZXRDaGlsZEJ5TmFtZShcInZpZXdcIikuZ2V0Q2hpbGRCeU5hbWUoXCJjb250ZW50XCIpLmdldENoaWxkQnlOYW1lKFwiaXRlbTNcIikub24oY2MuTm9kZS5FdmVudFR5cGUuTU9VU0VfRU5URVIsIHRoaXMub25Nb3VzZTNFbnRlciwgdGhpcyk7XG4gICAgICAgIC8vIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcIkdhbWVzXCIpLmdldENoaWxkQnlOYW1lKFwiR2FtZVNjcm9sbFZpZXdcIikuZ2V0Q2hpbGRCeU5hbWUoXCJ2aWV3XCIpLmdldENoaWxkQnlOYW1lKFwiY29udGVudFwiKS5nZXRDaGlsZEJ5TmFtZShcIml0ZW0zXCIpLm9uKGNjLk5vZGUuRXZlbnRUeXBlLk1PVVNFX0xFQVZFLCB0aGlzLm9uTW91c2UzTGVhdmUsIHRoaXMpOyBcbiAgICAgICAgLy8gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiR2FtZXNcIikuZ2V0Q2hpbGRCeU5hbWUoXCJHYW1lU2Nyb2xsVmlld1wiKS5nZXRDaGlsZEJ5TmFtZShcInZpZXdcIikuZ2V0Q2hpbGRCeU5hbWUoXCJjb250ZW50XCIpLmdldENoaWxkQnlOYW1lKFwiaXRlbTRcIikub24oY2MuTm9kZS5FdmVudFR5cGUuTU9VU0VfRU5URVIsIHRoaXMub25Nb3VzZTRFbnRlciwgdGhpcyk7XG4gICAgICAgIC8vIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcIkdhbWVzXCIpLmdldENoaWxkQnlOYW1lKFwiR2FtZVNjcm9sbFZpZXdcIikuZ2V0Q2hpbGRCeU5hbWUoXCJ2aWV3XCIpLmdldENoaWxkQnlOYW1lKFwiY29udGVudFwiKS5nZXRDaGlsZEJ5TmFtZShcIml0ZW00XCIpLm9uKGNjLk5vZGUuRXZlbnRUeXBlLk1PVVNFX0xFQVZFLCB0aGlzLm9uTW91c2U0TGVhdmUsIHRoaXMpO1xuICAgICAgICAvLyB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJHYW1lc1wiKS5nZXRDaGlsZEJ5TmFtZShcIkdhbWVTY3JvbGxWaWV3XCIpLmdldENoaWxkQnlOYW1lKFwidmlld1wiKS5nZXRDaGlsZEJ5TmFtZShcImNvbnRlbnRcIikuZ2V0Q2hpbGRCeU5hbWUoXCJpdGVtNVwiKS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5NT1VTRV9FTlRFUiwgdGhpcy5vbk1vdXNlNUVudGVyLCB0aGlzKTtcbiAgICAgICAgLy8gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiR2FtZXNcIikuZ2V0Q2hpbGRCeU5hbWUoXCJHYW1lU2Nyb2xsVmlld1wiKS5nZXRDaGlsZEJ5TmFtZShcInZpZXdcIikuZ2V0Q2hpbGRCeU5hbWUoXCJjb250ZW50XCIpLmdldENoaWxkQnlOYW1lKFwiaXRlbTVcIikub24oY2MuTm9kZS5FdmVudFR5cGUuTU9VU0VfTEVBVkUsIHRoaXMub25Nb3VzZTVMZWF2ZSwgdGhpcyk7XG4gICAgICAgIC8vIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcIkdhbWVzXCIpLmdldENoaWxkQnlOYW1lKFwiR2FtZVNjcm9sbFZpZXdcIikuZ2V0Q2hpbGRCeU5hbWUoXCJ2aWV3XCIpLmdldENoaWxkQnlOYW1lKFwiY29udGVudFwiKS5nZXRDaGlsZEJ5TmFtZShcIml0ZW02XCIpLm9uKGNjLk5vZGUuRXZlbnRUeXBlLk1PVVNFX0VOVEVSLCB0aGlzLm9uTW91c2U2RW50ZXIsIHRoaXMpO1xuICAgICAgICAvLyB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJHYW1lc1wiKS5nZXRDaGlsZEJ5TmFtZShcIkdhbWVTY3JvbGxWaWV3XCIpLmdldENoaWxkQnlOYW1lKFwidmlld1wiKS5nZXRDaGlsZEJ5TmFtZShcImNvbnRlbnRcIikuZ2V0Q2hpbGRCeU5hbWUoXCJpdGVtNlwiKS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5NT1VTRV9MRUFWRSwgdGhpcy5vbk1vdXNlNkxlYXZlLCB0aGlzKTtcbiAgICAgICAgXG4gICAgfSxcblxuLy8gICAgIG9uTW91c2VFbnRlcjogZnVuY3Rpb24oKXtcbi8vICAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiR2FtZXNcIikuZ2V0Q2hpbGRCeU5hbWUoXCJHYW1lU2Nyb2xsVmlld1wiKS5nZXRDaGlsZEJ5TmFtZShcInZpZXdcIikuZ2V0Q2hpbGRCeU5hbWUoXCJjb250ZW50XCIpLmdldENoaWxkQnlOYW1lKFwiaXRlbVwiKS5zZXRTY2FsZSgxLjA4KTtcbi8vICAgICB9LFxuLy8gICAgIG9uTW91c2UxRW50ZXI6IGZ1bmN0aW9uKCl7XG4vLyAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJHYW1lc1wiKS5nZXRDaGlsZEJ5TmFtZShcIkdhbWVTY3JvbGxWaWV3XCIpLmdldENoaWxkQnlOYW1lKFwidmlld1wiKS5nZXRDaGlsZEJ5TmFtZShcImNvbnRlbnRcIikuZ2V0Q2hpbGRCeU5hbWUoXCJpdGVtMVwiKS5zZXRTY2FsZSgxLjA4KTtcbi8vICAgfSxcbi8vICAgb25Nb3VzZTJFbnRlcjogZnVuY3Rpb24oKXtcbi8vICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJHYW1lc1wiKS5nZXRDaGlsZEJ5TmFtZShcIkdhbWVTY3JvbGxWaWV3XCIpLmdldENoaWxkQnlOYW1lKFwidmlld1wiKS5nZXRDaGlsZEJ5TmFtZShcImNvbnRlbnRcIikuZ2V0Q2hpbGRCeU5hbWUoXCJpdGVtMlwiKS5zZXRTY2FsZSgxLjA4KTtcbi8vIH0sXG4vLyBvbk1vdXNlM0VudGVyOiBmdW5jdGlvbigpe1xuLy8gICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJHYW1lc1wiKS5nZXRDaGlsZEJ5TmFtZShcIkdhbWVTY3JvbGxWaWV3XCIpLmdldENoaWxkQnlOYW1lKFwidmlld1wiKS5nZXRDaGlsZEJ5TmFtZShcImNvbnRlbnRcIikuZ2V0Q2hpbGRCeU5hbWUoXCJpdGVtM1wiKS5zZXRTY2FsZSgxLjA4KTtcbi8vIH0sXG4vLyBvbk1vdXNlNEVudGVyOiBmdW5jdGlvbigpe1xuLy8gICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJHYW1lc1wiKS5nZXRDaGlsZEJ5TmFtZShcIkdhbWVTY3JvbGxWaWV3XCIpLmdldENoaWxkQnlOYW1lKFwidmlld1wiKS5nZXRDaGlsZEJ5TmFtZShcImNvbnRlbnRcIikuZ2V0Q2hpbGRCeU5hbWUoXCJpdGVtNFwiKS5zZXRTY2FsZSgxLjA4KTtcbi8vIH0sXG4vLyBvbk1vdXNlNUVudGVyOiBmdW5jdGlvbigpe1xuLy8gICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJHYW1lc1wiKS5nZXRDaGlsZEJ5TmFtZShcIkdhbWVTY3JvbGxWaWV3XCIpLmdldENoaWxkQnlOYW1lKFwidmlld1wiKS5nZXRDaGlsZEJ5TmFtZShcImNvbnRlbnRcIikuZ2V0Q2hpbGRCeU5hbWUoXCJpdGVtNVwiKS5zZXRTY2FsZSgxLjA4KTtcbi8vIH0sXG4vLyBvbk1vdXNlNkVudGVyOiBmdW5jdGlvbigpe1xuLy8gICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJHYW1lc1wiKS5nZXRDaGlsZEJ5TmFtZShcIkdhbWVTY3JvbGxWaWV3XCIpLmdldENoaWxkQnlOYW1lKFwidmlld1wiKS5nZXRDaGlsZEJ5TmFtZShcImNvbnRlbnRcIikuZ2V0Q2hpbGRCeU5hbWUoXCJpdGVtNlwiKS5zZXRTY2FsZSgxLjA4KTtcbi8vIH0sXG5cbiAgICBnZXRHYW1lc0J5Q2F0ZWdvcnlBbGw6IGZ1bmN0aW9uKCl7XG4gICAgICBjb25zdCBnYW1lVGFicyA9IFt0aGlzLmZpc2hUYWIuZ2V0Q2hpbGRCeU5hbWUoJ2JnJyksIHRoaXMuZmF2VGFiLmdldENoaWxkQnlOYW1lKCdiZycpLCB0aGlzLnNsb3RUYWIuZ2V0Q2hpbGRCeU5hbWUoJ2JnJyksIHRoaXMua2Vub1RhYi5nZXRDaGlsZEJ5TmFtZSgnYmcnKSwgdGhpcy5vdGhlclRhYi5nZXRDaGlsZEJ5TmFtZSgnYmcnKV07XG4gICAgICBnYW1lVGFicy5mb3JFYWNoKHRhYiA9PiB0YWIuYWN0aXZlID0gZmFsc2UpXG4gICAgIHRoaXMuYWxsVGFiLmdldENoaWxkQnlOYW1lKCdiZycpLmFjdGl2ZSA9IHRydWU7XG4gICAgICAvLyBjb25zb2xlLmxvZygnQ3VzdG9tIGV2ZW50IHJlY2VpdmVkOicsIGV2ZW50LmRldGFpbC52YWx1ZSk7XG4gICAgfSxcblxuICAgIGdldEdhbWVzQnlDYXRlZ29yeWZpc2g6IGZ1bmN0aW9uKCl7XG4gICAgICBjb25zdCBnYW1lVGFicyA9IFt0aGlzLmFsbFRhYi5nZXRDaGlsZEJ5TmFtZSgnYmcnKSwgdGhpcy5mYXZUYWIuZ2V0Q2hpbGRCeU5hbWUoJ2JnJyksIHRoaXMuc2xvdFRhYi5nZXRDaGlsZEJ5TmFtZSgnYmcnKSwgdGhpcy5rZW5vVGFiLmdldENoaWxkQnlOYW1lKCdiZycpLCB0aGlzLm90aGVyVGFiLmdldENoaWxkQnlOYW1lKCdiZycpXTtcbiAgICAgIGdhbWVUYWJzLmZvckVhY2godGFiID0+IHRhYi5hY3RpdmUgPSBmYWxzZSlcbiAgICAgIHRoaXMuZmlzaFRhYi5nZXRDaGlsZEJ5TmFtZSgnYmcnKS5hY3RpdmUgPSB0cnVlO1xuICAgICAgIC8vIGNvbnNvbGUubG9nKCdDdXN0b20gZXZlbnQgcmVjZWl2ZWQ6JywgZXZlbnQuZGV0YWlsLnZhbHVlKTtcbiAgICAgfSxcbiAgICAgZ2V0R2FtZXNCeUNhdGVnb3J5ZmF2OiBmdW5jdGlvbigpe1xuICAgICAgY29uc3QgZ2FtZVRhYnMgPSBbdGhpcy5maXNoVGFiLmdldENoaWxkQnlOYW1lKCdiZycpLCB0aGlzLmFsbFRhYi5nZXRDaGlsZEJ5TmFtZSgnYmcnKSwgdGhpcy5zbG90VGFiLmdldENoaWxkQnlOYW1lKCdiZycpLCB0aGlzLmtlbm9UYWIuZ2V0Q2hpbGRCeU5hbWUoJ2JnJyksIHRoaXMub3RoZXJUYWIuZ2V0Q2hpbGRCeU5hbWUoJ2JnJyldO1xuICAgICAgZ2FtZVRhYnMuZm9yRWFjaCh0YWIgPT4gdGFiLmFjdGl2ZSA9IGZhbHNlKVxuICAgICAgdGhpcy5mYXZUYWIuZ2V0Q2hpbGRCeU5hbWUoJ2JnJykuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAvLyBjb25zb2xlLmxvZygnQ3VzdG9tIGV2ZW50IHJlY2VpdmVkOicsIGV2ZW50LmRldGFpbC52YWx1ZSk7XG4gICAgIH0sXG4gICAgIGdldEdhbWVzQnlDYXRlZ29yeVNsb3Q6IGZ1bmN0aW9uKGV2ZW50KXtcbiAgICAgIGNvbnN0IGdhbWVUYWJzID0gW3RoaXMuZmlzaFRhYi5nZXRDaGlsZEJ5TmFtZSgnYmcnKSwgdGhpcy5hbGxUYWIuZ2V0Q2hpbGRCeU5hbWUoJ2JnJyksIHRoaXMuZmF2VGFiLmdldENoaWxkQnlOYW1lKCdiZycpLCB0aGlzLmtlbm9UYWIuZ2V0Q2hpbGRCeU5hbWUoJ2JnJyksIHRoaXMub3RoZXJUYWIuZ2V0Q2hpbGRCeU5hbWUoJ2JnJyldO1xuICAgICAgZ2FtZVRhYnMuZm9yRWFjaCh0YWIgPT4gdGFiLmFjdGl2ZSA9IGZhbHNlKVxuICAgICAgdGhpcy5zbG90VGFiLmdldENoaWxkQnlOYW1lKCdiZycpLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgLy8gY29uc29sZS5sb2coJ0N1c3RvbSBldmVudCByZWNlaXZlZDonLCBldmVudC5kZXRhaWwudmFsdWUpO1xuICAgICB9LFxuICAgICBnZXRHYW1lc0J5Q2F0ZWdvcnlLZW5vOiBmdW5jdGlvbihldmVudCl7XG4gICAgICBjb25zdCBnYW1lVGFicyA9IFt0aGlzLmZpc2hUYWIuZ2V0Q2hpbGRCeU5hbWUoJ2JnJyksIHRoaXMuYWxsVGFiLmdldENoaWxkQnlOYW1lKCdiZycpLCB0aGlzLmZhdlRhYi5nZXRDaGlsZEJ5TmFtZSgnYmcnKSwgdGhpcy5zbG90VGFiLmdldENoaWxkQnlOYW1lKCdiZycpLCB0aGlzLm90aGVyVGFiLmdldENoaWxkQnlOYW1lKCdiZycpXTtcbiAgICAgIGdhbWVUYWJzLmZvckVhY2godGFiID0+IHRhYi5hY3RpdmUgPSBmYWxzZSlcbiAgICAgIHRoaXMua2Vub1RhYi5nZXRDaGlsZEJ5TmFtZSgnYmcnKS5hY3RpdmUgPSB0cnVlO1xuICAgICAgIC8vIGNvbnNvbGUubG9nKCdDdXN0b20gZXZlbnQgcmVjZWl2ZWQ6JywgZXZlbnQuZGV0YWlsLnZhbHVlKTtcbiAgICAgfSxcbiAgICAgZ2V0R2FtZXNCeUNhdGVnb3J5T3RoZXI6IGZ1bmN0aW9uKGV2ZW50KXtcbiAgICAgIGNvbnN0IGdhbWVUYWJzID0gW3RoaXMuZmlzaFRhYi5nZXRDaGlsZEJ5TmFtZSgnYmcnKSwgdGhpcy5hbGxUYWIuZ2V0Q2hpbGRCeU5hbWUoJ2JnJyksIHRoaXMuZmF2VGFiLmdldENoaWxkQnlOYW1lKCdiZycpLCB0aGlzLnNsb3RUYWIuZ2V0Q2hpbGRCeU5hbWUoJ2JnJyksIHRoaXMua2Vub1RhYi5nZXRDaGlsZEJ5TmFtZSgnYmcnKV07XG4gICAgICBnYW1lVGFicy5mb3JFYWNoKHRhYiA9PiB0YWIuYWN0aXZlID0gZmFsc2UpO1xuICAgICAgdGhpcy5vdGhlclRhYi5nZXRDaGlsZEJ5TmFtZSgnYmcnKS5hY3RpdmUgPSB0cnVlO1xuICAgICB9LFxuICAgICBcbiAgICBcbiAgICAvLyBvbk1vdXNlTGVhdmU6IGZ1bmN0aW9uKCl7XG4gICAgLy8gICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcIkdhbWVzXCIpLmdldENoaWxkQnlOYW1lKFwiR2FtZVNjcm9sbFZpZXdcIikuZ2V0Q2hpbGRCeU5hbWUoXCJ2aWV3XCIpLmdldENoaWxkQnlOYW1lKFwiY29udGVudFwiKS5nZXRDaGlsZEJ5TmFtZShcIml0ZW1cIikuc2V0U2NhbGUodGhpcy5zY2FsZU5vcm1hbCk7XG4gICAgLy8gfSxcbiAgICAvLyBvbk1vdXNlMUxlYXZlOiBmdW5jdGlvbigpe1xuICAgIC8vICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiR2FtZXNcIikuZ2V0Q2hpbGRCeU5hbWUoXCJHYW1lU2Nyb2xsVmlld1wiKS5nZXRDaGlsZEJ5TmFtZShcInZpZXdcIikuZ2V0Q2hpbGRCeU5hbWUoXCJjb250ZW50XCIpLmdldENoaWxkQnlOYW1lKFwiaXRlbTFcIikuc2V0U2NhbGUodGhpcy5zY2FsZU5vcm1hbCk7XG4gICAgLy8gfSxcbiAgICAvLyBvbk1vdXNlMkxlYXZlOiBmdW5jdGlvbigpe1xuICAgIC8vICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiR2FtZXNcIikuZ2V0Q2hpbGRCeU5hbWUoXCJHYW1lU2Nyb2xsVmlld1wiKS5nZXRDaGlsZEJ5TmFtZShcInZpZXdcIikuZ2V0Q2hpbGRCeU5hbWUoXCJjb250ZW50XCIpLmdldENoaWxkQnlOYW1lKFwiaXRlbTJcIikuc2V0U2NhbGUodGhpcy5zY2FsZU5vcm1hbCk7XG4gICAgLy8gfSxcbiAgICAvLyBvbk1vdXNlM0xlYXZlOiBmdW5jdGlvbigpe1xuICAgIC8vICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiR2FtZXNcIikuZ2V0Q2hpbGRCeU5hbWUoXCJHYW1lU2Nyb2xsVmlld1wiKS5nZXRDaGlsZEJ5TmFtZShcInZpZXdcIikuZ2V0Q2hpbGRCeU5hbWUoXCJjb250ZW50XCIpLmdldENoaWxkQnlOYW1lKFwiaXRlbTNcIikuc2V0U2NhbGUodGhpcy5zY2FsZU5vcm1hbCk7XG4gICAgLy8gfSxcbiAgICAvLyBvbk1vdXNlNExlYXZlOiBmdW5jdGlvbigpe1xuICAgIC8vICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiR2FtZXNcIikuZ2V0Q2hpbGRCeU5hbWUoXCJHYW1lU2Nyb2xsVmlld1wiKS5nZXRDaGlsZEJ5TmFtZShcInZpZXdcIikuZ2V0Q2hpbGRCeU5hbWUoXCJjb250ZW50XCIpLmdldENoaWxkQnlOYW1lKFwiaXRlbTRcIikuc2V0U2NhbGUodGhpcy5zY2FsZU5vcm1hbCk7XG4gICAgLy8gfSxcbiAgICAvLyBvbk1vdXNlNUxlYXZlOiBmdW5jdGlvbigpe1xuICAgIC8vICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiR2FtZXNcIikuZ2V0Q2hpbGRCeU5hbWUoXCJHYW1lU2Nyb2xsVmlld1wiKS5nZXRDaGlsZEJ5TmFtZShcInZpZXdcIikuZ2V0Q2hpbGRCeU5hbWUoXCJjb250ZW50XCIpLmdldENoaWxkQnlOYW1lKFwiaXRlbTVcIikuc2V0U2NhbGUodGhpcy5zY2FsZU5vcm1hbCk7XG4gICAgLy8gfSxcbiAgICAvLyBvbk1vdXNlNkxlYXZlOiBmdW5jdGlvbigpe1xuICAgIC8vICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiR2FtZXNcIikuZ2V0Q2hpbGRCeU5hbWUoXCJHYW1lU2Nyb2xsVmlld1wiKS5nZXRDaGlsZEJ5TmFtZShcInZpZXdcIikuZ2V0Q2hpbGRCeU5hbWUoXCJjb250ZW50XCIpLmdldENoaWxkQnlOYW1lKFwiaXRlbTZcIikuc2V0U2NhbGUodGhpcy5zY2FsZU5vcm1hbCk7XG4gICAgLy8gfSxcblxuICAgICAvLyBmb3IgZnVsbCBTY3JlZW5cbiAgICAgem9vbUZ1bGxTY3JlZW5DbGljazogZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIGlmICghZG9jdW1lbnQuZnVsbHNjcmVlbkVsZW1lbnQgJiYgIWRvY3VtZW50Lm1vekZ1bGxTY3JlZW5FbGVtZW50ICYmICFkb2N1bWVudC53ZWJraXRGdWxsc2NyZWVuRWxlbWVudFxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgIC8vIGN1cnJlbnQgd29ya2luZyBtZXRob2RzXG4gICAgICAgICAgICAgIGlmIChkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQucmVxdWVzdEZ1bGxzY3JlZW4pIHtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQucmVxdWVzdEZ1bGxzY3JlZW4oKVxuICAgICAgICAgICAgICB9IGVsc2UgaWYgKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5tb3pSZXF1ZXN0RnVsbFNjcmVlbikge1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5tb3pSZXF1ZXN0RnVsbFNjcmVlbigpXG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LndlYmtpdFJlcXVlc3RGdWxsc2NyZWVuKSB7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LndlYmtpdFJlcXVlc3RGdWxsc2NyZWVuKFxuICAgICAgICAgICAgICAgICAgRWxlbWVudC5BTExPV19LRVlCT0FSRF9JTlBVVFxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgaWYgKGRvY3VtZW50LmNhbmNlbEZ1bGxTY3JlZW4pIHtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5jYW5jZWxGdWxsU2NyZWVuKClcbiAgICAgICAgICAgICAgfSBlbHNlIGlmIChkb2N1bWVudC5tb3pDYW5jZWxGdWxsU2NyZWVuKSB7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQubW96Q2FuY2VsRnVsbFNjcmVlbigpXG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAoZG9jdW1lbnQud2Via2l0Q2FuY2VsRnVsbFNjcmVlbikge1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LndlYmtpdENhbmNlbEZ1bGxTY3JlZW4oKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgfSxcblxuICAgIGNsb3NlU3Bpbk5vZGU6IGZ1bmN0aW9uKCl7XG4gICAgICAgIGlmKHRoaXMuc3BpbldoZWVsTm9kZS5hY3RpdmUpe1xuICAgICAgICAgICAgdGhpcy5zcGluV2hlZWxOb2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIG9wZW5TcGluV2hlZWxOb2RlOiBmdW5jdGlvbigpe1xuICAgICAgICB2YXIgcm90YXRlQWN0aW9uID0gY2Mucm90YXRlQnkoNSwgMzYwKTtcbiAgICAgICAgdmFyIGNvbnRpbnVlUm90YXRlID0gY2MucmVwZWF0Rm9yZXZlcihyb3RhdGVBY3Rpb24pO1xuICAgICAgICB0aGlzLk91dGVyQW5pbWF0aW9uLnJ1bkFjdGlvbihjb250aW51ZVJvdGF0ZSk7XG4gICAgICAgIGlmKCF0aGlzLnNwaW5XaGVlbE5vZGUuYWN0aXZlKXtcbiAgICAgICAgICAgIHRoaXMuc3BpbldoZWVsTm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIG9wZW5Qcm9mbGVQb3B1cDogZnVuY3Rpb24oKXtcbiAgICAgIHRoaXMucG9wdXBOb2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgICB0aGlzLnByb2ZpbGVOb2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgfSxcblxuICAgIGxvZ091dENsaWNrOiBmdW5jdGlvbigpe1xuICAgICAgY29uc29sZS5sb2coXCJjbGNrXCIpO1xuICAgICAgdGhpcy5ub2RlLmFjdGl2ZSA9IGZhbHNlXG4gICAgICB0aGlzLmxvZ2luTm9kZS5sb2d1dENsaWNrKCk7XG4gICAgfSwgICBcblxuICAgIHBhc3N3b3JkQ2hhbmdlQnRuOiBmdW5jdGlvbigpe1xuICAgICAgaWYodGhpcy5vbGRQYXNzd29yZC5zdHJpbmcgPT0gXCJcIiB8fCB0aGlzLm5ld1Bhc3N3b3JkLnN0cmluZyA9PSBcIlwiIHx8IHRoaXMuY29uZmlybVBhc3N3b3JkLnN0cmluZyA9PSBcIlwiKXtcbiAgICAgICAgU2VydmVyQ29tLmVycm9yTGFibGUuc3RyaW5nID0gXCJBbGwgZmllbGRzIGFyZSBtYW5kYXRvcnlcIjtcbiAgICAgICAgU2VydmVyQ29tLmxvZ2luRXJyb3JOb2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBTZXJ2ZXJDb20ubG9naW5FcnJvck5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIH0sIDIwMDApO1xuICAgICAgfWVsc2V7XG4gICAgICAgIGlmKCB0aGlzLm5ld1Bhc3N3b3JkLnN0cmluZyAhPSB0aGlzLmNvbmZpcm1QYXNzd29yZC5zdHJpbmcpe1xuICAgICAgICAgIFNlcnZlckNvbS5lcnJvckxhYmxlLnN0cmluZyA9IFwiTmV3IFBhc3N3b3JkIGFuZCBjb25maXJtIHBhc3N3b3JkIGRpZCBub3QgbWF0Y2hcIjtcbiAgICAgICAgICBTZXJ2ZXJDb20ubG9naW5FcnJvck5vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICBTZXJ2ZXJDb20ubG9naW5FcnJvck5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgfSwgMjAwMCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wYXNzd29yZE5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIHRoaXMucG9wdXBOb2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgfVxuICAgICBcbiAgICB9LFxuICAgIGNoYW5nZVBhc3N3b3JkOiBmdW5jdGlvbigpe1xuICAgICAgdGhpcy5wYXNzd29yZE5vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgIHRoaXMucG9wdXBOb2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgICBcbiAgICB9LFxuICAgIGNsb3NlUG9wdXBCdG46IGZ1bmN0aW9uKCl7XG4gICAgICBpZih0aGlzLnBhc3N3b3JkTm9kZS5hY3RpdmUgfHwgdGhpcy5wcm9maWxlTm9kZS5hY3RpdmUpe1xuICAgICAgICB0aGlzLnBhc3N3b3JkTm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5wcm9maWxlTm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgIH1cbiAgICAgIHRoaXMucG9wdXBOb2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgIH0sXG4gICAgc2F2ZVByb2ZpbGU6IGZ1bmN0aW9uKCl7XG4gICAgICB0aGlzLnByb2ZpbGVOb2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgdGhpcy5wb3B1cE5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICBcbiAgICB9XG59KTtcbiJdfQ==
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/__node_modules/js-cookies/index.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var encode = function encode(val) {
  try {
    return encodeURIComponent(val);
  } catch (e) {
    console.error('error encode %o');
  }
  return null;
};

var decode = function decode(val) {
  try {
    return decodeURIComponent(val);
  } catch (err) {
    console.error('error decode %o');
  }
  return null;
};

var handleSkey = function handleSkey(sKey) {
  return encode(sKey).replace(/[\-\.\+\*]/g, '\\$&');
};

var Cookies = {
  getItem: function getItem(sKey) {
    if (!sKey) {
      return null;
    }
    return decode(document.cookie.replace(new RegExp('(?:(?:^|.*;)\\s*' + handleSkey(sKey) + '\\s*\\=\\s*([^;]*).*$)|^.*$'), '$1')) || null;
  },
  setItem: function setItem(sKey, sValue, vEnd, sPath, sDomain, bSecure) {
    if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) {
      return false;
    }
    var sExpires = '';
    if (vEnd) {
      switch (vEnd.constructor) {
        case Number:
          if (vEnd === Infinity) {
            sExpires = '; expires=Fri, 31 Dec 9999 23:59:59 GMT';
          } else {
            sExpires = '; max-age=' + vEnd;
          }
          break;
        case String:
          sExpires = '; expires=' + vEnd;
          break;
        case Date:
          sExpires = '; expires=' + vEnd.toUTCString();
          break;
        default:
          break;
      }
    }
    document.cookie = [encode(sKey), '=', encode(sValue), sExpires, sDomain ? '; domain=' + sDomain : '', sPath ? '; path=' + sPath : '', bSecure ? '; secure' : ''].join('');
    return true;
  },
  removeItem: function removeItem(sKey, sPath, sDomain) {
    if (!this.hasItem(sKey)) {
      return false;
    }
    document.cookie = [encode(sKey), '=; expires=Thu, 01 Jan 1970 00:00:00 GMT', sDomain ? '; domain=' + sDomain : '', sPath ? '; path=' + sPath : ''].join('');
    return true;
  },
  hasItem: function hasItem(sKey) {
    if (!sKey) {
      return false;
    }
    return new RegExp('(?:^|;\\s*)' + encode(sKey).replace(/[\-\.\+\*]/g, '\\$&') + '\\s*\\=').test(document.cookie);
  },
  keys: function keys() {
    var aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, '').split(/\s*(?:\=[^;]*)?;\s*/);
    aKeys = aKeys.map(function (key) {
      return decode(key);
    });
    return aKeys;
  }
};

exports.default = Cookies;

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
