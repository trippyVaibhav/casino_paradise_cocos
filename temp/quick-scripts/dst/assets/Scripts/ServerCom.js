
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