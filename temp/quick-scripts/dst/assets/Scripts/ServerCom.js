
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcU2VydmVyQ29tLmpzIl0sIm5hbWVzIjpbIkNvb2tpZXMiLCJyZXF1aXJlIiwicm9vdCIsIndpbmRvdyIsImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwibG9hZGluZyIsInR5cGUiLCJOb2RlIiwicmVjb25uZWN0aW5nIiwidHJhY2tlciIsImVycm9yTGFibGUiLCJMYWJlbCIsImxvZ2luRXJyb3JOb2RlIiwidHJhY2tlckNvdW50IiwidGltZXIiLCJvbkxvYWQiLCJTZXJ2ZXJDb20iLCJjaGVja09yaWVudGF0aW9uIiwidmlldyIsIm9uIiwid2luU2l6ZSIsIndpZHRoIiwiaGVpZ2h0Iiwic2V0T3JpZW50YXRpb24iLCJtYWNybyIsIk9SSUVOVEFUSU9OX0xBTkRTQ0FQRSIsIk9SSUVOVEFUSU9OX1BPUlRSQUlUIiwiZXJyb3IiLCJjb25zb2xlIiwiY2xlYXJUcmFja2VyIiwiaHR0cFJlcXVlc3QiLCJtZXRob2QiLCJhZGRyZXNzIiwiZGF0YSIsImNhbGxiYWNrIiwidGltZW91dCIsImluc3QiLCJ4aHIiLCJYTUxIdHRwUmVxdWVzdCIsImFjdGl2ZSIsIm9ucmVhZHlzdGF0ZWNoYW5nZSIsIksiLCJpbnRlcm5ldEF2YWlsYWJsZSIsInJlYWR5U3RhdGUiLCJyZXNwb25zZSIsInJlc3BvbnNlVGV4dCIsInN0YXR1cyIsInVuZGVmaW5lZCIsIkpTT04iLCJwYXJzZSIsImVycm9yTXNnIiwiZXJyb3JEYXRhIiwibG9nIiwic3RyaW5nIiwic2V0VGltZW91dCIsImUiLCJvbmVycm9yIiwiZXJyIiwib250aW1lb3V0IiwiZGlzY29ubmVjdFJlcXVlc3RlZEJ5UGxheWVyIiwiZW1pdCIsImNvZGUiLCJFcnJvciIsIlRpbWVPdXRFcnJvciIsIm9wZW4iLCJzZXRSZXF1ZXN0SGVhZGVyIiwidG9rZW4iLCJzeXMiLCJpc0Jyb3dzZXIiLCJjb29raWVzIiwiZG9jdW1lbnQiLCJjb29raWUiLCJzcGxpdCIsImkiLCJs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TSxNQUFBQSxHQUFHLENBQUN5QyxJQUFKO0FBQ0g7QUFDSixHQXZKSSxDQTBKTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQXZLSyxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBDb29raWVzID0gcmVxdWlyZSgnanMtY29va2llcycpO1xyXG4vLyBjb25zdCBheGlvcyA9IHJlcXVpcmUoJy4vYXhpb3MvZGlzdC9heGlvcycpO1xyXG4vLyBjb25zdCBheGlvcyA9IHJlcXVpcmUoJ2F4aW9zJyk7XHJcblxyXG52YXIgcm9vdCA9IHdpbmRvdztcclxuY2MuQ2xhc3Moe1xyXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIGxvYWRpbmc6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHJlY29ubmVjdGluZzoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdHJhY2tlcjoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiB7fSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVycm9yTGFibGU6e1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOmNjLkxhYmVsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBsb2dpbkVycm9yTm9kZTp7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcclxuICAgICAgICB9LFxyXG4gICAgICAgIHRyYWNrZXJDb3VudDogMCxcclxuICAgICAgICB0aW1lciA6IDAsXHJcbiAgICB9LFxyXG4gICAgLy8gTElGRS1DWUNMRSBDQUxMQkFDS1M6XHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgICAgLy8gQ3JlYXRlZCBTZXJ2ZXJDb20gR2xvYWJhbHkgc28gdGhhdCB3ZSBjYW4gYWNjZXNzIGl0IGFueXdoZXJlIHdlIHdhbnRcclxuICAgICAgICByb290LlNlcnZlckNvbSA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy5jaGVja09yaWVudGF0aW9uKCk7XHJcbiAgICAgICAgLy8gQWRkIGV2ZW50IGxpc3RlbmVyIGZvciBjYW52YXMgcmVzaXplIHRvIGhhbmRsZSBvcmllbnRhdGlvbiBjaGFuZ2VcclxuICAgICAgICBjYy52aWV3Lm9uKCdjYW52YXMtcmVzaXplJywgdGhpcy5jaGVja09yaWVudGF0aW9uLCB0aGlzKTtcclxuICAgIH0sXHJcbiAgICAvLyBmb2xsb3dpbmcgZnVuY3Rpb24gaXMgdG8gY2hlY2sgdGhlIHdpZHRoIGFuZCBjaGFuZ2UgdGhlIG9yaWVudGF0aW9uKExhbmRzY2FwZS9Qb3RyYWl0KSBmb3IgbW9iaWxlIG9yIGRla3N0b3BcclxuICAgIGNoZWNrT3JpZW50YXRpb24oKSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgbGV0IHdpblNpemUgPSBjYy53aW5TaXplO1xyXG4gICAgICAgICAgICAvLyBDaGVjayBpZiB0aGUgd2lkdGggaXMgZ3JlYXRlciB0aGFuIHRoZSBoZWlnaHQgdG8gZGV0ZXJtaW5lIG9yaWVudGF0aW9uXHJcbiAgICAgICAgICAgIGlmICh3aW5TaXplLndpZHRoID4gd2luU2l6ZS5oZWlnaHQpIHtcclxuICAgICAgICAgICAgICAgIGNjLnZpZXcuc2V0T3JpZW50YXRpb24oY2MubWFjcm8uT1JJRU5UQVRJT05fTEFORFNDQVBFKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNjLnZpZXcuc2V0T3JpZW50YXRpb24oY2MubWFjcm8uT1JJRU5UQVRJT05fUE9SVFJBSVQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkVycm9yIGNoZWNraW5nIG9yaWVudGF0aW9uOlwiLCBlcnJvcik7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGNsZWFyVHJhY2tlcjogZnVuY3Rpb24oKXtcclxuICAgICAgICB0aGlzLnRyYWNrZXJDb3VudCA9IDA7XHJcbiAgICAgICAgdGhpcy50cmFja2VyID0ge307XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG1ldGhvZCBodHRwUG9zdFJlcXVlc3RcclxuICAgICAqIEBkZXNjcmlwdGlvbiBIVFRQIHJlcXVlc3QgLSBQT1NUIGRhdGEgXHJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gYWRkcmVzcyAtYWRkcmVzcyBvZiBTZXJ2ZXIgXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YSAtRGF0YS9QYXlMb2FkIHRvIGJlIHNlbnRcclxuICAgICAqIEBwYXJhbSB7bWV0aG9kfSBjYWxsYmFjayAtQ2FsbGJhY2sgdG8gYmUgZXhlY3V0ZWQgaWYgcmVzcG9uc2Uuc3VjY3NzIGlzIHRydWUhXHJcbiAgICAgKiBAcGFyYW0ge21ldGhvZH0gZXJyb3IgLUNhbGxiYWNrIHRvIGJlIGV4ZWN1dGVkIGlmIHJlc3BvbnNlLnN1Y2Nlc3MgaXMgZmFsc2UhXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gdGltZW91dCAtdmFsdWUgaW4gbWlsbGkgc2Vjb25kcywgU3BlY2lmeSByZXF1ZXN0IHRpbWVvdXQgdGltZSEgXHJcbiAgICAgKiBAbWVtYmVyb2YgVXRpbGl0aWVzLlNlcnZlckNvbSNcclxuICAgICAqL1xyXG5cclxuIFxyXG4gICAgaHR0cFJlcXVlc3Q6IGZ1bmN0aW9uIChtZXRob2QsIGFkZHJlc3MsIGRhdGEsIGNhbGxiYWNrLCBlcnJvciwgdGltZW91dCkge1xyXG4gICAgICAgIHZhciBpbnN0ID0gdGhpcztcclxuICAgICAgICB2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICAgICAgeGhyLnRpbWVvdXQgPSB0aW1lb3V0IHx8IDEwMDA7XHJcbiAgICAgICAgaWYoIVNlcnZlckNvbS5sb2FkaW5nLmFjdGl2ZSl7XHJcbiAgICAgICAgICAgIFNlcnZlckNvbS5sb2FkaW5nLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIEsuaW50ZXJuZXRBdmFpbGFibGUgPSB0cnVlO1xyXG4gICAgICAgICAgICBpZiAoeGhyLnJlYWR5U3RhdGUgPT0gNCkge1xyXG4gICAgICAgICAgICAgICAgU2VydmVyQ29tLmxvYWRpbmcuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB2YXIgcmVzcG9uc2UgPSB4aHIucmVzcG9uc2VUZXh0O1xyXG4gICAgICAgICAgICAgICAgaWYgKHhoci5zdGF0dXMgPj0gMjAwICYmIHhoci5zdGF0dXMgPCA0MDApIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY2FsbGJhY2sgIT09IG51bGwgJiYgY2FsbGJhY2sgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZGF0YSA9IEpTT04ucGFyc2UocmVzcG9uc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2soZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZXJyb3JNc2cgPSBcIlVua25vd24gZXJyb3JcIjtcclxuICAgICAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZXJyb3JEYXRhID0gSlNPTi5wYXJzZShyZXNwb25zZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlcnJvckRhdGEuZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yTXNnID0gZXJyb3JEYXRhLmVycm9yO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZXJyb3JEYXRhZXJyb3JEYXRhXCIsIGVycm9yRGF0YSwgeGhyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5zdC5lcnJvckxhYmxlLnN0cmluZyA9IGVycm9yRGF0YS5lcnJvclxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbnN0LmxvZ2luRXJyb3JOb2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5zdC5sb2dpbkVycm9yTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgMjAwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNhbGxiYWNrKGVycm9yRGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgcGFyc2luZyBlcnJvciByZXNwb25zZTpcIiwgZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgIFxyXG4gICAgICAgIHhoci5vbmVycm9yID0gZnVuY3Rpb24gKGVycikge1xyXG4gICAgICAgICAgICBTZXJ2ZXJDb20ubG9hZGluZy5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgSy5pbnRlcm5ldEF2YWlsYWJsZSA9IGZhbHNlO1xyXG4gICAgXHJcbiAgICAgICAgICAgIHZhciBlcnJvck1zZyA9IFwiVW5rbm93biBlcnJvclwiO1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGVycm9yRGF0YSA9IEpTT04ucGFyc2UoeGhyLnJlc3BvbnNlVGV4dCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoZXJyb3JEYXRhLmVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZXJyb3JNc2cgPSBlcnJvckRhdGEuZXJyb3I7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBwYXJzaW5nIGVycm9yIHJlc3BvbnNlOlwiLCBlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICBcclxuICAgICAgICB4aHIub250aW1lb3V0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBTZXJ2ZXJDb20ubG9hZGluZy5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgSy5kaXNjb25uZWN0UmVxdWVzdGVkQnlQbGF5ZXIgPSBmYWxzZTtcclxuICAgICAgICAgICAgSy5pbnRlcm5ldEF2YWlsYWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAvLyBcclxuICAgICAgICAgICAgaW5zdC5lbWl0KCdlcnJvcicsIHtcclxuICAgICAgICAgICAgICAgIGNvZGU6IEsuRXJyb3IuVGltZU91dEVycm9yLFxyXG4gICAgICAgICAgICAgICAgcmVzcG9uc2U6IFwiVGltZW91dCBcIiArIGFkZHJlc3MsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgLy8gXHJcbiAgICAgICAgLy8geGhyLndpdGhDcmVkZW50aWFscyA9IHRydWU7XHJcbiAgICAgICAgeGhyLm9wZW4obWV0aG9kLCBhZGRyZXNzLCB0cnVlKTtcclxuICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcihcIkNvbnRlbnQtVHlwZVwiLCBcImFwcGxpY2F0aW9uL2pzb25cIik7XHJcbiAgICAgICAgbGV0IHRva2VuID0gbnVsbDtcclxuICAgICAgICBpZiAoIXRva2VuICYmIGNjLnN5cy5pc0Jyb3dzZXIpIHtcclxuICAgICAgICAgICAgY29uc3QgY29va2llcyA9IGRvY3VtZW50LmNvb2tpZS5zcGxpdCgnOycpO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvb2tpZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGNvb2tpZSA9IGNvb2tpZXNbaV0udHJpbSgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGNvb2tpZS5zdGFydHNXaXRoKCd0b2tlbj0nKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRva2VuID0gY29va2llLnN1YnN0cmluZygndG9rZW49Jy5sZW5ndGgsIGNvb2tpZS5sZW5ndGgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIElmIHRva2VuIGV4aXN0cywgYWRkIGl0IHRvIGEgY3VzdG9tIGhlYWRlclxyXG4gICAgICAgIGlmICh0b2tlbikge1xyXG4gICAgICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcihcIkNvb2tpZVwiLCBgdXNlclRva2VuPSR7dG9rZW59YCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChtZXRob2QgPT09IFwiUE9TVFwiKSB7XHJcbiAgICAgICAgICAgIHhoci5zZW5kKEpTT04uc3RyaW5naWZ5KGRhdGEpKTtcclxuICAgICAgICB9IGVsc2UgaWYgKG1ldGhvZCA9PT0gXCJHRVRcIikge1xyXG4gICAgICAgICAgICB4aHIuc2VuZCgpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgXHJcbiAgICAvLyBXSUxMIHVzZSB0aGUgZm9sbG93aW5nIGNvZGUgbGF0ZXIgdG8gY2hlY2sgaWYgdGhlIHNhbWUgYXBpIGlzIHJlcXVlc3QgdW50aWxsIHdlIGdldHMgaXRzIHJlc3BvbnNlXHJcbiAgICAvLyAvKipcclxuICAgIC8vIHVwZGF0ZVRyYWNrZXI6IGZ1bmN0aW9uICh2YWwsIGtleSwgc2hvd0xvYWRpbmcpIHtcclxuICAgIC8vICAgICB2YXIgaW5jciA9IHZhbCA/ICsxIDogLTE7XHJcbiAgICAvLyAgICAgdGhpcy50cmFja2VyQ291bnQgPSB0aGlzLnRyYWNrZXJDb3VudCArIGluY3I7XHJcbiAgICAvLyAgICAgdmFyIGlzQWN0aXZlID0gdmFsICYmIHNob3dMb2FkaW5nO1xyXG4gICAgLy8gICAgIGlmKCF0aGlzLmxvYWRpbmcuYWN0aXZlICYmIHNob3dMb2FkaW5nKXtcclxuICAgIC8vICAgICAgICAgdGhpcy5sb2FkaW5nLmFjdGl2ZSA9IHRydWU7IFxyXG4gICAgLy8gICAgIH1lbHNlIGlmKHRoaXMubG9hZGluZy5hY3RpdmUgJiYgIXNob3dMb2FkaW5nKSB7XHJcbiAgICAvLyAgICAgICAgIHRoaXMubG9hZGluZy5hY3RpdmUgPSBmYWxzZTtcclxuICAgIC8vICAgICB9XHJcbiAgICAvLyAgICAgLy90aGlzLmxvYWRpbmcuYWN0aXZlID0gdmFsICYmIHNob3dMb2FkaW5nO1xyXG4gICAgLy8gICAgIHRoaXMudHJhY2tlcltrZXldID0gdmFsO1xyXG4gICAgLy8gfSxcclxuXHJcbn0pOyJdfQ==