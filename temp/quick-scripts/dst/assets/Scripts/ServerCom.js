
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