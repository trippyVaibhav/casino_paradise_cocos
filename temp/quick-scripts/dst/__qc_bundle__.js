
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

var Cookies = require('js-cookies'); // const axios = require('axios');


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
    errorLabel: {
      "default": null,
      type: cc.Label
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
            callback(errorData);
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
    var headers = {
      "Content-Type": "application/json"
    };
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
      var headers = {
        "Content-Type": "application/json",
        Cookies: "userToken =" + token
      };
    }

    for (var header in headers) {
      console.log(header + ": " + headers[header]);
      xhr.setRequestHeader(header, headers[header]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHRzL1NlcnZlckNvbS5qcyJdLCJuYW1lcyI6WyJDb29raWVzIiwicmVxdWlyZSIsInJvb3QiLCJ3aW5kb3ciLCJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsImxvYWRpbmciLCJ0eXBlIiwiTm9kZSIsInJlY29ubmVjdGluZyIsInRyYWNrZXIiLCJlcnJvckxhYmVsIiwiTGFiZWwiLCJ0cmFja2VyQ291bnQiLCJ0aW1lciIsIm9uTG9hZCIsIlNlcnZlckNvbSIsImNoZWNrT3JpZW50YXRpb24iLCJ2aWV3Iiwib24iLCJ3aW5TaXplIiwid2lkdGgiLCJoZWlnaHQiLCJzZXRPcmllbnRhdGlvbiIsIm1hY3JvIiwiT1JJRU5UQVRJT05fTEFORFNDQVBFIiwiT1JJRU5UQVRJT05fUE9SVFJBSVQiLCJlcnJvciIsImNvbnNvbGUiLCJjbGVhclRyYWNrZXIiLCJodHRwUmVxdWVzdCIsIm1ldGhvZCIsImFkZHJlc3MiLCJkYXRhIiwiY2FsbGJhY2siLCJ0aW1lb3V0IiwiaW5zdCIsInhociIsIlhNTEh0dHBSZXF1ZXN0IiwiYWN0aXZlIiwib25yZWFkeXN0YXRlY2hhbmdlIiwiSyIsImludGVybmV0QXZhaWxhYmxlIiwicmVhZHlTdGF0ZSIsInJlc3BvbnNlIiwicmVzcG9uc2VUZXh0Iiwic3RhdHVzIiwidW5kZWZpbmVkIiwiSlNPTiIsInBhcnNlIiwiZXJyb3JNc2ciLCJlcnJvckRhdGEiLCJsb2ciLCJlIiwib25lcnJvciIsImVyciIsIm9udGltZW91dCIsImRpc2Nvbm5lY3RSZXF1ZXN0ZWRCeVBsYXllciIsImVtaXQiLCJjb2RlIiwiRXJyb3IiLCJUaW1lT3V0RXJyb3IiLCJvcGVuIiwiaGVhZGVycyIsInRva2VuIiwic3lzIiwiaXNCcm93c2VyIiwiY29va2llcyIsImRvY3VtZW50IiwiY29va2llIiwic3BsaXQiLCJpIiwibGVuZ3RoIiwidHJpbSIsInN0YXJ0c1dpdGgiLCJzdWJzdHJpbmciLCJoZWFkZXIiLCJz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VCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgQ29va2llcyA9IHJlcXVpcmUoJ2pzLWNvb2tpZXMnKTtcbi8vIGNvbnN0IGF4aW9zID0gcmVxdWlyZSgnYXhpb3MnKTtcbnZhciByb290ID0gd2luZG93O1xuY2MuQ2xhc3Moe1xuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIGxvYWRpbmc6IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxuICAgICAgICB9LFxuICAgICAgICByZWNvbm5lY3Rpbmc6IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxuICAgICAgICB9LFxuICAgICAgICB0cmFja2VyOiB7XG4gICAgICAgICAgICBkZWZhdWx0OiB7fSxcbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3JMYWJlbDp7XG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWxcbiAgICAgICAgfSxcbiAgICAgICAgdHJhY2tlckNvdW50OiAwLFxuICAgICAgICB0aW1lciA6IDAsXG4gICAgfSxcbiAgICAvLyBMSUZFLUNZQ0xFIENBTExCQUNLUzpcbiAgICBvbkxvYWQoKSB7XG4gICAgICAgIC8vIENyZWF0ZWQgU2VydmVyQ29tIEdsb2FiYWx5IHNvIHRoYXQgd2UgY2FuIGFjY2VzcyBpdCBhbnl3aGVyZSB3ZSB3YW50XG4gICAgICAgIHJvb3QuU2VydmVyQ29tID0gdGhpcztcbiAgICAgICAgdGhpcy5jaGVja09yaWVudGF0aW9uKCk7XG4gICAgICAgIC8vIEFkZCBldmVudCBsaXN0ZW5lciBmb3IgY2FudmFzIHJlc2l6ZSB0byBoYW5kbGUgb3JpZW50YXRpb24gY2hhbmdlXG4gICAgICAgIGNjLnZpZXcub24oJ2NhbnZhcy1yZXNpemUnLCB0aGlzLmNoZWNrT3JpZW50YXRpb24sIHRoaXMpO1xuICAgIH0sXG4gICAgLy8gZm9sbG93aW5nIGZ1bmN0aW9uIGlzIHRvIGNoZWNrIHRoZSB3aWR0aCBhbmQgY2hhbmdlIHRoZSBvcmllbnRhdGlvbihMYW5kc2NhcGUvUG90cmFpdCkgZm9yIG1vYmlsZSBvciBkZWtzdG9wXG4gICAgY2hlY2tPcmllbnRhdGlvbigpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGxldCB3aW5TaXplID0gY2Mud2luU2l6ZTtcbiAgICAgICAgICAgIC8vIENoZWNrIGlmIHRoZSB3aWR0aCBpcyBncmVhdGVyIHRoYW4gdGhlIGhlaWdodCB0byBkZXRlcm1pbmUgb3JpZW50YXRpb25cbiAgICAgICAgICAgIGlmICh3aW5TaXplLndpZHRoID4gd2luU2l6ZS5oZWlnaHQpIHtcbiAgICAgICAgICAgICAgICBjYy52aWV3LnNldE9yaWVudGF0aW9uKGNjLm1hY3JvLk9SSUVOVEFUSU9OX0xBTkRTQ0FQRSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNjLnZpZXcuc2V0T3JpZW50YXRpb24oY2MubWFjcm8uT1JJRU5UQVRJT05fUE9SVFJBSVQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkVycm9yIGNoZWNraW5nIG9yaWVudGF0aW9uOlwiLCBlcnJvcik7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIGNsZWFyVHJhY2tlcjogZnVuY3Rpb24oKXtcbiAgICAgICAgdGhpcy50cmFja2VyQ291bnQgPSAwO1xuICAgICAgICB0aGlzLnRyYWNrZXIgPSB7fTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBodHRwUG9zdFJlcXVlc3RcbiAgICAgKiBAZGVzY3JpcHRpb24gSFRUUCByZXF1ZXN0IC0gUE9TVCBkYXRhIFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBhZGRyZXNzIC1hZGRyZXNzIG9mIFNlcnZlciBcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YSAtRGF0YS9QYXlMb2FkIHRvIGJlIHNlbnRcbiAgICAgKiBAcGFyYW0ge21ldGhvZH0gY2FsbGJhY2sgLUNhbGxiYWNrIHRvIGJlIGV4ZWN1dGVkIGlmIHJlc3BvbnNlLnN1Y2NzcyBpcyB0cnVlIVxuICAgICAqIEBwYXJhbSB7bWV0aG9kfSBlcnJvciAtQ2FsbGJhY2sgdG8gYmUgZXhlY3V0ZWQgaWYgcmVzcG9uc2Uuc3VjY2VzcyBpcyBmYWxzZSFcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gdGltZW91dCAtdmFsdWUgaW4gbWlsbGkgc2Vjb25kcywgU3BlY2lmeSByZXF1ZXN0IHRpbWVvdXQgdGltZSEgXG4gICAgICogQG1lbWJlcm9mIFV0aWxpdGllcy5TZXJ2ZXJDb20jXG4gICAgICovXG5cbiBcbiAgICBodHRwUmVxdWVzdDogZnVuY3Rpb24gKG1ldGhvZCwgYWRkcmVzcywgZGF0YSwgY2FsbGJhY2ssIGVycm9yLCB0aW1lb3V0KSB7XG4gICAgICAgIHZhciBpbnN0ID0gdGhpcztcbiAgICAgICAgdmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgICAgICB4aHIudGltZW91dCA9IHRpbWVvdXQgfHwgMTAwMDtcbiAgICAgICAgaWYoIVNlcnZlckNvbS5sb2FkaW5nLmFjdGl2ZSl7XG4gICAgICAgICAgICBTZXJ2ZXJDb20ubG9hZGluZy5hY3RpdmUgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBLLmludGVybmV0QXZhaWxhYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgIGlmICh4aHIucmVhZHlTdGF0ZSA9PSA0KSB7XG4gICAgICAgICAgICAgICAgU2VydmVyQ29tLmxvYWRpbmcuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdmFyIHJlc3BvbnNlID0geGhyLnJlc3BvbnNlVGV4dDtcbiAgICAgICAgICAgICAgICBpZiAoeGhyLnN0YXR1cyA+PSAyMDAgJiYgeGhyLnN0YXR1cyA8IDQwMCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoY2FsbGJhY2sgIT09IG51bGwgJiYgY2FsbGJhY2sgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRhdGEgPSBKU09OLnBhcnNlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayhkYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBlcnJvck1zZyA9IFwiVW5rbm93biBlcnJvclwiO1xuICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGVycm9yRGF0YSA9IEpTT04ucGFyc2UocmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVycm9yRGF0YS5lcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yTXNnID0gZXJyb3JEYXRhLmVycm9yO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJlcnJvckRhdGFlcnJvckRhdGFcIiwgZXJyb3JEYXRhLCB4aHIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2soZXJyb3JEYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkVycm9yIHBhcnNpbmcgZXJyb3IgcmVzcG9uc2U6XCIsIGUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIFxuICAgICAgICB4aHIub25lcnJvciA9IGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgIFNlcnZlckNvbS5sb2FkaW5nLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgSy5pbnRlcm5ldEF2YWlsYWJsZSA9IGZhbHNlO1xuICAgIFxuICAgICAgICAgICAgdmFyIGVycm9yTXNnID0gXCJVbmtub3duIGVycm9yXCI7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHZhciBlcnJvckRhdGEgPSBKU09OLnBhcnNlKHhoci5yZXNwb25zZVRleHQpO1xuICAgICAgICAgICAgICAgIGlmIChlcnJvckRhdGEuZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgZXJyb3JNc2cgPSBlcnJvckRhdGEuZXJyb3I7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBwYXJzaW5nIGVycm9yIHJlc3BvbnNlOlwiLCBlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICBcbiAgICAgICAgeGhyLm9udGltZW91dCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIFNlcnZlckNvbS5sb2FkaW5nLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgSy5kaXNjb25uZWN0UmVxdWVzdGVkQnlQbGF5ZXIgPSBmYWxzZTtcbiAgICAgICAgICAgIEsuaW50ZXJuZXRBdmFpbGFibGUgPSBmYWxzZTtcbiAgICAgICAgICAgIC8vIFxuICAgICAgICAgICAgaW5zdC5lbWl0KCdlcnJvcicsIHtcbiAgICAgICAgICAgICAgICBjb2RlOiBLLkVycm9yLlRpbWVPdXRFcnJvcixcbiAgICAgICAgICAgICAgICByZXNwb25zZTogXCJUaW1lb3V0IFwiICsgYWRkcmVzcyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgICAgICAvLyBcbiAgICAgICAgLy8geGhyLndpdGhDcmVkZW50aWFscyA9IHRydWU7XG4gICAgICAgIHhoci5vcGVuKG1ldGhvZCwgYWRkcmVzcywgdHJ1ZSk7XG4gICAgICAgIHZhciBoZWFkZXJzID0ge1xuICAgICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICAgIH07XG4gICAgICAgIGxldCB0b2tlbiA9IG51bGw7XG4gICAgICAgIGlmICghdG9rZW4gJiYgY2Muc3lzLmlzQnJvd3Nlcikge1xuICAgICAgICAgICAgY29uc3QgY29va2llcyA9IGRvY3VtZW50LmNvb2tpZS5zcGxpdCgnOycpO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb29raWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgY29va2llID0gY29va2llc1tpXS50cmltKCk7XG4gICAgICAgICAgICAgICAgaWYgKGNvb2tpZS5zdGFydHNXaXRoKCd0b2tlbj0nKSkge1xuICAgICAgICAgICAgICAgICAgICB0b2tlbiA9IGNvb2tpZS5zdWJzdHJpbmcoJ3Rva2VuPScubGVuZ3RoLCBjb29raWUubGVuZ3RoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIElmIHRva2VuIGV4aXN0cywgYWRkIGl0IHRvIGEgY3VzdG9tIGhlYWRlclxuICAgICAgICBpZiAodG9rZW4pIHtcbiAgICAgICAgICAgIHZhciBoZWFkZXJzID0ge1xuICAgICAgICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgICAgICAgICAgICAgIENvb2tpZXM6IGB1c2VyVG9rZW4gPSR7dG9rZW59YFxuICAgICAgICAgICAgfTsgICAgXG4gICAgICAgIH1cbiAgICAgICAgZm9yIChjb25zdCBoZWFkZXIgaW4gaGVhZGVycykge1xuICAgICAgICAgICAgY29uc29sZS5sb2coYCR7aGVhZGVyfTogJHtoZWFkZXJzW2hlYWRlcl19YCk7XG4gICAgICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcihoZWFkZXIsIGhlYWRlcnNbaGVhZGVyXSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG1ldGhvZCA9PT0gXCJQT1NUXCIpIHtcbiAgICAgICAgICAgIHhoci5zZW5kKEpTT04uc3RyaW5naWZ5KGRhdGEpKTtcbiAgICAgICAgfSBlbHNlIGlmIChtZXRob2QgPT09IFwiR0VUXCIpIHtcbiAgICAgICAgICAgIHhoci5zZW5kKCk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgXG4gICAgLy8gV0lMTCB1c2UgdGhlIGZvbGxvd2luZyBjb2RlIGxhdGVyIHRvIGNoZWNrIGlmIHRoZSBzYW1lIGFwaSBpcyByZXF1ZXN0IHVudGlsbCB3ZSBnZXRzIGl0cyByZXNwb25zZVxuICAgIC8vIC8qKlxuICAgIC8vIHVwZGF0ZVRyYWNrZXI6IGZ1bmN0aW9uICh2YWwsIGtleSwgc2hvd0xvYWRpbmcpIHtcbiAgICAvLyAgICAgdmFyIGluY3IgPSB2YWwgPyArMSA6IC0xO1xuICAgIC8vICAgICB0aGlzLnRyYWNrZXJDb3VudCA9IHRoaXMudHJhY2tlckNvdW50ICsgaW5jcjtcbiAgICAvLyAgICAgdmFyIGlzQWN0aXZlID0gdmFsICYmIHNob3dMb2FkaW5nO1xuICAgIC8vICAgICBpZighdGhpcy5sb2FkaW5nLmFjdGl2ZSAmJiBzaG93TG9hZGluZyl7XG4gICAgLy8gICAgICAgICB0aGlzLmxvYWRpbmcuYWN0aXZlID0gdHJ1ZTsgXG4gICAgLy8gICAgIH1lbHNlIGlmKHRoaXMubG9hZGluZy5hY3RpdmUgJiYgIXNob3dMb2FkaW5nKSB7XG4gICAgLy8gICAgICAgICB0aGlzLmxvYWRpbmcuYWN0aXZlID0gZmFsc2U7XG4gICAgLy8gICAgIH1cbiAgICAvLyAgICAgLy90aGlzLmxvYWRpbmcuYWN0aXZlID0gdmFsICYmIHNob3dMb2FkaW5nO1xuICAgIC8vICAgICB0aGlzLnRyYWNrZXJba2V5XSA9IHZhbDtcbiAgICAvLyB9LFxuXG59KTsiXX0=
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
    category: null,
    lefttiltAngle: -7,
    // Angle to tilt the node (in degrees)
    tiltDuration: 0.2,
    // Duration of the tilt animation
    originalRotation: 0,
    righttiltAngle: 7
  },
  // LIFE-CYCLE CALLBACKS:
  onLoad: function onLoad() {
    if (!this.category) {
      this.category = "all";
    }

    var address = K.ServerAddress.ipAddress + K.ServerAPI.game + "=" + this.category;
    ServerCom.httpRequest("GET", address, function (response) {
      console.log("responseresponseresponse in lobby", response);
    }.bind(this)); // Set initial position of the sprite
    //  var rightTitlAction = cc.rotateTo(this.tiltDuration, this.righttiltAngle);
    //  var continueRightTilt = cc.repeatForever(rightTitlAction);
    //  this.rightTiltNode.runAction(continueRightTilt);
    //  var leftTitleAction = cc.rotateTo(this.tiltDuration, this.lefttiltAngle)
    //  var continueLeftTilt = cc.repeatForever(leftTitleAction);
    //  this.leftTiltNode.runAction(continueLeftTilt);

    this.smallItemNode.on(cc.Node.EventType.MOUSE_ENTER, this.onMouseEnter, this); // Register mouse leave event

    this.smallItemNode.on(cc.Node.EventType.MOUSE_LEAVE, this.onMouseLeave, this);
  },
  onMouseEnter: function onMouseEnter() {
    this.rightTiltNode.runAction(cc.rotateTo(this.tiltDuration, this.righttiltAngle));
    this.leftTiltNode.runAction(cc.rotateTo(this.tiltDuration, this.lefttiltAngle));
  },
  onMouseLeave: function onMouseLeave() {
    this.rightTiltNode.runAction(cc.rotateTo(this.tiltDuration, this.originalRotation));
    this.leftTiltNode.runAction(cc.rotateTo(this.tiltDuration, this.originalRotation));
  },
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
  logOutClick: function logOutClick() {}
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHRzL0xvYmJ5L0xvYmJ5LmpzIl0sIm5hbWVzIjpbIkNvb2tpZXMiLCJyZXF1aXJlIiwiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJ1c2VySWQiLCJ0eXBlIiwiTGFiZWwiLCJjb2luc0xhYmVsIiwiY2xvdWRBbmltTm9kZSIsIk5vZGUiLCJzcHJpdGUiLCJTcHJpdGVGcmFtZSIsInNtYWxsSXRlbU5vZGUiLCJyaWdodFRpbHROb2RlIiwibGVmdFRpbHROb2RlIiwic3BpbldoZWVsTm9kZSIsIk91dGVyQW5pbWF0aW9uIiwiY2F0ZWdvcnkiLCJsZWZ0dGlsdEFuZ2xlIiwidGlsdER1cmF0aW9uIiwib3JpZ2luYWxSb3RhdGlvbiIsInJpZ2h0dGlsdEFuZ2xlIiwib25Mb2FkIiwiYWRkcmVzcyIsIksiLCJTZXJ2ZXJBZGRyZXNzIiwiaXBBZGRyZXNzIiwiU2VydmVyQVBJIiwiZ2FtZSIsIlNlcnZlckNvbSIsImh0dHBSZXF1ZXN0IiwicmVzcG9uc2UiLCJjb25zb2xlIiwibG9nIiwiYmluZCIsIm9uIiwiRXZlbnRUeXBlIiwiTU9VU0VfRU5URVIiLCJvbk1vdXNlRW50ZXIiLCJNT1VTRV9MRUFWRSIsIm9uTW91c2VMZWF2ZSIsInJ1bkFjdGlvbiIsInJvdGF0ZVRvIiwiem9vbUZ1bGxTY3JlZW5DbGljayIsImRvY3VtZW50IiwiZnVsbHNjcmVlbkVsZW1lbnQiLCJtb3pGdWxsU2NyZWVuRWxlbWVudCIsIndlYmtpdEZ1bGxzY3JlZW5FbGVtZW50IiwiZG9jdW1lbnRFbGVtZW50IiwicmVxdWVzdEZ1bGxzY3JlZW4iLCJtb3pSZXF1ZXN0RnVsbFNjcmVlbiIsIndlYmtpdFJlcXVlc3RGdWxsc2NyZWVuIiwiRWxlbWVudCIsIkFMTE9XX0tFWUJPQVJEX0lOUFVUIiwiY2FuY2VsRnVsbFNjcmVlbiIsIm1vekNhbmNlbEZ1bGxTY3JlZW4iLCJ3ZWJraXRDYW5jZWxGdWxsU2NyZWVuIiwiY2xvc2VTcGluTm9kZSIsImFjdGl2ZSIsIm9wZW5TcGluV2hlZWxOb2RlIiwicm90YXRlQWN0aW9uIiwicm90YXRlQnkiLCJjb250aW51ZVJvdGF0ZSIsInJlcGVhdEZvcmV2ZXIiLCJsb2dPdXRDbGljayJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFNQSxPQUFPLEdBQUdDLE9BQU8sQ0FBQyxZQUFELENBQXZCOztBQUNBQyxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUdMQyxFQUFBQSxVQUFVLEVBQUU7QUFDWEMsSUFBQUEsTUFBTSxFQUFDO0FBQ0osaUJBQVMsSUFETDtBQUVKQyxNQUFBQSxJQUFJLEVBQUNMLEVBQUUsQ0FBQ007QUFGSixLQURJO0FBS1hDLElBQUFBLFVBQVUsRUFBQztBQUNSLGlCQUFTLElBREQ7QUFFUkYsTUFBQUEsSUFBSSxFQUFFTCxFQUFFLENBQUNNO0FBRkQsS0FMQTtBQVNYRSxJQUFBQSxhQUFhLEVBQUM7QUFDWCxpQkFBUyxJQURFO0FBRVhILE1BQUFBLElBQUksRUFBRUwsRUFBRSxDQUFDUztBQUZFLEtBVEg7QUFhWEMsSUFBQUEsTUFBTSxFQUFFO0FBQ0wsaUJBQVMsSUFESjtBQUVMTCxNQUFBQSxJQUFJLEVBQUVMLEVBQUUsQ0FBQ1c7QUFGSixLQWJHO0FBaUJaQyxJQUFBQSxhQUFhLEVBQUM7QUFDVixpQkFBUyxJQURDO0FBRVZQLE1BQUFBLElBQUksRUFBRUwsRUFBRSxDQUFDUztBQUZDLEtBakJGO0FBcUJaSSxJQUFBQSxhQUFhLEVBQUM7QUFDVixpQkFBUyxJQURDO0FBRVZSLE1BQUFBLElBQUksRUFBRUwsRUFBRSxDQUFDUztBQUZDLEtBckJGO0FBeUJaSyxJQUFBQSxZQUFZLEVBQUM7QUFDVCxpQkFBUyxJQURBO0FBRVRULE1BQUFBLElBQUksRUFBRUwsRUFBRSxDQUFDUztBQUZBLEtBekJEO0FBNkJaTSxJQUFBQSxhQUFhLEVBQUM7QUFDVixpQkFBUyxJQURDO0FB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dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2NsYXNzLmh0bWxcbi8vIExlYXJuIEF0dHJpYnV0ZTpcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxuY29uc3QgQ29va2llcyA9IHJlcXVpcmUoJ2pzLWNvb2tpZXMnKTtcbmNjLkNsYXNzKHtcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgIHVzZXJJZDp7XG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgIHR5cGU6Y2MuTGFiZWwsXG4gICAgIH0sXG4gICAgIGNvaW5zTGFiZWw6e1xuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICB0eXBlOiBjYy5MYWJlbCxcbiAgICAgfSxcbiAgICAgY2xvdWRBbmltTm9kZTp7XG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgIHR5cGU6IGNjLk5vZGVcbiAgICAgfSxcbiAgICAgc3ByaXRlOiB7XG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgIHR5cGU6IGNjLlNwcml0ZUZyYW1lLFxuICAgIH0sXG4gICAgc21hbGxJdGVtTm9kZTp7XG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgIHR5cGU6IGNjLk5vZGUsXG4gICAgfSxcbiAgICByaWdodFRpbHROb2RlOntcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgICAgdHlwZTogY2MuTm9kZVxuICAgIH0sXG4gICAgbGVmdFRpbHROb2RlOntcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgICAgdHlwZTogY2MuTm9kZVxuICAgIH0sXG4gICAgc3BpbldoZWVsTm9kZTp7XG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgIHR5cGU6IGNjLk5vZGVcbiAgICB9LFxuICAgIE91dGVyQW5pbWF0aW9uOntcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgICAgdHlwZTpjYy5Ob2RlLFxuICAgIH0sXG4gICAgIGNhdGVnb3J5OiBudWxsLFxuICAgICBsZWZ0dGlsdEFuZ2xlOiAtNywgIC8vIEFuZ2xlIHRvIHRpbHQgdGhlIG5vZGUgKGluIGRlZ3JlZXMpXG4gICAgIHRpbHREdXJhdGlvbjogMC4yLCAgLy8gRHVyYXRpb24gb2YgdGhlIHRpbHQgYW5pbWF0aW9uXG4gICAgIG9yaWdpbmFsUm90YXRpb246IDAsXG4gICAgIHJpZ2h0dGlsdEFuZ2xlOiA3LFxuICAgICAgXG4gICAgfSxcblxuICAgIC8vIExJRkUtQ1lDTEUgQ0FMTEJBQ0tTOlxuXG4gICAgb25Mb2FkICgpIHtcbiAgICAgICAgaWYoIXRoaXMuY2F0ZWdvcnkpe1xuICAgICAgICAgICAgdGhpcy5jYXRlZ29yeSA9IFwiYWxsXCJcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgdmFyIGFkZHJlc3MgPSBLLlNlcnZlckFkZHJlc3MuaXBBZGRyZXNzICsgSy5TZXJ2ZXJBUEkuZ2FtZSArXCI9XCIrIHRoaXMuY2F0ZWdvcnk7XG4gICAgICAgIFxuICAgICAgICBTZXJ2ZXJDb20uaHR0cFJlcXVlc3QoXCJHRVRcIiwgYWRkcmVzcywgZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgIGNvbnNvbGUubG9nKFwicmVzcG9uc2VyZXNwb25zZXJlc3BvbnNlIGluIGxvYmJ5XCIsIHJlc3BvbnNlKTtcbiAgICAgICAgfS5iaW5kKHRoaXMpKTtcbiAgICAgICAgIC8vIFNldCBpbml0aWFsIHBvc2l0aW9uIG9mIHRoZSBzcHJpdGVcblxuICAgICAgICAvLyAgdmFyIHJpZ2h0VGl0bEFjdGlvbiA9IGNjLnJvdGF0ZVRvKHRoaXMudGlsdER1cmF0aW9uLCB0aGlzLnJpZ2h0dGlsdEFuZ2xlKTtcbiAgICAgICAgLy8gIHZhciBjb250aW51ZVJpZ2h0VGlsdCA9IGNjLnJlcGVhdEZvcmV2ZXIocmlnaHRUaXRsQWN0aW9uKTtcbiAgICAgICAgLy8gIHRoaXMucmlnaHRUaWx0Tm9kZS5ydW5BY3Rpb24oY29udGludWVSaWdodFRpbHQpO1xuXG4gICAgICAgIC8vICB2YXIgbGVmdFRpdGxlQWN0aW9uID0gY2Mucm90YXRlVG8odGhpcy50aWx0RHVyYXRpb24sIHRoaXMubGVmdHRpbHRBbmdsZSlcbiAgICAgICAgLy8gIHZhciBjb250aW51ZUxlZnRUaWx0ID0gY2MucmVwZWF0Rm9yZXZlcihsZWZ0VGl0bGVBY3Rpb24pO1xuICAgICAgICAvLyAgdGhpcy5sZWZ0VGlsdE5vZGUucnVuQWN0aW9uKGNvbnRpbnVlTGVmdFRpbHQpO1xuXG4gICAgICAgICB0aGlzLnNtYWxsSXRlbU5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuTU9VU0VfRU5URVIsIHRoaXMub25Nb3VzZUVudGVyLCB0aGlzKTtcblxuICAgICAgICAvLyBSZWdpc3RlciBtb3VzZSBsZWF2ZSBldmVudFxuICAgICAgICB0aGlzLnNtYWxsSXRlbU5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuTU9VU0VfTEVBVkUsIHRoaXMub25Nb3VzZUxlYXZlLCB0aGlzKTtcbiAgICAgICAgXG4gICAgfSxcblxuICAgIG9uTW91c2VFbnRlcjogZnVuY3Rpb24oKXtcbiAgICAgICAgdGhpcy5yaWdodFRpbHROb2RlLnJ1bkFjdGlvbihjYy5yb3RhdGVUbyh0aGlzLnRpbHREdXJhdGlvbiwgdGhpcy5yaWdodHRpbHRBbmdsZSkpO1xuICAgICAgICB0aGlzLmxlZnRUaWx0Tm9kZS5ydW5BY3Rpb24oY2Mucm90YXRlVG8odGhpcy50aWx0RHVyYXRpb24sIHRoaXMubGVmdHRpbHRBbmdsZSkpO1xuICAgICAgICBcbiAgICB9LFxuICAgIG9uTW91c2VMZWF2ZTogZnVuY3Rpb24oKXtcbiAgICAgICAgdGhpcy5yaWdodFRpbHROb2RlLnJ1bkFjdGlvbihjYy5yb3RhdGVUbyh0aGlzLnRpbHREdXJhdGlvbiwgdGhpcy5vcmlnaW5hbFJvdGF0aW9uKSk7XG4gICAgICAgIHRoaXMubGVmdFRpbHROb2RlLnJ1bkFjdGlvbihjYy5yb3RhdGVUbyh0aGlzLnRpbHREdXJhdGlvbiwgdGhpcy5vcmlnaW5hbFJvdGF0aW9uKSk7XG4gICAgfSxcblxuICAgICAvLyBmb3IgZnVsbCBTY3JlZW5cbiAgICAgem9vbUZ1bGxTY3JlZW5DbGljazogZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIGlmICghZG9jdW1lbnQuZnVsbHNjcmVlbkVsZW1lbnQgJiYgIWRvY3VtZW50Lm1vekZ1bGxTY3JlZW5FbGVtZW50ICYmICFkb2N1bWVudC53ZWJraXRGdWxsc2NyZWVuRWxlbWVudFxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgIC8vIGN1cnJlbnQgd29ya2luZyBtZXRob2RzXG4gICAgICAgICAgICAgIGlmIChkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQucmVxdWVzdEZ1bGxzY3JlZW4pIHtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQucmVxdWVzdEZ1bGxzY3JlZW4oKVxuICAgICAgICAgICAgICB9IGVsc2UgaWYgKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5tb3pSZXF1ZXN0RnVsbFNjcmVlbikge1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5tb3pSZXF1ZXN0RnVsbFNjcmVlbigpXG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LndlYmtpdFJlcXVlc3RGdWxsc2NyZWVuKSB7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LndlYmtpdFJlcXVlc3RGdWxsc2NyZWVuKFxuICAgICAgICAgICAgICAgICAgRWxlbWVudC5BTExPV19LRVlCT0FSRF9JTlBVVFxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgaWYgKGRvY3VtZW50LmNhbmNlbEZ1bGxTY3JlZW4pIHtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5jYW5jZWxGdWxsU2NyZWVuKClcbiAgICAgICAgICAgICAgfSBlbHNlIGlmIChkb2N1bWVudC5tb3pDYW5jZWxGdWxsU2NyZWVuKSB7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQubW96Q2FuY2VsRnVsbFNjcmVlbigpXG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAoZG9jdW1lbnQud2Via2l0Q2FuY2VsRnVsbFNjcmVlbikge1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LndlYmtpdENhbmNlbEZ1bGxTY3JlZW4oKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgfSxcblxuICAgIGNsb3NlU3Bpbk5vZGU6IGZ1bmN0aW9uKCl7XG4gICAgICAgIGlmKHRoaXMuc3BpbldoZWVsTm9kZS5hY3RpdmUpe1xuICAgICAgICAgICAgdGhpcy5zcGluV2hlZWxOb2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIG9wZW5TcGluV2hlZWxOb2RlOiBmdW5jdGlvbigpe1xuICAgICAgICB2YXIgcm90YXRlQWN0aW9uID0gY2Mucm90YXRlQnkoNSwgMzYwKTtcbiAgICAgICAgdmFyIGNvbnRpbnVlUm90YXRlID0gY2MucmVwZWF0Rm9yZXZlcihyb3RhdGVBY3Rpb24pO1xuICAgICAgICB0aGlzLk91dGVyQW5pbWF0aW9uLnJ1bkFjdGlvbihjb250aW51ZVJvdGF0ZSk7XG4gICAgICAgIGlmKCF0aGlzLnNwaW5XaGVlbE5vZGUuYWN0aXZlKXtcbiAgICAgICAgICAgIHRoaXMuc3BpbldoZWVsTm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIGxvZ091dENsaWNrOiBmdW5jdGlvbigpe1xuICAgICAgXG4gICAgfSwgICBcbn0pO1xuIl19
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
